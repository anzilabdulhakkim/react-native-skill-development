import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Feed',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Details',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}
