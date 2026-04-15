import type { MoodPackData, MoodPackResponse } from "../types/mood";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const DEV_PROXY_PREFIX = "/__moodmap_api";

function buildMoodPackUrl(city: string, baseUrl: string) {
  const url = new URL("/api/v1/mood-pack", baseUrl);
  url.searchParams.set("city", city);
  url.searchParams.set("source", "all");
  return url.toString();
}

function buildDevProxyPath(city: string) {
  const params = new URLSearchParams({
    city,
    source: "all",
  });

  return `${DEV_PROXY_PREFIX}/api/v1/mood-pack?${params.toString()}`;
}

function shouldUseSameOriginProxy(baseUrl: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.location.origin !== new URL(baseUrl).origin;
  } catch {
    return false;
  }
}

async function requestMoodPack(url: string, signal?: AbortSignal) {
  const response = await fetch(url, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Mood pack request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as MoodPackResponse;

  if (!payload.success || !payload.data) {
    throw new Error("The mood pack service returned an unexpected response.");
  }

  return payload.data;
}

export async function fetchMoodPack(
  city: string,
  signal?: AbortSignal,
): Promise<MoodPackData> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  if (shouldUseSameOriginProxy(API_BASE_URL)) {
    return requestMoodPack(buildDevProxyPath(city), signal);
  }

  const liveUrl = buildMoodPackUrl(city, API_BASE_URL);

  try {
    return await requestMoodPack(liveUrl, signal);
  } catch (error) {
    const isDevCorsFailure =
      import.meta.env.DEV &&
      error instanceof TypeError &&
      /fetch/i.test(error.message);

    if (!isDevCorsFailure) {
      throw error;
    }

    try {
      return await requestMoodPack(buildDevProxyPath(city), signal);
    } catch (proxyError) {
      const proxyMessage =
        proxyError instanceof Error ? ` ${proxyError.message}` : "";

      throw new Error(
        `Live request failed in the browser and the local dev proxy could not recover it.${proxyMessage}`,
      );
    }
  }
}
