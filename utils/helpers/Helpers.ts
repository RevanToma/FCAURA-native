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
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
