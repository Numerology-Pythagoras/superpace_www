import type { Activity } from '@/types/activity';

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        bg-black/30
        backdrop-blur
        rounded-2xl
        p-4
        border border-white/5
      "
    >
      <div className="text-xs text-white/60 mb-1">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

export default function SummaryCards({
  activities,
}: {
  activities: Activity[];
}) {
  const totalDistance =
    activities.reduce((s, a) => s + a.distance, 0) / 1000;

  const totalTime =
    activities.reduce((s, a) => s + a.moving_time, 0) / 3600;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <StatCard
        label="Tổng quãng đường"
        value={`${totalDistance.toFixed(1)} km`}
      />

      <StatCard
        label="Số hoạt động"
        value={activities.length.toString()}
      />

      <StatCard
        label="Thời gian"
        value={`${totalTime.toFixed(1)} giờ`}
      />
    </div>
  );
}
