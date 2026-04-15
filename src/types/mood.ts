export interface MoodPackResponse {
  success?: boolean;
  data?: MoodPackData;
}

export interface MoodPackData {
  location?: LocationInfo;
  weather?: WeatherInfo;
  mood?: MoodInfo;
  quote?: QuoteInfo;
  music?: MusicTrack[];
  activities?: string[];
  summary?: string;
  meta?: MoodMeta;
}

export interface LocationInfo {
  city?: string;
  country?: string;
}

export interface WeatherInfo {
  main?: string;
  description?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  icon?: string;
}

export interface MoodInfo {
  key?: string;
  label?: string;
  theme?: string;
  confidence?: number;
}

export interface QuoteInfo {
  text?: string;
  author?: string;
}

export interface MusicTrack {
  title?: string;
  artist?: string;
  trackUrl?: string;
  source?: string;
}

export interface MoodMeta {
  requestedAt?: string;
  sources?: string[];
}
