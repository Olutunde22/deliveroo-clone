import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Currency from 'react-currency-formatter'
import { selectRestaurant } from '../../redux/features/restaurantSlice'
import { clearBasket, selectGroupedItems, removeFromBasket, selectBasketTotal } from '../../redux/features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const subtotal = useSelector(selectBasketTotal)
    const groupedItems = useSelector(selectGroupedItems)
    const dispatch = useDispatch()

    const handlePrepareOrder = () => {
        dispatch(clearBasket())
        navigation.navigate("PreparingOrder")
    }


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()
                        }
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" size={50} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image source={{
                        url: 'https://links.papareact.com/wru',
                    }}
                        className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                    />
                    <Text className="flex-1">Deliver in 30 - 60 mins</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupedItems).map(([key, items]) =>
                        <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text className="text-[#00CCBB]">{items.length} x</Text>
                            <Image
                                source={{
                                    url: urlFor(items[0]?.image).url()
                                }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <Text className="text-gray-600">
                                <Currency quantity={items[0]?.price} currency="NGN" />
                            </Text>

                            <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                <Text className="text-[#00CCBB] text-xs">Remove</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={subtotal} currency="NGN" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery fee</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={2000} currency="NGN" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Order Total</Text>
                        <Text className="font-extrabold">
                            <Currency quantity={subtotal + 2000} currency="NGN" />
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handlePrepareOrder}
                        className="rounded-lg bg-[#00CCBB] p-4">
                        <Text className="text-white text-center text-lg font-bold">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen