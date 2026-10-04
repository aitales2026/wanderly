import { tripSchema } from "./schema";
import type { Trip, TripRequest, StoredTrip } from "@/types/trip";

const CURRENT_TRIP_KEY = "wanderly:current-trip";
const SAVED_TRIPS_KEY = "wanderly:saved-trips";
const MAX_SAVED_TRIPS = 10;

export function saveCurrentTrip(request: TripRequest, trip: Trip): void {
  if (typeof window === "undefined") return;

  try {
    const storedTrip: StoredTrip = {
      request,
      trip,
      savedAt: Date.now(),
    };
    sessionStorage.setItem(CURRENT_TRIP_KEY, JSON.stringify(storedTrip));

    // Also add to saved trips
    const savedTrips = getSavedTrips();
    savedTrips.unshift(storedTrip);
    const trimmed = savedTrips.slice(0, MAX_SAVED_TRIPS);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("[storage] Failed to save trip:", error);
  }
}

export function loadCurrentTrip(): StoredTrip | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(CURRENT_TRIP_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    // Validate with zod
    const validated: StoredTrip = {
      request: parsed.request,
      trip: tripSchema.parse(parsed.trip),
      savedAt: parsed.savedAt,
    };
    return validated;
  } catch (error) {
    console.error("[storage] Failed to load trip:", error);
    return null;
  }
}

export function clearCurrentTrip(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CURRENT_TRIP_KEY);
}

export function getSavedTrips(): StoredTrip[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(SAVED_TRIPS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && item.request && item.trip && item.savedAt)
      .map((item) => ({
        request: item.request,
        trip: tripSchema.parse(item.trip),
        savedAt: item.savedAt,
      }));
  } catch (error) {
    console.error("[storage] Failed to load saved trips:", error);
    return [];
  }
}

export function deleteSavedTrip(savedAt: number): void {
  if (typeof window === "undefined") return;

  try {
    const savedTrips = getSavedTrips();
    const filtered = savedTrips.filter((t) => t.savedAt !== savedAt);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("[storage] Failed to delete trip:", error);
  }
}
