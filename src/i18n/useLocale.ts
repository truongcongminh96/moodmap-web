import { useEffect, useMemo, useState } from "react";
import { getUiCopy, type LocaleCode } from "./translations";

const STORAGE_KEY = "moodmap-locale";

function detectBrowserLocale(): LocaleCode {
  if (typeof window === "undefined") {
    return "en";
  }

  const languageCandidates = [window.navigator.language, ...(window.navigator.languages ?? [])]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());

  const hasVietnameseLanguage = languageCandidates.some(
    (value) => value === "vi" || value.startsWith("vi-") || value.endsWith("-vn"),
  );

  if (hasVietnameseLanguage) {
    return "vi";
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone?.toLowerCase() ?? "";

  return timezone === "asia/ho_chi_minh" ? "vi" : "en";
}

function getInitialLocale(): LocaleCode {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  return saved === "vi" || saved === "en" ? saved : detectBrowserLocale();
}

export function useLocale() {
  const [locale, setLocale] = useState<LocaleCode>(getInitialLocale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const copy = useMemo(() => getUiCopy(locale), [locale]);
  const dateLocale = locale === "vi" ? "vi-VN" : "en-US";

  return {
    locale,
    setLocale,
    copy,
    dateLocale,
  };
}
