import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ArticleDetail {
  id: number;
  title: string;
  body: string;
}

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams(); // 1. Get the ID from the URL
  const router = useRouter();
  
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the specific article using the ID
  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const json = await response.json();
        setArticle(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleArticle();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Same Image Seed as Feed to match */}
        <Image 
          source={{ uri: `https://picsum.photos/seed/${id}/400/300` }} 
          style={styles.image} 
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{article?.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>By Tech Reporter</Text>
            <Text style={styles.metaText}>• 2 hrs ago</Text>
          </View>
          
          <Text style={styles.body}>
            {article?.body}
            {'\n\n'}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
            (This allows us to simulate a long article so you can test scrolling).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    position: 'absolute', // Floating back button
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 10 },
  metaRow: { flexDirection: 'row', marginBottom: 20 },
  metaText: { color: '#666', marginRight: 10, fontSize: 14 },
  body: { fontSize: 16, lineHeight: 26, color: '#333' },
});
