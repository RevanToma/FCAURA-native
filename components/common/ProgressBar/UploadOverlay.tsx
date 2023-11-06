import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import ProgressBar from "./ProgressBar";
import { Colors } from "../../../constants/Colors";

type UploadOverlayProps = {
  isUploading: boolean;
  progress: number;
  pickedImage: string;
};

const UploadOverlay: React.FC<UploadOverlayProps> = ({
  isUploading,
  progress,
  pickedImage,
}) => {
  return (
    <Modal transparent={true} visible={isUploading} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text
            style={{ color: Colors.yellow, fontSize: 18, marginBottom: 10 }}
          >
            Uploading Image...
          </Text>
          {pickedImage && (
            <Image source={{ uri: pickedImage }} style={styles.previewImage} />
          )}
          <ProgressBar progress={progress} />
          <ActivityIndicator
            size="large"
            color={Colors.yellow}
            style={{ marginTop: 15 }}
          />
        </View>
      </View>
    </Modal>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: "80%",
    backgroundColor: Colors.alternative,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default UploadOverlay;
