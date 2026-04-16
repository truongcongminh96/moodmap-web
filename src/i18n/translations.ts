export type LocaleCode = "en" | "vi";

export type SceneOptionId = "auto" | "calm" | "energetic" | "reflective" | "intense";
export type ThemeNameId =
  | "default-nocturne"
  | "cloudy-silver"
  | "sunny-gold"
  | "rainy-indigo"
  | "midnight-velvet"
  | "calm-soft"
  | "reflective-blue";

export interface UiCopy {
  common: {
    unavailable: string;
    unknown: string;
    unknownCity: string;
    city: string;
    unknownAuthor: string;
    noTheme: string;
    pendingMood: string;
    weatherPending: string;
    unknownSource: string;
    untitledTrack: string;
    unknownArtist: string;
  };
  hero: {
    liveBadge: string;
    eyebrow: string;
    subtitle: string;
    supportNote: string;
    moodLens: string;
    autoMode: string;
    previewMode: string;
    languageLabel: string;
  };
  search: {
    cityAriaLabel: string;
    cityPlaceholder: string;
    sceneAriaLabel: string;
    submit: string;
    submitting: string;
  };
  sceneOptions: Record<SceneOptionId, string>;
  sceneDescriptions: Record<Exclude<SceneOptionId, "auto">, string>;
  sceneLoading: Record<Exclude<SceneOptionId, "auto">, string>;
  quickStats: {
    mappedLocation: string;
    currentMood: string;
    atmosphere: string;
  };
  overview: {
    kicker: string;
    weatherPulse: string;
    moodTheme: string;
    cinematicScene: string;
    confidence: string;
    signalStrength: string;
    summaryFallback: string;
    weatherFallbackDetail: string;
    mappedCity: (city: string) => string;
    trackPicks: (count: number) => string;
  };
  quote: {
    kicker: string;
    fallbackText: string;
  };
  timeOfDay: {
    kicker: string;
    localTime: string;
    soundtrackMode: string;
    morning: string;
    midday: string;
    goldenHour: string;
    night: string;
    morningNote: string;
    middayNote: string;
    goldenHourNote: string;
    nightNote: string;
    morningSoundtrack: string;
    middaySoundtrack: string;
    goldenHourSoundtrack: string;
    nightSoundtrack: string;
  };
  music: {
    kicker: string;
    title: string;
    empty: string;
    openTrack: string;
  };
  story: {
    kicker: string;
    bestMoment: string;
    energyTip: string;
    featuredTrack: string;
    highlightedQuote: string;
    connectedSources: string;
    generatedAt: string;
    moodKeyLabel: string;
    storyFallback: string;
    trackFallback: string;
  };
  weather: {
    kicker: string;
    fallbackTitle: string;
    temperature: string;
    feelsLike: string;
    humidity: string;
    conditions: string;
    fallbackDescription: string;
    iconAlt: string;
  };
  activities: {
    kicker: string;
    title: string;
    empty: string;
  };
  footer: {
    kicker: string;
    note: string;
    connectedSources: string;
    waitingTimestamp: string;
    noSources: string;
    timestampLabel: string;
  };
  states: {
    initialLoading: string;
    refreshing: (city: string, sceneLabel: string) => string;
    fullErrorTitle: string;
    fullErrorDescription: string;
    inlineErrorTitle: string;
    inlineErrorDescription: string;
    tryAgain: string;
    retry: string;
    cityRequired: string;
    emptyTitle: string;
    emptyDescription: string;
    networkIssue: string;
    genericIssue: string;
  };
  themeNames: Record<ThemeNameId, string>;
  formatters: {
    sceneMode: (sceneLabel: string, isAuto: boolean) => string;
  };
}

export const translations: Record<LocaleCode, UiCopy> = {
  en: {
    common: {
      unavailable: "N/A",
      unknown: "Unknown",
      unknownCity: "Unknown City",
      city: "City",
      unknownAuthor: "Unknown Author",
      noTheme: "Signature",
      pendingMood: "Pending mood",
      weatherPending: "Weather pending",
      unknownSource: "Unknown source",
      untitledTrack: "Untitled Track",
      unknownArtist: "Unknown Artist",
    },
    hero: {
      liveBadge: "Live Mood Pack",
      eyebrow: "A cinematic mood dashboard for cities",
      subtitle: "Discover your city's mood through weather, music, and quotes.",
      supportNote: "Powered by weather, quotes, and music.",
      moodLens: "Mood Lens",
      autoMode: "Auto",
      previewMode: "Preview",
      languageLabel: "Language",
    },
    search: {
      cityAriaLabel: "City name",
      cityPlaceholder: "Enter a city to reveal its mood",
      sceneAriaLabel: "Cinematic lens",
      submit: "Reveal Mood",
      submitting: "Revealing...",
    },
    sceneOptions: {
      auto: "Auto from API",
      calm: "Calm & Soft",
      energetic: "Energetic",
      reflective: "Reflective",
      intense: "Intense",
    },
    sceneDescriptions: {
      calm:
        "A quiet scene with softened highlights, restrained particles, and a cooler cinematic glow.",
      energetic:
        "A brighter scene with warmer edges, livelier particles, and more active visual emphasis.",
      reflective:
        "A darker, inward-looking scene with slower motion, deeper contrast, and a contemplative pace.",
      intense:
        "A focused, high-contrast scene with tighter highlights and more decisive visual energy.",
    },
    sceneLoading: {
      calm: "Reading the city signal through a calm cinematic lens...",
      energetic: "Reading the city signal through an energetic cinematic lens...",
      reflective: "Reading the city signal through a reflective cinematic lens...",
      intense: "Reading the city signal through an intense cinematic lens...",
    },
    quickStats: {
      mappedLocation: "Mapped Location",
      currentMood: "Current Mood",
      atmosphere: "Atmosphere",
    },
    overview: {
      kicker: "Mood Overview",
      weatherPulse: "Weather Pulse",
      moodTheme: "Mood Theme",
      cinematicScene: "Cinematic Scene",
      confidence: "Confidence",
      signalStrength: "Signal strength",
      summaryFallback:
        "A refined blend of weather, sound, and story is on the way.",
      weatherFallbackDetail: "quiet skies",
      mappedCity: (city) => `${city} mapped`,
      trackPicks: (count) => `${count} track picks`,
    },
    quote: {
      kicker: "Quote",
      fallbackText:
        "A thoughtful line will appear here when the mood pack arrives.",
    },
    timeOfDay: {
      kicker: "Time Layer",
      localTime: "Local time",
      soundtrackMode: "Soundtrack mode",
      morning: "Morning",
      midday: "Midday",
      goldenHour: "Golden Hour",
      night: "Night",
      morningNote: "A softer glow with a cleaner lift, tuned for an easier start.",
      middayNote: "Brighter contrast and more open air, built for momentum and clarity.",
      goldenHourNote: "Warmer edges and amber light, made for slower scenes and richer atmosphere.",
      nightNote: "Deeper tones and quieter pacing, tuned for reflective listening.",
      morningSoundtrack: "Leaning toward lighter rhythm and clean focus.",
      middaySoundtrack: "Pushing brighter energy and clearer pulse.",
      goldenHourSoundtrack: "Favoring warmer grooves and a softer landing.",
      nightSoundtrack: "Favoring slower textures and more spacious tones.",
    },
    music: {
      kicker: "Music Recommendations",
      title: "Soundtrack for the moment",
      empty: "No tracks found",
      openTrack: "Open track",
    },
    story: {
      kicker: "City Atmosphere",
      bestMoment: "Best moment today",
      energyTip: "Energy tip",
      featuredTrack: "Featured track",
      highlightedQuote: "Highlighted quote",
      connectedSources: "Connected sources",
      generatedAt: "Story generated at",
      moodKeyLabel: "Mood key",
      storyFallback:
        "The city is holding a quieter story right now. Try another search in a moment.",
      trackFallback: "No featured track available",
    },
    weather: {
      kicker: "Weather",
      fallbackTitle: "Atmosphere",
      temperature: "Temperature",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      conditions: "Conditions",
      fallbackDescription: "Weather details unavailable.",
      iconAlt: "Weather icon",
    },
    activities: {
      kicker: "Activities",
      title: "Gentle ways to lean into it",
      empty: "No activities available",
    },
    footer: {
      kicker: "Sources",
      note: "Powered by weather, quotes, and music.",
      connectedSources: "Connected sources",
      waitingTimestamp: "Waiting for a live timestamp",
      noSources: "No sources listed",
      timestampLabel: "Last refresh",
    },
    states: {
      initialLoading: "Reading the city signal...",
      refreshing: (city, sceneLabel) =>
        `Refreshing ${city} through the ${sceneLabel.toLowerCase()} lens...`,
      fullErrorTitle: "We couldn't load this city's mood",
      fullErrorDescription:
        "Try another city or retry in a moment while the live signal recovers.",
      inlineErrorTitle: "Live request unavailable",
      inlineErrorDescription:
        "Keeping the current mood pack on screen while the connection recovers.",
      tryAgain: "Try again",
      retry: "Retry",
      cityRequired: "Enter a city name so MoodMap can build the right atmosphere.",
      emptyTitle: "Enter a city to reveal its mood",
      emptyDescription:
        "MoodMap will turn live weather, music, and quotes into a cinematic dashboard.",
      networkIssue:
        "Live request unavailable right now. Keeping the current mood pack visible while the API recovers.",
      genericIssue: "Something went wrong while reading this city's signal.",
    },
    themeNames: {
      "default-nocturne": "Nocturne",
      "cloudy-silver": "Cloudy Silver",
      "sunny-gold": "Sunny Gold",
      "rainy-indigo": "Rainy Indigo",
      "midnight-velvet": "Midnight Velvet",
      "calm-soft": "Calm Soft",
      "reflective-blue": "Reflective Blue",
    },
    formatters: {
      sceneMode: (sceneLabel, isAuto) =>
        isAuto ? `Auto scene · ${sceneLabel}` : `Preview scene · ${sceneLabel}`,
    },
  },
  vi: {
    common: {
      unavailable: "N/A",
      unknown: "Không rõ",
      unknownCity: "Thành phố chưa rõ",
      city: "Thành phố",
      unknownAuthor: "Tác giả chưa rõ",
      noTheme: "Dấu ấn",
      pendingMood: "Mood đang cập nhật",
      weatherPending: "Thời tiết đang cập nhật",
      unknownSource: "Nguồn chưa rõ",
      untitledTrack: "Bản nhạc chưa có tên",
      unknownArtist: "Nghệ sĩ chưa rõ",
    },
    hero: {
      liveBadge: "Mood Pack thời gian thực",
      eyebrow: "Bảng tín hiệu tâm trạng mang chất điện ảnh cho thành phố",
      subtitle:
        "Khám phá tâm trạng của thành phố qua thời tiết, âm nhạc và những câu trích dẫn.",
      supportNote: "Được tạo nên từ thời tiết, câu trích dẫn và âm nhạc.",
      moodLens: "Lăng kính mood",
      autoMode: "Tự động",
      previewMode: "Xem trước",
      languageLabel: "Ngôn ngữ",
    },
    search: {
      cityAriaLabel: "Tên thành phố",
      cityPlaceholder: "Nhập tên thành phố để mở ra mood hôm nay",
      sceneAriaLabel: "Lăng kính điện ảnh",
      submit: "Mở Mood",
      submitting: "Đang mở...",
    },
    sceneOptions: {
      auto: "Tự động từ API",
      calm: "Êm & Dịu",
      energetic: "Tràn năng lượng",
      reflective: "Lắng đọng",
      intense: "Mãnh liệt",
    },
    sceneDescriptions: {
      calm:
        "Khung cảnh dịu với điểm sáng mềm, particle thưa, và quầng sáng mát hơn.",
      energetic:
        "Khung cảnh rực hơn với nhịp chuyển động linh hoạt và các điểm nhấn sáng rõ.",
      reflective:
        "Khung cảnh trầm hơn với độ tương phản sâu, chuyển động chậm và cảm giác hướng nội.",
      intense:
        "Khung cảnh sắc nét, tương phản mạnh và năng lượng thị giác tập trung hơn.",
    },
    sceneLoading: {
      calm: "Đang giải mã tín hiệu thành phố qua một lăng kính êm dịu...",
      energetic:
        "Đang giải mã tín hiệu thành phố qua một lăng kính tràn năng lượng...",
      reflective:
        "Đang giải mã tín hiệu thành phố qua một lăng kính lắng đọng...",
      intense:
        "Đang giải mã tín hiệu thành phố qua một lăng kính mãnh liệt...",
    },
    quickStats: {
      mappedLocation: "Vị trí đã ánh xạ",
      currentMood: "Mood hiện tại",
      atmosphere: "Bầu không khí",
    },
    overview: {
      kicker: "Tổng quan mood",
      weatherPulse: "Nhịp thời tiết",
      moodTheme: "Theme cảm xúc",
      cinematicScene: "Cảnh điện ảnh",
      confidence: "Độ tin cậy",
      signalStrength: "Cường độ tín hiệu",
      summaryFallback:
        "Một bản phối tinh tế giữa thời tiết, âm thanh và câu chuyện đang dần hiện ra.",
      weatherFallbackDetail: "bầu trời dịu lặng",
      mappedCity: (city) => `${city} đã được ánh xạ`,
      trackPicks: (count) => `${count} gợi ý track`,
    },
    quote: {
      kicker: "Câu trích dẫn",
      fallbackText:
        "Một câu nói phù hợp sẽ xuất hiện ở đây khi mood pack được tải về.",
    },
    timeOfDay: {
      kicker: "Lớp thời gian",
      localTime: "Giờ hiện tại",
      soundtrackMode: "Chế độ soundtrack",
      morning: "Buổi sáng",
      midday: "Ban ngày",
      goldenHour: "Giờ vàng",
      night: "Ban đêm",
      morningNote: "Ánh sáng ấm hơn một chút và nhịp mở đầu dễ chịu hơn cho buổi sáng.",
      middayNote: "Độ sáng cao hơn, không khí mở hơn, hợp với nhịp tập trung và chuyển động.",
      goldenHourNote: "Viền màu hổ phách và chất liệu dịu hơn, hợp với những khoảnh khắc chậm lại.",
      nightNote: "Tông sâu hơn và tiết tấu lặng hơn, hợp để nghe và cảm nhận kỹ hơn.",
      morningSoundtrack: "Ưu tiên nhịp sáng, gọn và dễ khởi động.",
      middaySoundtrack: "Đẩy năng lượng sáng hơn và pulse rõ hơn.",
      goldenHourSoundtrack: "Nghiêng về groove ấm và cảm giác hạ nhịp mềm hơn.",
      nightSoundtrack: "Nghiêng về texture chậm và không gian nghe sâu hơn.",
    },
    music: {
      kicker: "Gợi ý âm nhạc",
      title: "Nhạc nền cho khoảnh khắc này",
      empty: "Chưa có bản nhạc phù hợp",
      openTrack: "Mở track",
    },
    story: {
      kicker: "Khí quyển thành phố",
      bestMoment: "Khoảnh khắc đẹp nhất hôm nay",
      energyTip: "Gợi ý năng lượng",
      featuredTrack: "Bài nhạc nổi bật",
      highlightedQuote: "Trích dẫn nổi bật",
      connectedSources: "Nguồn đang kết nối",
      generatedAt: "Câu chuyện được tạo lúc",
      moodKeyLabel: "Mã mood",
      storyFallback:
        "Thành phố đang giữ một câu chuyện trầm hơn lúc này. Hãy thử lại sau ít phút.",
      trackFallback: "Chưa có bài nhạc nổi bật",
    },
    weather: {
      kicker: "Thời tiết",
      fallbackTitle: "Bầu không khí",
      temperature: "Nhiệt độ",
      feelsLike: "Cảm giác như",
      humidity: "Độ ẩm",
      conditions: "Điều kiện",
      fallbackDescription: "Chưa có đủ dữ liệu thời tiết.",
      iconAlt: "Biểu tượng thời tiết",
    },
    activities: {
      kicker: "Hoạt động",
      title: "Những cách nhẹ nhàng để hòa vào nhịp này",
      empty: "Chưa có gợi ý hoạt động",
    },
    footer: {
      kicker: "Nguồn dữ liệu",
      note: "Được tạo nên từ thời tiết, câu trích dẫn và âm nhạc.",
      connectedSources: "Nguồn đang kết nối",
      waitingTimestamp: "Đang chờ dấu thời gian trực tiếp",
      noSources: "Chưa có nguồn nào",
      timestampLabel: "Lần làm mới gần nhất",
    },
    states: {
      initialLoading: "Đang giải mã tín hiệu thành phố...",
      refreshing: (city, sceneLabel) =>
        `Đang làm mới ${city} qua lăng kính ${sceneLabel.toLowerCase()}...`,
      fullErrorTitle: "Không thể tải mood của thành phố này",
      fullErrorDescription:
        "Hãy thử thành phố khác hoặc thử lại sau ít phút khi tín hiệu live ổn định hơn.",
      inlineErrorTitle: "Không thể làm mới dữ liệu live",
      inlineErrorDescription:
        "Mood pack hiện tại vẫn được giữ trên màn hình trong lúc kết nối đang hồi phục.",
      tryAgain: "Thử lại",
      retry: "Tải lại",
      cityRequired: "Hãy nhập tên thành phố để MoodMap dựng đúng bầu không khí.",
      emptyTitle: "Nhập một thành phố để mở ra mood của nó",
      emptyDescription:
        "MoodMap sẽ biến thời tiết, âm nhạc và câu trích dẫn thành một dashboard giàu cảm xúc.",
      networkIssue:
        "Hiện chưa thể lấy dữ liệu live. Mood pack hiện tại vẫn được giữ lại trong lúc API hồi phục.",
      genericIssue: "Đã có lỗi khi đọc tín hiệu của thành phố này.",
    },
    themeNames: {
      "default-nocturne": "Dạ khúc",
      "cloudy-silver": "Mây bạc",
      "sunny-gold": "Nắng vàng",
      "rainy-indigo": "Mưa chàm",
      "midnight-velvet": "Nhung đêm",
      "calm-soft": "Êm dịu",
      "reflective-blue": "Xanh lắng đọng",
    },
    formatters: {
      sceneMode: (sceneLabel, isAuto) =>
        isAuto ? `Cảnh tự động · ${sceneLabel}` : `Cảnh xem trước · ${sceneLabel}`,
    },
  },
};

export function getUiCopy(locale: LocaleCode) {
  return translations[locale] ?? translations.en;
}
