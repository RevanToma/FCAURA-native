import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Button from "../components/common/Buttons/Button";
import { AuthContext } from "../store/authContext";
import { Colors } from "../constants/Colors";
import Input from "../components/common/Input/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TeamMemberToggle from "../components/common/CheckBox/CheckBox";
import { saveToFirebase } from "../firebase/firebase";

export type ProfileData = {
  bio: string;
  instagram: string;
  position: string;
  teamMember: boolean;
};
const SetupProfile = ({ navigation }: any) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: "",
    instagram: "",
    position: "",
    teamMember: false,
  });
  const isValidBio = profileData.bio.length >= 10;
  const isValidPosition = profileData.position.length >= 3;

  const handleProfileData = (
    field: keyof ProfileData,
    value: string | boolean
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePorfileSetup = () => {
    AsyncStorage.setItem("profileSetup", JSON.stringify(profileData));

    navigation.navigate("SetupSkills");

    // saveToFirebase(authCtx?.token!, profileData);
  };
  return (
    <View style={styles.root}>
      <View>
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
          label="Instagram"
          keyboardType="default"
          value={profileData.instagram}
          onUpdateValue={(value) => handleProfileData("instagram", value)}
        />
        <TeamMemberToggle
          onToggle={(status) => handleProfileData("teamMember", status)}
        />
      </View>

      <Button onPress={handlePorfileSetup} icon="arrow-forward-outline">
        Add Skills
      </Button>
    </View>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
    alignItems: "center",
  },
});
