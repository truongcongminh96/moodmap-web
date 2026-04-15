import type { MoodStoryData, MoodStoryResponse } from "../types/moodStory";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const DEV_PROXY_PREFIX = "/__moodmap_api";

function buildMoodStoryUrl(city: string, baseUrl: string) {
  const url = new URL("/api/v1/mood-story", baseUrl);
  url.searchParams.set("city", city);
  return url.toString();
}

function buildDevProxyPath(city: string) {
  const params = new URLSearchParams({ city });
  return `${DEV_PROXY_PREFIX}/api/v1/mood-story?${params.toString()}`;
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

async function requestMoodStory(url: string, signal?: AbortSignal) {
  const response = await fetch(url, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Mood story request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as MoodStoryResponse;

  if (!payload.success || !payload.data) {
    throw new Error("The mood story service returned an unexpected response.");
  }

  return payload.data;
}

export async function fetchMoodStory(
  city: string,
  signal?: AbortSignal,
): Promise<MoodStoryData> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  if (shouldUseSameOriginProxy(API_BASE_URL)) {
    return requestMoodStory(buildDevProxyPath(city), signal);
  }

  const liveUrl = buildMoodStoryUrl(city, API_BASE_URL);

  try {
    return await requestMoodStory(liveUrl, signal);
  } catch (error) {
    const isDevCorsFailure =
      import.meta.env.DEV &&
      error instanceof TypeError &&
      /fetch/i.test(error.message);

    if (!isDevCorsFailure) {
      throw error;
    }

    try {
      return await requestMoodStory(buildDevProxyPath(city), signal);
    } catch (proxyError) {
      const proxyMessage =
        proxyError instanceof Error ? ` ${proxyError.message}` : "";

      throw new Error(
        `Live mood story request failed in the browser and the local dev proxy could not recover it.${proxyMessage}`,
      );
    }
  }
}
