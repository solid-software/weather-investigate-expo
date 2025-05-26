import { Link, Stack } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center text-center">
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View className="items-center justify-center gap-y-2 text-center">
          <Text>This screen does not exist.</Text>
          <Link href="/">
            <Text className="text-blue-500">Go to home screen!</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}
