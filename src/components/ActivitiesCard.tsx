import { CheckCircleFilled, ThunderboltOutlined } from "@ant-design/icons";
import { Card, Empty, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";

const { Text, Title } = Typography;

interface ActivitiesCardProps {
  copy: UiCopy;
  activities?: string[];
  healingMessage?: string | null;
  isHealingActive: boolean;
  onHealingEnter: () => void;
  onHealingLeave: () => void;
}

export function ActivitiesCard({
  copy,
  activities,
  healingMessage,
  isHealingActive,
  onHealingEnter,
  onHealingLeave,
}: ActivitiesCardProps) {
  const items = activities ?? [];

  return (
    <Card
      bordered={false}
      className={`glass-card section-card activities-card healing-card fade-up delay-6 ${
        isHealingActive ? "is-healing-active" : ""
      }`}
      onMouseEnter={onHealingEnter}
      onMouseLeave={onHealingLeave}
    >
      <div className="section-header">
        <div>
          <Text className="card-kicker">{copy.activities.kicker}</Text>
          <Title level={3} className="section-title">
            {copy.activities.title}
          </Title>
        </div>
        <div className="section-icon-shell">
          <ThunderboltOutlined />
        </div>
      </div>

      <div className={`healing-whisper ${isHealingActive ? "is-visible" : ""}`}>
        {healingMessage}
      </div>

      {items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={copy.activities.empty}
          className="mood-empty"
        />
      ) : (
        <div className="activities-list">
          {items.map((activity, index) => (
            <div className="activity-row" key={`${activity}-${index}`}>
              <div className="activity-row-icon">
                <CheckCircleFilled />
              </div>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
