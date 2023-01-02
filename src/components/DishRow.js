import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Currency from 'react-currency-formatter'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../../redux/features/basketSlice'

const DishRow = ({ id, name, description, image, price }) => {
    const [isPressed, setIsPressed] = useState(false)
    const dispatch = useDispatch()
    const items = useSelector(state => selectBasketItemsById(state, id))

    const handleAddToBasket = () => {
        dispatch(addToBasket({ id, name, description, image, price }))
    }

    const handleRemoveFromBasket = () => {
        items.length > 0 && dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-200 ${isPressed ? 'border-b-0' : ''}`}
            >
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Currency quantity={price} currency="NGN" />
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: '#F3F3F4'
                            }}
                            source={{
                                uri: urlFor(image).url()
                            }}
                            className="h-20 w-20 bg-gray-300 p-4"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed &&
                <View className="bg-white px-4">
                    <View className="flex-row items-center justify-center space-x-2 py-2">
                        <TouchableOpacity disabled={!items.length > 0} onPress={handleRemoveFromBasket}>
                            <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={handleAddToBasket}>
                            <PlusCircleIcon color="#00CCBB" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}

export default DishRow