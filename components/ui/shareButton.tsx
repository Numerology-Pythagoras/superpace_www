"use client";

import { RefObject, useState } from "react";
import { toPng } from "html-to-image";
import { Share2 } from "lucide-react";

type ShareButtonProps = {
  targetRef: RefObject<HTMLDivElement>;
  disabled?: boolean; // ✅ THÊM DÒNG NÀY
};

export function ShareButton({ targetRef, disabled }: ShareButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!targetRef.current || disabled || loading) return;

    try {
      setLoading(true);

      // 🔥 chờ tất cả image load xong
      const imgs = targetRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(imgs).map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => (img.onload = res))
        )
      );

      await new Promise((r) => setTimeout(r, 200));

      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "transparent",
      });

      const link = document.createElement("a");
      link.download = "year-in-review.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Share failed:", err);
      alert("Không thể tạo ảnh chia sẻ. Hãy thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={disabled || loading}
      className="
        flex items-center gap-2
        rounded-full
        bg-white/10 hover:bg-white/20
        disabled:opacity-50 disabled:cursor-not-allowed
        px-4 py-2
        text-sm font-medium
        backdrop-blur
        transition
      "
    >
      <Share2 size={16} />
      {loading ? "Đang tạo ảnh..." : "Chia sẻ"}
    </button>
  );
}
