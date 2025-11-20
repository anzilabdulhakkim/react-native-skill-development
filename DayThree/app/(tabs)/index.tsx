import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_DATA = [
  { id: '1', name: 'Alice Johnson', phone: '(555) 123-4567', initials: 'AJ' },
  { id: '2', name: 'Bob Smith', phone: '(555) 987-6543', initials: 'BS' },
  { id: '3', name: 'Charlie Brown', phone: '(555) 555-5555', initials: 'CB' },
  { id: '4', name: 'David Miller', phone: '(555) 111-2222', initials: 'DM' },
];

export default function App() {
  const [contacts, setContacts] = useState(INITIAL_DATA);
  const [selected, setSelected] = useState(null);

  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => setSelected(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  if (selected) {
    return (
      <SafeAreaView style={styles.callContainer}>
        <StatusBar barStyle="light-content" />

        <View style={styles.callTop}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.callCenter}>
          <View style={styles.callAvatar}>
            <Text style={styles.callAvatarText}>{selected.initials}</Text>
          </View>

          <Text style={styles.callName}>{selected.name}</Text>
          <Text style={styles.callPhone}>{selected.phone}</Text>
        </View>

        <View style={styles.callActions}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>

        <TouchableOpacity onPress={() => setContacts([])}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  clearText: { fontSize: 16, fontWeight: '600', color: '#e54646ff' },

  row: { flexDirection: 'row', padding: 15, alignItems: 'center' },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e54646ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  info: { flex: 1 },

  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  phone: { fontSize: 14, color: '#888', marginTop: 4 },

  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 80,
  },

  emptyText: {
    textAlign: 'center',
    padding: 30,
    fontSize: 16,
    color: '#888',
  },

  callContainer: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 40,
  },

  callTop: {
    paddingHorizontal: 20,
  },

  backText: { color: '#fff', fontSize: 16 },

  callCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e54646ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  callAvatarText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  callName: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  callPhone: { color: '#aaa', fontSize: 18, marginTop: 8 },

  callActions: {
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#26c281',
    justifyContent: 'center',
    alignItems: 'center',
  },

  callButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
