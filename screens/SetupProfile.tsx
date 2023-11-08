import { StyleSheet, View, ScrollView } from "react-native";
import React, { FC, useState } from "react";
import Button from "../components/common/Buttons/Button";

import { Colors } from "../constants/Colors";
import Input from "../components/common/Input/Input";

import TeamMemberToggle from "../components/common/CheckBox/CheckBox";

import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { logOutUser, updateUserProfile } from "../store/user/userSlice";
import ImagePicker from "../components/ImagePicker/ImagePicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ProfileData = {
  bio: string;
  instagram: string;
  position: string;
  teamMember: boolean;
  name: string;
  email?: string;
  completedProfileSetup?: boolean;
  photoURL?: string;
};

export type SettingsStackParamList = {
  SetupMain: undefined;
  SetupProfile: undefined;
  SetupSkills: undefined;
  Preview: undefined;
  Review: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  "SetupMain"
>;
type SettingsProps = {
  navigation: SettingsScreenNavigationProp;
};

const SetupProfile: FC<SettingsProps> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: user?.bio || "",
    instagram: user?.instagram || "",
    position: user?.position || "",
    teamMember: user?.teamMember || false,
    name: user?.name || "",
    completedProfileSetup: user?.completedProfileSetup || false,
  });
  const isValidBio = profileData.bio.length >= 10;
  const isValidPosition = profileData.position.length >= 3;
  const isValidName = profileData.name.length >= 3;

  const isValid = isValidBio && isValidPosition && isValidName;

  const handleProfileData = (
    field: keyof ProfileData,
    value: string | boolean
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleProfileSetup = async () => {
    try {
      dispatch(updateUserProfile(profileData));
      navigation.navigate("SetupSkills");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <ScrollView style={styles.root}>
      <View style={{ alignItems: "center" }}>
        <ImagePicker />
        <Input
          label="Bio"
          keyboardType="default"
          errorText="At least 10 characters"
          value={profileData.bio}
          onUpdateValue={(value) => handleProfileData("bio", value)}
          isInvalid={!isValidBio}
          multiline={true}
        />
        <Input
          label="Position"
          errorText="At least 3 charecters"
          keyboardType="default"
          value={profileData.position}
          onUpdateValue={(value) => handleProfileData("position", value)}
          isInvalid={!isValidPosition}
        />
        <Input
          label="Full name"
          errorText="At least 3 charecters"
          keyboardType="default"
          value={profileData.name}
          onUpdateValue={(value) => handleProfileData("name", value)}
          isInvalid={!isValidName}
        />
        <Input
          label="Instagram"
          keyboardType="default"
          value={profileData.instagram}
          onUpdateValue={(value) => handleProfileData("instagram", value)}
        />
        <TeamMemberToggle
          initialStatus={profileData.teamMember}
          onToggle={(status) => handleProfileData("teamMember", status)}
        />
        <Button
          onPress={handleProfileSetup}
          icon="arrow-forward-outline"
          disabled={!isValid}
        >
          Add Skills
        </Button>
        <Button onPress={handleLogout}>Logout</Button>
      </View>
    </ScrollView>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
