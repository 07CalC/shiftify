import { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AvailableShiftCard } from "~/components/AvailableShiftCard";
import { Shift } from "~/utils/types";
import { useShiftStore } from "../store/shiftStore";



export default function AvailableShifts() {
    const [selectedArea, setSelectedArea] = useState<'Helsinki' | 'Turku' | 'Tampere'>('Helsinki');
    const loading = useShiftStore(state => state.loading);
    

    const shifts = useShiftStore(state => state.shifts)
    const fetchShift = useShiftStore(state => state.fetchShifts)

    const groupShiftByDate = () => {
        const groupedShifts = shifts.filter((shift) => shift.area === selectedArea).reduce((acc, shift) => {
            const date = new Date(shift.startTime).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(shift);
            return acc;
        }, {} as {[key: string]: Shift[]});
        return groupedShifts;
    }

    const area = ['Helsinki', 'Turku', 'Tampere'];

    const groupedShifts = useMemo(() => groupShiftByDate(), [shifts, selectedArea]);

    const getNumberOfShifts = (area: string) => {
        return shifts.filter((shift) => shift.area === area).length;
    }



    useEffect(() => {
        fetchShift();
    }
    , []);

    return (
        <SafeAreaView className="flex flex-col pb-[52px]">
        <View className="flex flex-row justify-between p-4 px-10">
            {area.map((a: any) => (
                <TouchableOpacity key={a} onPress={() => setSelectedArea(a)}>
                    <Text className={`text-xl ${selectedArea === a ? 'text-[#004FB4]' : 'text-gray-400'}`}>{a} ({getNumberOfShifts(a)})</Text>
                </TouchableOpacity>
            ))}
        </View>
        {loading && (
        <View className="flex flex-col h-full items-center justify-center">
            <Text className="text-2xl text-gray-800">Loading...</Text>
        </View>
        )}
        {!loading && (
            <FlatList
                data={Object.keys(groupedShifts)}
                renderItem={({ item }) => (
                    <View key={item} className="flex flex-col">
                        <Text className="text-2xl text-[#4F6C92] bg-[#CBD2E1] font-bold p-4">{item === new Date().toLocaleDateString() ? "Today" : item}</Text>
                        <FlatList
                            data={groupedShifts[item]}
                            renderItem={({ item }) => <AvailableShiftCard shift={item} shifts={shifts} />}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                )}
                keyExtractor={(item) => item}
            />
        )}
        {shifts.length === 0 && !loading && (
        <View className="flex flex-col h-full items-center justify-center">
            <Text className="text-2xl text-gray-800">No Shifts Available</Text>
            </View>
            )}
    </SafeAreaView>
    );
}

