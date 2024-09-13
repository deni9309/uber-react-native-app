import { View, Text, Image } from 'react-native'

import { CustomButton } from '@/components/custom-button'
import { icons } from '@/constants'

export const OAuth = () => {
  const handleGoogleSignIn = async () => {}

  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-x-3 mt-4">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="w-full shadow-none mt-5"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
            alt="google"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  )
}
