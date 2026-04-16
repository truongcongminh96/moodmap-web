import { animate, stagger } from "animejs";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Result, Skeleton, Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ActivitiesCard } from "./components/ActivitiesCard";
import { FooterMeta } from "./components/FooterMeta";
import { HeroSection } from "./components/HeroSection";
import { HeroStoryCard } from "./components/HeroStoryCard";
import { MoodOverviewCard } from "./components/MoodOverviewCard";
import { MusicSection } from "./components/MusicSection";
import { QuickStatsRow } from "./components/QuickStatsRow";
import { QuoteCard } from "./components/QuoteCard";
import { WeatherCard } from "./components/WeatherCard";
import {
  GLOBAL_CITY_SUGGESTIONS,
  VIETNAM_CITY_SUGGESTIONS,
} from "./constants/majorCities";
import { getHealingMessageEntry } from "./constants/healingMessages";
import type { UiCopy } from "./i18n/translations";
import { useLocale } from "./i18n/useLocale";
import { detectCurrentCity } from "./services/locationService";
import { fetchMoodPack } from "./services/moodApi";
import { fetchMoodStory } from "./services/moodStoryApi";
import { resolveMoodTheme } from "./theme/getMoodTheme";
import {
  MOOD_SCENE_OPTIONS,
  resolveMoodScene,
} from "./theme/moodScene";
import type {
  MoodScenePalette,
  MoodSceneSelection,
} from "./theme/moodScene";
import type { MoodThemeTokens } from "./theme/moodThemes";
import type { MoodPackData } from "./types/mood";
import type { MoodStoryData } from "./types/moodStory";

const { Content } = Layout;

const DEFAULT_CITY = "Hanoi";

type ThemeVariables = CSSProperties & Record<`--${string}`, string>;
type ParticleStyle = CSSProperties;
type SceneEffectStyle = CSSProperties;
type HealingCardId = "overview" | "weather" | "music" | "activities";
type RevealPhase = "idle" | "loading" | "holding" | "exiting";
type TimeOfDayId = "morning" | "midday" | "goldenHour" | "night";

interface RevealState {
  city: string;
  moodLabel: string;
  phase: RevealPhase;
  sceneLabel: string;
  summary: string;
}

interface TimeOfDayProfile {
  id: TimeOfDayId;
  label: string;
  note: string;
  soundtrack: string;
}

const PARTICLE_LAYOUT = [
  { top: "12%", left: "14%", size: 10, delay: 0.2, speed: 1 },
  { top: "18%", left: "32%", size: 14, delay: 1.1, speed: 0.92 },
  { top: "26%", left: "72%", size: 16, delay: 0.8, speed: 1.12 },
  { top: "36%", left: "18%", size: 12, delay: 1.9, speed: 0.95 },
  { top: "42%", left: "58%", size: 18, delay: 0.4, speed: 1.08 },
  { top: "54%", left: "80%", size: 12, delay: 1.6, speed: 0.9 },
  { top: "60%", left: "12%", size: 14, delay: 0.6, speed: 1.1 },
  { top: "66%", left: "44%", size: 10, delay: 2.3, speed: 0.96 },
  { top: "74%", left: "68%", size: 15, delay: 1.4, speed: 1.06 },
  { top: "82%", left: "28%", size: 12, delay: 0.9, speed: 0.98 },
  { top: "16%", left: "86%", size: 11, delay: 1.8, speed: 1.14 },
  { top: "48%", left: "90%", size: 13, delay: 0.5, speed: 1.02 },
  { top: "70%", left: "54%", size: 17, delay: 2.1, speed: 1.07 },
  { top: "84%", left: "84%", size: 10, delay: 1.2, speed: 0.94 },
] as const;

const CALM_MIST_LAYOUT = [
  { top: "12%", left: "-6%", width: "22rem", height: "10rem", delay: "0s", duration: "20s" },
  { top: "34%", left: "54%", width: "26rem", height: "11rem", delay: "2.4s", duration: "24s" },
  { top: "70%", left: "8%", width: "20rem", height: "9rem", delay: "4.2s", duration: "22s" },
] as const;

const ENERGETIC_RING_LAYOUT = [
  { top: "18%", left: "18%", size: "8rem", delay: "0s", duration: "6.2s" },
  { top: "58%", left: "72%", size: "9.5rem", delay: "1.4s", duration: "5.5s" },
  { top: "66%", left: "30%", size: "6.5rem", delay: "2.8s", duration: "5.9s" },
] as const;

const INTENSE_SPARK_LAYOUT = [
  { top: "18%", left: "76%", width: 10, height: 120, delay: "0s", duration: "3.6s" },
  { top: "24%", left: "58%", width: 8, height: 86, delay: "1.2s", duration: "3.1s" },
  { top: "52%", left: "82%", width: 9, height: 108, delay: "0.8s", duration: "3.3s" },
  { top: "62%", left: "18%", width: 8, height: 96, delay: "1.8s", duration: "3.8s" },
  { top: "74%", left: "66%", width: 10, height: 132, delay: "0.4s", duration: "3.4s" },
] as const;

const REFLECTIVE_RAIN_LAYOUT = [
  { left: "8%", height: "22rem", delay: "0s", duration: "8.6s", opacity: 0.22 },
  { left: "18%", height: "18rem", delay: "1.2s", duration: "7.4s", opacity: 0.18 },
  { left: "32%", height: "24rem", delay: "0.6s", duration: "8.8s", opacity: 0.24 },
  { left: "47%", height: "20rem", delay: "1.8s", duration: "7.8s", opacity: 0.18 },
  { left: "62%", height: "26rem", delay: "0.9s", duration: "9.2s", opacity: 0.22 },
  { left: "74%", height: "18rem", delay: "1.6s", duration: "7.6s", opacity: 0.17 },
  { left: "88%", height: "23rem", delay: "0.3s", duration: "8.4s", opacity: 0.2 },
] as const;

function buildThemeVariables(
  theme: MoodThemeTokens,
  scenePalette: MoodScenePalette,
): ThemeVariables {
  return {
    "--page-gradient": theme.pageGradient,
    "--ambient-primary": theme.ambientPrimary,
    "--ambient-secondary": theme.ambientSecondary,
    "--ambient-tertiary": theme.ambientTertiary,
    "--hero-glow": theme.heroGlow,
    "--card-background": theme.cardBackground,
    "--card-background-strong": theme.cardBackgroundStrong,
    "--card-border": theme.border,
    "--card-border-strong": theme.borderStrong,
    "--card-shadow": theme.shadow,
    "--accent": theme.accent,
    "--accent-soft": theme.accentSoft,
    "--accent-rgb": theme.accentRgb,
    "--text-strong": theme.textStrong,
    "--text-soft": theme.textSoft,
    "--text-muted": theme.textMuted,
    "--orb-primary": theme.orbPrimary,
    "--orb-secondary": theme.orbSecondary,
    "--glass-reflection": theme.glassReflection,
    "--hero-reflection": theme.heroReflection,
    "--quick-card-tint": theme.quickCardTint,
    "--overview-card-tint": theme.overviewCardTint,
    "--quote-card-tint": theme.quoteCardTint,
    "--weather-card-tint": theme.weatherCardTint,
    "--music-card-tint": theme.musicCardTint,
    "--activities-card-tint": theme.activitiesCardTint,
    "--footer-card-tint": theme.footerCardTint,
    "--tile-tint": theme.tileTint,
    "--tile-tint-strong": theme.tileTintStrong,
    "--tag-background": theme.tagBackground,
    "--tag-border": theme.tagBorder,
    "--icon-background": theme.iconBackground,
    "--icon-background-strong": theme.iconBackgroundStrong,
    "--button-shadow": theme.buttonShadow,
    "--button-shadow-hover": theme.buttonShadowHover,
    "--skeleton-base": theme.skeletonBase,
    "--skeleton-highlight": theme.skeletonHighlight,
    "--particle-opacity": scenePalette.particleOpacity,
    "--particle-blur": scenePalette.particleBlur,
    "--particle-scale": scenePalette.particleScale,
    "--particle-travel-x": scenePalette.particleTravelX,
    "--particle-travel-y": scenePalette.particleTravelY,
  };
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "";
  }

  if (error instanceof Error) {
    const normalized = error.message.trim().toLowerCase();

    if (
      normalized.includes("failed to fetch") ||
      normalized.includes("network") ||
      normalized.includes("cors")
    ) {
      return fallbackMessage;
    }

    return error.message;
  }

  return fallbackMessage;
}

function resolveTimeOfDay(
  currentDate: Date,
  copy: UiCopy,
): TimeOfDayProfile {
  const hour = currentDate.getHours();

  if (hour >= 6 && hour < 11) {
    return {
      id: "morning",
      label: copy.timeOfDay.morning,
      note: copy.timeOfDay.morningNote,
      soundtrack: copy.timeOfDay.morningSoundtrack,
    };
  }

  if (hour >= 18 && hour < 22) {
    return {
      id: "goldenHour",
      label: copy.timeOfDay.goldenHour,
      note: copy.timeOfDay.goldenHourNote,
      soundtrack: copy.timeOfDay.goldenHourSoundtrack,
    };
  }

  if (hour >= 22 || hour < 6) {
    return {
      id: "night",
      label: copy.timeOfDay.night,
      note: copy.timeOfDay.nightNote,
      soundtrack: copy.timeOfDay.nightSoundtrack,
    };
  }

  return {
    id: "midday",
    label: copy.timeOfDay.midday,
    note: copy.timeOfDay.middayNote,
    soundtrack: copy.timeOfDay.middaySoundtrack,
  };
}

function DashboardSkeleton() {
  return (
    <section className="result-stage">
      <Card bordered={false} className="glass-card hero-story-card hero-story-card-loading skeleton-card fade-up delay-2">
        <div className="hero-story-skeleton">
          <div className="hero-story-skeleton-copy">
            <div className="hero-story-skeleton-pill" />
            <div className="hero-story-skeleton-title" />
            <div className="hero-story-skeleton-line hero-story-skeleton-line-wide" />
            <div className="hero-story-skeleton-line" />
          </div>
          <div className="hero-story-skeleton-panels">
            <div className="hero-story-skeleton-panel" />
            <div className="hero-story-skeleton-panel" />
          </div>
        </div>
      </Card>

      <div className="quick-stats-row skeleton-quick-row fade-up delay-2">
        {[0, 1, 2].map((item) => (
          <Card
            bordered={false}
            className="glass-card quick-stat-card skeleton-card"
            key={item}
          >
            <Skeleton active paragraph={{ rows: 1, width: ["68%"] }} />
          </Card>
        ))}
      </div>

      <Card bordered={false} className="glass-card mood-overview-card skeleton-card fade-up delay-3">
        <div className="dashboard-skeleton-grid">
          <Skeleton active paragraph={{ rows: 4 }} />
          <div className="dashboard-skeleton-side">
            <div className="skeleton-orb" />
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
          </div>
        </div>
      </Card>

      <Card bordered={false} className="glass-card quote-card quote-editorial-card skeleton-card fade-up delay-4">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>

      <div className="content-grid">
        <div className="content-column">
          <Card bordered={false} className="glass-card section-card skeleton-card fade-up delay-5">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </div>

        <div className="content-column">
          <Card bordered={false} className="glass-card weather-card skeleton-card fade-up delay-4">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
          <Card bordered={false} className="glass-card section-card skeleton-card fade-up delay-6">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </div>
      </div>

      <Card bordered={false} className="glass-card footer-card skeleton-card fade-up delay-7">
        <Skeleton active title={false} paragraph={{ rows: 2 }} />
      </Card>
    </section>
  );
}

export default function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [result, setResult] = useState<MoodPackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<MoodStoryData | null>(null);
  const [storyLoading, setStoryLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sceneMenuOpen, setSceneMenuOpen] = useState(false);
  const [moodSceneSelection, setMoodSceneSelection] =
    useState<MoodSceneSelection>("auto");
  const [activeHealingCard, setActiveHealingCard] =
    useState<HealingCardId | null>(null);
  const [activeHealingEntry, setActiveHealingEntry] = useState<{
    en: string;
    vi: string;
  } | null>(null);
  const [revealState, setRevealState] = useState<RevealState>({
    city: DEFAULT_CITY,
    moodLabel: "",
    phase: "idle",
    sceneLabel: "",
    summary: "",
  });
  const controllerRef = useRef<AbortController | null>(null);
  const motionRootRef = useRef<HTMLDivElement | null>(null);
  const revealTimersRef = useRef<number[]>([]);
  const { locale, setLocale, copy, dateLocale } = useLocale();

  const activeScene = resolveMoodScene(moodSceneSelection, result);
  const activeMoodTheme = resolveMoodTheme(result, moodSceneSelection);
  const themeVars = buildThemeVariables(
    activeMoodTheme.tokens,
    activeScene.profile.palette,
  );
  const isInitialLoading = loading && !result;
  const isRefreshing = loading && Boolean(result);
  const sceneLabel = copy.sceneOptions[activeScene.profile.id];
  const sceneDescription = copy.sceneDescriptions[activeScene.profile.id];
  const sceneModeLabel = copy.formatters.sceneMode(sceneLabel, activeScene.isAuto);
  const activeMoodThemeLabel =
    copy.themeNames[activeMoodTheme.id] ?? activeMoodTheme.label;
  const moodSceneOptions = useMemo(
    () =>
      MOOD_SCENE_OPTIONS.map((option) => ({
        value: option.value,
        label: copy.sceneOptions[option.value],
      })),
    [copy],
  );
  const timeOfDay = useMemo(
    () => resolveTimeOfDay(currentTime, copy),
    [copy, currentTime],
  );
  const isVietnamUser = detectedCountryCode === "vn" || locale === "vi";
  const citySuggestions = useMemo(() => {
    const baseSuggestions = isVietnamUser
      ? [...VIETNAM_CITY_SUGGESTIONS, ...GLOBAL_CITY_SUGGESTIONS]
      : [...GLOBAL_CITY_SUGGESTIONS, ...VIETNAM_CITY_SUGGESTIONS];
    const merged = city.trim()
      ? [city.trim(), ...baseSuggestions]
      : baseSuggestions;

    return merged.filter((option, index, values) => {
      return (
        values.findIndex(
          (candidate) => candidate.toLocaleLowerCase() === option.toLocaleLowerCase(),
        ) === index
      );
    });
  }, [city, isVietnamUser]);
  const formattedLocalTime = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        hour: "numeric",
        minute: "2-digit",
      }).format(currentTime),
    [currentTime, dateLocale],
  );
  const visibleParticles = PARTICLE_LAYOUT.slice(
    0,
    activeScene.profile.palette.particleCount,
  );
  const activeHealingMessage = activeHealingEntry?.[locale] ?? null;
  const shouldShowStorySkeleton = storyLoading && !story && !isInitialLoading;
  const isRevealBlocking =
    revealState.phase === "loading" || revealState.phase === "holding";
  const isRevealExiting = revealState.phase === "exiting";

  const clearRevealTimers = () => {
    revealTimersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });
    revealTimersRef.current = [];
  };

  const handleHealingEnter = (cardId: HealingCardId) => {
    setActiveHealingCard(cardId);
    setActiveHealingEntry(getHealingMessageEntry(result?.mood?.key));
  };

  const handleHealingLeave = () => {
    setActiveHealingCard(null);
    setActiveHealingEntry(null);
  };

  const loadMoodPack = async (
    requestedCity?: string,
    options?: { cinematicReveal?: boolean },
  ) => {
    const trimmedCity = (requestedCity ?? city).trim();
    const shouldUseReveal = options?.cinematicReveal ?? false;

    if (!trimmedCity) {
      setErrorMessage(copy.states.cityRequired);
      return;
    }

    setCity(trimmedCity);
    setLoading(true);
    setStoryLoading(true);
    setErrorMessage(null);

    if (shouldUseReveal) {
      clearRevealTimers();
      setRevealState({
        city: trimmedCity,
        moodLabel: copy.search.submitting,
        phase: "loading",
        sceneLabel,
        summary: copy.sceneLoading[activeScene.profile.id],
      });
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const moodPackPromise = fetchMoodPack(trimmedCity, controller.signal);
    const moodStoryPromise = fetchMoodStory(trimmedCity, controller.signal);

    const packTask = (async () => {
      try {
        const nextPack = await moodPackPromise;

        if (controllerRef.current !== controller) {
          return;
        }

        if (shouldUseReveal) {
          const nextScene = resolveMoodScene(moodSceneSelection, nextPack);

          setRevealState({
            city: nextPack.location?.city?.trim() || trimmedCity,
            moodLabel: nextPack.mood?.label ?? copy.common.pendingMood,
            phase: "holding",
            sceneLabel: copy.sceneOptions[nextScene.profile.id],
            summary: nextPack.summary ?? copy.sceneDescriptions[nextScene.profile.id],
          });
        }

        setResult(nextPack);
        setErrorMessage(null);
        setActiveHealingCard(null);
        setActiveHealingEntry(null);

        const previousStoryCity = story?.city?.trim().toLowerCase();
        const nextCity = nextPack.location?.city?.trim().toLowerCase();

        if (!previousStoryCity || previousStoryCity !== nextCity) {
          setStory(null);
        }
      } catch (error) {
        const message = getErrorMessage(error, copy.states.networkIssue);

        if (message && controllerRef.current === controller) {
          setErrorMessage(message);

          if (shouldUseReveal) {
            setRevealState({
              city: trimmedCity,
              moodLabel: copy.states.inlineErrorTitle,
              phase: "exiting",
              sceneLabel,
              summary: message,
            });
          }
        }
      } finally {
        if (controllerRef.current === controller) {
          setLoading(false);
        }
      }
    })();

    const storyTask = (async () => {
      try {
        const nextStory = await moodStoryPromise;
        await moodPackPromise;

        if (controllerRef.current !== controller) {
          return;
        }

        setStory(nextStory);
      } catch {
        const packSucceeded = await moodPackPromise.then(
          () => true,
          () => false,
        );

        if (packSucceeded && controllerRef.current === controller) {
          setStory(null);
        }
      } finally {
        if (controllerRef.current === controller) {
          setStoryLoading(false);
        }
      }
    })();

    await Promise.allSettled([packTask, storyTask]);
  };

  useEffect(() => {
    let cancelled = false;
    const locationController = new AbortController();

    const initializeMoodMap = async () => {
      const detectedLocation = await detectCurrentCity(locationController.signal);
      const initialCity = detectedLocation.city?.trim() || DEFAULT_CITY;

      if (cancelled) {
        return;
      }

      setDetectedCountryCode(detectedLocation.countryCode);
      setCity(initialCity);
      await loadMoodPack(initialCity);
    };

    void initializeMoodMap();

    return () => {
      cancelled = true;
      locationController.abort();
      controllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    clearRevealTimers();

    if (revealState.phase === "holding") {
      revealTimersRef.current = [
        window.setTimeout(() => {
          setRevealState((current) =>
            current.phase === "holding"
              ? { ...current, phase: "exiting" }
              : current,
          );
        }, 1100),
        window.setTimeout(() => {
          setRevealState((current) =>
            current.phase === "holding" || current.phase === "exiting"
              ? { ...current, phase: "idle" }
              : current,
          );
        }, 1740),
      ];
    } else if (revealState.phase === "exiting") {
      revealTimersRef.current = [
        window.setTimeout(() => {
          setRevealState((current) =>
            current.phase === "exiting"
              ? { ...current, phase: "idle" }
              : current,
          );
        }, 620),
      ];
    }

    return () => {
      clearRevealTimers();
    };
  }, [revealState.phase]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = motionRootRef.current;

    if (!root) {
      return;
    }

    const heroGlow = root.querySelector(".hero-glow");
    const searchShell = root.querySelector(".search-shell");
    const sceneElements = root.querySelectorAll(
      ".scene-indicator, .hero-scene-description, .hero-support-note",
    );
    const cards = root.querySelectorAll(
      ".hero-story-card, .quick-stat-card, .mood-overview-card, .quote-card, .weather-card, .section-card, .footer-card, .inline-result-card, .full-result-card",
    );
    const particles = root.querySelectorAll(".ambient-particle");
    const animations: Array<{ pause: () => unknown }> = [];

    if (heroGlow) {
      animations.push(
        animate(heroGlow, {
          scale: [0.94, 1.08, 1],
          opacity: [0.52, 0.9, 0.72],
          duration: 1350,
          ease: "outExpo",
        }),
      );
    }

    if (searchShell) {
      animations.push(
        animate(searchShell, {
          y: [-4, 0],
          scale: [0.992, 1],
          opacity: [0.88, 1],
          duration: 820,
          ease: "outExpo",
        }),
      );
    }

    if (sceneElements.length > 0) {
      animations.push(
        animate(sceneElements, {
          y: [12, 0],
          opacity: [0.28, 1],
          delay: stagger(70),
          duration: 700,
          ease: "outQuad",
        }),
      );
    }

    if (cards.length > 0) {
      animations.push(
        animate(cards, {
          y: [18, 0],
          scale: [0.985, 1],
          opacity: [0.35, 1],
          delay: stagger(65, { from: "center" }),
          duration: 980,
          ease: "outExpo",
        }),
      );
    }

    particles.forEach((particle, index) => {
      const finalOpacity = Number.parseFloat(
        window.getComputedStyle(particle).opacity || "0.45",
      );

      animations.push(
        animate(particle, {
          scale: [0.28, 1.45, 1],
          opacity: [0, Math.min(finalOpacity + 0.16, 1), finalOpacity],
          x: [0, (index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 4), 0],
          y: [0, -10 - (index % 3) * 6, 0],
          delay: index * 35,
          duration: 1200 + (index % 4) * 90,
          ease: "outExpo",
        }),
      );
    });

    return () => {
      animations.forEach((animation) => {
        animation.pause();
      });
    };
  }, [
    activeScene.profile.id,
    activeMoodTheme.id,
    result?.location?.city,
    story?.headline,
    isInitialLoading,
    isRefreshing,
    errorMessage,
  ]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const rootStyle = document.documentElement.style;
    const cssVarEntries = Object.entries(themeVars).filter(([key, value]) => {
      return key.startsWith("--") && typeof value === "string";
    });

    cssVarEntries.forEach(([key, value]) => {
      rootStyle.setProperty(key, value);
    });
  }, [themeVars]);

  return (
    <Layout
      className={`app-shell scene-${activeScene.profile.id} time-${timeOfDay.id}`}
      style={themeVars}
    >
      <div className="ambient-layer">
        <div className="ambient-orb ambient-orb-left" />
        <div className="ambient-orb ambient-orb-right" />
        <div className="ambient-grid" />
        <div className="time-layer" aria-hidden="true" />
        <div className="particle-field" aria-hidden="true">
          {visibleParticles.map((particle, index) => {
            const style: ParticleStyle = {
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              opacity: `calc(${0.46 + (index % 3) * 0.12} * var(--particle-opacity))`,
              animationDuration: `${activeScene.profile.palette.particleDuration * particle.speed}s`,
              animationDelay: `${particle.delay}s`,
            };

            return <span className="ambient-particle" key={`${particle.top}-${particle.left}`} style={style} />;
          })}
        </div>
        <div
          className={`scene-atmosphere scene-atmosphere-${activeScene.profile.id}`}
          aria-hidden="true"
        >
          {activeScene.profile.id === "calm"
            ? CALM_MIST_LAYOUT.map((mist, index) => {
                const style: SceneEffectStyle = {
                  top: mist.top,
                  left: mist.left,
                  width: mist.width,
                  height: mist.height,
                  animationDelay: mist.delay,
                  animationDuration: mist.duration,
                };

                return <span className="scene-mist" key={`mist-${index}`} style={style} />;
              })
            : null}

          {activeScene.profile.id === "energetic"
            ? ENERGETIC_RING_LAYOUT.map((ring, index) => {
                const style: SceneEffectStyle = {
                  top: ring.top,
                  left: ring.left,
                  width: ring.size,
                  height: ring.size,
                  animationDelay: ring.delay,
                  animationDuration: ring.duration,
                };

                return <span className="scene-ring" key={`ring-${index}`} style={style} />;
              })
            : null}

          {activeScene.profile.id === "intense"
            ? INTENSE_SPARK_LAYOUT.map((spark, index) => {
                const style: SceneEffectStyle = {
                  top: spark.top,
                  left: spark.left,
                  width: spark.width,
                  height: spark.height,
                  animationDelay: spark.delay,
                  animationDuration: spark.duration,
                };

                return <span className="scene-spark" key={`spark-${index}`} style={style} />;
              })
            : null}

          {activeScene.profile.id === "reflective"
            ? REFLECTIVE_RAIN_LAYOUT.map((drop, index) => {
                const style: SceneEffectStyle = {
                  left: drop.left,
                  height: drop.height,
                  opacity: drop.opacity,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                };

                return <span className="scene-rain" key={`rain-${index}`} style={style} />;
              })
            : null}
        </div>
      </div>

      <Content className="page-content">
        <div
          className={`page-motion-root ${
            isRevealBlocking
              ? "is-reveal-blocking"
              : isRevealExiting
                ? "is-reveal-exiting"
                : ""
          }`}
          ref={motionRootRef}
        >
          <div
            aria-hidden={revealState.phase === "idle"}
            className={`mood-reveal-overlay mood-reveal-overlay-${revealState.phase}`}
          >
            <div className="mood-reveal-overlay__grain" />
            <div className="mood-reveal-overlay__content">
              <span className="mood-reveal-overlay__eyebrow">
                {revealState.sceneLabel || sceneLabel}
              </span>
              <h2 className="mood-reveal-overlay__title">
                {revealState.moodLabel || sceneLabel}
              </h2>
              <p className="mood-reveal-overlay__city">
                {revealState.city || result?.location?.city || city}
              </p>
              <p className="mood-reveal-overlay__summary">
                {revealState.summary || copy.hero.supportNote}
              </p>
            </div>
          </div>

          <HeroSection
            city={city}
            citySuggestions={citySuggestions}
            loading={loading}
            locale={locale}
            copy={copy}
            sceneMenuOpen={sceneMenuOpen}
            moodSceneSelection={moodSceneSelection}
            moodSceneOptions={moodSceneOptions}
            sceneLabel={sceneLabel}
            sceneDescription={sceneDescription}
            isSceneAuto={activeScene.isAuto}
            onCityChange={setCity}
            onLocaleChange={setLocale}
            onSceneMenuOpenChange={setSceneMenuOpen}
            onMoodSceneChange={setMoodSceneSelection}
            onSubmit={() => {
              void loadMoodPack(undefined, { cinematicReveal: true });
            }}
          />

          {isInitialLoading ? (
            <div className="refresh-pill refresh-pill-initial fade-up delay-2">
              <div className="refresh-pill-icon">
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              </div>
              <span>{copy.sceneLoading[activeScene.profile.id] ?? copy.states.initialLoading}</span>
            </div>
          ) : null}

          {isRefreshing ? (
            <div className="refresh-pill fade-up delay-2">
              <div className="refresh-pill-icon">
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              </div>
              <span>{copy.states.refreshing(result?.location?.city ?? city, sceneLabel)}</span>
            </div>
          ) : null}

          {!result && errorMessage && !loading ? (
            <Card bordered={false} className="glass-card full-result-card fade-up delay-3">
              <Result
                status="500"
                title={copy.states.fullErrorTitle}
                subTitle={errorMessage || copy.states.fullErrorDescription}
                extra={
                  <Button
                    className="result-action-button"
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      void loadMoodPack(undefined, { cinematicReveal: true });
                    }}
                  >
                    {copy.states.tryAgain}
                  </Button>
                }
              />
            </Card>
          ) : null}

          {result && errorMessage ? (
            <Card bordered={false} className="glass-card inline-result-card fade-up delay-3">
              <Result
                status="warning"
                title={copy.states.inlineErrorTitle}
                subTitle={errorMessage || copy.states.inlineErrorDescription}
                extra={
                  <Button
                    className="result-action-button"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      void loadMoodPack(undefined, { cinematicReveal: true });
                    }}
                  >
                    {copy.states.retry}
                  </Button>
                }
              />
            </Card>
          ) : null}

          {!result && !loading && !errorMessage ? (
            <Card bordered={false} className="glass-card full-result-card fade-up delay-3">
              <Result
                status="info"
                title={copy.states.emptyTitle}
                subTitle={copy.states.emptyDescription}
                extra={
                  <Button
                    className="result-action-button"
                    type="primary"
                    onClick={() => {
                      void loadMoodPack(DEFAULT_CITY, { cinematicReveal: true });
                    }}
                  >
                    {copy.search.submit}
                  </Button>
                }
              />
            </Card>
          ) : null}

          {isInitialLoading ? <DashboardSkeleton /> : null}

          {result ? (
            <section className={`result-stage ${isRefreshing ? "is-refreshing" : ""}`}>
              {story ? (
                <HeroStoryCard
                  copy={copy}
                  data={story}
                  dateLocale={dateLocale}
                  locale={locale}
                />
              ) : null}

              {shouldShowStorySkeleton ? (
                <HeroStoryCard
                  copy={copy}
                  dateLocale={dateLocale}
                  loading
                  locale={locale}
                />
              ) : null}

              <QuickStatsRow copy={copy} data={result} />
              <MoodOverviewCard
                copy={copy}
                data={result}
                healingMessage={
                  activeHealingCard === "overview" ? activeHealingMessage : null
                }
                isHealingActive={activeHealingCard === "overview"}
                localTimeLabel={copy.timeOfDay.localTime}
                localTimeValue={formattedLocalTime}
                moodThemeLabel={activeMoodThemeLabel}
                onHealingEnter={() => handleHealingEnter("overview")}
                onHealingLeave={handleHealingLeave}
                sceneLabel={sceneLabel}
                sceneModeLabel={sceneModeLabel}
                timeOfDayLabel={timeOfDay.label}
                timeOfDayNote={timeOfDay.note}
              />

              <QuoteCard copy={copy} quote={result.quote} />

              <div className="content-grid">
                <div className="content-column">
                  <MusicSection
                    copy={copy}
                    healingMessage={
                      activeHealingCard === "music" ? activeHealingMessage : null
                    }
                    isHealingActive={activeHealingCard === "music"}
                    music={result.music}
                    onHealingEnter={() => handleHealingEnter("music")}
                    onHealingLeave={handleHealingLeave}
                    timeOfDayLabel={timeOfDay.label}
                    timeOfDaySoundtrack={timeOfDay.soundtrack}
                  />
                </div>

                <div className="content-column">
                  <WeatherCard
                    copy={copy}
                    healingMessage={
                      activeHealingCard === "weather" ? activeHealingMessage : null
                    }
                    isHealingActive={activeHealingCard === "weather"}
                    onHealingEnter={() => handleHealingEnter("weather")}
                    onHealingLeave={handleHealingLeave}
                    weather={result.weather}
                  />
                  <ActivitiesCard
                    activities={result.activities}
                    copy={copy}
                    healingMessage={
                      activeHealingCard === "activities"
                        ? activeHealingMessage
                        : null
                    }
                    isHealingActive={activeHealingCard === "activities"}
                    onHealingEnter={() => handleHealingEnter("activities")}
                    onHealingLeave={handleHealingLeave}
                  />
                </div>
              </div>

              <FooterMeta copy={copy} locale={dateLocale} meta={result.meta} />
            </section>
          ) : null}
        </div>
      </Content>
    </Layout>
  );
}
