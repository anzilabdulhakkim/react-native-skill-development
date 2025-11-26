import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 

// Import Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// 1. Create the Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 2. Build the Stack Navigator (The "Home" logic)
function HomeStackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeList" component={HomeScreen} options={{ title: 'Feed' }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// 3. Build the App (The Tab logic)
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // This function controls the icons
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return the Icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4f46e5', // Color when active
          tabBarInactiveTintColor: 'gray',  // Color when inactive
          headerShown: false // Hide the Tab Header (because the Stack has its own header)
        })}
      >
        
        {/* Tab 1: The Stack */}
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStackGroup} 
          options={{ title: 'Home' }}
        />

        {/* Tab 2: Profile with Badge (Homework) */}
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ tabBarBadge: 3 }}
        />

        {/* Tab 3: Settings */}
        <Tab.Screen name="Settings" component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
