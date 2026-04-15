import {
  PlayCircleOutlined,
  RightOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card, Empty, Tag, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";
import type { MusicTrack } from "../types/mood";

const { Text, Title } = Typography;

interface MusicSectionProps {
  copy: UiCopy;
  healingMessage?: string | null;
  isHealingActive: boolean;
  music?: MusicTrack[];
  onHealingEnter: () => void;
  onHealingLeave: () => void;
}

function formatSource(source: string) {
  return source
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function MusicSection({
  copy,
  healingMessage,
  isHealingActive,
  music,
  onHealingEnter,
  onHealingLeave,
}: MusicSectionProps) {
  const tracks = music ?? [];

  const getSourceLabel = (source?: string) => {
  if (!source) {
      return copy.common.unknownSource;
  }

    return formatSource(source);
  };

  return (
    <Card
      bordered={false}
      className={`glass-card section-card music-card healing-card fade-up delay-5 ${
        isHealingActive ? "is-healing-active" : ""
      }`}
      onMouseEnter={onHealingEnter}
      onMouseLeave={onHealingLeave}
    >
      <div className="section-header">
        <div>
          <Text className="card-kicker">{copy.music.kicker}</Text>
          <Title level={3} className="section-title">
            {copy.music.title}
          </Title>
        </div>
        <div className="section-icon-shell">
          <SoundOutlined />
        </div>
      </div>

      <div className={`healing-whisper ${isHealingActive ? "is-visible" : ""}`}>
        {healingMessage}
      </div>

      {tracks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={copy.music.empty}
          className="mood-empty"
        />
      ) : (
        <div className="music-list">
          {tracks.map((track, index) => (
            <a
              className="music-item"
              href={track.trackUrl || undefined}
              key={`${track.title ?? "track"}-${index}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="music-item-copy">
                <div className="music-play-icon">
                  <PlayCircleOutlined />
                </div>
                <div>
                  <Text className="music-title">
                    {track.title ?? copy.common.untitledTrack}
                  </Text>
                  <Text className="music-artist">
                    {track.artist ?? copy.common.unknownArtist}
                  </Text>
                </div>
              </div>
              <div className="music-item-meta">
                <Tag className="source-tag">{getSourceLabel(track.source)}</Tag>
                <RightOutlined />
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
