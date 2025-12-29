import { Activity } from "@/types/activity";
import { formatDuration } from "../lib/utils";


export default function LongestActivity({ longest }: { longest: Activity | null }) {
  if (!longest) return null;

  // const longest = activities.reduce((a, b) =>
  //   a.distance > b.distance ? a : b
  // );

  return (
    <div className="bg-black/30 rounded-2xl p-4 mt-6 mb-6 flex justify-between items-center">
      <div>
        <p className="opacity-70 text-sm">🏆 Activity dài nhất</p>
        <p className="font-semibold">
          {(longest.distance / 1000).toFixed(1)} km ·{' '}
          {formatDuration(longest.moving_time / 60)}
        </p>
      </div>
      <span className="opacity-60">{longest.workout_type}</span>
    </div>
  );
}
