import { CloudOutlined } from "@ant-design/icons";
import { Card, Statistic, Typography } from "antd";
import type { WeatherInfo } from "../types/mood";

const { Paragraph, Text, Title } = Typography;

interface WeatherCardProps {
  weather?: WeatherInfo;
}

function formatTemperature(value?: number) {
  return typeof value === "number" ? `${value.toFixed(1)}°C` : "N/A";
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

export function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = weather?.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  const temperatureStat = getStatisticValue(weather?.temperature);
  const feelsLikeStat = getStatisticValue(weather?.feelsLike);

  return (
    <Card bordered={false} className="glass-card weather-card fade-up delay-4">
      <div className="section-header">
        <div>
          <Text className="card-kicker">Weather</Text>
          <Title level={3} className="section-title weather-card-title">
            {weather?.main ?? "Atmosphere"}
          </Title>
        </div>
        <div className="section-icon-shell section-icon-shell-weather">
          <CloudOutlined />
        </div>
      </div>

      <div className="weather-top">
        <div className="weather-copy">
          <Statistic
            className="weather-hero-stat"
            title="Temperature"
            value={temperatureStat.value}
            precision={temperatureStat.precision}
            suffix={typeof weather?.temperature === "number" ? "°C" : ""}
          />
          <Paragraph className="weather-description">
            {weather?.description ?? "Weather details unavailable."}
          </Paragraph>
        </div>

        <div className="weather-visual">
          {iconUrl ? (
            <img
              className="weather-icon"
              src={iconUrl}
              alt={weather?.description ?? "Weather icon"}
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
            title="Feels Like"
            value={feelsLikeStat.value}
            precision={feelsLikeStat.precision}
            suffix={typeof weather?.feelsLike === "number" ? "°C" : ""}
          />
        </div>
        <div className="weather-stat-panel">
          <Statistic
            title="Humidity"
            value={typeof weather?.humidity === "number" ? weather.humidity : "--"}
            suffix={typeof weather?.humidity === "number" ? "%" : ""}
          />
        </div>
        <div className="weather-stat-panel weather-stat-panel-text">
          <Text className="stat-label">Conditions</Text>
          <Text className="stat-value">{weather?.main ?? "Unknown"}</Text>
          <Text className="weather-stat-detail">
            {formatTemperature(weather?.temperature)}
          </Text>
        </div>
      </div>
    </Card>
  );
}
