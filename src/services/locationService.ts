const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/reverse";

interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    municipality?: string;
    county?: string;
    state?: string;
    region?: string;
    country_code?: string;
  };
}

export interface DetectedLocation {
  city: string | null;
  countryCode: string | null;
}

function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("geolocation" in window.navigator)) {
      reject(new Error("Geolocation is not supported in this browser."));
      return;
    }

    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function reverseGeocodeCity(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<DetectedLocation> {
  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("zoom", "10");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as ReverseGeocodeResponse;
  const address = payload.address;

  return {
    city:
      address?.city ??
      address?.town ??
      address?.municipality ??
      address?.county ??
      address?.state ??
      address?.region ??
      null,
    countryCode: address?.country_code?.toLowerCase() ?? null,
  };
}

export async function detectCurrentCity(signal?: AbortSignal) {
  try {
    const position = await getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 7000,
      maximumAge: 10 * 60 * 1000,
    });

    return await reverseGeocodeCity(
      position.coords.latitude,
      position.coords.longitude,
      signal,
    );
  } catch {
    return {
      city: null,
      countryCode: null,
    };
  }
}
