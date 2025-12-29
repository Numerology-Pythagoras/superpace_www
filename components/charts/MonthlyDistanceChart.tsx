import { MonthlyDistance } from "@/types/stats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function MonthlyDistanceChart({
  data,
}: {
  data: MonthlyDistance[];
}) {
  const maxDistance = Math.max(...data.map(d => d.distance));
    const maxIndex =
    data.length === 0
      ? -1
      : data.reduce(
          (max, d, i) => (d.distance > data[max].distance ? i : max),
          0
        );
  return (
    <div className="bg-black/30 rounded-2xl p-4">
      <h3 className="text-lg font-semibold mb-2">
        Hành trình vận động của bạn
      </h3>
      <p className="text-sm opacity-70 mb-4">
        Quãng đường bạn duy trì đều đặn qua 12 tháng
      </p>
      

     <ResponsiveContainer width="100%" height={220}>
  <LineChart
    data={data}
    margin={{ top: 30, right: 16, left: 0, bottom: 8 }} // 🔥 QUAN TRỌNG
  >
    <XAxis dataKey="month" stroke="#aaa" />
    <YAxis stroke="#aaa" />

   {/* <Tooltip
  contentStyle={{
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: '12px',
    border: 'none',
    color: '#fff',
  }}
  labelStyle={{
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  }}
  formatter={(value) => {
    if (typeof value !== 'number') return value;
    return [`${value.toFixed(1)} km`, 'Quãng đường'];
  }}
  labelFormatter={(label) => `Tháng ${label}`}
/> */}
<Tooltip content={() => null} />
    <Line
      type="linear"
      dataKey="distance"
      stroke="#f97316"
      strokeWidth={3}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
    >
      <LabelList
        content={(props) => {
          const { x, y, value, index } = props;

          if (
            index !== maxIndex ||
            typeof value !== 'number' ||
            typeof x !== 'number' ||
            typeof y !== 'number'
          ) {
            return null;
          }

          return (
            <text
              x={x}
              y={y - 10}
              fill="#fff"
              // stroke="#f97316"
              // strokeWidth={3}
              // paintOrder="stroke"
              fontSize={12}
              fontWeight={700}
              textAnchor="middle"
            >
              {value.toFixed(1) + " km"}
            </text>
          );
        }}
      />
    </Line>
  </LineChart>
</ResponsiveContainer>
    </div>
  );
}
