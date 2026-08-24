import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanityClient";

function getJoinUsSheetBestLink(links: any, department: string) {
  const departmentSheetBestLinks: Record<string, string | undefined> = {
    competitive_programming: links?.competitiveProgrammingSheetBest,
    design: links?.designSheetBest,
    management: links?.managementSheetBest,
    marketing_and_outreach: links?.marketingOutreachSheetBest,
    projects: links?.projectsSheetBest,
    social_media_and_content: links?.socialMediaContentSheetBest,
    web_development: links?.webDevelopmentSheetBest,
  };

  return departmentSheetBestLinks[department] || links?.joinUsSheetBest;
}

function copyFirstPresent(target: Record<string, any>, source: Record<string, any>, key: string, aliases: string[] = []) {
  const keys = [key, `pref2_${key}`, ...aliases, ...aliases.map((alias) => `pref2_${alias}`)];
  for (const candidate of keys) {
    if (source[candidate] !== undefined && source[candidate] !== null && source[candidate] !== "") {
      target[key] = source[candidate];
      return;
    }
  }
}

function normalizeRecruitmentData(data: Record<string, any>) {
  if (!["design", "management", "marketing_and_outreach"].includes(data.department)) {
    return data;
  }

  const normalized: Record<string, any> = { ...data };

  const commonFields = ["name", "reg_no", "vit_email", "phone_no", "degree", "branch", "experience", "whyJoin", "department", "cgpa"];
  for (const field of commonFields) {
    copyFirstPresent(normalized, data, field);
  }

  if (data.department === "design") {
    copyFirstPresent(normalized, data, "designSkills", ["designSoftware"]);
    copyFirstPresent(normalized, data, "whyDesign");
    copyFirstPresent(normalized, data, "yourWork");
    copyFirstPresent(normalized, data, "designPortfolio");
  } else if (data.department === "management") {
    copyFirstPresent(normalized, data, "hostelerORdayscholar");
    copyFirstPresent(normalized, data, "otherClub");
    copyFirstPresent(normalized, data, "roleInCurrentClub", ["managementExperience"]);
    copyFirstPresent(normalized, data, "handleSituation", ["uncooperativeMember"]);
    copyFirstPresent(normalized, data, "strength", ["managementStrengths"]);
    copyFirstPresent(normalized, data, "effectiveComm", ["managementCommunications"]);
  } else if (data.department === "marketing_and_outreach") {
    copyFirstPresent(normalized, data, "hostelerORdayscholar", ["outreachExperience"]);
    copyFirstPresent(normalized, data, "secureSponsors", ["outreachSponsorship"]);
    copyFirstPresent(normalized, data, "promoteEvent", ["outreachCaptions"]);
    copyFirstPresent(normalized, data, "moreParticipants");
  }

  for (const key of Object.keys(normalized)) {
    if (key.startsWith("pref2_") || normalized[key] === undefined || normalized[key] === null) {
      delete normalized[key];
    }
  }

  return normalized;
}

export async function POST(req: NextRequest) {
  try {
    const { data: rawData } = await req.json();

    if (!rawData || !rawData.department) {
      return NextResponse.json({ error: "Missing submission data or department" }, { status: 400 });
    }

    const data = normalizeRecruitmentData(rawData);

    const query = `*[_type == "recruitmentSheetLinks"] | order(_createdAt desc)[0]`;
    const links = await client.fetch(query);

    if (!links) {
      return NextResponse.json({ error: "No sheet links found in Sanity" }, { status: 404 });
    }

    const joinUsGoogleSheetLink = getJoinUsSheetBestLink(links, data.department);

    if (!joinUsGoogleSheetLink) {
      return NextResponse.json({
        error: "No Sheet.best API link configured for department: " + data.department
      }, { status: 400 });
    }

    const res = await fetch(joinUsGoogleSheetLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Sheet.best post failed:", errorText);
      return NextResponse.json({ error: "Failed to submit data to Sheet.best" }, { status: res.status });
    }

    const resData = await res.json();
    return NextResponse.json(resData);
  } catch (error: any) {
    console.error("Error adding recruitment entry:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
