import { useRef } from 'react'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { icons } from '@/constants'
import { Map } from '@/components/map'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

export const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title?: string
  children: React.ReactNode
  snapPoints?: string[]
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row items-center justify-start absolute z-10 top-16 px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="items-center justify-center w-10 h-10 rounded-full bg-white">
                <Image
                  source={icons.backArrow}
                  alt="back arrow"
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title ?? 'Go Back'}
            </Text>
          </View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          keyboardBehavior="interactive"
          snapPoints={snapPoints ?? ['40%', '85%']}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}
