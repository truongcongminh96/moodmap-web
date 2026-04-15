import { ClockCircleOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import type { MoodMeta } from "../types/mood";

const { Paragraph, Text } = Typography;

interface FooterMetaProps {
  meta?: MoodMeta;
}

function formatDate(value?: string) {
  if (!value) {
    return "Waiting for a live timestamp";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
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

export function FooterMeta({ meta }: FooterMetaProps) {
  const sources = meta?.sources ?? [];

  return (
    <Card bordered={false} className="glass-card footer-card fade-up delay-7">
      <div className="footer-meta">
        <div className="footer-copy">
          <Text className="card-kicker">Sources</Text>
          <Paragraph className="footer-note">
            Powered by weather, quotes, and music.
          </Paragraph>
          <div className="footer-line">
            <ClockCircleOutlined />
            <span>{formatDate(meta?.requestedAt)}</span>
          </div>
        </div>

        <div className="footer-tags">
          <div className="footer-line footer-line-title">
            <DatabaseOutlined />
            <span>Connected sources</span>
          </div>
          <div className="tag-row">
            {sources.length > 0 ? (
              sources.map((source) => (
                <Tag className="source-tag" key={source}>
                  {formatSource(source)}
                </Tag>
              ))
            ) : (
              <Tag className="source-tag">No sources listed</Tag>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
