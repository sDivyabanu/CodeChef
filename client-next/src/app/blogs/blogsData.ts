export interface BlogPost {
  id: string;
  category: string;
  title: string;
  date: string;
  about: string;
  content: string;
  icon: "terminal" | "cpu";
  imageUrl?: string;
}

// Helper function to convert Sanity Portable Text to plain text
export function portableTextToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .filter((text) => text.trim() !== "")
    .join("\n\n");
}

// Helper
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

