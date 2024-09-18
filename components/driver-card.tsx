import { DriverCardProps } from '@/types/type'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { cn, formatTime } from '@/lib/utils'
import { icons } from '@/constants'

export const DriverCard = ({
  item,
  selected,
  setSelected,
}: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={cn(
        'flex flex-row items-center justify-between py-5 px-3 rounded-xl',
        selected === item.driver_id ? 'bg-general-600' : 'bg-white',
      )}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        alt={
          item?.first_name && item?.last_name
            ? `${item.first_name} ${item.last_name}`
            : 'profile picture'
        }
        className="w-14 h-14 rounded-full"
      />

      <View className="flex flex-1 flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-lg font-Jakarta">{item.title}</Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} alt="star" className="w-3.5 h-3.5" />
            <Text className="text-sm font-Jakarta">4</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} alt="dollar" className="w-4 h-4" />
            <Text className="text-sm font-Jakarta ml-1">${item.price}</Text>
          </View>

          <Text className="text-sm font-Jakarta text-general-800 mx-1">|</Text>
          <Text className="text-sm font-Jakarta text-general-800">
            {formatTime(parseInt(`${item.time!}`))}
          </Text>
          <Text className="text-sm font-Jakarta text-general-800 mx-1">|</Text>
          <Text className="text-sm font-Jakarta text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        alt="car image"
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}
