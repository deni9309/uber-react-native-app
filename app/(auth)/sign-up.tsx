import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

import { icons, images } from '@/constants'
import { InputField } from '@/components/input-field'
import { CustomButton } from '@/components/custom-button'
import { OAuth } from '@/components/oauth'

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  })

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ ...verification, state: 'pending' })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        //todo save the user to the db

        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({ ...verification, state: 'success' })
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed. Please try again.',
          state: 'failed',
        })
      }
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  )
}
