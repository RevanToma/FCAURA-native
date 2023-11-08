import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { ProfileData } from "./SetupProfile";
import {
  updateUserProfile,
  updateUserProfileThunk,
} from "../store/user/userSlice";
import ImagePicker from "../components/ImagePicker/ImagePicker";
import Input from "../components/common/Input/Input";
import { Colors } from "../constants/Colors";
import TeamMemberToggle from "../components/common/CheckBox/CheckBox";
import Button from "../components/common/Buttons/Button";
import { SettingsProps } from "./Settings";

const ChangeProfileInfo = ({ navigation }: SettingsProps) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: user?.bio || "",
    instagram: user?.instagram || "",
    position: user?.position || "",
    teamMember: user?.teamMember || false,
    name: user?.name || "",
  });
  const isValidBio = user.bio.length >= 10;
  const isValidPosition = user.position.length >= 3;
  const isValidName = user.name.length >= 3;

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
      await dispatch(updateUserProfileThunk({ uid: user.uid!, profileData }));
      navigation.navigate("SettingsMain");
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
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
          disabled={!isValid}
          style={{ borderRadius: 7, width: "80%" }}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

export default ChangeProfileInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
