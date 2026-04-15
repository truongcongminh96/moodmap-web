import {
  CompassOutlined,
  EnvironmentOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import type { MoodPackData } from "../types/mood";

const { Paragraph, Text, Title } = Typography;

interface MoodOverviewCardProps {
  data: MoodPackData;
  sceneLabel: string;
  sceneModeLabel: string;
}

function formatConfidence(value?: number) {
  if (typeof value !== "number") {
    return "N/A";
  }

  return `${Math.round(value * 100)}%`;
}

function formatThemeLabel(theme?: string) {
  if (!theme) {
    return "Signature";
  }

  return theme
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function MoodOverviewCard({
  data,
  sceneLabel,
  sceneModeLabel,
}: MoodOverviewCardProps) {
  const location = data.location;
  const mood = data.mood;
  const weather = data.weather;
  const summary =
    data.summary ??
    "A refined blend of weather, sound, and story is on the way.";
  const confidencePercentage =
    typeof mood?.confidence === "number" ? Math.round(mood.confidence * 100) : 0;
  const confidenceFill = Math.max(32, Math.round(confidencePercentage * 3.6));

  return (
    <Card bordered={false} className="glass-card mood-overview-card fade-up delay-3">
      <div className="card-kicker-row">
        <Text className="card-kicker">Mood Overview</Text>
        <Text className="card-micro-note">{sceneModeLabel}</Text>
      </div>

      <div className="overview-grid">
        <div className="overview-copy">
          <Text className="location-line">
            <EnvironmentOutlined />
            {location?.city ?? "Unknown City"}
            {location?.country ? `, ${location.country}` : ", Unknown"}
          </Text>
          <Title level={2} className="overview-title">
            {mood?.label ?? "Untitled Mood"}
          </Title>
          <Paragraph className="overview-summary">{summary}</Paragraph>

          <div className="metric-grid">
            <div className="metric-tile">
              <Text className="metric-label">Weather Pulse</Text>
              <Text className="metric-value">
                {weather?.main ?? "Atmospheric"} · {weather?.description ?? "quiet skies"}
              </Text>
            </div>
            <div className="metric-tile">
              <Text className="metric-label">Mood Theme</Text>
              <Text className="metric-value">{formatThemeLabel(mood?.theme)}</Text>
            </div>
            <div className="metric-tile metric-tile-scene">
              <Text className="metric-label">Cinematic Scene</Text>
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
              <Text className="confidence-label">Confidence</Text>
              <Title level={2} className="confidence-value">
                {formatConfidence(mood?.confidence)}
              </Title>
              <Text className="confidence-caption">Signal strength</Text>
            </div>
          </div>

          <div className="status-pills">
            <div className="status-pill">
              <CompassOutlined />
              <span>{location?.city ?? "City"} mapped</span>
            </div>
            <div className="status-pill">
              <SoundOutlined />
              <span>{data.music?.length ?? 0} track picks</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
