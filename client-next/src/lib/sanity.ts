import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2e6x5erf",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2022-02-01",
  useCdn: false, // Set to false to bypass CDN cache for fresher data
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export function urlFor(source: any): string {
  if (!source) return "";

  // If it's already a string URL
  if (typeof source === "string") return source;

  // If it has an asset with a direct url
  if (source.asset && typeof source.asset.url === "string") {
    return source.asset.url;
  }

  // Parse Sanity image reference ID (e.g. image-tb4ndtilesx5v-2000x3000-jpg)
  const ref = source.asset?._ref || source._ref;
  if (!ref) return "";

  const parts = ref.split("-");
  if (parts.length < 4) return "";

  const id = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2e6x5erf";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
}

export function getBlockText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}
