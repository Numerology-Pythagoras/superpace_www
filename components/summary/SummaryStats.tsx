import { SportSummary } from "@/types/stats";

export default function SummaryStats({ summary }: { summary: SportSummary }) {
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Stat label="Quãng đường" value={`${summary.totalDistance} km`} />
      <Stat label="Số buổi" value={summary.activityCount} />
      <Stat label="Tốc độ" value={summary.avgPace} />
    </div>
  );
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="bg-black/30 rounded-xl p-4 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs opacity-70 mt-1">{label}</div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: number | string;  
}