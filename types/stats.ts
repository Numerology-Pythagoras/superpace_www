export interface MonthlyDistance {
  month: number;     // 1 → 12
  distance: number;  // km
  count?: number;
}

export const SportGroups: Record<string, string[]> = {
  Run: ['Run', 'TrailRun', 'VirtualRun'],
  Ride: ['Ride', 'VirtualRide', 'EBikeRide'],
  Swim: ['Swim'],
};

export interface SportSummary {
  totalDistance: number; // km
  totalTime: number;     // phút
  activityCount: number;
  avgPace: string;       // formatted
}