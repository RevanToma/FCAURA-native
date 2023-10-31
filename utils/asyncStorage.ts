import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const fetchProfileSetup = async () => {
  const storedProfileSetup = await AsyncStorage.getItem("profileSetup");

  return storedProfileSetup ? JSON.parse(storedProfileSetup) : null;
};

export const useProfileSetup = () => {
  const [profileSetup, setProfileSetup] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfileSetup();

      setProfileSetup(data);
    };

    // AsyncStorage.removeItem("profileSetup");
    fetchData();
  }, []);

  const saveProfileSetup = async (data: object) => {
    await AsyncStorage.setItem("profileSetup", JSON.stringify(data));

    setProfileSetup(data); // Update the local state after saving
  };

  return {
    profileSetup, // this contains the actual profile setup data
    saveProfileSetup,
  };
};

export const updateProfileSetup = async (data: object) => {
  await AsyncStorage.setItem("profileSetup", JSON.stringify(data));

  return data;
};
