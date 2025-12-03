import React, { useEffect, useState } from 'react';
import {  StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Define the Shape of a News Article
interface Article {
  id: number;
  title: string;
  body: string;
}

export default function NewsFeedScreen() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 2. Fetch Data
  const fetchNews = async () => {
    try {
      // We limit to 20 items so it doesn't overwhelm us
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
      const json = await response.json();
      setArticles(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  // 3. Render a Single News Card
  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity 
      style={styles.card}
      // ✨ Navigate to the dynamic route, passing the ID
      onPress={() => router.push({ pathname: '/article/[id]', params: { id: item.id.toString() } })}
    >
      {/* Random Image based on ID */}
      <Image 
        source={{ uri: `https://picsum.photos/seed/${item.id}/400/200` }} 
        style={styles.cardImage} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.snippet} numberOfLines={2}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden', // Ensures image corners align with card
    elevation: 3, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: { width: '100%', height: 150 },
  cardContent: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  snippet: { fontSize: 14, color: '#6b7280' },
});
