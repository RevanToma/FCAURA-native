import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Button from "../components/common/Buttons/Button";

import { Colors } from "../constants/Colors";
import Input from "../components/common/Input/Input";

import TeamMemberToggle from "../components/common/CheckBox/CheckBox";
import { useMutation } from "@tanstack/react-query";

import { fetchProfileSetup, useProfileSetup } from "../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProfileData = {
  bio: string;
  instagram: string;
  position: string;
  teamMember: boolean;
};

const SetupProfile = ({ navigation }: any) => {
  const { profileSetup } = useProfileSetup();

  const mutationProfileSetup = useMutation({
    mutationFn: async (data: ProfileData) => {
      await AsyncStorage.setItem("profileSetup", JSON.stringify(data));

      return data;
    },
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    bio: profileSetup?.bio || "",
    instagram: profileSetup?.instagram || "",
    position: profileSetup?.position || "",
    teamMember: profileSetup?.teamMember || false,
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

  const handleProfileSetup = async () => {
    try {
      const currentProfileData = await fetchProfileSetup();

      const mergedData = {
        ...currentProfileData, // This will spread the existing data
        ...profileData, // This will spread and possibly overwrite with the new data
        skills: currentProfileData?.skills || [], // This will ensure that skills are not overwritten
      };
      mutationProfileSetup.mutate(mergedData);
      console.log("profile data", mergedData);
      navigation.navigate("SetupSkills");
    } catch (error) {
      console.log(error);
    }
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

      <Button onPress={handleProfileSetup} icon="arrow-forward-outline">
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
