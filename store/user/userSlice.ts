import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, logIn } from "../../utils/auth";
import { ProfileData } from "../../screens/SetupProfile";
import { fetchUserFromFirebase } from "../../firebase/firebase";
import { User } from "../../types";

interface userState {
  user: User;
  error: null | string;
  isSignedIn: boolean;
}

// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async (profileData: ProfileData,  thunkAPI) => {
//     try {
//       const updateUser = await updateFirebaseUser(ProfileData.uid, profileData);
//       return updateUser;
//     } catch (error: any) {
//       console.log(error);
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await createUser(email, password);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await logIn(email, password);
      return data;
    } catch (error: any) {
      console.log(error);

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (uid: string, thunkAPI) => {
    try {
      const data = await fetchUserFromFirebase(uid);
      return data;
    } catch (error: any) {
      console.log(error);

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState: userState = {
  user: {
    name: "",
    bio: "",
    instagram: "",
    teamMemberStatus: "Pending",
    position: "",
    skills: [],
    completedProfileSetup: false,
    token: null,
    uid: null,
    teamMember: false,
  },

  error: null,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }: PayloadAction<ProfileData>) => {
      const { bio, instagram, position, teamMember, name } = payload;
      state.user.bio = bio;
      state.user.instagram = instagram;
      state.user.position = position;
      state.user.teamMember = teamMember;
      state.user.name = name;
    },
    logOutUser: (state) => {
      state.user = initialState.user;
      state.isSignedIn = false;
    },
    removeSkill: (state, { payload }) => {
      const index = state.user.skills.findIndex((skill) => skill === payload);
      state.user.skills.splice(index, 1);
    },

    addSkill: (state, { payload }) => {
      if (!state.user.skills.includes(payload) && payload.trim() !== "") {
        state.user.skills.push(payload);
      }
    },
    completedProfileSetup: (state) => {
      state.user.completedProfileSetup = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.user.token = payload?.token;
        state.user.uid = payload?.uid;
        state.isSignedIn = true;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.error = payload as string;
      });
    builder
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.user.token = payload.token;
        state.user.uid = payload.uid;
        state.isSignedIn = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      if (payload && payload !== null) {
        state.user = payload as User;
        state.isSignedIn = true;
      } else {
        state.error = "Fetched user data is null";
        state.isSignedIn = false;
      }
    });
  },
});

export const {
  updateUserProfile,
  logOutUser,
  addSkill,
  removeSkill,
  completedProfileSetup,
} = userSlice.actions;
export default userSlice.reducer;
