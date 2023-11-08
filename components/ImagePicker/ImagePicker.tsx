import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";

import { selectUser } from "../../store/user/userSelectors";
import { useSelector } from "react-redux";
import useImageUpload from "../../utils/hooks/useImageUpload";
import UploadOverlay from "../common/ProgressBar/UploadOverlay";
import { setUserPhotoURL } from "../../store/user/userSlice";
import { useAppDispatch } from "../../utils/hooks/useDispatch";

const ImagePicker = () => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");

  const { isUploading, uploadProgress, startUpload } = useImageUpload(user);

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
  const handleImagePicked = async (uri: string) => {
    setPickedImage(uri);
    await startUpload(uri);
    dispatch(setUserPhotoURL(uri));
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
      await handleImagePicked(image.assets[0].uri);
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
      await handleImagePicked(image.assets[0].uri);
    }
  };

  let imagePreview = (
    <Text style={{ color: Colors.white }}>No Profile image taken yet!</Text>
  );

  if (pickedImage && !user.photoURL) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  } else if (user.photoURL) {
    imagePreview = (
      <Image source={{ uri: user.photoURL }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <UploadOverlay
        isUploading={isUploading}
        progress={uploadProgress}
        pickedImage={pickedImage}
      />
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  popup: {
    width: 300,
    backgroundColor: Colors.alternative,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 150,
    marginVertical: 15,
  },
});
