import type { MoodPackData } from "../types/mood";
import type { MoodSceneId, MoodSceneSelection } from "./moodScene";
import { MOOD_THEMES, type MoodThemeDefinition, type MoodThemeId } from "./moodThemes";

const DEFAULT_THEME_ID: MoodThemeId = "default-nocturne";
const SCENE_THEME_MAP: Record<MoodSceneId, MoodThemeId> = {
  calm: "calm-soft",
  energetic: "sunny-gold",
  reflective: "reflective-blue",
  intense: "midnight-velvet",
};

function normalize(value?: string) {
  return value?.trim().toLowerCase().replace(/[_\s]+/g, "-") ?? "";
}

function matchThemeByAlias(themeName?: string) {
  const normalized = normalize(themeName);

  if (!normalized) {
    return null;
  }

  return (
    Object.values(MOOD_THEMES).find((theme) =>
      theme.aliases.some((alias) => normalize(alias) === normalized),
    ) ?? null
  );
}

function hasKeyword(texts: string[], keywords: string[]) {
  return keywords.some((keyword) =>
    texts.some((text) => text.includes(keyword)),
  );
}

function inferThemeFromPack(pack?: MoodPackData | null): MoodThemeDefinition {
  if (!pack) {
    return MOOD_THEMES[DEFAULT_THEME_ID];
  }

  const mood = pack.mood;
  const weather = pack.weather;

  const texts = [
    normalize(mood?.theme),
    normalize(mood?.key),
    normalize(mood?.label),
    normalize(weather?.main),
    normalize(weather?.description),
    normalize(pack.summary),
  ].filter(Boolean);

  if (
    hasKeyword(texts, [
      "storm",
      "intense",
      "thunder",
      "electric",
      "dramatic",
      "midnight",
      "velvet",
    ])
  ) {
    return MOOD_THEMES["midnight-velvet"];
  }

  if (
    hasKeyword(texts, [
      "rain",
      "drizzle",
      "shower",
      "wet",
      "indigo",
      "downpour",
    ])
  ) {
    return MOOD_THEMES["rainy-indigo"];
  }

  if (
    hasKeyword(texts, [
      "reflective",
      "reflect",
      "deep",
      "inward",
      "blue",
      "contemplative",
    ])
  ) {
    return MOOD_THEMES["reflective-blue"];
  }

  if (
    hasKeyword(texts, [
      "energetic",
      "sun",
      "sunny",
      "warm",
      "bright",
      "gold",
      "heat",
      "clear",
    ])
  ) {
    return MOOD_THEMES["sunny-gold"];
  }

  if (
    hasKeyword(texts, [
      "calm",
      "soft",
      "gentle",
      "quiet",
      "chill",
      "balanced",
    ])
  ) {
    return MOOD_THEMES["calm-soft"];
  }

  if (
    hasKeyword(texts, [
      "cloud",
      "cloudy",
      "mist",
      "overcast",
      "silver",
      "haze",
    ])
  ) {
    return MOOD_THEMES["cloudy-silver"];
  }

  return MOOD_THEMES[DEFAULT_THEME_ID];
}

export function resolveMoodTheme(
  pack?: MoodPackData | null,
  selection: MoodSceneSelection = "auto",
) {
  if (selection !== "auto") {
    return MOOD_THEMES[SCENE_THEME_MAP[selection]];
  }

  return matchThemeByAlias(pack?.mood?.theme) ?? inferThemeFromPack(pack);
}
