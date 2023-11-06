import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { saveToFirebase, storage } from "../../firebase/firebase";
import { selectUser } from "../../store/user/userSelectors";
import { useSelector } from "react-redux";

const ImagePicker = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");

  const user = useSelector(selectUser);

  console.log("FROM IMAGEPICKER", user);
  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const chooseImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.canceled === false && image.assets) {
      setPickedImage(image.assets[0].uri);
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.canceled === false && image.assets) {
      setPickedImage(image.assets[0].uri);
      await saveImageToFirebase(image.assets[0].uri, "image");
    }
  };
  let imagePreview = (
    <Text style={{ color: Colors.white }}>No Profile image taken yet!</Text>
  );

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  const saveImageToFirebase = async (uri: string, _fileType: any) => {
    const response = await fetch(uri);

    const blob = await response.blob();
    const storageRef = ref(storage, `profile/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          await saveToFirebase(user.uid!, {
            ...user,
            photoURL: downloadURL,
          });
        });
        console.log("Upload is complete");
      }
    );
  };
  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>

      <View style={{ gap: 10 }}>
        <Button onPress={takeImageHandler} title="Take Image" />
        <Button onPress={chooseImageHandler} title="Choose Image" />
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    padding: 3,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
