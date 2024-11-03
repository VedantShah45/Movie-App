import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import './global.css'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/home'
import MovieScreen from './src/screens/MovieScreen'
import { MovieProvider } from './src/context/moviesContext'
import PersonScreen from './src/screens/PersonScreen'
import SearchScreen from './src/screens/searchScreen'

export type  RootStackParamList = {
  Home: undefined,
  MovieScreen:{index:number},
  PersonScreen:undefined,
  SearchScreen:undefined,
};

const Stack=createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MovieProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
              headerShown:false,// Hide header
              contentStyle: { padding: 0, margin: 0 }, // Remove default padding and margin
              }}>
              <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                  headerShown:false
                }}
              />
              <Stack.Screen
                name='MovieScreen'
                component={MovieScreen}
                options={{
                  title:'Movie Screen'
                }}
              />
              <Stack.Screen
                name='SearchScreen'
                component={SearchScreen}
              />
          </Stack.Navigator>
          {/* <Text className='text-white bg-red-600'>Hey</Text> */}
    </NavigationContainer>
    </MovieProvider>
  )
}

const styles = StyleSheet.create({})