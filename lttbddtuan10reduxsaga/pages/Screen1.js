import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Tạo state để lưu username
  const [pwd, setPwd] = useState(''); // Tạo state để lưu mật khẩu (pwd)

  // Hàm kiểm tra đăng nhập từ API
  const handleLogin = async () => {
    if (username && pwd) {
      try {
        // Gửi yêu cầu GET đến MockAPI để lấy danh sách người dùng
        const response = await fetch('https://66fe14a0699369308956fc21.mockapi.io/user');
        const users = await response.json();

        // Tìm người dùng với username và mật khẩu (pwd) phù hợp
        const user = users.find(user => user.username === username && user.pwd === pwd);

        if (user) {
          // Nếu tìm thấy, điều hướng tới Screen2
          navigation.navigate('Screen2');
        } else {
          // Nếu không tìm thấy, thông báo lỗi
          console.error('Sai tên đăng nhập hoặc mật khẩu.');
        }
      } catch (error) {
        // Xử lý lỗi khi không kết nối được với API
        console.error('Lỗi trong quá trình đăng nhập:', error);
      }
    } else {
      // Thông báo khi thiếu thông tin đăng nhập
      console.error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề ứng dụng */}
      <Text style={styles.title}>MANAGE YOUR TASK</Text>

      {/* Input cho tên đăng nhập */}
      <TextInput
        style={styles.input}
        placeholder="Nhập Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername} // Cập nhật state username
      />

      {/* Input cho mật khẩu */}
      <TextInput
        style={styles.input}
        placeholder="Nhập Mật khẩu"
        placeholderTextColor="#999"
        value={pwd}
        secureTextEntry // Ẩn ký tự khi nhập mật khẩu
        onChangeText={setPwd} // Cập nhật state pwd
      />

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Nút chuyển hướng tới màn hình đăng ký */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Đăng ký</Text>
        <Image></Image>
      </TouchableOpacity>
    </View>
  );
};

// CSS cho màn hình đăng nhập
const styles = StyleSheet.create({
  // Container bao quanh toàn bộ màn hình
  container: {
    flex: 1, // Chiếm toàn bộ màn hình
    justifyContent: 'center', // Canh giữa theo chiều dọc
    alignItems: 'center', // Canh giữa theo chiều ngang
    backgroundColor: '#fff', // Màu nền trắng
  },
  // Tiêu đề của ứng dụng
  title: {
    fontSize: 24, // Kích thước font chữ
    fontWeight: 'bold', // Font chữ in đậm
    color: '#8a2be2', // Màu tím
    marginBottom: 40, // Khoảng cách dưới của tiêu đề
  },
  // Input cho username và mật khẩu
  input: {
    width: '80%', // Chiều rộng 80% so với container
    height: 50, // Chiều cao của input
    borderColor: '#ddd', // Màu viền
    borderWidth: 1, // Độ dày viền
    borderRadius: 10, // Bo tròn góc
    paddingHorizontal: 10, // Khoảng cách trong (padding) ngang
    marginBottom: 30, // Khoảng cách dưới của input
    color: '#000', // Màu chữ trong input
  },
  // Nút bấm (button)
  button: {
    marginTop: 20, // Khoảng cách trên của nút
    backgroundColor: '#00bcd4', // Màu nền xanh
    paddingVertical: 15, // Khoảng cách trên và dưới của nội dung trong nút
    paddingHorizontal: 60, // Khoảng cách trái và phải của nội dung trong nút
    borderRadius: 10, // Bo tròn góc cho nút
  },
  // Văn bản bên trong nút
  buttonText: {
    color: '#fff', // Màu chữ trắng
    fontSize: 18, // Kích thước chữ
    fontWeight: 'bold', // Font chữ in đậm
  },
});

export default Screen1;
