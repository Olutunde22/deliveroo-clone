import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import BasketScreen from './src/screens/BasketScreen';
import PreparingOrderScreen from './src/screens/PreparingOrderScreen'
import DeliveryScreen from './src/screens/DeliveryScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Home" component={HomeScreen} />
                <Screen name="Restaurant" component={RestaurantScreen} />
                <Screen name="Basket" component={BasketScreen} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Screen name="PreparingOrder" component={PreparingOrderScreen} options={{
                    presentation: 'fullScreenModal', headerShown: false
                }} />
                <Screen name="Delivery" component={DeliveryScreen} options={{
                    presentation: 'fullScreenModal', headerShown: false
                }} />
            </Navigator>
        </NavigationContainer>
    );
}