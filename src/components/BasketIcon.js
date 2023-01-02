import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../../redux/features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const total = useSelector(selectBasketTotal)

    const navigation = useNavigation()

    if (items.length > 0) return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity
                onPress={() => navigation.navigate("Basket")}
                className="bg-[#00CCBB] mx-5 p-4 flex-row space-x-1 rounded-lg">
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
                <Text className="text-lg text-white font-extrabold">
                    <Currency quantity={total} currency="NGN" />
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default BasketIcon