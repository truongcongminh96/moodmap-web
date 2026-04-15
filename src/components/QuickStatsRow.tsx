import {
  CloudOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import type { ReactNode } from "react";
import type { UiCopy } from "../i18n/translations";
import type { MoodPackData } from "../types/mood";

const { Text } = Typography;

interface QuickStatsRowProps {
  copy: UiCopy;
  data: MoodPackData;
}

interface QuickStatItem {
  icon: ReactNode;
  label: string;
  value: string;
}

function formatTemperature(value: number | undefined, fallback: string) {
  return typeof value === "number" ? `${value.toFixed(1)}°C` : fallback;
}

export function QuickStatsRow({ copy, data }: QuickStatsRowProps) {
  const location = data.location;
  const mood = data.mood;
  const weather = data.weather;

  const items: QuickStatItem[] = [
    {
      icon: <EnvironmentOutlined />,
      label: copy.quickStats.mappedLocation,
      value: `${location?.city ?? copy.common.unknownCity}, ${location?.country ?? copy.common.unknown}`,
    },
    {
      icon: <HeartOutlined />,
      label: copy.quickStats.currentMood,
      value: mood?.label ?? copy.common.pendingMood,
    },
    {
      icon: <CloudOutlined />,
      label: copy.quickStats.atmosphere,
      value: `${weather?.main ?? copy.common.weatherPending} · ${formatTemperature(weather?.temperature, copy.common.unavailable)}`,
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
