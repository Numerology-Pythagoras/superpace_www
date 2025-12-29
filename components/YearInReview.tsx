"use client";

import { useEffect, useMemo, useState } from "react";

import LoadingProgress from "./LoadingProgress";
import AthleteSelect from "./AthleteSelect";
import SportTabs from "./SportTabs";

import type { Activity } from "@/types/activity";
import { monthRange } from "./lib/utils";
import LongestActivity from "./summary/LongestActivity";
import ResultHero from "./hero/ResultHero";
import MonthlyDistanceChart from "./charts/MonthlyDistanceChart";
import { buildLongestBySport, buildMonthlyData, buildSummaryBySport } from "./lib/buildData";


export default function YearInReview() {
  const [athlete, setAthlete] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingMonth, setLoadingMonth] = useState(0);
  const [done, setDone] = useState(false);
  const [sport, setSport] = useState<'Run' | 'Ride' | 'Swim'>('Run');
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

  

  const monthlyData = useMemo(() => {
    return buildMonthlyData(activities, sport);
  }, [activities, sport]);

  const longest = useMemo(() => {
    return buildLongestBySport(activities, sport);
  }, [activities, sport]);


  const summary = useMemo(() => {
    return buildSummaryBySport(activities, sport);
  }, [activities, sport]);

  return (
  <div className="relative min-h-screen text-white">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/overviewBg.jpg')" }}
    />

    {/* Black overlay */}
    <div className="absolute inset-0 bg-black/80" />

    {/* Content */}
    <div className="relative z-10">
      {/* 👉 CENTER CONTAINER */}
      <div className="mx-auto max-w-[1024px] px-[10px] py-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#D7612D] tracking-tight mb-2">
          Year in Review 2025
        </h1>

        <p className="text-center text-sm md:text-base text-white/60 mb-8">
          Tổng kết hoạt động thể thao của bạn
        </p>

        <AthleteSelect athlete={athlete} onChange={setAthlete} />

        {athlete && !done && <LoadingProgress month={loadingMonth} />}

        {done && activities.length > 0 && (
          <>
            <ResultHero athleteName={athlete ?? ""} summary={summary} />

            <SportTabs value={sport} onChange={setSport} />

            <LongestActivity longest={longest ?? null} />

            <MonthlyDistanceChart data={monthlyData} />
          </>
        )}
      </div>
    </div>
  </div>
);

}
