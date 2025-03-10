import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useShiftStore } from "~/app/store/shiftStore";
import { BASE_URL } from "~/utils/env";
import { formatTime, redSpinnerXML } from "~/utils/lib";
import { Shift } from "~/utils/types";



export const MyShiftCard = ({ shift }: { shift: Shift }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const fetchShift = useShiftStore((state) => state.fetchShifts);
    const handleCancel = async () => {
        setLoading(true);
        await fetch(BASE_URL?.trim() + '/shifts/' + shift.id + '/cancel', {
            method: 'GET',
        });
        fetchShift();
        setLoading(false);
    }
    return (
        <View key={shift.id} className="w-full border-b border-gray-300">
              <View className="flex flex-row items-center justify-between p-4">
                <View className="flex flex-col items-start justify-center">
                <Text className="text-2xl font-bold text-gray-500">
                  {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </Text>
                <Text className="text-lg  text-gray-500">
                  {shift.area}
                </Text>
                </View>
                <TouchableOpacity disabled={shift.startTime < new Date().getTime()} onPress={handleCancel} className={`border disabled:border-gray-400 border-[#E2006A] px-8 py-2 text-xl text-red-500 rounded-full`}>
                    {loading && <SvgXml xml={redSpinnerXML} width="25" height="25" />}
                    {!loading && <Text disabled={shift.startTime < new Date().getTime()} className="text-xl disabled:text-gray-400 text-[#E2006A]">Cancel</Text>}
                </TouchableOpacity>
        
              </View>
            </View>
    );
};