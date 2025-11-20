import React, { useState } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Alert,StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_DATA = [
  { id: '1', name: 'Alice Johnson', phone: '(555) 123-4567', initials: 'AJ' },
  { id: '2', name: 'Bob Smith', phone: '(555) 987-6543', initials: 'BS' },
  { id: '3', name: 'Charlie Brown', phone: '(555) 555-5555', initials: 'CB' },
  { id: '4', name: 'David Miller', phone: '(555) 111-2222', initials: 'DM' },
  { id: '5', name: 'Eve Davis', phone: '(555) 333-4444', initials: 'ED' },
  { id: '6', name: 'Frank Wilson', phone: '(555) 666-7777', initials: 'FW' },
  { id: '7', name: 'Grace Lee', phone: '(555) 888-9999', initials: 'GL' },
  { id: '8', name: 'Hannah White', phone: '(555) 000-1111', initials: 'HW' },
];

export default function App() {
  const [contacts, setContacts] = useState(INITIAL_DATA);

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => Alert.alert('Contact Selected', `Calling ${item.name}...`)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>

        <TouchableOpacity onPress={() => setContacts([])}>
          <Text style={styles.clearText}>Clear List</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e54646ff',
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e54646ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
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
});
