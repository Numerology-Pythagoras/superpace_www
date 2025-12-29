import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SportType } from '@/types/activity';
import { isSportType } from './lib/buildData';


export default function SportTabs({
  value,
  onChange,
}: {
  value: 'Run' | 'Ride' | 'Swim';
   onChange: (v: SportType) => void;
})
{

  return (
  <div className="mt-6 px-4 md:px-8 w-full">
  <Tabs defaultValue="Run"  onValueChange={(v) => {
        if (isSportType(v)) {
          onChange(v);
        }
      }}>
    {/* Tabs List */}
    <TabsList className="w-full bg-black/70 p-1 rounded-xl flex gap-2">
      {["Run", "Ride", "Swim"].map((tab) => (
        <TabsTrigger
          key={tab}
          value={tab}
          className={`
            flex-1 text-center px-6 py-2 rounded-lg
            text-orange-300
            data-[state=active]:bg-orange-500
            data-[state=active]:text-black
            data-[state=active]:font-semibold
            hover:bg-orange-400/50
          `}
        >
          {tab === "Ride" ? "Bike" : tab}
        </TabsTrigger>
      ))}
    </TabsList>

  </Tabs>
</div>


  );
}
