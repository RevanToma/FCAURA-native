import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Button from "../components/common/Buttons/Button";
import { AuthContext } from "../store/authContext";

const SetupProfile = () => {
  const authCtx = useContext(AuthContext);
  const handlePorfileSetup = () => {
    authCtx?.completeProfileSetup();
  };
  return (
    <View>
      <Text>SetupProfile</Text>
      <Button onPress={handlePorfileSetup}>Complete</Button>
    </View>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({});
