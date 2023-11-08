import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserFromFirebase,
  signInWithEmail,
  signUpWithEmail,
  updateFirebaseUserEmail,
  updateUserProfileFirebase,
} from "../../firebase/firebase.utils";
import { ProfileData } from "../../screens/SetupProfile";

import { User } from "../../types";

interface userState {
  user: User;
  error: null | string;
  isSignedIn: boolean;
}

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await signUpWithEmail(email, password);
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
      const userDocument = await signInWithEmail(email, password);
      return userDocument;
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

type UpdateProfileDataObj = {
  profileData: ProfileData;
  uid: string;
};
export const updateUserProfileThunk = createAsyncThunk(
  "user/updateUserProfile",
  async ({ uid, profileData }: UpdateProfileDataObj, thunkAPI) => {
    try {
      await updateUserProfileFirebase(uid, profileData);
      return profileData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// export const updateUserEmail = createAsyncThunk(
//   "user/updateUserEmail",
//   async (newEmail: string, thunkAPI) => {
//     try {
//       await updateFirebaseUserEmail(newEmail);
//       return newEmail;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

const initialState: userState = {
  user: {
    name: "",
    bio: "",
    instagram: "",
    teamMemberStatus: "Pending",
    position: "",
    skills: [],
    completedProfileSetup: false,

    uid: null,
    teamMember: false,
    email: "",
    photoURL: "",
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
    setUserPhotoURL: (state, { payload }: PayloadAction<string>) => {
      state.user.photoURL = payload;
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
    signSuccess: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfileThunk.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
      })
      .addCase(updateUserProfileThunk.rejected, (state, { payload }) => {
        state.error = payload as string;
        console.error("Error updating the profile: ", payload);
      });
    builder
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload,
        };
        console.log("CURRUSET", state.user);
        state.isSignedIn = true;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.error = payload as string;
      });
    builder
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = {
            ...state.user,
            ...payload,
          };
          state.isSignedIn = true;
        } else {
          console.error("Sign-in successful but no payload returned");
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSignedIn = false;
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
  setUserPhotoURL,
  signSuccess,
} = userSlice.actions;
export default userSlice.reducer;
