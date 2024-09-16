import { RideLayout } from '@/components/ride-layout'
import { View, FlatList } from 'react-native'
import { Href, router } from 'expo-router'

import { useDriverStore } from '@/store'
import { DriverCard } from '@/components/driver-card'
import { CustomButton } from '@/components/custom-button'

export default function ConfirmRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore()

  return (
    <RideLayout title="Choose a Driver" snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.driver_id))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mt-10 mx-5">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push('/(root)/book-ride' as Href)}
            />
          </View>
        )}
      />
    </RideLayout>
  )
}
