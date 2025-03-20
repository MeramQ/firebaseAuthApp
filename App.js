import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async () => {
    if (login === '' || password === '') {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
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

  const handleAddUser = async (email, firstName, lastName, login, password) => {
    try {
      await addDoc(collection(db, 'users'), {
        email,
        firstName,
        lastName,
        login,
        password
      });
      Alert.alert('Dodano użytkownika', 'Użytkownik został dodany do bazy danych');
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd, spróbuj ponownie później');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Logowanie</Text>
          <TextInput style={styles.input} placeholder="Podaj login" onChangeText={setLogin}></TextInput>
          <TextInput style={styles.input} placeholder="Podaj hasło" onChangeText={setPassword} secureTextEntry></TextInput>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Zaloguj się</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Witaj, {user.firstName} {user.lastName}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text>Wyloguj się</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.title}>Dodaj nowego użytkownika</Text>
            <TextInput style={styles.input} placeholder="Podaj imię nowego użytkownika" onChangeText={setNewFirstName} />
            <TextInput style={styles.input} placeholder="Podaj nazwisko nowego użytkownika" onChangeText={setNewLastName} />
            <TextInput style={styles.input} placeholder="Podaj email nowego użytkownika" onChangeText={setNewEmail} />
            <TextInput style={styles.input} placeholder="Podaj login nowego użytkownika" onChangeText={setNewLogin} />
            <TextInput style={styles.input} placeholder="Podaj hasło nowego użytkownika" onChangeText={setNewPassword} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={() => handleAddUser(newEmail, newFirstName, newLastName, newLogin, newPassword)}>
              <Text>Dodaj użytkownika</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1E6',
    alignItems: 'center',
  },
  registerContainer: {
    marginTop: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 50
  },
  input: {
    backgroundColor: '#FDFAF6',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 275,
    height: 40,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#99BC85',
    padding: 10,
    borderRadius: 5,
    width: 275,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#BF3131',
    padding: 10,
    borderRadius: 5,
    width: 275,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

});
