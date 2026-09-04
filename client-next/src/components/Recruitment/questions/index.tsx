import React from "react";

interface QuestionProps {
  register: any;
  errors: any;
  watch?: any;
}

const inputClass = "mt-1.5 block w-full px-3 py-2 border-2 border-black rounded-[8px] bg-white text-black font-sans placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-[3px_3px_0px_rgba(0,0,0,1)]";
const labelClass = "text-sm font-bold text-black flex items-center mt-4 font-sans uppercase tracking-wider";
const errorClass = "text-red-600 text-xs font-semibold mt-1 font-sans";
const selectClass = "mt-1.5 block w-full px-3 py-2 border-2 border-black rounded-[8px] bg-white text-black font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-[3px_3px_0px_rgba(0,0,0,1)]";

const RequiredStar = () => <span className="text-red-600 ml-1 text-sm">*</span>;

{/* Tough Competitive Programming Questions */}
export const CompetitiveProgramming: React.FC<QuestionProps> = ({ register, errors }) => {
  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="cpProfile">
          CP profile link (Codechef/Leetcode): <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="cpProfile"
          placeholder="www.codechef.com/users/your-profile"
          {...register("cpProfile", {
            required: "Profile link is required",
            pattern: {
              value: /(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s,]*)|((?:www\.)[^\s/$.?#].[^\s,]*)/gi,
              message: "Invalid profile link",
            },
          })}
        />
        {errors.cpProfile && <div className={errorClass}>{errors.cpProfile.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="linkedin">
          Linkedin URL: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="linkedin"
          placeholder="https://www.linkedin.com/in/your-profile"
          {...register("linkedin", {
            required: "LinkedIn link is required",
            pattern: {
              value: /^(https?:\/\/)?((www|\w{2})\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
              message: "Invalid LinkedIn URL (should be like linkedin.com/in/username)",
            },
          })}
        />
        {errors.linkedin && <div className={errorClass}>{errors.linkedin.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="whyCp">
          Why do you want to take up competitive programming? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="whyCp"
          rows={4}
          placeholder="Why CP? What's your take on DSA vs Development?"
          {...register("whyCp", { required: "This field is required" })}
        />
        {errors.whyCp && <div className={errorClass}>{errors.whyCp.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="cpExperience">
          Any prior experience/achievements in competitive programming? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="cpExperience"
          rows={4}
          placeholder="Tell us about your previous experience in competitive programming"
          {...register("cpExperience", { required: "This field is required" })}
        />
        {errors.cpExperience && <div className={errorClass}>{errors.cpExperience.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="weeklyContests">
          Will you be up for solving contests every week & participating in post-contest discussions? <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="weeklyContests"
          {...register("weeklyContests", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.weeklyContests && <div className={errorClass}>{errors.weeklyContests.message}</div>}
      </div>
    </>
  );
};

{/* Tough Projects Department Questions */}
export const Projects: React.FC<QuestionProps> = ({ register, errors }) => {
  const hackathonOptions = [
    { value: "hack4health", label: "Hack4Health" },
    { value: "genai", label: "GenAI" },
    { value: "sih", label: "SIH (Smart India Hackathon)" },
    { value: "hackathrone", label: "Hackathrone" },
  ];

  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="github">
          GitHub Profile Link: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="github"
          placeholder="https://github.com/YourProfile"
          {...register("github", {
            required: "GitHub profile link is required",
            pattern: {
              value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
              message: "Invalid GitHub Profile URL (should be like github.com/username)",
            },
          })}
        />
        {errors.github && <div className={errorClass}>{errors.github.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="linkedin">
          LinkedIn Profile Link: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="linkedin"
          placeholder="https://www.linkedin.com/in/your-profile/"
          {...register("linkedin", {
            required: "LinkedIn profile link is required",
            pattern: {
              value: /^(https?:\/\/)?((www|\w{2})\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
              message: "Invalid LinkedIn URL (should be like linkedin.com/in/username)",
            },
          })}
        />
        {errors.linkedin && <div className={errorClass}>{errors.linkedin.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="resume">
          Resume Link (Google Drive/Dropbox - Enable Public Access): <span className="text-gray-500 font-normal lowercase ml-1">(Optional)</span>
        </label>
        <input
          className={inputClass}
          type="url"
          id="resume"
          placeholder="https://drive.google.com/..."
          {...register("resume")}
        />
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="whyProjects">
          Why do you want to join Projects Dept? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="whyProjects"
          rows={3}
          {...register("whyProjects", { required: "This field is required" })}
        />
        {errors.whyProjects && <div className={errorClass}>{errors.whyProjects.message}</div>}
      </div>

      <div className="w-full px-2 mt-6 mb-2">
        <h3 className="text-md font-bold text-black border-b-2 border-black pb-1 uppercase tracking-wider font-sans">
          Hackathon Problem Statement Selection 1
        </h3>
        <p className="text-xs text-gray-700 mt-1.5 leading-relaxed font-sans">
          Refer to the post here:{" "}
          <a
            href="https://www.linkedin.com/posts/codechef-vit-chennai-chapter_codechef-vitcc-activity-7410633157290688515-gsF7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            LinkedIn Hackathon Post
          </a>
          <br />
          From the hackathon statements posted, choose min 1 and max 2 of your choice and answer the questions below.
        </p>
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Select Problem Statement 1: <RequiredStar />
        </label>
        <select
          className={selectClass}
          {...register("hackathon1_select", { required: "Please select a problem statement" })}
        >
          <option value="">Select an option</option>
          {hackathonOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.hackathon1_select && <div className={errorClass}>{errors.hackathon1_select.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Explain how you would have contributed to the solution: <RequiredStar />
          <span className="text-xs text-gray-500 font-normal lowercase block ml-1">
            (Highlight: Technical responsibilities, components, value addition)
          </span>
        </label>
        <textarea
          className={inputClass}
          rows={3}
          {...register("hackathon1_contribution", { required: "This field is required" })}
        />
        {errors.hackathon1_contribution && <div className={errorClass}>{errors.hackathon1_contribution.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Propose a unique and improved approach compared to existing solutions: <RequiredStar />
          <span className="text-xs text-gray-500 font-normal lowercase block ml-1">
            (Explain: Unique approach, tech stack, challenges)
          </span>
        </label>
        <textarea
          className={inputClass}
          rows={3}
          {...register("hackathon1_proposal", { required: "This field is required" })}
        />
        {errors.hackathon1_proposal && <div className={errorClass}>{errors.hackathon1_proposal.message}</div>}
      </div>

      <div className="w-full px-2 mt-6 mb-2">
        <h3 className="text-md font-bold text-black border-b-2 border-black pb-1 uppercase tracking-wider font-sans">
          Hackathon Problem Statement Selection 2 (Optional)
        </h3>
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Select Problem Statement 2:
        </label>
        <select className={selectClass} {...register("hackathon2_select")}>
          <option value="">Select an option (Optional)</option>
          {hackathonOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Explain how you would have contributed to the solution:
        </label>
        <textarea
          className={inputClass}
          rows={3}
          {...register("hackathon2_contribution")}
        />
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass}>
          Propose a unique and improved approach:
        </label>
        <textarea
          className={inputClass}
          rows={3}
          {...register("hackathon2_proposal")}
        />
      </div>
    </>
  );
};

{/* Tough Web Development Department Questions */}
export const WebDevelopment: React.FC<QuestionProps> = ({ register, errors, watch }) => {
  const webDevCourse = watch ? watch("webDevCourse") : "";

  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="github">
          GitHub Profile Link: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="github"
          placeholder="https://github.com/YourProfile"
          {...register("github", {
            required: "GitHub profile link is required",
            pattern: {
              value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
              message: "Invalid GitHub Profile URL (should be like github.com/username)",
            },
          })}
        />
        {errors.github && <div className={errorClass}>{errors.github.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="linkedin">
          LinkedIn Profile Link: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="linkedin"
          placeholder="https://www.linkedin.com/in/your-profile"
          {...register("linkedin", {
            required: "LinkedIn profile link is required",
            pattern: {
              value: /^(https?:\/\/)?((www|\w{2})\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
              message: "Invalid LinkedIn URL (should be like linkedin.com/in/username)",
            },
          })}
        />
        {errors.linkedin && <div className={errorClass}>{errors.linkedin.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="techStack">
          Web Dev Technologies you know: <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="techStack"
          rows={2}
          placeholder="Example: HTML, CSS, JS, React.js, Next.js, Node.js, etc."
          {...register("techStack", { required: "This field is required" })}
        />
        {errors.techStack && <div className={errorClass}>{errors.techStack.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="webDevCourse">
          Have you completed or are you doing any course on Web Dev? <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="webDevCourse"
          {...register("webDevCourse", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.webDevCourse && <div className={errorClass}>{errors.webDevCourse.message}</div>}
      </div>

      {webDevCourse === "Yes" && (
        <div className="mb-4 w-full px-2">
          <label className={labelClass} htmlFor="whichCourse">
            Which course are you doing? <RequiredStar />
          </label>
          <textarea
            className={inputClass}
            id="whichCourse"
            rows={3}
            placeholder="Course name, topics, and link to completed projects."
            {...register("whichCourse", { required: "This field is required" })}
          />
          {errors.whichCourse && <div className={errorClass}>{errors.whichCourse.message}</div>}
        </div>
      )}
    </>
  );
};

{/* Tough Design Department Questions */}
export const Design: React.FC<QuestionProps> = ({ register, errors }) => {
  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="designSkills">
          What tools and software are you familiar with? <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="designSkills"
          placeholder="Figma, Canva, Photoshop, Illustrator, Premiere Pro, etc."
          {...register("designSkills", { required: "This field is required" })}
        />
        {errors.designSkills && <div className={errorClass}>{errors.designSkills.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="whyDesign">
          Why are you interested in joining our design department? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="whyDesign"
          rows={3}
          placeholder="Tell us your reasons to join the design department"
          {...register("whyDesign", { required: "This field is required" })}
        />
        {errors.whyDesign && <div className={errorClass}>{errors.whyDesign.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="yourWork">
          Is there anything else you would like us to know about your work? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="yourWork"
          rows={3}
          placeholder="Share details of your work, Drive, or Canva links"
          {...register("yourWork", { required: "This field is required" })}
        />
        {errors.yourWork && <div className={errorClass}>{errors.yourWork.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="designPortfolio">
          Please provide a link to your portfolio or previous work: <RequiredStar />
        </label>
        <input
          className={inputClass}
          type="text"
          id="designPortfolio"
          placeholder="https://www.behance.net/your-portfolio"
          {...register("designPortfolio", {
            required: "Portfolio link is required",
            pattern: {
              value: /(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s,]*)|((?:www\.)[^\s/$.?#].[^\s,]*)/gi,
              message: "Invalid portfolio link",
            },
          })}
        />
        {errors.designPortfolio && <div className={errorClass}>{errors.designPortfolio.message}</div>}
      </div>
    </>
  );
};

{/* Tough Management Department Questions */}
export const Management: React.FC<QuestionProps> = ({ register, errors, watch }) => {
  const otherClub = watch ? watch("otherClub") : "";

  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="hostelerORdayscholar">
          Hosteler / Day Scholar: <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="hostelerORdayscholar"
          {...register("hostelerORdayscholar", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Hosteler">Hosteler</option>
          <option value="Day Scholar">Day Scholar</option>
        </select>
        {errors.hostelerORdayscholar && <div className={errorClass}>{errors.hostelerORdayscholar.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="otherClub">
          Are you a part of any other club? <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="otherClub"
          {...register("otherClub", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.otherClub && <div className={errorClass}>{errors.otherClub.message}</div>}
      </div>

      {otherClub === "Yes" && (
        <div className="mb-4 w-full px-2">
          <label className={labelClass} htmlFor="roleInCurrentClub">
            Describe your current role in the club in a concise manner: <RequiredStar />
          </label>
          <textarea
            className={inputClass}
            id="roleInCurrentClub"
            rows={3}
            placeholder="List down your role in the current club"
            {...register("roleInCurrentClub", { required: "This field is required" })}
          />
          {errors.roleInCurrentClub && <div className={errorClass}>{errors.roleInCurrentClub.message}</div>}
        </div>
      )}

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="handleSituation">
          How would you manage a situation with uncooperative team members? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="handleSituation"
          rows={3}
          placeholder="List down the ways which you would follow to handle this situation"
          {...register("handleSituation", { required: "This field is required" })}
        />
        {errors.handleSituation && <div className={errorClass}>{errors.handleSituation.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="strength">
          List your strength & weakness: <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="strength"
          rows={3}
          placeholder="List your strength and weakness, and explain how they impact your work."
          {...register("strength", { required: "This field is required" })}
        />
        {errors.strength && <div className={errorClass}>{errors.strength.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="effectiveComm">
          How would you effectively manage communication with participants until the event is conducted? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="effectiveComm"
          rows={3}
          placeholder="Tell us your thoughts on effective delivery of information"
          {...register("effectiveComm", { required: "This field is required" })}
        />
        {errors.effectiveComm && <div className={errorClass}>{errors.effectiveComm.message}</div>}
      </div>
    </>
  );
};

{/* Tough Marketing & Outreach Department Questions */}
export const MarketingOutreach: React.FC<QuestionProps> = ({ register, errors }) => {
  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="hostelerORdayscholar">
          Hosteler / Day Scholar: <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="hostelerORdayscholar"
          {...register("hostelerORdayscholar", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Hosteler">Hosteler</option>
          <option value="Day Scholar">Day Scholar</option>
        </select>
        {errors.hostelerORdayscholar && <div className={errorClass}>{errors.hostelerORdayscholar.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="secureSponsors">
          How will you secure sponsors for the event? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="secureSponsors"
          rows={3}
          placeholder="Give us an idea about how you will get us sponsors for the event"
          {...register("secureSponsors", { required: "This field is required" })}
        />
        {errors.secureSponsors && <div className={errorClass}>{errors.secureSponsors.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="promoteEvent">
          Promote our Code-a-thon event to students from all years in college: <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="promoteEvent"
          rows={3}
          placeholder="Give us the marketing pitch and captions for this event"
          {...register("promoteEvent", { required: "This field is required" })}
        />
        {errors.promoteEvent && <div className={errorClass}>{errors.promoteEvent.message}</div>}
      </div>

      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="moreParticipants">
          How will you attract more participants for an event scheduled in 2 days? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="moreParticipants"
          rows={3}
          placeholder="List down the steps you would follow to bring more participants"
          {...register("moreParticipants", { required: "This field is required" })}
        />
        {errors.moreParticipants && <div className={errorClass}>{errors.moreParticipants.message}</div>}
      </div>
    </>
  );
};

{/* Tough Social Media Department Questions */}
export const SocialMedia: React.FC<QuestionProps> = ({ register, errors, watch }) => {
  const pod = watch ? watch("pod") : "";

  return (
    <>
      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="pod">
          Which pod do you want to join? <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="pod"
          {...register("pod", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Video_Editor">Video Editor</option>
          <option value="PR">PR</option>
          <option value="Content_Writer">Content Writer</option>
        </select>
        {errors.pod && <div className={errorClass}>{errors.pod.message}</div>}
      </div>

      {pod === "Content_Writer" && (
        <div className="mb-4 w-full md:w-1/2 px-2">
          <label className={labelClass} htmlFor="niche">
            Which niche do you prefer? <RequiredStar />
          </label>
          <select
            className={selectClass}
            id="niche"
            {...register("niche", { required: "This field is required" })}
          >
            <option value="">Select One Option</option>
            <option value="MEMES">Memes</option>
            <option value="POSTS">Posts</option>
            <option value="NEWS_LETTER">Newsletter</option>
          </select>
          {errors.niche && <div className={errorClass}>{errors.niche.message}</div>}
        </div>
      )}

      {pod === "Video_Editor" && (
        <div className="mb-4 w-full px-2">
          <label className={labelClass} htmlFor="softwareForVideoEditing">
            Which software do you use for video editing? <RequiredStar />
          </label>
          <textarea
            className={inputClass}
            id="softwareForVideoEditing"
            rows={2}
            placeholder="List down the softwares you are proficient in"
            {...register("softwareForVideoEditing", { required: "This field is required" })}
          />
          {errors.softwareForVideoEditing && <div className={errorClass}>{errors.softwareForVideoEditing.message}</div>}
        </div>
      )}
    </>
  );
};

{/* Tough Finance Department Questions */}
export const Finance: React.FC<QuestionProps> = ({ register, errors, watch }) => {
  const excel = watch ? watch("excel") : "";

  return (
    <>
      <div className="mb-4 w-full px-2">
        <label className={labelClass} htmlFor="whyFinance">
          Why Finance Department? <RequiredStar />
        </label>
        <textarea
          className={inputClass}
          id="whyFinance"
          rows={3}
          placeholder="Tell us your reasons to join the finance department"
          {...register("whyFinance", { required: "This field is required" })}
        />
        {errors.whyFinance && <div className={errorClass}>{errors.whyFinance.message}</div>}
      </div>

      <div className="mb-4 w-full md:w-1/2 px-2">
        <label className={labelClass} htmlFor="excel">
          Do you have knowledge regarding MS Excel? <RequiredStar />
        </label>
        <select
          className={selectClass}
          id="excel"
          {...register("excel", { required: "This field is required" })}
        >
          <option value="">Select One Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.excel && <div className={errorClass}>{errors.excel.message}</div>}
      </div>

      {excel === "Yes" && (
        <div className="mb-4 w-full px-2">
          <label className={labelClass} htmlFor="financialAwareness">
            Are you aware of financial techniques and tools? <RequiredStar />
          </label>
          <textarea
            className={inputClass}
            id="financialAwareness"
            rows={3}
            placeholder="Showcase your knowledge regarding financial techniques and tools"
            {...register("financialAwareness", { required: "This field is required" })}
          />
          {errors.financialAwareness && <div className={errorClass}>{errors.financialAwareness.message}</div>}
        </div>
      )}
    </>
  );
};
