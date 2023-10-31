// SelectedSkills.tsx
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../common/Buttons/IconButton";
import { Colors } from "../../constants/Colors";

type SelectedSkillsProps = {
  skills: string[];
  onRemoveSkill: (skill: string) => void;
};

const SelectedSkills: FC<SelectedSkillsProps> = ({ skills, onRemoveSkill }) => {
  return (
    <View style={styles.skillsContainer}>
      {skills.map((skill: string, index: number) => (
        <View key={index} style={styles.skillButton}>
          <Text style={styles.skillTxt}>{skill}</Text>
          <IconButton
            onPress={() => onRemoveSkill(skill)}
            icon="close-circle-outline"
            color={Colors.error}
            size={30}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 10,
  },

  skillButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.settingsBackground,
    gap: 5,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  skillTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.yellow,
  },
});

export default SelectedSkills;
