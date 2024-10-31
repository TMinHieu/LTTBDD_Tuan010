import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State cho thông báo lỗi

  const handleLogin = async () => {
    if (username.trim() === '' || pwd.trim() === '') {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }
    
    try {
      const response = await fetch('https://66fe14a0699369308956fc21.mockapi.io/user');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.pwd === pwd);

      if (user) {
        navigation.navigate('Screen2');
      } else {
        setErrorMessage('Sai tên đăng nhập hoặc mật khẩu.');
      }
    } catch (error) {
      setErrorMessage('Lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
      console.error('Lỗi:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nhập Mật khẩu"
        placeholderTextColor="#999"
        value={pwd}
        secureTextEntry
        onChangeText={setPwd}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Đăng ký</Text>
        <Image></Image>
      </TouchableOpacity>
    </View>
  );
};

// CSS cho màn hình đăng nhập
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8a2be2',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00bcd4',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Screen1;
