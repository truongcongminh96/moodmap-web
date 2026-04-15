export type MoodThemeId =
  | "default-nocturne"
  | "cloudy-silver"
  | "sunny-gold"
  | "rainy-indigo"
  | "midnight-velvet"
  | "calm-soft"
  | "reflective-blue";

export interface MoodThemeTokens {
  pageGradient: string;
  ambientPrimary: string;
  ambientSecondary: string;
  ambientTertiary: string;
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
  glassReflection: string;
  heroReflection: string;
  quickCardTint: string;
  overviewCardTint: string;
  quoteCardTint: string;
  weatherCardTint: string;
  musicCardTint: string;
  activitiesCardTint: string;
  footerCardTint: string;
  tileTint: string;
  tileTintStrong: string;
  tagBackground: string;
  tagBorder: string;
  iconBackground: string;
  iconBackgroundStrong: string;
  buttonShadow: string;
  buttonShadowHover: string;
  skeletonBase: string;
  skeletonHighlight: string;
}

export interface MoodThemeDefinition {
  id: MoodThemeId;
  label: string;
  aliases: string[];
  tokens: MoodThemeTokens;
}

export const MOOD_THEMES: Record<MoodThemeId, MoodThemeDefinition> = {
  "default-nocturne": {
    id: "default-nocturne",
    label: "Nocturne",
    aliases: ["default", "nocturne", "night"],
    tokens: {
      pageGradient:
        "linear-gradient(140deg, #050913 0%, #08111d 30%, #0b1730 62%, #060913 100%)",
      ambientPrimary:
        "radial-gradient(circle at 16% 18%, rgba(112, 147, 255, 0.22), transparent 30%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 10%, rgba(184, 214, 255, 0.1), transparent 24%)",
      ambientTertiary:
        "radial-gradient(circle at 50% 120%, rgba(91, 123, 212, 0.16), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 35%, rgba(123, 160, 255, 0.28), transparent 60%)",
      cardBackground: "rgba(255, 255, 255, 0.038)",
      cardBackgroundStrong: "rgba(255, 255, 255, 0.062)",
      border: "rgba(255, 255, 255, 0.09)",
      borderStrong: "rgba(255, 255, 255, 0.14)",
      shadow: "0 30px 88px rgba(2, 6, 17, 0.54)",
      accent: "#b9cbff",
      accentSoft: "#7ea8ff",
      accentRgb: "126, 168, 255",
      textStrong: "#f7f9ff",
      textSoft: "rgba(217, 226, 245, 0.8)",
      textMuted: "rgba(217, 226, 245, 0.56)",
      orbPrimary: "rgba(109, 146, 255, 0.24)",
      orbSecondary: "rgba(163, 203, 255, 0.12)",
      glassReflection: "rgba(255, 255, 255, 0.12)",
      heroReflection: "rgba(187, 208, 255, 0.12)",
      quickCardTint: "rgba(126, 168, 255, 0.08)",
      overviewCardTint: "rgba(134, 177, 255, 0.1)",
      quoteCardTint: "rgba(171, 200, 255, 0.08)",
      weatherCardTint: "rgba(126, 168, 255, 0.1)",
      musicCardTint: "rgba(143, 184, 255, 0.085)",
      activitiesCardTint: "rgba(117, 156, 231, 0.08)",
      footerCardTint: "rgba(92, 120, 188, 0.08)",
      tileTint: "rgba(255, 255, 255, 0.04)",
      tileTintStrong: "rgba(126, 168, 255, 0.12)",
      tagBackground: "rgba(255, 255, 255, 0.05)",
      tagBorder: "rgba(255, 255, 255, 0.08)",
      iconBackground: "rgba(126, 168, 255, 0.14)",
      iconBackgroundStrong: "rgba(126, 168, 255, 0.2)",
      buttonShadow: "0 18px 42px rgba(18, 26, 54, 0.36)",
      buttonShadowHover: "0 22px 52px rgba(18, 26, 54, 0.42)",
      skeletonBase: "rgba(255, 255, 255, 0.05)",
      skeletonHighlight: "rgba(255, 255, 255, 0.12)",
    },
  },
  "cloudy-silver": {
    id: "cloudy-silver",
    label: "Cloudy Silver",
    aliases: ["cloudy-silver", "cloudy silver", "mist", "misty", "clouds"],
    tokens: {
      pageGradient:
        "linear-gradient(140deg, #050913 0%, #0a1320 28%, #101c2f 60%, #070b13 100%)",
      ambientPrimary:
        "radial-gradient(circle at 20% 18%, rgba(188, 212, 255, 0.18), transparent 30%)",
      ambientSecondary:
        "radial-gradient(circle at 78% 8%, rgba(255, 255, 255, 0.1), transparent 20%)",
      ambientTertiary:
        "radial-gradient(circle at 50% 120%, rgba(120, 150, 205, 0.16), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 35%, rgba(170, 202, 255, 0.24), transparent 60%)",
      cardBackground: "rgba(246, 250, 255, 0.036)",
      cardBackgroundStrong: "rgba(246, 250, 255, 0.06)",
      border: "rgba(232, 240, 255, 0.088)",
      borderStrong: "rgba(232, 240, 255, 0.14)",
      shadow: "0 30px 88px rgba(2, 6, 17, 0.5)",
      accent: "#d9e7ff",
      accentSoft: "#9cb8ef",
      accentRgb: "156, 184, 239",
      textStrong: "#f7fbff",
      textSoft: "rgba(227, 235, 250, 0.8)",
      textMuted: "rgba(227, 235, 250, 0.56)",
      orbPrimary: "rgba(155, 188, 255, 0.18)",
      orbSecondary: "rgba(219, 233, 255, 0.11)",
      glassReflection: "rgba(255, 255, 255, 0.14)",
      heroReflection: "rgba(222, 235, 255, 0.12)",
      quickCardTint: "rgba(218, 231, 255, 0.08)",
      overviewCardTint: "rgba(184, 208, 255, 0.09)",
      quoteCardTint: "rgba(230, 239, 255, 0.08)",
      weatherCardTint: "rgba(171, 194, 235, 0.095)",
      musicCardTint: "rgba(186, 208, 244, 0.08)",
      activitiesCardTint: "rgba(161, 181, 221, 0.08)",
      footerCardTint: "rgba(138, 160, 195, 0.08)",
      tileTint: "rgba(255, 255, 255, 0.045)",
      tileTintStrong: "rgba(184, 208, 255, 0.11)",
      tagBackground: "rgba(248, 251, 255, 0.055)",
      tagBorder: "rgba(232, 240, 255, 0.08)",
      iconBackground: "rgba(186, 208, 244, 0.16)",
      iconBackgroundStrong: "rgba(186, 208, 244, 0.22)",
      buttonShadow: "0 18px 42px rgba(26, 34, 55, 0.32)",
      buttonShadowHover: "0 22px 52px rgba(26, 34, 55, 0.38)",
      skeletonBase: "rgba(255, 255, 255, 0.045)",
      skeletonHighlight: "rgba(255, 255, 255, 0.11)",
    },
  },
  "sunny-gold": {
    id: "sunny-gold",
    label: "Sunny Gold",
    aliases: ["sunny-gold", "sunny gold", "sunny", "gold", "warm", "bright"],
    tokens: {
      pageGradient:
        "linear-gradient(145deg, #12080b 0%, #1d1110 26%, #342116 58%, #10090d 100%)",
      ambientPrimary:
        "radial-gradient(circle at 18% 18%, rgba(255, 193, 107, 0.24), transparent 30%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 10%, rgba(255, 241, 205, 0.12), transparent 22%)",
      ambientTertiary:
        "radial-gradient(circle at 54% 120%, rgba(255, 149, 92, 0.18), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 34%, rgba(255, 197, 110, 0.28), transparent 58%)",
      cardBackground: "rgba(255, 244, 230, 0.045)",
      cardBackgroundStrong: "rgba(255, 244, 230, 0.072)",
      border: "rgba(255, 230, 198, 0.1)",
      borderStrong: "rgba(255, 230, 198, 0.16)",
      shadow: "0 30px 90px rgba(22, 8, 6, 0.48)",
      accent: "#ffd694",
      accentSoft: "#ff9d61",
      accentRgb: "255, 157, 97",
      textStrong: "#fff8f2",
      textSoft: "rgba(255, 232, 214, 0.8)",
      textMuted: "rgba(255, 232, 214, 0.56)",
      orbPrimary: "rgba(255, 183, 95, 0.22)",
      orbSecondary: "rgba(255, 228, 184, 0.12)",
      glassReflection: "rgba(255, 250, 242, 0.14)",
      heroReflection: "rgba(255, 232, 196, 0.13)",
      quickCardTint: "rgba(255, 206, 136, 0.08)",
      overviewCardTint: "rgba(255, 180, 108, 0.1)",
      quoteCardTint: "rgba(255, 225, 186, 0.085)",
      weatherCardTint: "rgba(255, 176, 107, 0.1)",
      musicCardTint: "rgba(255, 161, 96, 0.09)",
      activitiesCardTint: "rgba(255, 187, 118, 0.08)",
      footerCardTint: "rgba(235, 145, 88, 0.08)",
      tileTint: "rgba(255, 246, 235, 0.05)",
      tileTintStrong: "rgba(255, 176, 107, 0.12)",
      tagBackground: "rgba(255, 246, 235, 0.055)",
      tagBorder: "rgba(255, 227, 198, 0.09)",
      iconBackground: "rgba(255, 176, 107, 0.16)",
      iconBackgroundStrong: "rgba(255, 176, 107, 0.22)",
      buttonShadow: "0 18px 42px rgba(56, 24, 10, 0.34)",
      buttonShadowHover: "0 22px 52px rgba(56, 24, 10, 0.4)",
      skeletonBase: "rgba(255, 244, 230, 0.05)",
      skeletonHighlight: "rgba(255, 251, 244, 0.12)",
    },
  },
  "rainy-indigo": {
    id: "rainy-indigo",
    label: "Rainy Indigo",
    aliases: ["rainy-indigo", "rainy indigo", "rain", "rainy", "indigo", "wet"],
    tokens: {
      pageGradient:
        "linear-gradient(145deg, #040914 0%, #081326 26%, #0a1b3a 60%, #050911 100%)",
      ambientPrimary:
        "radial-gradient(circle at 20% 18%, rgba(110, 137, 255, 0.22), transparent 30%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 8%, rgba(184, 203, 255, 0.1), transparent 22%)",
      ambientTertiary:
        "radial-gradient(circle at 48% 120%, rgba(80, 109, 193, 0.18), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 35%, rgba(120, 146, 255, 0.24), transparent 60%)",
      cardBackground: "rgba(236, 242, 255, 0.034)",
      cardBackgroundStrong: "rgba(236, 242, 255, 0.056)",
      border: "rgba(215, 228, 255, 0.082)",
      borderStrong: "rgba(215, 228, 255, 0.13)",
      shadow: "0 30px 90px rgba(2, 6, 17, 0.56)",
      accent: "#b6c9ff",
      accentSoft: "#6d8af5",
      accentRgb: "109, 138, 245",
      textStrong: "#eff5ff",
      textSoft: "rgba(214, 226, 250, 0.8)",
      textMuted: "rgba(214, 226, 250, 0.54)",
      orbPrimary: "rgba(90, 118, 228, 0.2)",
      orbSecondary: "rgba(154, 183, 255, 0.12)",
      glassReflection: "rgba(245, 248, 255, 0.12)",
      heroReflection: "rgba(156, 180, 255, 0.12)",
      quickCardTint: "rgba(118, 146, 255, 0.075)",
      overviewCardTint: "rgba(109, 138, 245, 0.1)",
      quoteCardTint: "rgba(144, 170, 255, 0.08)",
      weatherCardTint: "rgba(109, 138, 245, 0.095)",
      musicCardTint: "rgba(88, 120, 228, 0.09)",
      activitiesCardTint: "rgba(104, 133, 222, 0.08)",
      footerCardTint: "rgba(82, 111, 191, 0.08)",
      tileTint: "rgba(246, 248, 255, 0.04)",
      tileTintStrong: "rgba(109, 138, 245, 0.13)",
      tagBackground: "rgba(246, 248, 255, 0.05)",
      tagBorder: "rgba(215, 228, 255, 0.08)",
      iconBackground: "rgba(109, 138, 245, 0.16)",
      iconBackgroundStrong: "rgba(109, 138, 245, 0.22)",
      buttonShadow: "0 18px 42px rgba(15, 22, 57, 0.36)",
      buttonShadowHover: "0 22px 52px rgba(15, 22, 57, 0.42)",
      skeletonBase: "rgba(246, 248, 255, 0.045)",
      skeletonHighlight: "rgba(255, 255, 255, 0.11)",
    },
  },
  "midnight-velvet": {
    id: "midnight-velvet",
    label: "Midnight Velvet",
    aliases: ["midnight-velvet", "midnight velvet", "midnight", "velvet", "storm", "intense"],
    tokens: {
      pageGradient:
        "linear-gradient(145deg, #07040d 0%, #13081a 24%, #261327 58%, #08040b 100%)",
      ambientPrimary:
        "radial-gradient(circle at 18% 18%, rgba(255, 120, 154, 0.2), transparent 28%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 10%, rgba(255, 214, 228, 0.1), transparent 22%)",
      ambientTertiary:
        "radial-gradient(circle at 52% 120%, rgba(193, 94, 130, 0.16), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 34%, rgba(255, 104, 146, 0.22), transparent 56%)",
      cardBackground: "rgba(252, 240, 247, 0.04)",
      cardBackgroundStrong: "rgba(252, 240, 247, 0.068)",
      border: "rgba(255, 218, 232, 0.09)",
      borderStrong: "rgba(255, 218, 232, 0.145)",
      shadow: "0 32px 94px rgba(11, 4, 10, 0.58)",
      accent: "#ffc0d3",
      accentSoft: "#ff628b",
      accentRgb: "255, 98, 139",
      textStrong: "#fff7fb",
      textSoft: "rgba(255, 225, 236, 0.8)",
      textMuted: "rgba(255, 225, 236, 0.54)",
      orbPrimary: "rgba(255, 98, 139, 0.18)",
      orbSecondary: "rgba(255, 192, 211, 0.11)",
      glassReflection: "rgba(255, 244, 248, 0.12)",
      heroReflection: "rgba(255, 205, 221, 0.12)",
      quickCardTint: "rgba(255, 155, 182, 0.075)",
      overviewCardTint: "rgba(255, 98, 139, 0.1)",
      quoteCardTint: "rgba(255, 192, 211, 0.08)",
      weatherCardTint: "rgba(255, 98, 139, 0.092)",
      musicCardTint: "rgba(255, 122, 162, 0.086)",
      activitiesCardTint: "rgba(219, 108, 152, 0.08)",
      footerCardTint: "rgba(172, 77, 112, 0.08)",
      tileTint: "rgba(255, 245, 249, 0.04)",
      tileTintStrong: "rgba(255, 98, 139, 0.12)",
      tagBackground: "rgba(255, 245, 249, 0.052)",
      tagBorder: "rgba(255, 218, 232, 0.085)",
      iconBackground: "rgba(255, 98, 139, 0.16)",
      iconBackgroundStrong: "rgba(255, 98, 139, 0.22)",
      buttonShadow: "0 18px 42px rgba(49, 14, 30, 0.36)",
      buttonShadowHover: "0 22px 52px rgba(49, 14, 30, 0.42)",
      skeletonBase: "rgba(255, 245, 249, 0.05)",
      skeletonHighlight: "rgba(255, 255, 255, 0.11)",
    },
  },
  "calm-soft": {
    id: "calm-soft",
    label: "Calm Soft",
    aliases: ["calm-soft", "calm soft", "calm", "soft", "calm_soft"],
    tokens: {
      pageGradient:
        "linear-gradient(140deg, #050913 0%, #091321 28%, #0d1f34 62%, #060913 100%)",
      ambientPrimary:
        "radial-gradient(circle at 20% 18%, rgba(125, 170, 255, 0.2), transparent 30%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 8%, rgba(214, 232, 255, 0.1), transparent 22%)",
      ambientTertiary:
        "radial-gradient(circle at 50% 120%, rgba(113, 146, 226, 0.14), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 35%, rgba(142, 180, 255, 0.26), transparent 60%)",
      cardBackground: "rgba(241, 247, 255, 0.038)",
      cardBackgroundStrong: "rgba(241, 247, 255, 0.062)",
      border: "rgba(222, 234, 255, 0.084)",
      borderStrong: "rgba(222, 234, 255, 0.14)",
      shadow: "0 30px 88px rgba(2, 6, 17, 0.5)",
      accent: "#c9dcff",
      accentSoft: "#8ab1ff",
      accentRgb: "138, 177, 255",
      textStrong: "#f7fbff",
      textSoft: "rgba(222, 232, 250, 0.8)",
      textMuted: "rgba(222, 232, 250, 0.56)",
      orbPrimary: "rgba(123, 160, 255, 0.2)",
      orbSecondary: "rgba(199, 221, 255, 0.11)",
      glassReflection: "rgba(255, 255, 255, 0.13)",
      heroReflection: "rgba(205, 223, 255, 0.12)",
      quickCardTint: "rgba(152, 184, 255, 0.08)",
      overviewCardTint: "rgba(138, 177, 255, 0.1)",
      quoteCardTint: "rgba(198, 220, 255, 0.08)",
      weatherCardTint: "rgba(138, 177, 255, 0.094)",
      musicCardTint: "rgba(153, 188, 255, 0.084)",
      activitiesCardTint: "rgba(125, 163, 235, 0.078)",
      footerCardTint: "rgba(102, 133, 206, 0.08)",
      tileTint: "rgba(255, 255, 255, 0.042)",
      tileTintStrong: "rgba(138, 177, 255, 0.12)",
      tagBackground: "rgba(255, 255, 255, 0.052)",
      tagBorder: "rgba(222, 234, 255, 0.08)",
      iconBackground: "rgba(138, 177, 255, 0.16)",
      iconBackgroundStrong: "rgba(138, 177, 255, 0.22)",
      buttonShadow: "0 18px 42px rgba(17, 30, 58, 0.34)",
      buttonShadowHover: "0 22px 52px rgba(17, 30, 58, 0.4)",
      skeletonBase: "rgba(255, 255, 255, 0.048)",
      skeletonHighlight: "rgba(255, 255, 255, 0.12)",
    },
  },
  "reflective-blue": {
    id: "reflective-blue",
    label: "Reflective Blue",
    aliases: [
      "reflective-blue",
      "reflective blue",
      "reflective",
      "blue",
      "deep-blue",
      "deep blue",
    ],
    tokens: {
      pageGradient:
        "linear-gradient(145deg, #050a14 0%, #061220 24%, #08192c 58%, #04070f 100%)",
      ambientPrimary:
        "radial-gradient(circle at 18% 18%, rgba(109, 163, 248, 0.2), transparent 28%)",
      ambientSecondary:
        "radial-gradient(circle at 82% 8%, rgba(192, 217, 255, 0.09), transparent 22%)",
      ambientTertiary:
        "radial-gradient(circle at 48% 120%, rgba(85, 126, 206, 0.14), transparent 34%)",
      heroGlow:
        "radial-gradient(circle at 50% 36%, rgba(118, 164, 255, 0.2), transparent 62%)",
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
      glassReflection: "rgba(245, 249, 255, 0.12)",
      heroReflection: "rgba(166, 198, 255, 0.11)",
      quickCardTint: "rgba(136, 180, 255, 0.07)",
      overviewCardTint: "rgba(109, 163, 248, 0.095)",
      quoteCardTint: "rgba(170, 203, 255, 0.075)",
      weatherCardTint: "rgba(109, 163, 248, 0.09)",
      musicCardTint: "rgba(130, 176, 255, 0.08)",
      activitiesCardTint: "rgba(106, 151, 236, 0.076)",
      footerCardTint: "rgba(88, 129, 201, 0.076)",
      tileTint: "rgba(255, 255, 255, 0.038)",
      tileTintStrong: "rgba(109, 163, 248, 0.11)",
      tagBackground: "rgba(255, 255, 255, 0.048)",
      tagBorder: "rgba(216, 233, 255, 0.078)",
      iconBackground: "rgba(109, 163, 248, 0.15)",
      iconBackgroundStrong: "rgba(109, 163, 248, 0.21)",
      buttonShadow: "0 18px 42px rgba(12, 23, 52, 0.34)",
      buttonShadowHover: "0 22px 52px rgba(12, 23, 52, 0.4)",
      skeletonBase: "rgba(255, 255, 255, 0.042)",
      skeletonHighlight: "rgba(255, 255, 255, 0.105)",
    },
  },
};
