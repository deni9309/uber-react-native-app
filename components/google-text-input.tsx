import { View, Text } from 'react-native'

import { GoogleInputProps } from '@/types/type'
import { cn } from '@/lib/utils'

export const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View
    className={cn(
      'relative z-50 flex flex-row items-center justify-center rounded-xl mb-5',
      containerStyle,
    )}
  >
    <Text>Search</Text>
  </View>
)
