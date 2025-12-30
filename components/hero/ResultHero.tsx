import { SportSummary } from "@/types/stats";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ResultHero({
  athleteName,
  summary,
  coverImage,
  onImageReady,
}: {
  athleteName: string;
  summary: SportSummary;
  coverImage?: string | null;
  onImageReady: (ready: boolean) => void;
}) {
  // const [imageReady, setImageReady] = useState(false);
  
  
  return (
    <div className="relative rounded-3xl overflow-hidden mb-6">
      {/* Cover image */}
      <Image
        key={coverImage ?? "default"} // 🔥 QUAN TRỌNG
        src={coverImage ?? "/images/bg_default.jpg"}
        alt=""
        width={800}
        height={224}
        className="w-full h-56 object-cover"
        unoptimized
        onLoad={() => onImageReady?.(true)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h2 className="text-xl font-semibold">{athleteName}</h2>

        <div className="flex gap-4 text-sm mt-2 opacity-90 whitespace-nowrap">
          <span>🏃 {summary.totalDistance} km</span>
          <span>⏱ {summary.avgPace}</span>
          <span>📅 {summary.activityCount} buổi</span>
        </div>
      </div>
    </div>
  );
}
