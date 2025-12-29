import { Activity } from "@/types/activity";
import { SportSummary } from "@/types/stats";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ResultHero({
  athleteName,
  summary,
}: {
  athleteName: string;
  summary: SportSummary;
}) {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handlePickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomImage(URL.createObjectURL(file));
  }

  return (
    <div className="relative rounded-3xl overflow-hidden mb-6">
      {/* Image */}
      <Image
        src={customImage ?? "/images/bg_default.jpg"}
        alt=""
        width={800}
        height={224}
        className="w-full h-56 object-cover"
        unoptimized // 🔥 cho phép local blob URL
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />

      {/* Pick image button */}
      <button
        onClick={() => inputRef.current?.click()}
        className="
          absolute top-3 right-3 z-10
          bg-black/60 hover:bg-black/80
          text-white text-xs px-3 py-1.5
          rounded-full backdrop-blur
        "
      >
        🖼 Đổi ảnh
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handlePickImage}
      />

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h2 className="text-xl font-semibold">{athleteName}</h2>

        <div className="flex gap-4 text-sm mt-2 opacity-90">
          <span>🏃 {summary.totalDistance} km</span>
          <span>⏱ {summary.avgPace}</span>
          <span>📅 {summary.activityCount} buổi</span>
        </div>
      </div>
    </div>
  );
}
