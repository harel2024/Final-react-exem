// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { Icandidate } from '../types/types';
// import { BASE_URL } from './userSlice'

// interface CandidateState {
//   candidates: Icandidate[] | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: CandidateState = {
//   candidates: null,
//   status: 'idle', 
//   error: null   
// };

// export const fetchCandidates = createAsyncThunk<
//   Icandidate[], // סוג הנתונים שמוחזרים בהצלחה
//   void,         // אין פרמטר שנשלח לפונקציה
//   { rejectValue: string } // טיפוס השגיאה במקרה כישלון
// >(
//   "candidates/fetchCandidates",
//   async (_, thunkAPI) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/candidates`);
//       const data = await response.json();
//       if (!response.ok) {
//         return thunkAPI.rejectWithValue(data.message);
//       }
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const candidatesSlice = createSlice({
//   name: "candidates",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCandidates.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Icandidate[]>) => {
//         state.status = 'succeeded';
//         state.candidates = action.payload;
//       })
//       .addCase(fetchCandidates.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.status = 'failed';
//         state.error = action.payload || 'An error occurred';
//       });
//   },
// });

// export default candidatesSlice.reducer;


import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Icandidate } from '../types/types';
import { BASE_URL } from './userSlice';

interface CandidateState {
  candidates: Icandidate[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CandidateState = {
  candidates: null,
  status: 'idle', 
  error: null   
};

export const fetchCandidates = createAsyncThunk<
  Icandidate[], // סוג הנתונים שמוחזרים בהצלחה
  void,         // אין פרמטר שנשלח לפונקציה
  { rejectValue: string } // טיפוס השגיאה במקרה כישלון
>(
  "candidates/fetchCandidates",
  async (_, thunkAPI) => {
    try {
      // שליפת הטוקן מה-localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/candidates`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // הוספת הטוקן בכותרת
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Icandidate[]>) => {
        state.status = 'succeeded';
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default candidatesSlice.reducer;


  