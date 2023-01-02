import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Image, Text } from 'react-native-animatable'
import { Circle } from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 4000)
    }, [])
    return (
        <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center -mt-20">
            <Image
                source={require('../../assets/preparingOrder.gif')}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />
            <Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center">
                Waiting for restaurant to accept your order!
            </Text>
            <Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen