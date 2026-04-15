import { ClockCircleOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";
import type { MoodMeta } from "../types/mood";

const { Paragraph, Text } = Typography;

interface FooterMetaProps {
  copy: UiCopy;
  locale: string;
  meta?: MoodMeta;
}

function formatDate(value: string | undefined, locale: string, fallback: string) {
  if (!value) {
    return fallback;
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

function formatSource(source: string) {
  return source
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function FooterMeta({ copy, locale, meta }: FooterMetaProps) {
  const sources = meta?.sources ?? [];

  return (
    <Card bordered={false} className="glass-card footer-card fade-up delay-7">
      <div className="footer-meta">
        <div className="footer-copy">
          <Text className="card-kicker">{copy.footer.kicker}</Text>
          <Paragraph className="footer-note">
            {copy.footer.note}
          </Paragraph>
          <div className="footer-line">
            <ClockCircleOutlined />
            <span>
              {copy.footer.timestampLabel}:{" "}
              {formatDate(meta?.requestedAt, locale, copy.footer.waitingTimestamp)}
            </span>
          </div>
        </div>

        <div className="footer-tags">
          <div className="footer-line footer-line-title">
            <DatabaseOutlined />
            <span>{copy.footer.connectedSources}</span>
          </div>
          <div className="tag-row">
            {sources.length > 0 ? (
              sources.map((source) => (
                <Tag className="source-tag" key={source}>
                  {formatSource(source)}
                </Tag>
              ))
            ) : (
              <Tag className="source-tag">{copy.footer.noSources}</Tag>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
