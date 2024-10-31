// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thay đổi URL đến API bạn cung cấp
const API_URL = 'https://66fe14a0699369308956fc21.mockapi.io/user';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(API_URL);
  
  // Kiểm tra phản hồi từ API
  if (!response.ok) {
    throw new Error('Không thể lấy dữ liệu');
  }

  // Chuyển đổi dữ liệu từ JSON
  const data = await response.json();
  return data;
});

// Tạo slice cho tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload; // Cập nhật với dữ liệu nhận được
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Lưu lỗi nếu có
      });
  },
});

export const { deleteTask, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
