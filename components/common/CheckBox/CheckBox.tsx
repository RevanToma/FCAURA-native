import React, { FC, useState } from "react";
import { Switch, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";

interface TeamMemberToggleProps {
  onToggle?: (status: boolean) => void;
  initialStatus: boolean;
}

const TeamMemberToggle: FC<TeamMemberToggleProps> = ({
  onToggle,
  initialStatus,
}) => {
  const [isTeamMember, setIsTeamMember] = useState(initialStatus);

  const handleToggleChange = () => {
    const newStatus = !isTeamMember;
    setIsTeamMember(newStatus);

    // Callback to notify the parent component about the toggle change
    onToggle && onToggle(newStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.teamMemberTxt}>Are you team member?</Text>
      <Switch
        value={isTeamMember}
        onValueChange={handleToggleChange}
        trackColor={{ false: "#767577", true: Colors.green }}
        thumbColor={isTeamMember ? Colors.yellow : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 30,
    marginBottom: 20,
  },
  teamMemberTxt: {
    color: Colors.yellow,
    fontSize: 20,
  },
});

export default TeamMemberToggle;
