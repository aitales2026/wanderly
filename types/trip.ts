import type { z } from "zod";
import type {
  tripRequestSchema,
  tripSchema,
  modifyTripRequestSchema,
  activitySchema,
  tripDaySchema,
  TRAVEL_STYLES,
  BUDGET_LEVELS,
} from "@/lib/schema";

export type TripRequest = z.infer<typeof tripRequestSchema>;
export type Trip = z.infer<typeof tripSchema>;
export type TripDay = z.infer<typeof tripDaySchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ModifyTripRequest = z.infer<typeof modifyTripRequestSchema>;
export type TravelStyle = (typeof TRAVEL_STYLES)[number];
export type BudgetLevel = (typeof BUDGET_LEVELS)[number];

export type StoredTrip = {
  request: TripRequest;
  trip: Trip;
  savedAt: number;
};
