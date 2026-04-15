import { CloudOutlined } from "@ant-design/icons";
import { Card, Statistic, Typography } from "antd";
import type { UiCopy } from "../i18n/translations";
import type { WeatherInfo } from "../types/mood";

const { Paragraph, Text, Title } = Typography;

interface WeatherCardProps {
  copy: UiCopy;
  healingMessage?: string | null;
  isHealingActive: boolean;
  onHealingEnter: () => void;
  onHealingLeave: () => void;
  weather?: WeatherInfo;
}

function formatTemperature(value: number | undefined, fallback: string) {
  return typeof value === "number" ? `${value.toFixed(1)}°C` : fallback;
}

function getStatisticValue(value?: number) {
  if (typeof value !== "number") {
    return {
      value: "--",
      precision: undefined,
    };
  }

  return {
    value,
    precision: 1,
  };
}

export function WeatherCard({
  copy,
  healingMessage,
  isHealingActive,
  onHealingEnter,
  onHealingLeave,
  weather,
}: WeatherCardProps) {
  const iconUrl = weather?.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  const temperatureStat = getStatisticValue(weather?.temperature);
  const feelsLikeStat = getStatisticValue(weather?.feelsLike);

  return (
    <Card
      bordered={false}
      className={`glass-card weather-card healing-card fade-up delay-4 ${
        isHealingActive ? "is-healing-active" : ""
      }`}
      onMouseEnter={onHealingEnter}
      onMouseLeave={onHealingLeave}
    >
      <div className="section-header">
        <div>
          <Text className="card-kicker">{copy.weather.kicker}</Text>
          <Title level={3} className="section-title weather-card-title">
            {weather?.main ?? copy.weather.fallbackTitle}
          </Title>
        </div>
        <div className="section-icon-shell section-icon-shell-weather">
          <CloudOutlined />
        </div>
      </div>

      <div className={`healing-whisper ${isHealingActive ? "is-visible" : ""}`}>
        {healingMessage}
      </div>

      <div className="weather-top">
        <div className="weather-copy">
          <Statistic
            className="weather-hero-stat"
            title={copy.weather.temperature}
            value={temperatureStat.value}
            precision={temperatureStat.precision}
            suffix={typeof weather?.temperature === "number" ? "°C" : ""}
          />
          <Paragraph className="weather-description">
            {weather?.description ?? copy.weather.fallbackDescription}
          </Paragraph>
        </div>

        <div className="weather-visual">
          {iconUrl ? (
            <img
              className="weather-icon"
              src={iconUrl}
              alt={weather?.description ?? copy.weather.iconAlt}
            />
          ) : (
            <div className="weather-icon weather-icon-fallback">
              <CloudOutlined />
            </div>
          )}
        </div>
      </div>

      <div className="weather-stats">
        <div className="weather-stat-panel">
          <Statistic
            title={copy.weather.feelsLike}
            value={feelsLikeStat.value}
            precision={feelsLikeStat.precision}
            suffix={typeof weather?.feelsLike === "number" ? "°C" : ""}
          />
        </div>
        <div className="weather-stat-panel">
          <Statistic
            title={copy.weather.humidity}
            value={typeof weather?.humidity === "number" ? weather.humidity : "--"}
            suffix={typeof weather?.humidity === "number" ? "%" : ""}
          />
        </div>
        <div className="weather-stat-panel weather-stat-panel-text">
          <Text className="stat-label">{copy.weather.conditions}</Text>
          <Text className="stat-value">{weather?.main ?? copy.common.unknown}</Text>
          <Text className="weather-stat-detail">
            {formatTemperature(weather?.temperature, copy.common.unavailable)}
          </Text>
        </div>
      </div>

    </Card>
  );
}
