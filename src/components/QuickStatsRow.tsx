import {
  CloudOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import type { ReactNode } from "react";
import type { MoodPackData } from "../types/mood";

const { Text } = Typography;

interface QuickStatsRowProps {
  data: MoodPackData;
}

interface QuickStatItem {
  icon: ReactNode;
  label: string;
  value: string;
}

function formatTemperature(value?: number) {
  return typeof value === "number" ? `${value.toFixed(1)}°C` : "N/A";
}

export function QuickStatsRow({ data }: QuickStatsRowProps) {
  const location = data.location;
  const mood = data.mood;
  const weather = data.weather;

  const items: QuickStatItem[] = [
    {
      icon: <EnvironmentOutlined />,
      label: "Mapped Location",
      value: `${location?.city ?? "Unknown City"}, ${location?.country ?? "Unknown"}`,
    },
    {
      icon: <HeartOutlined />,
      label: "Current Mood",
      value: mood?.label ?? "Pending mood",
    },
    {
      icon: <CloudOutlined />,
      label: "Atmosphere",
      value: `${weather?.main ?? "Weather pending"} · ${formatTemperature(weather?.temperature)}`,
    },
  ];

  return (
    <Row gutter={[18, 18]} className="quick-stats-row fade-up delay-2">
      {items.map((item) => (
        <Col xs={24} md={8} key={item.label}>
          <Card bordered={false} className="glass-card quick-stat-card">
            <div className="quick-stat-topline">
              <div className="quick-stat-icon">{item.icon}</div>
              <Text className="quick-stat-label">{item.label}</Text>
            </div>
            <Text className="quick-stat-value">{item.value}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
