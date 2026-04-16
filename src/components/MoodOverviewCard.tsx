import {
  CompassOutlined,
  EnvironmentOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";
import type { MoodPackData } from "../types/mood";

const { Paragraph, Text, Title } = Typography;

interface MoodOverviewCardProps {
  copy: UiCopy;
  data: MoodPackData;
  healingMessage?: string | null;
  isHealingActive: boolean;
  localTimeLabel: string;
  localTimeValue: string;
  moodThemeLabel: string;
  onHealingEnter: () => void;
  onHealingLeave: () => void;
  sceneLabel: string;
  sceneModeLabel: string;
  timeOfDayLabel: string;
  timeOfDayNote: string;
}

function formatConfidence(value: number | undefined, fallback: string) {
  if (typeof value !== "number") {
    return fallback;
  }

  return `${Math.round(value * 100)}%`;
}

function formatThemeLabel(theme: string | undefined, fallback: string) {
  if (!theme) {
    return fallback;
  }

  const normalized = theme.trim().toLowerCase().replace(/[_\s]+/g, "-");

  if (
    normalized === "cloudy-silver" ||
    normalized === "sunny-gold" ||
    normalized === "rainy-indigo" ||
    normalized === "midnight-velvet" ||
    normalized === "calm-soft" ||
    normalized === "reflective-blue"
  ) {
    return fallback;
  }

  return theme
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function MoodOverviewCard({
  copy,
  data,
  healingMessage,
  isHealingActive,
  localTimeLabel,
  localTimeValue,
  moodThemeLabel,
  onHealingEnter,
  onHealingLeave,
  sceneLabel,
  sceneModeLabel,
  timeOfDayLabel,
  timeOfDayNote,
}: MoodOverviewCardProps) {
  const location = data.location;
  const mood = data.mood;
  const weather = data.weather;
  const summary =
    data.summary ?? copy.overview.summaryFallback;
  const confidencePercentage =
    typeof mood?.confidence === "number" ? Math.round(mood.confidence * 100) : 0;
  const confidenceFill = Math.max(32, Math.round(confidencePercentage * 3.6));

  return (
    <Card
      bordered={false}
      className={`glass-card mood-overview-card healing-card fade-up delay-3 ${
        isHealingActive ? "is-healing-active" : ""
      }`}
      onMouseEnter={onHealingEnter}
      onMouseLeave={onHealingLeave}
    >
      <div className="card-kicker-row">
        <Text className="card-kicker">{copy.overview.kicker}</Text>
        <Text className="card-micro-note">{sceneModeLabel}</Text>
      </div>

      <div className={`healing-whisper ${isHealingActive ? "is-visible" : ""}`}>
        {healingMessage}
      </div>

      <div className="overview-grid">
        <div className="overview-copy">
          <Text className="location-line">
            <EnvironmentOutlined />
            {location?.city ?? copy.common.unknownCity}
            {location?.country ? `, ${location.country}` : `, ${copy.common.unknown}`}
          </Text>
          <Title level={2} className="overview-title">
            {mood?.label ?? copy.common.pendingMood}
          </Title>
          <Paragraph className="overview-summary">{summary}</Paragraph>

          <div className="time-signal-strip">
            <Text className="time-signal-kicker">{copy.timeOfDay.kicker}</Text>
            <div className="time-signal-main">
              <Text className="time-signal-pill">{timeOfDayLabel}</Text>
              <Text className="time-signal-note">{timeOfDayNote}</Text>
            </div>
            <Text className="time-signal-clock">
              {localTimeLabel} · {localTimeValue}
            </Text>
          </div>

          <div className="metric-grid">
            <div className="metric-tile">
              <Text className="metric-label">{copy.overview.weatherPulse}</Text>
              <Text className="metric-value">
                {weather?.main ?? copy.weather.fallbackTitle} · {weather?.description ?? copy.overview.weatherFallbackDetail}
              </Text>
            </div>
            <div className="metric-tile">
              <Text className="metric-label">{copy.overview.moodTheme}</Text>
              <Text className="metric-value">
                {formatThemeLabel(mood?.theme, moodThemeLabel)}
              </Text>
            </div>
            <div className="metric-tile metric-tile-scene">
              <Text className="metric-label">{copy.overview.cinematicScene}</Text>
              <Text className="metric-value">{sceneLabel}</Text>
            </div>
          </div>
        </div>

        <div className="overview-side-panel">
          <div
            className="confidence-ring"
            style={{
              background: `conic-gradient(from 215deg, rgba(var(--accent-rgb), 0.96) 0deg ${confidenceFill}deg, rgba(255, 255, 255, 0.08) ${confidenceFill}deg 360deg)`,
            }}
          >
            <div className="confidence-core">
              <Text className="confidence-label">{copy.overview.confidence}</Text>
              <Title level={2} className="confidence-value">
                {formatConfidence(mood?.confidence, copy.common.unavailable)}
              </Title>
              <Text className="confidence-caption">{copy.overview.signalStrength}</Text>
            </div>
          </div>

          <div className="status-pills">
            <div className="status-pill">
              <CompassOutlined />
              <span>{copy.overview.mappedCity(location?.city ?? copy.common.city)}</span>
            </div>
            <div className="status-pill">
              <SoundOutlined />
              <span>{copy.overview.trackPicks(data.music?.length ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
