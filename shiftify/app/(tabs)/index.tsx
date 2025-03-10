import { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Shift } from '~/utils/types';
import { useShiftStore } from '../store/shiftStore';
import { MyShiftCard } from '~/components/MyShiftCard';

export default function RootLayout() {
  const loading = useShiftStore(state => state.loading);
  const shifts = useShiftStore(state => state.shifts).filter((shift: Shift) => shift.booked === true);
  const fetchShift = useShiftStore(state => state.fetchShifts);

  const groupShiftByDate = () => {
    const groupedShifts = shifts.reduce((acc, shift) => {
        const date = new Date(shift.startTime).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(shift);
        return acc;
    }, {} as {[key: string]: Shift[]});
    return groupedShifts;
}

const groupedShifts = useMemo(() => groupShiftByDate(), [shifts]);

  useEffect(() => {
    fetchShift();
  }, []);

  return (
    <View className="flex flex-col">
        {loading && (
        <View className="flex flex-col h-full items-center justify-center">
            <Text className="text-2xl text-gray-800">Loading...</Text>
        </View>
        )}
        {!loading && (
      <FlatList
        data={Object.keys(groupedShifts)}
        renderItem={({ item }) => (
          <View className="flex flex-col">
            <Text className="text-2xl font-bold text-[#4F6C92] bg-[#CBD2E1] p-4">{item === new Date().toLocaleDateString() ? "Today" : item}</Text>
            <FlatList
              data={groupedShifts[item]}
              renderItem={({ item }) => <MyShiftCard shift={item} />}
            />
          </View>
        )}
      />
        )}
        {shifts.length === 0 && !loading && (
        <View className="flex flex-col h-full items-center justify-center">
            <Text className="text-2xl text-gray-800">No Shifts, Enjoy</Text>
        </View>
        )}
    </View>
  );
}
