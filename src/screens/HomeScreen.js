import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../../sanity'

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const getFeaturedData = async () => {
        try {
            const data = await sanityClient.fetch(`
            *[_type=="featured"]{
                _id,
                name,
                short_description
            }
            `)
            setFeaturedCategories(data)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        getFeaturedData()
    }, [])

    return (
        <SafeAreaView className="bg-white pt-5">

            {/* Header */}
            <View
                className="flex-row pb-3 items-center mx-4 space-x-2"
            >
                <Image
                    source={{
                        url: 'https://links.papareact.com/wru'
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput
                        placeholder="Restaurants and Cuisines"
                        keyboardType="default" />
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                className="bg-gray-50"
            >
                {/* Categories */}
                <Categories />
                {/* Featured Rows */}

                {featuredCategories && featuredCategories.map((featuredCategory) => 
                <FeaturedRow
                    key={featuredCategory._id}
                    id={featuredCategory._id}
                    title={featuredCategory.name}
                    description={featuredCategory.short_description}
                />)}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen