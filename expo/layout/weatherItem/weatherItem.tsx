import { useWeather } from '@/modules/weather/useWeather'
import { FC } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

type CityWeatherItemProps = {
  city: string
}

export const CityWeatherItem: FC<CityWeatherItemProps> = ({ city }) => {
  const { weather, loading, error } = useWeather(city)

  if (loading) {
    return (
      <View className="flex items-center justify-center bg-red-500">
        <ActivityIndicator size="small" color="#000" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="items-center justify-center px-4 py-6">
        <Text className="text-center text-base text-red-600">
          Sorry, we couldn&apos;t fetch the weather for this city. 😞
        </Text>
      </View>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <View className="justify-center">
      <View className="justify-between">
        <Text className="text-xl font-semibold text-blue-900">{city}</Text>
        <View className="mt-1 flex-row justify-between">
          <Text className="text-base text-blue-800">{weather.current.condition.text}</Text>
          <Text className="text-base text-blue-800">{weather.current.temp_c}°C</Text>
        </View>
      </View>
    </View>
  )
}
