import { useEffect, useMemo, useState } from "react";
import { getUiCopy, type LocaleCode } from "./translations";

const STORAGE_KEY = "moodmap-locale";

function getInitialLocale(): LocaleCode {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  return saved === "vi" || saved === "en" ? saved : "en";
}

export function useLocale() {
  const [locale, setLocale] = useState<LocaleCode>(getInitialLocale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, locale);
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
