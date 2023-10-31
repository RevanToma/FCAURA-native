// SkillPicker.tsx
import { Picker } from "@react-native-picker/picker";
import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import Button from "../common/Buttons/Button";

interface SkillPickerProps {
  predefinedSkills: string[];
  onSkillSelected: (skill: string) => void;
  onAddSkill: (skill: string) => void;
  handleSubmit: () => void;
  isTeammember: boolean;
}
const SkillPicker: FC<SkillPickerProps> = ({
  predefinedSkills,
  onSkillSelected,
  onAddSkill,
  handleSubmit,
  isTeammember,
}) => {
  const [inputSkill, setInputSkill] = useState<string>("");

  return (
    <View>
      <TextInput
        style={styles.input}
        value={inputSkill}
        onChangeText={setInputSkill}
        placeholder="Add your own skill"
      />
      <Picker
        selectedValue=""
        onValueChange={(itemValue) => {
          onSkillSelected(itemValue as string);
        }}
        style={{
          height: 200,
          marginVertical: 10,
        }}
      >
        <Picker.Item
          label="Select a skill"
          value=""
          color={Colors.yellow}
          style={{
            backgroundColor: Colors.primaryBackground,
          }}
        />
        {predefinedSkills.map((skill, index) => (
          <Picker.Item
            key={index}
            label={skill}
            value={skill}
            color={Colors.yellow}
            style={{ backgroundColor: Colors.alternative }}
          />
        ))}
      </Picker>

      <View style={styles.btns}>
        <Button
          onPress={() => {
            onAddSkill(inputSkill);
            setInputSkill("");
          }}
          style={{ backgroundColor: Colors.yellow }}
          textStyle={{ color: Colors.alternative }}
        >
          Add skill
        </Button>
        <Button onPress={handleSubmit}>
          {isTeammember ? "Preview" : "Create Profile"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.white,
    color: Colors.alternative,
  },
});

export default SkillPicker;
