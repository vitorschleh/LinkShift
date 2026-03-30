import Loader from '@/components/utils/loading-spinner';
import { BarChart as SimpleChart } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const calculateTotalViews = (data) => {
  let totalViews = 0;
  for (const item of data) {
    totalViews += item.visits;
  }
  return totalViews;
};
const Chart = ({ analytics }) => {
  return (
    <>
      <div className="surface-card mt-5 w-full rounded-[2rem] px-3 py-5">
        <p className="px-3 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink/45">
          Total visits
        </p>
        <div className="flex items-center gap-2 px-3 pb-2 text-2xl font-semibold text-ink">
          {analytics ? (
            <h3>{calculateTotalViews(analytics)}</h3>
          ) : (
            <h3>
              <div className="mr-2 h-6 w-6 animate-pulse rounded-md bg-white/70 lg:h-10 lg:w-10" />
            </h3>
          )}
          <SimpleChart />
        </div>
        <div className="">
          <ResponsiveContainer width="95%" height={300}>
            {analytics ? (
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="t"
                  stroke="#8c7f72"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={15}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#8c7f72"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar dataKey="visits" fill="#a7835b" radius={[12, 12, 0, 0]} />
              </BarChart>
            ) : (
              <div>
                <Loader bgColor={'black'} message={'Fetching data'} />
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Chart;
