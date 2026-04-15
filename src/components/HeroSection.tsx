import { RadarChartOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import type { MoodSceneSelection } from "../theme/moodScene";
import { SearchBar } from "./SearchBar";

const { Paragraph, Text, Title } = Typography;

interface HeroSectionProps {
  city: string;
  loading: boolean;
  sceneMenuOpen: boolean;
  moodSceneSelection: MoodSceneSelection;
  moodSceneOptions: ReadonlyArray<{ value: MoodSceneSelection; label: string }>;
  sceneLabel: string;
  sceneDescription: string;
  isSceneAuto: boolean;
  onCityChange: (value: string) => void;
  onSceneMenuOpenChange: (open: boolean) => void;
  onMoodSceneChange: (value: MoodSceneSelection) => void;
  onSubmit: () => void;
}

export function HeroSection({
  city,
  loading,
  sceneMenuOpen,
  moodSceneSelection,
  moodSceneOptions,
  sceneLabel,
  sceneDescription,
  isSceneAuto,
  onCityChange,
  onSceneMenuOpenChange,
  onMoodSceneChange,
  onSubmit,
}: HeroSectionProps) {
  return (
    <header className="hero-section fade-up delay-1">
      <Tag className="live-badge" icon={<RadarChartOutlined />}>
        Live Mood Pack
      </Tag>

      <div className="hero-glow" />

      <Text className="hero-eyebrow">A cinematic mood dashboard for cities</Text>
      <Title level={1} className="hero-title">
        MoodMap
      </Title>
      <Paragraph className="hero-subtitle">
        Discover your city's mood through weather, music, and quotes.
      </Paragraph>

      <SearchBar
        city={city}
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
          <Text className="scene-indicator-label">Mood Lens</Text>
          <Text className="scene-indicator-value">
            {sceneLabel} {isSceneAuto ? "· Auto" : "· Preview"}
          </Text>
        </div>
        <Paragraph className="hero-scene-description">{sceneDescription}</Paragraph>
        <Text className="hero-support-note">
          Powered by weather, quotes, and music.
        </Text>
      </div>
    </header>
  );
}
