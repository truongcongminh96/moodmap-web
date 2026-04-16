# MoodMap

MoodMap is a web app that helps users "read the mood" of a city for the day through weather, music, inspirational quotes, and activity suggestions.

The idea was designed with a hackathon mindset: easy to demo, visually engaging, product-oriented, and flexible enough to support a polished UI.

## Global Hack Week Idea

### Concept

Users enter a city name, and the system will:

- fetch weather data
- fetch additional content such as quotes, music, or related recommendations
- apply business logic to infer the city's "mood"
- return a complete `mood pack` for that day

Example:

> Hanoi has light rain today -> mood: chill, reflective  
> Suggestions: 3 songs, 1 quote, 1 recommended activity

## Why This Idea Fits a Hackathon

- Very easy to understand in a live demo within a few seconds
- Clear and explainable API integration
- Interesting business logic: weather -> mood -> recommendations
- Easy to invest in the frontend and create a premium product feel
- Great visuals for screenshots, pitching, and submissions

## MVP

The minimum version of MoodMap includes:

- entering a city name
- fetching weather data by city
- mapping weather conditions to a mood
- returning:
  - a mood label
  - a quote
  - a list of recommended songs
  - an activity suggestion

## APIs You Can Use

- OpenWeather API
- Spotify API or Last.fm API
- ZenQuotes API or Quotable API

In the current frontend repository, the app calls the MoodMap backend API through the following environment variable:

```env
VITE_API_BASE_URL=https://moodmap-api-truongcongminh1110-hfn4tcbl.apn.leapcell.dev
```

Endpoint used by the frontend:

```text
GET ${VITE_API_BASE_URL}/api/v1/mood-pack?city=${city}&source=all
```

## Mood Pack Response

The frontend renders a "Mood Dashboard" from backend data, including:

- location
- weather
- mood
- quote
- music recommendations
- activities
- summary
- metadata and sources

Example experience:

- City: Hanoi
- Weather: broken clouds
- Mood: Calm & Soft
- Summary: a gentle day for reading, planning, and listening to soft background music

## Current Frontend Features

- Hero section with a product-style landing page feel
- Polished search bar that fetches data when users press Enter
- Automatically loads `Hanoi` on first visit
- Keeps previous data visible while a new request is loading
- Skeleton loading state for the initial fetch
- Error state using Ant Design `Result`
- Dashboard sections:
  - quick info row
  - mood overview card
  - quote card
  - weather card
  - music section
  - activities card
  - footer metadata

## Tech Stack

- React
- TypeScript
- Vite
- Ant Design
- Modern CSS

## Main Folder Structure

```text
src/
  App.tsx
  main.tsx
  styles.css
  types/
    mood.ts
  services/
    moodApi.ts
  components/
    HeroSection.tsx
    SearchBar.tsx
    QuickStatsRow.tsx
    MoodOverviewCard.tsx
    QuoteCard.tsx
    MusicSection.tsx
    WeatherCard.tsx
    ActivitiesCard.tsx
    FooterMeta.tsx
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## API Configuration

Create a `.env` file with:

```env
VITE_API_BASE_URL=https://moodmap-api-truongcongminh1110-hfn4tcbl.apn.leapcell.dev
```

If you need to switch the backend API, simply update the value of `VITE_API_BASE_URL`.

## Proxy and CORS Notes

The current backend does not allow direct browser CORS access. Because of that, the frontend is configured to call the API through a same-origin proxy path:

```text
/__moodmap_api/api/v1/mood-pack?city=${city}&source=all
```

Environment-specific details:

- local `vite dev`: uses the proxy configured in `vite.config.ts`
- local `vite preview`: uses the proxy configured in `vite.config.ts`
- deploy on Vercel: uses the rewrite defined in [vercel.json](/Users/staff-atherlabs/MinMin/Projects/moodmap-web/vercel.json)

This setup helps the frontend avoid CORS issues when the app and backend run on different origins.

## Possible Extensions After MVP

- add richer mood themes
- add movie or book suggestions
- personalize results by time of day
- generate more nuanced AI summaries
- save mood history for cities
- share mood cards on social media

## Short Demo Pitch

MoodMap turns raw API data into an emotional, easy-to-understand, and visually appealing experience. Instead of showing only the weather, the app tells users how a city "feels" today and suggests ways to enjoy the day through music, quotes, and matching activities.

## License

MIT
