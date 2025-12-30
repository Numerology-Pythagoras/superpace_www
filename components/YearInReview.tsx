"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import LoadingProgress from "./LoadingProgress";
import AthleteSelect from "./AthleteSelect";
import SportTabs from "./SportTabs";

import type { Activity } from "@/types/activity";
import { monthRange } from "./lib/utils";
import LongestActivity from "./summary/LongestActivity";
import ResultHero from "./hero/ResultHero";
import MonthlyDistanceChart from "./charts/MonthlyDistanceChart";
import {
  buildLongestBySport,
  buildMonthlyData,
  buildSummaryBySport,
} from "./lib/buildData";
import { ShareButton } from "./ui/shareButton";
import { Camera } from "lucide-react";

export default function YearInReview() {
  const [athlete, setAthlete] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingMonth, setLoadingMonth] = useState(0);
  const [done, setDone] = useState(false);
  const [sport, setSport] = useState<"Run" | "Ride" | "Swim">("Run");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [heroImageReady, setHeroImageReady] = useState(false);

  useEffect(() => {
    if (!athlete || athlete.trim() === "") return;

    let cancelled = false;

    async function load() {
      setActivities([]);
      setDone(false);
      setLoadingMonth(0);
      setSport("Run");
      for (let m = 0; m < 12; m++) {
        const { from, to } = monthRange(2025, m);
        setLoadingMonth(m + 1);

        const res = await fetch(
          `/api/activities?name=${encodeURIComponent(
            athlete ?? ""
          )}&from=${from}&to=${to}`
        );

        const json = await res.json();

        if (!cancelled) {
          setActivities((prev) => [...prev, ...(json.activities || [])]);
        }
      }

      if (!cancelled) setDone(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [athlete]);

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  async function handlePickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setCoverImage(dataUrl); // ✅ BASE64
  }

  const monthlyData = useMemo(() => {
    return buildMonthlyData(activities, sport);
  }, [activities, sport]);

  const longest = useMemo(() => {
    return buildLongestBySport(activities, sport);
  }, [activities, sport]);

  const summary = useMemo(() => {
    return buildSummaryBySport(activities, sport);
  }, [activities, sport]);
  const captureRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="relative min-h-screen text-white">
      {/* Page background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/overviewBg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10">
        <div className="mx-auto max-w-[1024px] px-[10px] py-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#D7612D] mb-2">
            Year in Review 2025
          </h1>

          <p className="text-center text-sm md:text-base text-white/60 mb-8">
            Tổng kết hoạt động thể thao của bạn
          </p>

          <AthleteSelect athlete={athlete} onChange={setAthlete} />

          {athlete && done && (
            <div className="flex justify-end gap-2 mb-4">
              {/* ĐỔI ẢNH COVER */}
              <button
                onClick={() => coverInputRef.current?.click()}
                className="
        flex items-center gap-2
        rounded-full
        bg-white/10 hover:bg-white/20
        px-4 py-2
        text-sm font-medium
        backdrop-blur
        transition
      "
              >
                <Camera size={16} />
                Đổi ảnh cover
              </button>

              <ShareButton
                targetRef={captureRef as React.RefObject<HTMLDivElement>}
                disabled={!heroImageReady}
              />

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePickCover}
              />
            </div>
          )}

          {athlete && !done && <LoadingProgress month={loadingMonth} />}

          {done && activities.length > 0 && (
            <>
              {/* ====== CAPTURE ZONE ====== */}
              <div
                ref={captureRef}
                className="relative mt-6 overflow-hidden rounded-3xl"
              >
                {/* Background inside capture */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/overviewBg.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/80" />

                {/* Captured content */}
                <div className="relative z-10 p-4 md:p-6">
                  <ResultHero
                    athleteName={athlete ?? ""}
                    summary={summary}
                    coverImage={coverImage}
                    onImageReady={() => setHeroImageReady(true)}
                  />

                  <SportTabs value={sport} onChange={setSport} />

                  <LongestActivity longest={longest ?? null} />

                  <MonthlyDistanceChart data={monthlyData} />
                </div>
              </div>
              {/* ====== END CAPTURE ====== */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
