import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native'

import { cn } from '@/lib/utils'
import { InputFieldProps } from '@/types/type'

export const InputField = ({
  label,
  labelStyle,
  icon,
  iconStyle,
  inputStyle,
  containerStyle,
  secureTextEntry = false,
  className,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-full my-2">
        <Text className={cn('text-lg font-JakartaSemiBold mb-3', labelStyle)}>
          {label}
        </Text>
        <View
          className={cn(
            'relative flex flex-row justify-start items-center bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500',
            containerStyle,
          )}
        >
          {icon && (
            <Image
              source={icon}
              className={cn('w-6 h-6 ml-4', iconStyle)}
              alt="icon"
            />
          )}
          <TextInput
            className={cn(
              'flex-1 text-[15px] font-JakartaSemiBold p-4 rounded-full text-left',
              inputStyle,
            )}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)
