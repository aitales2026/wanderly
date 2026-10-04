"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { PlanningState } from "./PlanningState";
import { saveCurrentTrip } from "@/lib/storage";

const INTEREST_OPTIONS = [
  "美食",
  "人文",
  "自然",
  "夜生活",
  "购物",
  "咖啡",
  "亲子",
  "摄影",
];

export function TripForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("3");
  const [travelers, setTravelers] = useState("2");
  const [interests, setInterests] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [budget, setBudget] = useState("moderate");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 5
          ? [...prev, interest]
          : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination) {
      setError("请选择目的地");
      return;
    }

    if (interests.length === 0) {
      setError("请至少选择一个兴趣");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const request = {
      destination: destination as "北京" | "上海" | "成都" | "重庆" | "西安" | "杭州" | "广州" | "厦门",
      duration: parseInt(duration),
      travelers: parseInt(travelers),
      interests: interests as ("美食" | "人文" | "自然" | "夜生活" | "购物" | "咖啡" | "亲子" | "摄影")[],
      travelStyle: travelStyle as "relaxed" | "balanced" | "packed",
      budget: budget as "budget" | "moderate" | "premium",
    };

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "生成失败");
      }

      const { trip } = await response.json();

      // Save to storage
      saveCurrentTrip(request, trip);

      // Navigate to trip page
      router.push("/trip");
    } catch (err) {
      console.error("Trip generation failed:", err);
      setError(err instanceof Error ? err.message : "生成失败，请重试");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <PlanningState />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Destination */}
      <div>
        <label className="mb-3 block text-small font-medium text-foreground">
          你想去哪里？
        </label>
        <div className="flex flex-wrap gap-2">
          {destinations.map((dest) => (
            <button
              key={dest.slug}
              type="button"
              onClick={() => setDestination(dest.name)}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                destination === dest.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Duration & Travelers */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-small font-medium text-foreground">
            天数
          </label>
          <Select
            value={duration}
            onValueChange={(v) => v && setDuration(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择天数" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} 天
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-small font-medium text-foreground">
            人数
          </label>
          <Select
            value={travelers}
            onValueChange={(v) => v && setTravelers(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择人数" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
                <SelectItem key={t} value={String(t)}>
                  {t} 人
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="mb-3 block text-small font-medium text-foreground">
          兴趣偏好（最多 5 个）
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                interests.includes(interest)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="mb-3 block text-small font-medium text-foreground">
          旅行风格
        </label>
        <div className="flex gap-2">
          {[
            { value: "relaxed", label: "轻松" },
            { value: "balanced", label: "均衡" },
            { value: "packed", label: "特种兵" },
          ].map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setTravelStyle(style.value)}
              className={`flex-1 rounded-full px-4 py-2 text-small transition-colors ${
                travelStyle === style.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="mb-3 block text-small font-medium text-foreground">
          预算
        </label>
        <div className="flex gap-2">
          {[
            { value: "budget", label: "经济" },
            { value: "moderate", label: "舒适" },
            { value: "premium", label: "高端" },
          ].map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudget(b.value)}
              className={`flex-1 rounded-full px-4 py-2 text-small transition-colors ${
                budget === b.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="h-14 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
      >
        开始规划 →
      </Button>
    </form>
  );
}
