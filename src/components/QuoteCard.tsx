import { Card, Typography } from "antd";
import type { QuoteInfo } from "../types/mood";

const { Paragraph, Text } = Typography;

interface QuoteCardProps {
  quote?: QuoteInfo;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card bordered={false} className="glass-card quote-card fade-up delay-4">
      <Text className="card-kicker">Quote</Text>

      <div className="quote-shell">
        <span className="quote-mark">“</span>
        <blockquote className="quote-block">
          <Paragraph className="quote-text">
            {quote?.text ??
              "A thoughtful line will appear here when the mood pack arrives."}
          </Paragraph>
          <Text className="quote-author">— {quote?.author ?? "Unknown Author"}</Text>
        </blockquote>
      </div>
    </Card>
  );
}
