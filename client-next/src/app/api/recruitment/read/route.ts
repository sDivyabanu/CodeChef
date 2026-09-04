import { NextResponse } from "next/server";
import { client } from "@/lib/sanityClient";

function getAllJoinUsSheetBestLinks(links: any) {
  const sheetLinks = [
    links?.competitiveProgrammingSheetBest,
    links?.designSheetBest,
    links?.managementSheetBest,
    links?.marketingOutreachSheetBest,
    links?.projectsSheetBest,
    links?.socialMediaContentSheetBest,
    links?.webDevelopmentSheetBest,
  ];

  if (!sheetLinks.some(Boolean) && links?.joinUsSheetBest) {
    sheetLinks.push(links.joinUsSheetBest);
  }

  return [...new Set(sheetLinks.filter(Boolean))];
}

export async function GET() {
  try {
    const query = `*[_type == "recruitmentSheetLinks"] | order(_createdAt desc)[0]`;
    const links = await client.fetch(query);

    if (!links) {
      return NextResponse.json({ error: "No sheet links found in Sanity" }, { status: 404 });
    }

    const departmentUrls = [
      { department: "competitive_programming", url: links?.competitiveProgrammingSheetBest },
      { department: "design", url: links?.designSheetBest },
      { department: "management", url: links?.managementSheetBest },
      { department: "marketing_and_outreach", url: links?.marketingOutreachSheetBest },
      { department: "projects", url: links?.projectsSheetBest },
      { department: "social_media_and_content", url: links?.socialMediaContentSheetBest },
      { department: "web_development", url: links?.webDevelopmentSheetBest },
    ].filter(item => Boolean(item.url));

    if (!departmentUrls.length && links?.joinUsSheetBest) {
      departmentUrls.push({ department: "general", url: links.joinUsSheetBest });
    }

    if (!departmentUrls.length) {
      return NextResponse.json([]);
    }

    const sheetData = await Promise.all(
      departmentUrls.map(async (item) => {
        try {
          const res = await fetch(item.url!);
          if (!res.ok) {
            console.error(`Failed to fetch from ${item.url}:`, res.statusText);
            return [];
          }
          const rows = await res.json();
          if (Array.isArray(rows)) {
            return rows.map((row: any) => ({
              ...row,
              _sheetDepartment: item.department
            }));
          }
          return [];
        } catch (err) {
          console.error(`Error fetching sheet ${item.url}:`, err);
          return [];
        }
      })
    );

    return NextResponse.json(sheetData.flat());
  } catch (error: any) {
    console.error("Error reading recruitment data:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
