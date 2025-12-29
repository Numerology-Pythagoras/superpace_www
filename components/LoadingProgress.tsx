export default function LoadingProgress({ month }: { month: number }) {
  return (
    <div className="max-w-md mx-auto mt-6">
      <div className="flex justify-between text-xs text-white/60 mb-1">
        <span>Đang tổng hợp dữ liệu</span>
        <span>{month}/12</span>
      </div>

      <div className="h-2 bg-black/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFD7612D] transition-all duration-300"
          style={{ width: `${(month / 12) * 100}%` }}
        />
      </div>
    </div>
  );
}