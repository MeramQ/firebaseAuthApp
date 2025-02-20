import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView } from 'react-native';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleLogin = async () => {
    if (login === '' || password === '') {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('login', '==', login));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Błąd', 'Niepoprawne dane logowania');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password === password) {
        Alert.alert('Zalogowano', `Witaj ${userData.firstName} ${userData.lastName}!`);
        setUser(userData);
      } else {
        Alert.alert('Błąd', 'Niepoprawne dane logowania');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd, spróbuj ponownie później');
    }
  }

  const handleLogout = () => {
    setUser('');
    setLogin('');
    setPassword('');
    Alert.alert('Wylogowano', 'Zostałeś poprawnie wylogowany');
  }

  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Logowanie</Text>
          <TextInput style={styles.input} placeholder="Podaj login" onChangeText={setLogin}></TextInput>
          <TextInput style={styles.input} placeholder="Podaj hasło" onChangeText={setPassword} secureTextEntry></TextInput>
          <Button title="Zaloguj się" onPress={handleLogin}></Button>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Witaj {user.firstName} {user.lastName}</Text>
          <Button title="Wyloguj" onPress={handleLogout}></Button>
        </View>
      )}
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
