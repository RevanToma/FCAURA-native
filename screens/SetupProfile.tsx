import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Button from "../components/common/Buttons/Button";
import { AuthContext } from "../store/authContext";
import { Colors } from "../constants/Colors";
import IconButton from "../components/common/Buttons/IconButton";

const SetupProfile = ({ navigation }: any) => {
  const authCtx = useContext(AuthContext);

  const handlePorfileSetup = () => {
    authCtx?.completeProfileSetup();
    navigation.navigate("SetupSkills");
  };
  return (
    <View style={styles.root}>
      <Text>SetupProfile</Text>
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
  },
});
