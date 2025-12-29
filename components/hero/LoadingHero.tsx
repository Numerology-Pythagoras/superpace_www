export default function LoadingHero({
  athlete,
  progress,
}: {
  athlete: string | null;
  progress: number; // 0–100
}) {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg-runner.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-screen justify-between">
        <div>
          <p className="uppercase tracking-widest text-sm opacity-80">
            Sport Year in Review
          </p>
          <h1 className="text-5xl font-bold mt-2">2025</h1>
          <p className="mt-4 opacity-80">
            Nhìn lại hành trình tập luyện của bạn trong một năm
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="bg-black/40 rounded-full h-3 overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-3 opacity-80">
            Đang tổng hợp dữ liệu… {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
