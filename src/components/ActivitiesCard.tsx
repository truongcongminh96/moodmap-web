import { CheckCircleFilled, ThunderboltOutlined } from "@ant-design/icons";
import { Card, Empty, Typography } from "antd";

const { Text, Title } = Typography;

interface ActivitiesCardProps {
  activities?: string[];
}

export function ActivitiesCard({ activities }: ActivitiesCardProps) {
  const items = activities ?? [];

  return (
    <Card bordered={false} className="glass-card section-card fade-up delay-6">
      <div className="section-header">
        <div>
          <Text className="card-kicker">Activities</Text>
          <Title level={3} className="section-title">
            Gentle ways to lean into it
          </Title>
        </div>
        <div className="section-icon-shell">
          <ThunderboltOutlined />
        </div>
      </div>

      {items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Activity ideas will appear here."
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
