import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.warn(
    "Sanity configuration warning: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing from environment variables."
  );
}

export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
  apiVersion: "2022-02-01",
  useCdn: true,
  token: token || undefined,
  ignoreBrowserTokenWarning: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export default client;
