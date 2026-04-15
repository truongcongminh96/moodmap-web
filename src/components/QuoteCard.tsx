import { Card, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";
import type { QuoteInfo } from "../types/mood";

const { Paragraph, Text } = Typography;

interface QuoteCardProps {
  copy: UiCopy;
  quote?: QuoteInfo;
}

export function QuoteCard({ copy, quote }: QuoteCardProps) {
  return (
    <Card bordered={false} className="glass-card quote-card fade-up delay-4">
      <Text className="card-kicker">{copy.quote.kicker}</Text>

      <div className="quote-shell">
        <span className="quote-mark">“</span>
        <blockquote className="quote-block">
          <Paragraph className="quote-text">
            {quote?.text ?? copy.quote.fallbackText}
          </Paragraph>
          <Text className="quote-author">— {quote?.author ?? copy.common.unknownAuthor}</Text>
        </blockquote>
      </div>
    </Card>
  );
}
