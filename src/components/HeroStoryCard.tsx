import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import type { LocaleCode, UiCopy } from "../i18n/translations";
import type { MoodStoryData } from "../types/moodStory";

const { Paragraph, Text, Title } = Typography;

interface HeroStoryCardProps {
  copy: UiCopy;
  data?: MoodStoryData | null;
  dateLocale: string;
  locale: LocaleCode;
  loading?: boolean;
}

function getLocalizedText(
  value: MoodStoryData["story"] | MoodStoryData["bestMoment"] | MoodStoryData["energyTip"],
  locale: LocaleCode,
) {
  if (!value) {
    return "";
  }

  return locale === "vi" ? value.vi ?? value.en ?? "" : value.en ?? value.vi ?? "";
}

function formatDate(value: string | undefined, locale: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function normalizeToken(value?: string) {
  return value?.trim().toLowerCase().replace(/[_\s]+/g, "-") ?? "default-nocturne";
}

function formatSource(source: string) {
  return source
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function HeroStoryCard({
  copy,
  data,
  dateLocale,
  locale,
  loading = false,
}: HeroStoryCardProps) {
  if (loading) {
    return (
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
    );
  }

  if (!data) {
    return null;
  }

  const localizedStory = getLocalizedText(data.story, locale);
  const bestMoment = getLocalizedText(data.bestMoment, locale);
  const energyTip = getLocalizedText(data.energyTip, locale);
  const quote = data.highlight?.quote;
  const track = data.highlight?.track;
  const sources = data.meta?.sources ?? [];
  const moodKey = data.mood?.key ?? "";
  const gradientClass = `gradient-${normalizeToken(data.visual?.gradient ?? data.mood?.theme)}`;
  const timeOfDayClass = `time-${normalizeToken(data.visual?.timeOfDay)}`;
  const generatedAt = formatDate(data.meta?.generatedAt, dateLocale);

  return (
    <Card
      bordered={false}
      className={`glass-card hero-story-card fade-up delay-2 ${gradientClass} ${timeOfDayClass}`}
    >
      <div className="hero-story-chrome" />

      <div className="hero-story-topline">
        <Text className="card-kicker">{copy.story.kicker}</Text>
        {generatedAt ? (
          <div className="hero-story-generated">
            <ClockCircleOutlined />
            <span>{copy.story.generatedAt}</span>
            <strong>{generatedAt}</strong>
          </div>
        ) : null}
      </div>

      <div className="hero-story-header">
        <div className="hero-story-header-copy">
          <Text className="hero-story-location">
            <EnvironmentOutlined />
            {data.city}
            {data.country ? `, ${data.country}` : ""}
          </Text>
          <Title level={2} className="hero-story-headline">
            {data.headline}
          </Title>
          <Paragraph className="hero-story-body">
            {localizedStory || copy.story.storyFallback}
          </Paragraph>

          <div className="hero-story-mood-row">
            {data.mood?.label ? (
              <Tag className="hero-story-mood-tag">{data.mood.label}</Tag>
            ) : null}
            {moodKey ? (
              <Text className="hero-story-mood-key">
                {copy.story.moodKeyLabel}: <span>{moodKey}</span>
              </Text>
            ) : null}
          </div>
        </div>

        <div className="hero-story-signals">
          <div className="hero-story-signal">
            <div className="hero-story-signal-icon">
              <SoundOutlined />
            </div>
            <div>
              <Text className="hero-story-signal-label">{copy.story.bestMoment}</Text>
              <Text className="hero-story-signal-value">{bestMoment}</Text>
            </div>
          </div>
          <div className="hero-story-signal">
            <div className="hero-story-signal-icon">
              <ThunderboltOutlined />
            </div>
            <div>
              <Text className="hero-story-signal-label">{copy.story.energyTip}</Text>
              <Text className="hero-story-signal-value">{energyTip}</Text>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-story-support-grid">
        {quote?.text ? (
          <div className="hero-story-support hero-story-support-quote">
          <div className="hero-story-support-label">
              <MessageOutlined />
              <span>{copy.story.highlightedQuote}</span>
            </div>
            <Paragraph className="hero-story-quote-text">{quote.text}</Paragraph>
            {quote.author ? (
              <Text className="hero-story-quote-author">— {quote.author}</Text>
            ) : null}
          </div>
        ) : null}

        <div className="hero-story-support hero-story-support-track">
          <div className="hero-story-support-label">
            <PlayCircleOutlined />
            <span>{copy.story.featuredTrack}</span>
          </div>
          {track?.url ? (
            <a
              className="hero-story-track-link"
              href={track.url}
              rel="noreferrer"
              target="_blank"
            >
              <div className="hero-story-track-copy">
                <Text className="hero-story-track-title">
                  {track.title || copy.story.trackFallback}
                </Text>
                {track.artist ? (
                  <Text className="hero-story-track-artist">{track.artist}</Text>
                ) : null}
              </div>
              <PlayCircleOutlined />
            </a>
          ) : (
            <div className="hero-story-track-fallback">
              <Text className="hero-story-track-title">{copy.story.trackFallback}</Text>
            </div>
          )}
        </div>
      </div>

      {sources.length > 0 ? (
        <div className="hero-story-footer">
          <Text className="hero-story-footer-label">{copy.story.connectedSources}</Text>
          <div className="tag-row">
            {sources.map((source) => (
              <Tag className="source-tag" key={source}>
                {formatSource(source)}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
