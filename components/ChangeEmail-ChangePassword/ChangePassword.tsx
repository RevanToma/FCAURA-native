import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { Colors, stylesObj } from "../../constants/Colors";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Buttons/Button";
import { updateUserPassword } from "../../firebase/firebase.utils";

type ChangeEmailProps = {
  onClose: () => void;
};
type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const ChangePassword: React.FC<ChangeEmailProps> = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordData>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");
  const confirmPasswordValue = watch("confirmNewPassword");
  const currentPassword = watch("currentPassword");

  const onSubmit = async (data: PasswordData) => {
    try {
      await updateUserPassword(data.newPassword);
      onClose();
      Alert.alert("Success", "Password changed successfully");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Failed", error.message);
      onClose();
    }
  };
  const isCurrentPasswordValid =
    !errors.currentPassword && currentPassword.length >= 8;
  const isNewPasswordValid =
    !errors.newPassword && newPasswordValue.length >= 8;

  const isConfirmPasswordValid =
    newPasswordValue === confirmPasswordValue &&
    confirmPasswordValue.length >= 8;

  return (
    <View style={stylesObj.root}>
      <ScrollView>
        <Image
          style={styles.image}
          source={require("../../assets/ChangePassword.png")}
        />
        {errors.currentPassword && (
          <Text style={styles.errorText}>{errors.currentPassword.message}</Text>
        )}

        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Current Password"
                secureTextEntry={true}
              />

              {isCurrentPasswordValid && (
                <Ionicons
                  name="checkmark-circle-outline"
                  color={Colors.green}
                  size={25}
                  style={{ position: "absolute", right: 0, marginRight: 40 }}
                />
              )}
            </View>
          )}
          rules={{
            required: "Current Password is required",
            validate: (value) => value.length >= 8,
          }}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="New Password"
                secureTextEntry
              />
              {isNewPasswordValid && (
                <Ionicons
                  name="checkmark-circle-outline"
                  color={Colors.green}
                  size={25}
                  style={{ position: "absolute", right: 0, marginRight: 40 }}
                />
              )}
            </View>
          )}
          name="newPassword"
        />
        {errors.confirmNewPassword && (
          <Text style={styles.errorText}>
            {errors.confirmNewPassword.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            validate: (value) =>
              value === newPasswordValue || "The passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm New Password"
                secureTextEntry
              />
              {isConfirmPasswordValid && (
                <Ionicons
                  name="checkmark-circle-outline"
                  color={Colors.green}
                  size={25}
                  style={{ position: "absolute", right: 0, marginRight: 40 }}
                />
              )}
            </View>
          )}
          name="confirmNewPassword"
        />
        <Button style={styles.btn} onPress={handleSubmit(onSubmit)}>
          Change Password
        </Button>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  image: {
    marginVertical: 20,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 7,
    fontSize: 16,
    textAlignVertical: "top",
    width: "80%",
    marginVertical: 10,
  },
  inputView: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 35,
    marginTop: 10,
    color: "#CC6E00",
    fontWeight: "bold",
    fontSize: 16,
  },
  btn: {
    alignSelf: "center",
    borderRadius: 7,
    width: "80%",
    marginBottom: 50,
  },
});
