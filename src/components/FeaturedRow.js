import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState()

  const getFeaturedRestaurants = async () => {
    try {
      const data = await sanityClient.fetch(`
      *[_type=="featured" && _id ==$id]{
        _id,
        restaurant[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
        }
        }[0]
        `, { id })
      setFeaturedRestaurants(data?.restaurant)
    }
    catch (err) {

    }
  }


  useEffect(() => {
    getFeaturedRestaurants()
  }, [])

  return (
    <View>
      <View className="flex-row mt-4 items-center justify-between px-4">
        <Text className="font-bold flex-1 text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-400 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {featuredRestaurants && featuredRestaurants.map((featuredRestaurant) =>
          <RestaurantCard
            key={featuredRestaurant._id}
            id={featuredRestaurant._id}
            imgUrl={featuredRestaurant.image}
            title={featuredRestaurant.name}
            rating={featuredRestaurant.rating}
            genre={featuredRestaurant.type.name}
            address={featuredRestaurant.address} 
            dishes={featuredRestaurant.dishes}
            long={featuredRestaurant.long}
            lat={featuredRestaurant.lat}
            short_description={featuredRestaurant.short_description}
            />
        )}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow