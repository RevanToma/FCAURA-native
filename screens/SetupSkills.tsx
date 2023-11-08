import { StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";

import { Colors } from "../constants/Colors";

import SelectedSkills from "../components/SelectedSkills/SelectedSkills";
import { preDefinedSkills } from "../utils/helpers/Helpers";
import SkillPicker from "../components/SelectedSkills/SkillPicker";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import {
  addSkill,
  completedProfileSetup,
  removeSkill,
} from "../store/user/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import { saveToFirebase } from "../firebase/firebase.utils";

const SetupSkills = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector(selectUser);

  console.log("SETUPSKILLS", user);
  const removeSkillHandler = (skill: string) => {
    dispatch(removeSkill(skill));
  };

  const addSkillHandler = (skill: string) => {
    dispatch(addSkill(skill));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (user.teamMember) {
        navigation.navigate("Preview");
        setIsSubmitting(false);
      } else {
        await saveToFirebase(user.uid!, {
          ...user,
          completedProfileSetup: true,
        });
        dispatch(completedProfileSetup());
        Alert.alert(
          "Success",
          "Account created successfully. Email verification has been sent to your email address"
        );
      }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.alternative,
  },
});

export default SetupSkills;
