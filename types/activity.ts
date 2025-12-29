export type SportType = 'Run' | 'Ride' | 'Swim';

export interface Activity {
  start_date_local: string;
  athlete_name: string;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  workout_type: SportType;
  average_speed: number;
}