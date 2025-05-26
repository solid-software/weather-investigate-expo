import { FormInput } from '@/components/form'
import { CityWeatherItem } from '@/layout/weatherItem'
import { useDebounce } from '@/utils/useDebounce'
import { City } from 'country-state-city'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type CityType = {
  id: string
  city: string
  countryCode: string
}

export default function Locations() {
  const { control, watch, setValue } = useForm({ defaultValues: { search: '' } })
  const search = watch('search').toLowerCase()
  const router = useRouter()

  const debouncedSearch = useDebounce(search, 500)
  const [cities, setCities] = useState<CityType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCities = async () => {
      try {
        const usCities = City.getCitiesOfCountry('US')
        if (usCities) {
          const formattedCities: CityType[] = usCities.map(city => ({
            id: `${city.name}-${city.stateCode}-US`,
            city: city.name,
            countryCode: 'US',
          }))
          setCities(formattedCities)
        }
      } catch (error) {
        console.error('Error loading cities:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    loadCities()
  }, [])

  const filteredLocations = cities.filter(loc => loc.city.toLowerCase().includes(debouncedSearch))

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormInput
        control={control}
        name="search"
        inputProps={{
          placeholder: 'Search US city...',
          className: 'bg-gray-100 rounded-xl px-4 py-3 mx-4 text-base text-black mt-6',
          placeholderTextColor: '#888',
        }}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-4 text-gray-500">Loading cities...</Text>
        </View>
      ) : filteredLocations.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">No results found</Text>
          <Button title="Clear" onPress={() => setValue('search', '')} />
        </View>
      ) : (
        <View className="flex-1">
          <FlatList
            data={filteredLocations}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator
            className="mt-6"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/forecast?city=${item.city}`)}
                className="mx-4 mb-4 h-[90px] justify-center rounded-2xl bg-blue-100 p-4"
              >
                <CityWeatherItem city={item.city} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}
