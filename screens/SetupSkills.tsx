import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Colors } from "../constants/Colors";

import SelectedSkills from "../components/SelectedSkills/SelectedSkills";
import { preDefinedSkills } from "./../utils/data/PredefinedSkills";
import SkillPicker from "../components/SelectedSkills/SkillPicker";
import { fetchProfileSetup, updateProfileSetup } from "../utils/asyncStorage";
import { AuthContext } from "../store/authContext";
import { saveToFirebase } from "../firebase/firebase";

const SetupSkills = ({ navigation }: any) => {
  const query = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchProfileSetup,
  });

  console.log(query.data);
  const mutation = useMutation({
    mutationFn: updateProfileSetup,
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    query.data?.skills || []
  );
  const [isTeammember, setIsTeammember] = useState<boolean>(
    query.data?.teamMember || false
  );
  const authCtx = useContext(AuthContext);
  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill) && skill.trim() !== "") {
      setSelectedSkills((prev) => [
        ...prev,
        skill.charAt(0).toUpperCase() + skill.slice(1),
      ]);
    }
  };
  useEffect(() => {
    if (query.data) {
      setIsTeammember(query.data.teamMember);
      setSelectedSkills(query.data.skills);
    }
  }, [query.data]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const updatedProfileData = {
        ...query.data,
        skills: selectedSkills,
      };

      mutation.mutate(updatedProfileData);
      updateProfileSetup(updatedProfileData);

      if (isTeammember) {
        navigation.navigate("Preview");
        setIsSubmitting(false);
      } else {
        await saveToFirebase(authCtx?.token!, updatedProfileData);
        authCtx?.completeProfileSetup();
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
          <SelectedSkills skills={selectedSkills} onRemoveSkill={removeSkill} />

          <SkillPicker
            predefinedSkills={preDefinedSkills}
            onSkillSelected={addSkill}
            onAddSkill={addSkill}
            handleSubmit={handleSubmit}
            isTeammember={isTeammember}
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
