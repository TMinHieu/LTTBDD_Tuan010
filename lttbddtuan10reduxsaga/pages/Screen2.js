// Screen2.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksRequest, deleteTaskRequest } from '../actions/taskActions';

const Screen2 = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = { id: (tasks.length + 1).toString(), task: route.params.newTask };
      tasks.push(newTask);
      route.params.newTask = null;
    }
  }, [route.params?.newTask]);

 const renderItem = ({ item }) => (
  <View style={styles.taskContainer}>
    <Image
      source={{ uri: item.img }}
      style={styles.taskImage}
      onError={() => console.log('Lỗi khi tải hình ảnh:', item.img)}
      resizeMode="cover"
    />
    <Text style={styles.taskText}>{item.task}</Text>
    <TouchableOpacity onPress={() => dispatch(deleteTaskRequest(item.id))}>
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
  borderRadius: 25,
  marginRight: 10,
},
});


export default Screen2;
