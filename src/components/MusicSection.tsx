import {
  PlayCircleOutlined,
  RightOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card, Empty, Tag, Typography } from "antd";
import type { MusicTrack } from "../types/mood";

const { Text, Title } = Typography;

interface MusicSectionProps {
  music?: MusicTrack[];
}

function formatSource(source?: string) {
  if (!source) {
    return "Unknown source";
  }

  return source.charAt(0).toUpperCase() + source.slice(1);
}

export function MusicSection({ music }: MusicSectionProps) {
  const tracks = music ?? [];

  return (
    <Card bordered={false} className="glass-card section-card fade-up delay-5">
      <div className="section-header">
        <div>
          <Text className="card-kicker">Music Recommendations</Text>
          <Title level={3} className="section-title">
            Soundtrack for the moment
          </Title>
        </div>
        <div className="section-icon-shell">
          <SoundOutlined />
        </div>
      </div>

      {tracks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Music picks will appear here."
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
                  <Text className="music-title">{track.title ?? "Untitled Track"}</Text>
                  <Text className="music-artist">
                    {track.artist ?? "Unknown Artist"}
                  </Text>
                </div>
              </div>
              <div className="music-item-meta">
                <Tag className="source-tag">{formatSource(track.source)}</Tag>
                <RightOutlined />
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
