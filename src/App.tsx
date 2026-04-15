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
import { getHealingMessageEntry } from "./constants/healingMessages";
import { useLocale } from "./i18n/useLocale";
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
type HealingCardId = "overview" | "weather" | "music" | "activities";

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

      <div className="content-grid">
        <div className="content-column">
          <Card bordered={false} className="glass-card quote-card skeleton-card fade-up delay-4">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
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
  const controllerRef = useRef<AbortController | null>(null);
  const motionRootRef = useRef<HTMLDivElement | null>(null);
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
  const visibleParticles = PARTICLE_LAYOUT.slice(
    0,
    activeScene.profile.palette.particleCount,
  );
  const activeHealingMessage = activeHealingEntry?.[locale] ?? null;
  const shouldShowStorySkeleton = storyLoading && !story && !isInitialLoading;

  const handleHealingEnter = (cardId: HealingCardId) => {
    setActiveHealingCard(cardId);
    setActiveHealingEntry(getHealingMessageEntry(result?.mood?.key));
  };

  const handleHealingLeave = () => {
    setActiveHealingCard(null);
    setActiveHealingEntry(null);
  };

  const loadMoodPack = async (requestedCity?: string) => {
    const trimmedCity = (requestedCity ?? city).trim();

    if (!trimmedCity) {
      setErrorMessage(copy.states.cityRequired);
      return;
    }

    setCity(trimmedCity);
    setLoading(true);
    setStoryLoading(true);
    setErrorMessage(null);

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
    void loadMoodPack(DEFAULT_CITY);

    return () => {
      controllerRef.current?.abort();
    };
  }, []);

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
    <Layout className={`app-shell scene-${activeScene.profile.id}`} style={themeVars}>
      <div className="ambient-layer">
        <div className="ambient-orb ambient-orb-left" />
        <div className="ambient-orb ambient-orb-right" />
        <div className="ambient-grid" />
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
      </div>

      <Content className="page-content">
        <div className="page-motion-root" ref={motionRootRef}>
          <HeroSection
            city={city}
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
              void loadMoodPack();
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
                      void loadMoodPack();
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
                      void loadMoodPack();
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
                      void loadMoodPack(DEFAULT_CITY);
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
                moodThemeLabel={activeMoodThemeLabel}
                onHealingEnter={() => handleHealingEnter("overview")}
                onHealingLeave={handleHealingLeave}
                sceneLabel={sceneLabel}
                sceneModeLabel={sceneModeLabel}
              />

              <div className="content-grid">
                <div className="content-column">
                  <QuoteCard copy={copy} quote={result.quote} />
                  <MusicSection
                    copy={copy}
                    healingMessage={
                      activeHealingCard === "music" ? activeHealingMessage : null
                    }
                    isHealingActive={activeHealingCard === "music"}
                    music={result.music}
                    onHealingEnter={() => handleHealingEnter("music")}
                    onHealingLeave={handleHealingLeave}
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
