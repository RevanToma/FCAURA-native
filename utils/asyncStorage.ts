import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchProfileSetup = async () => {
  const storedProfileSetup = await AsyncStorage.getItem("profileSetup");
  if (storedProfileSetup) {
    // Parse the retrieved data
    const parsedProfileSetup = JSON.parse(storedProfileSetup);

    // ... use the parsed data as needed
    console.log(parsedProfileSetup);
  }
};
