import { ActivityIndicator, Alert, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SettingsProps } from "./Settings";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { Colors } from "../constants/Colors";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import {
  addSkill,
  removeSkill,
  updateUserProfileThunk,
} from "../store/user/userSlice";

import SelectedSkills from "../components/SelectedSkills/SelectedSkills";
import SkillPicker from "../components/SelectedSkills/SkillPicker";
import { preDefinedSkills } from "../utils/helpers/Helpers";

const ChangeSkills = ({ navigation }: SettingsProps) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector(selectUser);

  const removeSkillHandler = (skill: string) => {
    dispatch(removeSkill(skill));
  };

  const addSkillHandler = (skill: string) => {
    dispatch(addSkill(skill));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(
        updateUserProfileThunk({ uid: user.uid!, profileData: user })
      );
      navigation.navigate("SettingsMain");
      setIsSubmitting(false);
      Alert.alert("Success", "Skills updated successfully");
    } catch (error) {
      console.error("Error updating skills in profile data:", error);
    }
    setIsSubmitting(false);
  };
  return (
    <ScrollView style={styles.container}>
      {isSubmitting ? (
        <ActivityIndicator
          size={100}
          color={Colors.yellow}
          style={{ marginBottom: 20, justifyContent: "center" }}
        />
      ) : (
        <>
          <SelectedSkills
            skills={user.skills}
            onRemoveSkill={removeSkillHandler}
          />

          <SkillPicker
            profileCompleted={user.completedProfileSetup}
            predefinedSkills={preDefinedSkills}
            onSkillSelected={addSkillHandler}
            onAddSkill={addSkillHandler}
            handleSubmit={handleSubmit}
            isTeammember={user.teamMember}
          />
        </>
      )}
    </ScrollView>
  );
};
export default ChangeSkills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.alternative,
  },
});
