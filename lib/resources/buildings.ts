import type { ResourceCategory } from "./types";

export type BuildingKind =
  | "learning-center"
  | "clock-tower"
  | "cafe-cabin"
  | "bookshop"
  | "writing-workshop"
  | "language-lab"
  | "office"
  | "academy-castle"
  | "international-academy"
  | "inventor-workshop";

export type BuildingTheme = {
  kind: BuildingKind;
  wall: string;
  roof: string;
  accent: string;
};

const kinds: Record<ResourceCategory, BuildingKind> = {
  general: "learning-center",
  listening: "clock-tower",
  speaking: "cafe-cabin",
  reading: "bookshop",
  writing: "writing-workshop",
  "vocabulary-grammar": "language-lab",
  business: "office",
  ielts: "academy-castle",
  toefl: "international-academy",
  "github-skills": "inventor-workshop",
};

const palettes = [
  { wall: "#f5d6a1", roof: "#b9553f", accent: "#ffcf65" },
  { wall: "#cfe4dd", roof: "#286b63", accent: "#f39a62" },
  { wall: "#d9d2ee", roof: "#68558f", accent: "#ffd46b" },
] as const;

export function buildingThemeFor(
  category: ResourceCategory | string,
  seed = "",
): BuildingTheme {
  const score = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return {
    kind: kinds[category as ResourceCategory] ?? "learning-center",
    ...palettes[score % palettes.length],
  };
}
