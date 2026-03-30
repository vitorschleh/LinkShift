import Chart from './bar-chart';
import Select from 'react-select';
import LinkStats from './link-stats';
import useCurrentUser from '@/hooks/useCurrentUser';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';
import { LocationStats } from './location-stats';
import { DeviceStats } from './device-stats';
import useLocationAnalytics from '@/hooks/useLocationAnalytics';
import useDeviceAnalytics from '@/hooks/useDeviceAnalytics';

export function AnalyticsDashboard() {
  const options = [
    { value: 'last_hour', label: 'Last hour' },
    { value: 'last_24_hours', label: 'Last 24 hours' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
  ];

  const { data: currentUser } = useCurrentUser();
  const [filter, setFilter] = useState('last_hour');

  const { data: visitAnalytics } = useAnalytics(filter, currentUser?.handle);
  const { data: locationAnalytics } = useLocationAnalytics(currentUser?.handle);
  const { data: deviceAnalytics } = useDeviceAnalytics(currentUser?.handle);

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: 999,
      borderColor: state.isFocused ? '#7d654c' : 'rgba(23, 20, 17, 0.08)',
      boxShadow: '0 12px 36px rgba(23, 20, 17, 0.08)',
      backgroundColor: 'rgba(255,255,255,0.58)',
      paddingInline: 4,
      minHeight: 46,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 20,
      overflow: 'hidden',
    }),
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-4xl leading-none text-ink">
            Analytics
          </h3>
          <p className="mt-2 text-sm text-ink/60">
            A calmer read on what is actually driving attention.
          </p>
        </div>
        <Select
          onChange={(option) => setFilter(option.value)}
          className="w-[190px]"
          defaultValue={options[0]}
          options={options}
          styles={selectStyles}
        />
      </div>
      <Chart analytics={visitAnalytics} />
      <LinkStats />
      <DeviceStats analytics={deviceAnalytics} />
      <LocationStats analytics={locationAnalytics} />
    </>
  );
}
