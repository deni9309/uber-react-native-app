import { Image, Text, View } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { useUser } from '@clerk/clerk-expo'

import Payment from '@/components/payment'
import { RideLayout } from '@/components/ride-layout'
import { icons } from '@/constants'
import { formatTime } from '@/lib/utils'
import { useDriverStore, useLocationStore } from '@/store'

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!

export default function BookRide() {
  const { user } = useUser()
  const { userAddress, destinationAddress } = useLocationStore()
  const { drivers, selectedDriver } = useDriverStore()

  const driverDetails = drivers?.filter(
    (driver) => Number(driver.driver_id) === selectedDriver,
  )[0]

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.uber.dev"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>

          <View className="flex flex-col items-center justify-center w-full mt-10">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              alt="profile image"
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {driverDetails?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  alt="star"
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-Jakarta">
                  {driverDetails?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col items-start justify-center w-full px-5 py-3 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-Jakarta">Ride Price</Text>
              <Text className="text-lg font-Jakarta text-green-500">
                ${driverDetails?.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-Jakarta">Pickup Time</Text>
              <Text className="text-lg font-Jakarta">
                {formatTime(parseInt(`${driverDetails?.time!}`))}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-Jakarta">Car Seats</Text>
              <Text className="text-lg font-Jakarta">
                {driverDetails?.car_seats}
              </Text>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center mt-5">
            <View className="flex flex-row items-center justify-start w-full border-t border-b border-general-700 mt-3 py-3">
              <Image
                source={icons.to}
                alt="start point icon"
                className="w-6 h-6"
              />
              <Text className="text-lg font-Jakarta ml-2">{userAddress}</Text>
            </View>

            <View className="flex flex-row items-center justify-start w-full border-b border-general-700 py-3">
              <Image
                source={icons.point}
                alt="end point icon"
                className="w-6 h-6"
              />
              <Text className="text-lg font-Jakarta ml-2">
                {destinationAddress}
              </Text>
            </View>
          </View>

          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.driver_id!}
            rideTime={driverDetails?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  )
}
