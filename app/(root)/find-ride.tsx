import { Text, View } from 'react-native'

import { useLocationStore } from '@/store'
import { RideLayout } from '@/components/ride-layout'

export default function FindRide() {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore()

  return (
    <RideLayout>
      <Text className="text-2xl">Find Ride</Text>
    </RideLayout>
  )
}
