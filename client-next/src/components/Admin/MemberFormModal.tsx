"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import type { Member } from "@/app/admin/page";

interface FormValues {
  name: string;
  codechefUsername: string;
  rating: string;
  active: boolean;
}

export default function MemberFormModal({
  member,
  onClose,
  onSaved,
}: {
  member: Member | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(member);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: member?.name || "",
      codechefUsername: member?.codechefUsername || "",
      rating: member ? String(member.rating) : "",
      active: member?.active ?? true,
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError("");
    const payload = {
      name: values.name.trim(),
      codechefUsername: values.codechefUsername.trim(),
      rating: Number(values.rating),
      ...(isEdit ? { active: values.active } : {}),
    };

    const url = isEdit ? `/api/admin/members/${member!._id}` : "/api/admin/members";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setSubmitError(data.error || "Something went wrong. Please try again.");
      return;
    }

    onSaved();
  }

  const inputClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400";
  const labelClass = "text-sm font-medium text-gray-700";
  const errorClass = "text-xs text-red-600 mt-1";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          {isEdit ? "Edit Member" : "Add Member"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className={inputClass}
              {...register("name", { required: "Name is required." })}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="codechefUsername">
              CodeChef Username
            </label>
            <input
              id="codechefUsername"
              className={inputClass}
              {...register("codechefUsername", { required: "CodeChef username is required." })}
            />
            {errors.codechefUsername && <p className={errorClass}>{errors.codechefUsername.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="rating">
              Rating
            </label>
            <input
              id="rating"
              type="number"
              className={inputClass}
              {...register("rating", {
                required: "Rating is required.",
                validate: (v) => (Number.isFinite(Number(v)) && v !== "" ? true : "Rating must be a valid number."),
              })}
            />
            {errors.rating && <p className={errorClass}>{errors.rating.message}</p>}
          </div>

          {isEdit && (
            <div className="flex items-center gap-2">
              <input id="active" type="checkbox" {...register("active")} className="h-4 w-4" />
              <label htmlFor="active" className="text-sm text-gray-700">
                Active
              </label>
            </div>
          )}

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-gray-700 border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-sm font-medium bg-gray-900 text-white rounded-md px-4 py-1.5 hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
