import { Linking } from "react-native";

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
    console.log("Instagram username is empty or not provided");
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
