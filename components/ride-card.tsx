import { Image, Text, View } from 'react-native'

import { icons } from '@/constants'
import { cn, formatDate, formatTime } from '@/lib/utils'

interface RideCardProps {
  ride: {
    destination_longitude: number
    destination_latitude: number
    origin_address: string
    destination_address: string
    created_at: string
    ride_time: number
    payment_status: string
    driver: {
      first_name: string
      last_name: string
      car_seats: number
    }
  }
}

export const RideCard = ({ ride }: RideCardProps) => {
  return (
    <View className="flex flex-row justify-center items-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col justify-center items-center p-3">
        <View className="flex flex-row justify-between items-center">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col flex-1 gap-y-5 mx-5">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" alt="To icon" />
              <Text className="font-JakartaMedium" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image
                source={icons.point}
                className="w-5 h-5"
                alt="Point icon"
              />
              <Text className="font-JakartaMedium" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col items-start justify-center w-full bg-general-500 rounded-lg mt-5 p-3">
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="font-JakartaMedium text-gray-500">
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="font-JakartaMedium text-gray-500">Driver</Text>
            <Text className="font-JakartaMedium text-gray-500">
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="font-JakartaMedium text-gray-500">Car Seats</Text>
            <Text className="font-JakartaMedium text-gray-500">
              {ride.driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={cn(
                'font-JakartaMedium capitalize',
                ride.payment_status === 'paid'
                  ? 'text-green-500'
                  : 'text-red-500',
              )}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
