

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const BASE_URL = "http://localhost:3000";

// interface IUserState {
//   username: string | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   token: string | null;
// }

// const initialState: IUserState = {
//   username: null,
//   status: "idle", 
//   error: null,
//   token: localStorage.getItem("token") || null,  // שליפת הטוקן מה-localStorage
// };


// export const registerUser = createAsyncThunk(
//   "user/registerUser", 
//   async (userData: { username: string; password: string, isAdmin: boolean }, thunkAPI) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         return thunkAPI.rejectWithValue(data.message);
//       }

//       const data = await response.json();
//       return data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Registration failed."); 
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (userData: { username: string; password: string }, thunkAPI) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         return thunkAPI.rejectWithValue(data.message);
//       }

//       const data = await response.json();
//       return data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Login failed.");
//     }
//   }
// );


// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.username = null;
//       state.token = null;
//       state.status = "idle";
//       state.error = null;

  
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         state.token = action.payload.token;
//         state.username = action.payload.username;

    
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
      
//       .addCase(loginUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         state.token = action.payload.token;
//         state.username = action.payload.username;

 
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;




import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "http://localhost:3000";

interface IUserState {
  username: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;

}

const initialState: IUserState = {
  username: null,
  status: "idle", 
  error: null,
  token: localStorage.getItem("token") || null,

};

export const registerUser = createAsyncThunk(
  "user/registerUser", 
  async (userData: { username: string; password: string, organization: string,area: string}, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Registration failed."); 
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.username = action.payload.username;
 
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.username = action.payload.username;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;




















