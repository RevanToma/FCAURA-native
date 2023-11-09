import { Alert, Linking } from "react-native";
import { rejectOrApproveApplicants } from "../../firebase/firebase.utils";

export const preDefinedSkills: string[] = [
  "Dribbling", // Dribbling remains similar in many languages
  "Passning", // Passing
  "Skott", // Shooting
  "Skallning", // Tackling
  "Bollkontroll", // Ball Control
  "Inlägg", // Crossing
  "Nickning", // Heading
  "Frisparkar", // Free Kicks
  "Straffar", // Penalties
  "Uppfattning", // Vision
  "Fart", // Pace
  "Uthållighet", // Endurance
  "Styrka", // Strength
  "Taktisk Medvetenhet", // Tactical Awareness
  "Positionering", // Positioning
  "Arbetskapacitet", // Work Rate
  "Lagspel", // Teamwork
  "Rörelse utan boll", // Off-the-ball Movement
  "Press", // Pressing
  "Beslutsfattande", // Decision Making
];

export const formatName = (name: string) => {
  if (name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
};

export const getButtonLabel = (
  isTeamMember: boolean,
  profileCompleted: boolean | undefined
) => {
  if (isTeamMember && !profileCompleted) {
    return "Preview";
  } else if (!isTeamMember && !profileCompleted) {
    return "Create Profile";
  } else {
    return "Save";
  }
};

export const openURL = (url: string) => {
  if (!url || url.trim() === "") {
    Alert.alert("User has not provided Instagram username.");

    return;
  }

  const formattedURL = `https://www.instagram.com/${url}`;

  Linking.canOpenURL(formattedURL).then((supported) => {
    if (supported) {
      Linking.openURL(formattedURL);
    } else {
      console.log("Don't know how to open URI: " + formattedURL);
    }
  });
};

const approveOrRejectApplicants = async (uid: string, status: string) => {
  try {
    await rejectOrApproveApplicants(uid, status);
  } catch (error: any) {
    console.log(error);
    Alert.alert(
      "Error",
      "Something went wrong, please try again later",
      error.message
    );
  }
};

export const approve = (uid: string, status: string) => {
  if (status === "Approved") {
    Alert.alert("Are you sure you want to", "Approve this applicant?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Approve",
        onPress: () => approveOrRejectApplicants(uid, "Approved"),
      },
    ]);
  } else {
    Alert.alert("Are you sure you want to", "Reject this applicant?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reject",
        onPress: () => approveOrRejectApplicants(uid, "Rejected"),
      },
    ]);
  }
};
