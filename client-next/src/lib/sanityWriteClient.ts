import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.warn(
    "Sanity configuration warning: SANITY_WRITE_TOKEN is missing. Admin writes will fail."
  );
}

export const writeClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
  apiVersion: "2022-02-01",
  useCdn: false,
  token,
  ignoreBrowserTokenWarning: true,
});

export default writeClient;
