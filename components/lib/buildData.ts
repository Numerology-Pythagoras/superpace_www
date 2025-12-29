import { Activity } from "@/types/activity";
import { MonthlyDistance, SportGroups, SportSummary } from "@/types/stats";

export type SportType = 'Run' | 'Ride' | 'Swim';

export const isSportType = (v: string): v is SportType =>
  v === 'Run' || v === 'Ride' || v === 'Swim';

const toKm = (m: number) => m / 1000;
const toMinutes = (sec: number) => sec / 60;

// Hàm định dạng pace/trình độ tùy theo loại thể thao
function formatAvgPace(
  sport: SportType,
  distanceM: number,
  timeSec: number
): string {
  if (distanceM === 0 || timeSec === 0) return '--';

  switch (sport) {
    case 'Run': {
      // phút / km
      const paceSecPerKm = timeSec / (distanceM / 1000);
      const min = Math.floor(paceSecPerKm / 60);
      const sec = Math.round(paceSecPerKm % 60);
      return `${min}:${sec.toString().padStart(2, '0')} phút/km`;
    }

    case 'Swim': {
      // phút / 100m
      const paceSecPer100m = timeSec / (distanceM / 100);
      const min = Math.floor(paceSecPer100m / 60);
      const sec = Math.round(paceSecPer100m % 60);
      return `${min}:${sec.toString().padStart(2, '0')} /100m`;
    }

    case 'Ride': {
      // km / h
      const hours = timeSec / 3600;
      const km = distanceM / 1000;
      const speed = km / hours;
      return `${speed.toFixed(1)} km/h`;
    }
  }
}


// Xây dựng dữ liệu tóm tắt thể thao
export function buildMonthlyData(
  activities: Activity[],
  sport: keyof typeof SportGroups
): MonthlyDistance[] {
  const workoutTypes = SportGroups[sport];

  const monthly: MonthlyDistance[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    distance: 0,
  }));

  activities
    .filter(a => workoutTypes.includes(a.workout_type))
    .forEach(a => {
      const m = new Date(a.start_date_local).getMonth();
      monthly[m].distance += a.distance / 1000; // m → km
    });

  return monthly;
}
// Xây dựng tóm tắt thể thao
export function buildSummaryBySport(
  activities: Activity[],
  sport: SportType
): SportSummary {
  const workoutTypes = SportGroups[sport];

  const filtered = activities.filter(a =>
    workoutTypes.includes(a.workout_type)
  );

  if (filtered.length === 0) {
    return {
      totalDistance: 0,
      totalTime: 0,
      activityCount: 0,
      avgPace: '--',
    };
  }

  const totalDistanceM = filtered.reduce((s, a) => s + a.distance, 0);
  const totalTimeSec = filtered.reduce((s, a) => s + a.moving_time, 0);

  const totalDistanceKm = toKm(totalDistanceM);
  const totalTimeMin = toMinutes(totalTimeSec);

  return {
    totalDistance: Number(totalDistanceKm.toFixed(1)),
    totalTime: Number(totalTimeMin.toFixed(0)),
    activityCount: filtered.length,
    avgPace: formatAvgPace(
      sport,
      totalDistanceM,
      totalTimeSec
    ),
  };
}


export function buildLongestBySport(
  activities: Activity[],
  sport: SportType
): Activity | null {
  const workoutTypes = SportGroups[sport];

  const filtered = activities.filter(a =>
    workoutTypes.includes(a.workout_type)
  );

  if (filtered.length === 0) return null;

  const longest = filtered.reduce((max, cur) =>
    cur.distance > max.distance ? cur : max
  );

  return longest;
}
