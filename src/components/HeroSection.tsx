import { RadarChartOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import type { LocaleCode, UiCopy } from "../i18n/translations";
import type { MoodSceneSelection } from "../theme/moodScene";
import { SearchBar } from "./SearchBar";

const { Paragraph, Text, Title } = Typography;

interface HeroSectionProps {
  city: string;
  loading: boolean;
  locale: LocaleCode;
  copy: UiCopy;
  sceneMenuOpen: boolean;
  moodSceneSelection: MoodSceneSelection;
  moodSceneOptions: ReadonlyArray<{ value: MoodSceneSelection; label: string }>;
  sceneLabel: string;
  sceneDescription: string;
  isSceneAuto: boolean;
  onCityChange: (value: string) => void;
  onLocaleChange: (locale: LocaleCode) => void;
  onSceneMenuOpenChange: (open: boolean) => void;
  onMoodSceneChange: (value: MoodSceneSelection) => void;
  onSubmit: () => void;
}

export function HeroSection({
  city,
  loading,
  locale,
  copy,
  sceneMenuOpen,
  moodSceneSelection,
  moodSceneOptions,
  sceneLabel,
  sceneDescription,
  isSceneAuto,
  onCityChange,
  onLocaleChange,
  onSceneMenuOpenChange,
  onMoodSceneChange,
  onSubmit,
}: HeroSectionProps) {
  return (
    <header className="hero-section fade-up delay-1">
      <div className="hero-topbar">
        <div className="hero-control-rail">
          <Tag className="live-badge" icon={<RadarChartOutlined />}>
            {copy.hero.liveBadge}
          </Tag>
          <div
            aria-label={copy.hero.languageLabel}
            className="locale-switcher"
            role="group"
          >
            <span className="locale-switcher-label">{copy.hero.languageLabel}</span>
            {(["en", "vi"] as const).map((option) => (
              <button
                className={`locale-pill ${locale === option ? "is-active" : ""}`}
                key={option}
                onClick={() => onLocaleChange(option)}
                type="button"
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-glow" />

      <Text className="hero-eyebrow">{copy.hero.eyebrow}</Text>
      <Title level={1} className="hero-title">
        MoodMap
      </Title>
      <Paragraph className="hero-subtitle">{copy.hero.subtitle}</Paragraph>

      <SearchBar
        city={city}
        copy={copy}
        loading={loading}
        sceneMenuOpen={sceneMenuOpen}
        moodSceneSelection={moodSceneSelection}
        moodSceneOptions={moodSceneOptions}
        onCityChange={onCityChange}
        onSceneMenuOpenChange={onSceneMenuOpenChange}
        onMoodSceneChange={onMoodSceneChange}
        onSubmit={onSubmit}
      />

      <div className={`hero-scene-panel ${sceneMenuOpen ? "is-obscured" : ""}`}>
        <div className="scene-indicator">
          <Text className="scene-indicator-label">{copy.hero.moodLens}</Text>
          <Text className="scene-indicator-value">
            {sceneLabel} {isSceneAuto ? `· ${copy.hero.autoMode}` : `· ${copy.hero.previewMode}`}
          </Text>
        </div>
        <Paragraph className="hero-scene-description">{sceneDescription}</Paragraph>
        <Text className="hero-support-note">{copy.hero.supportNote}</Text>
      </div>
    </header>
  );
}
