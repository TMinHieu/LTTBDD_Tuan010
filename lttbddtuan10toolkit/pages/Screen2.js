import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask, addTask } from '../slices/tasksSlice'; // Đảm bảo thêm addTask

const Screen2 = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = { id: (tasks.length + 1).toString(), ...route.params.newTask }; // Sử dụng data đầy đủ
      dispatch(addTask(newTask)); // Gọi hàm addTask
      route.params.newTask = null; // Reset tham số
    }
  }, [route.params?.newTask, tasks]);

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      {item.img && <Image source={{ uri: item.img }} style={styles.taskImage} />}
      <Text style={styles.taskText}>{item.username}</Text>
      <TouchableOpacity onPress={() => dispatch(deleteTask(item.id))}>
        <Text style={styles.deleteButton}>Xóa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Sua', { task: item })}>
        <Text style={styles.editButton}>Sửa</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi Twinkle</Text>
      <Text style={styles.subGreeting}>Have a great day ahead</Text>
      <TextInput style={styles.searchInput} placeholder="Tìm kiếm" placeholderTextColor="#999" />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Screen3')}>
        <Text style={styles.addIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles remain the same as provided in your initial code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subGreeting: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  list: {
    paddingBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00bcd4',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: '#fff',
    fontSize: 30,
  },
  taskImage: {
  width: 50,
  height: 50,
  borderRadius: 5,
},

});

export default Screen2;
