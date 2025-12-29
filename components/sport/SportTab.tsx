const TABS = ['Run', 'Ride', 'Swim'] as const;

export default function SportTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-black/30 rounded-full flex p-1 mb-6">
      {TABS.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`flex-1 py-3 rounded-full transition
            ${active === t
              ? 'bg-orange-500 text-white'
              : 'opacity-70'
            }`}
        >
          {t === 'Run' && 'Chạy'}
          {t === 'Ride' && 'Đạp'}
          {t === 'Swim' && 'Bơi'}
        </button>
      ))}
    </div>
  );
}
