import {
  StyleSheet,
  View,
  Button,
  Alert,
  Image,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
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
import ProgressBar from "../common/ProgressBar/ProgressBar";

const ImagePicker = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const user = useSelector(selectUser);

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
      const pickedUri = image.assets[0].uri;

      setPickedImage(pickedUri);
      await saveImageToFirebase(pickedUri, "image");
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

  const saveImageToFirebase = async (uri: string, _fileType: any) => {
    setIsUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        Alert.alert("An error occurred!", error.message, [{ text: "Okay" }]);
        setIsUploading(false);
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
        setIsUploading(false);
      }
    );
  };

  const UploadOverlay = () => (
    <Modal transparent={true} visible={isUploading} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={{ color: Colors.white, fontSize: 18, marginBottom: 10 }}>
            Uploading Image...
          </Text>
          {pickedImage && (
            <Image source={{ uri: pickedImage }} style={styles.previewImage} />
          )}
          <ProgressBar progress={uploadProgress} />
          <ActivityIndicator size="large" color={Colors.yellow} />
        </View>
      </View>
    </Modal>
  );
  let imagePreview = (
    <Text style={{ color: Colors.white }}>No Profile image taken yet!</Text>
  );

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>
      {isUploading && <UploadOverlay />}
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
