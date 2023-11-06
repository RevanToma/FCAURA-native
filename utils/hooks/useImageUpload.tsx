import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Alert } from "react-native";
import { saveToFirebase, storage } from "../../firebase/firebase";
import { User } from "../../types";

const useImageUpload = (user: User) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const startUpload = async (uri: string) => {
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

  return {
    isUploading,
    uploadProgress,
    startUpload,
  };
};

export default useImageUpload;
