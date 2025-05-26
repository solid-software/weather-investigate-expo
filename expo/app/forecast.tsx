import { useWeather } from '@/modules/weather/useWeather'
import { useRouter } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'
import { useMemo } from 'react'
import { ActivityIndicator, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Forecast() {
  const params = useSearchParams()
  const router = useRouter()

  const city = params.get('city') || 'Unknown city'

  const { weather, loading, error } = useWeather(city)

  const weeklyForecast = useMemo(() => {
    if (!weather?.forecast) return []

    return weather.forecast.map(day => ({
      day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: `${Math.round(day.day.avgtemp_c)}°C`,
      icon: `https:${day.day.condition.icon}`,
      description: day.day.condition.text,
    }))
  }, [weather])

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-50">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-blue-600">Loading weather...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-50 p-4">
        <Text className="text-center text-lg text-red-600">Error: {error}</Text>
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="mt-4 rounded bg-blue-600 px-4 py-2"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-50 p-4">
      <TouchableOpacity onPress={() => {
          if(router.canGoBack()) {
              router.back()
          }
          else {
          router.push('/')
          }
      }}>
        <Text className="text-bold ml-4 text-lg text-gray-600">{'< Back'}</Text>
      </TouchableOpacity>

      <View className="my-6 flex items-center justify-center">
        <Text className="text-xl font-semibold text-gray-800">{city}</Text>
        <Text className="mt-2 text-5xl font-bold text-blue-600">
          {weather?.current ? `${Math.round(weather.current.temp_c)}°C` : '--'}
        </Text>
        <Text className="text-md text-gray-600">{weather?.current?.condition.text || 'N/A'}</Text>
      </View>

      <View className="flex w-full items-center justify-center">
        <Text className="mb-2 text-lg font-semibold text-gray-700">This Week</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weeklyForecast.map(day => (
          <View
            key={day.day}
            className="mx-4 mb-3 flex-row items-center justify-between rounded-xl bg-white p-4"
          >
            <View className="flex flex-row items-center space-x-2">
              <Text className="text-base font-medium text-gray-800">{day.day}</Text>
              <Image source={{ uri: day.icon }} className="h-10 w-10" />
            </View>
            <Text className="text-base font-bold text-blue-600">{day.temp}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
