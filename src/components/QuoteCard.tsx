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
    <Card bordered={false} className="glass-card quote-card quote-editorial-card fade-up delay-4">
      <div className="quote-editorial-topline">
        <Text className="card-kicker">{copy.quote.kicker}</Text>
        <span className="quote-editorial-rule" />
      </div>

      <div className="quote-shell">
        <span className="quote-mark">“</span>
        <blockquote className="quote-block quote-block-editorial">
          <Paragraph className="quote-text">
            {quote?.text ?? copy.quote.fallbackText}
          </Paragraph>

          <div className="quote-credit">
            <span className="quote-credit-line" />
            <Text className="quote-author">
              {quote?.author ?? copy.common.unknownAuthor}
            </Text>
          </div>
        </blockquote>
      </div>
    </Card>
  );
}
