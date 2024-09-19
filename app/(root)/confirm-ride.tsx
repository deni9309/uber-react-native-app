import RideLayout from '@/components/ride-layout'
import { View, FlatList } from 'react-native'
import { router } from 'expo-router'

import { useDriverStore } from '@/store'
import { DriverCard } from '@/components/driver-card'
import { CustomButton } from '@/components/custom-button'

export default function ConfirmRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore()
  console.log(selectedDriver)
  return (
    <RideLayout title="Choose a Driver" snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        // keyExtractor={(item, index) => index.toString() + item.first_name}
        renderItem={({ item, index }) => (
          <DriverCard
            key={item.first_name + index}
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mt-10 mx-5">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push('/(root)/book-ride')}
            />
          </View>
        )}
      />
    </RideLayout>
  )
}
