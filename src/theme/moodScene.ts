import type { MoodPackData } from "../types/mood";

export type MoodSceneId = "calm" | "energetic" | "reflective" | "intense";
export type MoodSceneSelection = "auto" | MoodSceneId;

export interface MoodScenePalette {
  pageGradient: string;
  heroGlow: string;
  cardBackground: string;
  cardBackgroundStrong: string;
  border: string;
  borderStrong: string;
  shadow: string;
  accent: string;
  accentSoft: string;
  accentRgb: string;
  textStrong: string;
  textSoft: string;
  textMuted: string;
  orbPrimary: string;
  orbSecondary: string;
  particleCount: number;
  particleOpacity: string;
  particleBlur: string;
  particleScale: string;
  particleTravelX: string;
  particleTravelY: string;
  particleDuration: number;
}

export interface MoodSceneProfile {
  id: MoodSceneId;
  label: string;
  description: string;
  loadingLabel: string;
  palette: MoodScenePalette;
}

export interface ResolvedMoodScene {
  inferred: MoodSceneId;
  isAuto: boolean;
  profile: MoodSceneProfile;
}

const MOOD_SCENE_PROFILES: Record<MoodSceneId, MoodSceneProfile> = {
  calm: {
    id: "calm",
    label: "Calm & Soft",
    description:
      "A quiet scene with softened highlights, restrained particles, and a cooler cinematic glow.",
    loadingLabel:
      "Calibrating a calm scene with softer highlights and gentle motion...",
    palette: {
      pageGradient:
        "linear-gradient(140deg, #050913 0%, #091320 28%, #0d1c31 62%, #060913 100%)",
      heroGlow:
        "radial-gradient(circle at 50% 35%, rgba(123, 160, 255, 0.26), transparent 60%)",
      cardBackground: "rgba(255, 255, 255, 0.04)",
      cardBackgroundStrong: "rgba(255, 255, 255, 0.06)",
      border: "rgba(255, 255, 255, 0.08)",
      borderStrong: "rgba(255, 255, 255, 0.12)",
      shadow: "0 28px 80px rgba(2, 6, 17, 0.48)",
      accent: "#b7cbff",
      accentSoft: "#7ea8ff",
      accentRgb: "126, 168, 255",
      textStrong: "#f7f9ff",
      textSoft: "rgba(217, 226, 245, 0.78)",
      textMuted: "rgba(217, 226, 245, 0.56)",
      orbPrimary: "rgba(109, 146, 255, 0.24)",
      orbSecondary: "rgba(163, 203, 255, 0.12)",
      particleCount: 6,
      particleOpacity: "0.4",
      particleBlur: "5px",
      particleScale: "0.92",
      particleTravelX: "18px",
      particleTravelY: "-20px",
      particleDuration: 17,
    },
  },
  energetic: {
    id: "energetic",
    label: "Energetic",
    description:
      "A brighter scene with warmer edge lighting, livelier particles, and more active visual emphasis.",
    loadingLabel:
      "Tuning up a brighter scene with faster motion and sharper highlights...",
    palette: {
      pageGradient:
        "linear-gradient(145deg, #12080b 0%, #2a1012 32%, #3f2118 64%, #10090d 100%)",
      heroGlow:
        "radial-gradient(circle at 50% 34%, rgba(255, 186, 92, 0.28), transparent 58%)",
      cardBackground: "rgba(255, 246, 235, 0.05)",
      cardBackgroundStrong: "rgba(255, 246, 235, 0.075)",
      border: "rgba(255, 231, 208, 0.1)",
      borderStrong: "rgba(255, 231, 208, 0.16)",
      shadow: "0 30px 86px rgba(19, 7, 7, 0.5)",
      accent: "#ffd28e",
      accentSoft: "#ff9862",
      accentRgb: "255, 152, 98",
      textStrong: "#fff7f2",
      textSoft: "rgba(255, 231, 218, 0.8)",
      textMuted: "rgba(255, 231, 218, 0.58)",
      orbPrimary: "rgba(255, 176, 108, 0.24)",
      orbSecondary: "rgba(255, 230, 194, 0.12)",
      particleCount: 12,
      particleOpacity: "0.72",
      particleBlur: "4px",
      particleScale: "1.02",
      particleTravelX: "34px",
      particleTravelY: "-26px",
      particleDuration: 10,
    },
  },
  reflective: {
    id: "reflective",
    label: "Reflective",
    description:
      "A darker, inward-looking scene with slower particles, deeper contrast, and more contemplative pacing.",
    loadingLabel:
      "Settling into a reflective scene with slower motion and deeper contrast...",
    palette: {
      pageGradient:
        "linear-gradient(145deg, #050a14 0%, #07182a 34%, #09111d 62%, #04070f 100%)",
      heroGlow:
        "radial-gradient(circle at 50% 36%, rgba(118, 164, 255, 0.18), transparent 62%)",
      cardBackground: "rgba(235, 244, 255, 0.032)",
      cardBackgroundStrong: "rgba(235, 244, 255, 0.05)",
      border: "rgba(216, 233, 255, 0.075)",
      borderStrong: "rgba(216, 233, 255, 0.12)",
      shadow: "0 30px 88px rgba(2, 6, 17, 0.58)",
      accent: "#a9c7ff",
      accentSoft: "#6da3f8",
      accentRgb: "109, 163, 248",
      textStrong: "#edf4ff",
      textSoft: "rgba(211, 225, 250, 0.78)",
      textMuted: "rgba(211, 225, 250, 0.52)",
      orbPrimary: "rgba(84, 119, 188, 0.18)",
      orbSecondary: "rgba(151, 187, 255, 0.09)",
      particleCount: 7,
      particleOpacity: "0.32",
      particleBlur: "7px",
      particleScale: "0.88",
      particleTravelX: "12px",
      particleTravelY: "-16px",
      particleDuration: 21,
    },
  },
  intense: {
    id: "intense",
    label: "Intense",
    description:
      "A focused, high-contrast scene with tighter highlights, bolder accents, and more decisive visual energy.",
    loadingLabel:
      "Locking into an intense scene with stronger contrast and focused motion...",
    palette: {
      pageGradient:
        "linear-gradient(145deg, #07040d 0%, #16091c 28%, #260f1a 58%, #09050b 100%)",
      heroGlow:
        "radial-gradient(circle at 50% 34%, rgba(255, 90, 130, 0.22), transparent 56%)",
      cardBackground: "rgba(250, 236, 246, 0.042)",
      cardBackgroundStrong: "rgba(250, 236, 246, 0.07)",
      border: "rgba(255, 214, 228, 0.095)",
      borderStrong: "rgba(255, 214, 228, 0.15)",
      shadow: "0 32px 92px rgba(12, 4, 10, 0.56)",
      accent: "#ffb2ca",
      accentSoft: "#ff5f86",
      accentRgb: "255, 95, 134",
      textStrong: "#fff7fb",
      textSoft: "rgba(255, 223, 236, 0.8)",
      textMuted: "rgba(255, 223, 236, 0.56)",
      orbPrimary: "rgba(255, 95, 134, 0.18)",
      orbSecondary: "rgba(255, 178, 202, 0.1)",
      particleCount: 10,
      particleOpacity: "0.58",
      particleBlur: "3px",
      particleScale: "1.08",
      particleTravelX: "28px",
      particleTravelY: "-22px",
      particleDuration: 11,
    },
  },
};

export const MOOD_SCENE_OPTIONS = [
  {
    value: "auto",
    label: "Auto from API",
  },
  {
    value: "calm",
    label: "Calm & Soft",
  },
  {
    value: "energetic",
    label: "Energetic",
  },
  {
    value: "reflective",
    label: "Reflective",
  },
  {
    value: "intense",
    label: "Intense",
  },
] as const;

function normalizeText(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function hasKeyword(texts: string[], keywords: string[]) {
  return keywords.some((keyword) =>
    texts.some((text) => text.includes(keyword)),
  );
}

export function inferMoodScene(pack?: MoodPackData | null): MoodSceneId {
  if (!pack) {
    return "calm";
  }

  const mood = pack.mood;
  const weather = pack.weather;
  const music = pack.music ?? [];

  const texts = [
    normalizeText(mood?.key),
    normalizeText(mood?.label),
    normalizeText(mood?.theme),
    normalizeText(pack.summary),
    normalizeText(weather?.main),
    normalizeText(weather?.description),
    ...music.slice(0, 2).flatMap((track) => [
      normalizeText(track.title),
      normalizeText(track.artist),
    ]),
  ].filter(Boolean);

  if (
    hasKeyword(texts, [
      "intense",
      "storm",
      "thunder",
      "dramatic",
      "fierce",
      "pressure",
      "electric",
      "rush",
      "edge",
      "impact",
    ])
  ) {
    return "intense";
  }

  if (
    hasKeyword(texts, [
      "energetic",
      "bright",
      "sun",
      "clear",
      "vibrant",
      "active",
      "upbeat",
      "dance",
      "house",
      "heat",
      "radiant",
    ])
  ) {
    return "energetic";
  }

  if (
    hasKeyword(texts, [
      "reflect",
      "reflective",
      "drizzle",
      "rain",
      "mist",
      "fog",
      "night",
      "shadow",
      "moody",
      "deep",
      "quiet storm",
      "snow",
    ])
  ) {
    return "reflective";
  }

  return "calm";
}

export function resolveMoodScene(
  selection: MoodSceneSelection,
  pack?: MoodPackData | null,
): ResolvedMoodScene {
  const inferred = inferMoodScene(pack);
  const resolvedId = selection === "auto" ? inferred : selection;

  return {
    inferred,
    isAuto: selection === "auto",
    profile: MOOD_SCENE_PROFILES[resolvedId],
  };
}
