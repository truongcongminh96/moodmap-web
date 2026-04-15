export interface MoodStoryResponse {
  success?: boolean;
  data?: MoodStoryData;
}

export interface MoodStoryData {
  city?: string;
  country?: string;
  headline?: string;
  mood?: MoodStoryMood;
  visual?: MoodStoryVisual;
  highlight?: MoodStoryHighlight;
  story?: LocalizedStoryText;
  bestMoment?: LocalizedStoryText;
  energyTip?: LocalizedStoryText;
  meta?: MoodStoryMeta;
}

export interface MoodStoryMood {
  key?: string;
  label?: string;
  theme?: string;
}

export interface MoodStoryVisual {
  gradient?: string;
  timeOfDay?: string;
}

export interface MoodStoryHighlight {
  quote?: StoryQuote;
  track?: StoryTrack;
}

export interface StoryQuote {
  text?: string;
  author?: string;
}

export interface StoryTrack {
  title?: string;
  artist?: string;
  url?: string;
}

export interface LocalizedStoryText {
  en?: string;
  vi?: string;
}

export interface MoodStoryMeta {
  generatedAt?: string;
  sources?: string[];
}
