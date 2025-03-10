import { useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useShiftStore } from '~/app/store/shiftStore';
import { BASE_URL } from '~/utils/env';
import { formatTime, getBookingStatus, greenSpinnerXML, redSpinnerXML } from '~/utils/lib';
import { Shift } from '~/utils/types';
import { SvgXml } from 'react-native-svg';

type props = {
  shift: Shift;
  shifts: Shift[];
};

export const AvailableShiftCard = ({ shift, shifts }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bookingStatus = getBookingStatus(shift, shifts);
  const fetchShift = useShiftStore((state) => state.fetchShifts);

  const handleBooking = async () => {
    const time = new Date().getTime();
    if (shift.startTime < time) {
      ToastAndroid.show('Shift Already Started', ToastAndroid.SHORT);
      return;
    }
    if (bookingStatus === 'Overlapping') {
      ToastAndroid.show('Shift Overlapping', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    if (shift.booked) {
      await fetch(BASE_URL?.trim() + '/shifts/' + shift.id + '/cancel', {
        method: 'GET',
      });
      fetchShift();
      setLoading(false);
      return;
    }
    await fetch(`http://192.168.155.188:8080/shifts/${shift.id}/book`, {
      method: 'GET',
    });
    fetchShift();
    setLoading(false);
    return;
  };
  return (
    <View key={shift.id} className=" w-full border-b border-gray-300">
      <View className="flex flex-row items-center justify-between p-4">
        <Text className="text-xl text-gray-500">
          {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </Text>

        <Text
          className={`text-lg font-bold ${bookingStatus === 'Overlapping' ? 'text-[#E2006A]' : ''} text-gray-500`}>
          {bookingStatus === 'Available' ? '' : bookingStatus}
        </Text>
        <TouchableOpacity
          onPress={handleBooking}
          disabled={
            new Date(shift.startTime).getTime() < new Date().getTime() ||
            bookingStatus === 'Overlapping'
          }
          className={`border  px-8 py-2 text-xl disabled:border-gray-400 disabled:text-gray-400  ${shift.booked ? 'border-[#E2006A] text-[#E2006A]' : 'border-[#16A64D] text-[#16A64D]'} rounded-full`}>
          {loading && !shift.booked && <SvgXml xml={greenSpinnerXML} width="25" height="25" />}
          {loading && shift.booked && <SvgXml xml={redSpinnerXML} width="25" height="25" />}
          {!loading && (
            <Text
              disabled={
                new Date(shift.startTime).getTime() < new Date().getTime() ||
                bookingStatus === 'Overlapping'
              }
              className={`text-xl disabled:border-gray-400 disabled:text-gray-400  ${shift.booked ? 'text-[#E2006A]' : 'text-[#16A64D]'} rounded-full`}>
              {shift.booked ? 'Cancel' : 'Book'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
