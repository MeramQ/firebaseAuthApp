import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView } from 'react-native';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <View>
        <TextInput style={styles.input} placeholder="Podaj login"></TextInput>
        <TextInput style={styles.input} placeholder="Podaj hasło" secureTextEntry></TextInput>
        <Button title="Zaloguj się"></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 40,
    padding: 10,
    marginBottom: 10,
  }

});
