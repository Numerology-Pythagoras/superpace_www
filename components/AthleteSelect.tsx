const ATHLETES = [
  "Lam Dang Ngoc",
  "Nguyen Viet Long",
  "Bui Truong Giang",
  "Chinh Pham",
  "Cuong Phung Chi",
  "Dao Yen Trung",
  "Dat Nguyen Van",
  "Hung Pham Huy",
  "hung war",
  "Tien Nguyen Xuan",
  "Trung Nguyen",
  "Trương SỸ Cường",
  "Đăng Đăng Tùng",
  "Bùi Minh Thắng",
  "cuong trinh",
  "Diep Pham Quynh",
  "Kỳ Đới",
  "Ha Van Vuong",
  "Dat Nguyen",
];

export default function AthleteSelect({
  athlete,
  onChange,
}: {
  athlete: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="max-w-md mx-auto mb-6">
      <select
        className="
    w-full
    h-14
    px-4
    rounded-xl
    bg-black/40
    border border-white/10
    text-white
    text-base
    focus:outline-none
    focus:ring-2
    focus:ring-[#FFD7612D]
  "
        value={athlete ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Chọn tên để xem tổng kết năm</option>
        {ATHLETES.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
