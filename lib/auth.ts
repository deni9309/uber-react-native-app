import * as Linking from 'expo-linking'
import * as SecureStore from 'expo-secure-store'
import {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from '@clerk/clerk-expo'

import { fetchAPI } from '@/lib/fetch'

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)

      if (item) {
        console.info(`${key} was used 🔒 \n`)
      } else {
        console.info('No values stored under key: ' + key)
      }

      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (_err) {
      return
    }
  },
}

export const googleOAuth = async (
  startOAuthFlow: (
    tartOAuthFlowParams?: StartOAuthFlowParams,
  ) => Promise<StartOAuthFlowReturnType>,
) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL('/(root)/(tabs)/home'),
    })

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId })

        if (signUp?.createdUserId) {
          await fetchAPI('/(api)/user', {
            method: 'POST',
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          })
        }

        return {
          success: true,
          code: 'success',
          message: 'You have successfully signed in with Google',
        }
      }
    }

    return {
      success: false,
      code: 'error',
      message: 'An error occurred while signing in with Google',
    }
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      code: error.code as string,
      message: error?.errors[0]?.longMessage as string,
    }
  }
}
