import {
  PlayCircleOutlined,
  RightOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card, Empty, Tag, Typography } from "antd";
import type { CSSProperties, FocusEvent, MouseEvent, PointerEvent } from "react";
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
  timeOfDayLabel: string;
  timeOfDaySoundtrack: string;
}

function formatSource(source: string) {
  return source
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildWaveformPattern(track: MusicTrack, index: number) {
  const seed = `${track.title ?? "track"}-${track.artist ?? "artist"}-${index}`;
  const codes = Array.from(seed).map((character) => character.charCodeAt(0));

  return Array.from({ length: 9 }, (_, barIndex) => {
    const code = codes[barIndex % codes.length] ?? 77;

    return 28 + (code % 52);
  });
}

function setMagneticHoverState(
  element: HTMLElement,
  {
    active,
    clientX,
    clientY,
  }: {
    active: boolean;
    clientX?: number;
    clientY?: number;
  },
) {
  if (!active || clientX === undefined || clientY === undefined) {
    element.style.setProperty("--music-hover-x", "50%");
    element.style.setProperty("--music-hover-y", "50%");
    element.style.setProperty("--music-offset-x", "0px");
    element.style.setProperty("--music-offset-y", "0px");
    element.style.setProperty("--music-tilt-x", "0deg");
    element.style.setProperty("--music-tilt-y", "0deg");
    element.classList.remove("is-magnetic-active");

    return;
  }

  const bounds = element.getBoundingClientRect();
  const xRatio = (clientX - bounds.left) / bounds.width;
  const yRatio = (clientY - bounds.top) / bounds.height;
  const tiltY = (xRatio - 0.5) * 8;
  const tiltX = (0.5 - yRatio) * 7;
  const offsetX = (xRatio - 0.5) * 10;
  const offsetY = (yRatio - 0.5) * 8;

  element.style.setProperty("--music-hover-x", `${xRatio * 100}%`);
  element.style.setProperty("--music-hover-y", `${yRatio * 100}%`);
  element.style.setProperty("--music-offset-x", `${offsetX}px`);
  element.style.setProperty("--music-offset-y", `${offsetY}px`);
  element.style.setProperty("--music-tilt-x", `${tiltX}deg`);
  element.style.setProperty("--music-tilt-y", `${tiltY}deg`);
  element.classList.add("is-magnetic-active");
}

function setPanelParallaxState(
  element: HTMLElement,
  {
    active,
    clientX,
    clientY,
  }: {
    active: boolean;
    clientX?: number;
    clientY?: number;
  },
) {
  if (!active || clientX === undefined || clientY === undefined) {
    element.style.setProperty("--music-panel-hover-x", "50%");
    element.style.setProperty("--music-panel-hover-y", "24%");
    element.style.setProperty("--music-panel-pan-x", "0px");
    element.style.setProperty("--music-panel-pan-y", "0px");
    element.classList.remove("is-panel-parallax-active");

    return;
  }

  const bounds = element.getBoundingClientRect();
  const xRatio = (clientX - bounds.left) / bounds.width;
  const yRatio = (clientY - bounds.top) / bounds.height;
  const panX = (xRatio - 0.5) * 24;
  const panY = (yRatio - 0.5) * 18;

  element.style.setProperty("--music-panel-hover-x", `${xRatio * 100}%`);
  element.style.setProperty("--music-panel-hover-y", `${yRatio * 100}%`);
  element.style.setProperty("--music-panel-pan-x", `${panX}px`);
  element.style.setProperty("--music-panel-pan-y", `${panY}px`);
  element.classList.add("is-panel-parallax-active");
}

export function MusicSection({
  copy,
  healingMessage,
  isHealingActive,
  music,
  onHealingEnter,
  onHealingLeave,
  timeOfDayLabel,
  timeOfDaySoundtrack,
}: MusicSectionProps) {
  const tracks = music ?? [];

  const handlePanelMove = (event: MouseEvent<HTMLDivElement>) => {
    setPanelParallaxState(event.currentTarget, {
      active: true,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const handlePanelEnter = (event: MouseEvent<HTMLDivElement>) => {
    onHealingEnter();
    setPanelParallaxState(event.currentTarget, {
      active: true,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const handlePanelLeave = (event: MouseEvent<HTMLDivElement>) => {
    onHealingLeave();
    setPanelParallaxState(event.currentTarget, { active: false });
  };

  const handleTrackMove = (event: MouseEvent<HTMLAnchorElement>) => {
    setMagneticHoverState(event.currentTarget, {
      active: true,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const handleTrackLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    setMagneticHoverState(event.currentTarget, { active: false });
  };

  const handleTrackFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setMagneticHoverState(event.currentTarget, {
      active: true,
      clientX: bounds.left + bounds.width / 2,
      clientY: bounds.top + bounds.height / 2,
    });
  };

  const handleTrackBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    setMagneticHoverState(event.currentTarget, { active: false });
  };

  const handleTrackPointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement | null;

    if (!target?.closest(".music-play-icon")) {
      return;
    }

    const track = event.currentTarget;

    track.classList.add("is-play-pressed");
    window.setTimeout(() => {
      track.classList.remove("is-play-pressed");
    }, 220);
  };

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
      onMouseEnter={handlePanelEnter}
      onMouseLeave={handlePanelLeave}
      onMouseMove={handlePanelMove}
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

      <div className="music-personalization">
        <Text className="music-personalization-kicker">
          {copy.timeOfDay.soundtrackMode}
        </Text>
        <Text className="music-personalization-copy">
          {timeOfDayLabel} · {timeOfDaySoundtrack}
        </Text>
      </div>

      {tracks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={copy.music.empty}
          className="mood-empty"
        />
      ) : (
        <div className="music-list">
          {tracks.map((track, index) => {
            const waveformBars = buildWaveformPattern(track, index);

            return (
              <a
                className="music-item"
                href={track.trackUrl || undefined}
                key={`${track.title ?? "track"}-${index}`}
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleTrackMove}
                onMouseLeave={handleTrackLeave}
                onFocus={handleTrackFocus}
                onBlur={handleTrackBlur}
                onPointerDown={handleTrackPointerDown}
              >
                <div className="music-item-copy">
                  <div className="music-play-icon">
                    <PlayCircleOutlined />
                  </div>
                  <div className="music-copy-stack">
                    <div className="music-copy-head">
                      <Text className="music-title">
                        {track.title ?? copy.common.untitledTrack}
                      </Text>
                      <Text className="music-track-index">
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                    </div>
                    <Text className="music-artist">
                      {track.artist ?? copy.common.unknownArtist}
                    </Text>
                  </div>
                </div>

                <div className="music-item-visual">
                  <div className="music-waveform" aria-hidden="true">
                    {waveformBars.map((height, barIndex) => {
                      const barStyle = {
                        "--wave-bar-height": `${height}%`,
                        "--wave-bar-delay": `${barIndex * 0.08}s`,
                      } as CSSProperties;

                      return (
                        <span
                          className="music-waveform-bar"
                          key={`${track.title ?? "track"}-bar-${barIndex}`}
                          style={barStyle}
                        />
                      );
                    })}
                  </div>

                  <div className="music-item-meta">
                    <Tag className="source-tag">{getSourceLabel(track.source)}</Tag>
                    <Text className="music-open-track">{copy.music.openTrack}</Text>
                    <RightOutlined />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </Card>
  );
}
