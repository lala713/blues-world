export type GardenFlower =
  | "Sunflower"
  | "Lily"
  | "Daisy"
  | "Hydrangea"
  | "Lavender"
  | "Rose"
  | "Forget-me-not"
  | "Bluebell"
  | "Tulip"
  | "Moonflower"
  | "Purple star flower"
  | "Golden birthday flower";

export const gardenData = {
  weatherOptions: ["Sunny petals", "Light rain", "Fireflies", "Star shower", "Butterfly morning", "Lavender evening"],
  flowers: [
    "Sunflower",
    "Lily",
    "Daisy",
    "Hydrangea",
    "Lavender",
    "Rose",
    "Forget-me-not",
    "Bluebell",
    "Tulip",
    "Moonflower",
    "Purple star flower",
    "Golden birthday flower"
  ] as GardenFlower[],
  messages: [
    "This flower grew from a kind memory.",
    "Someone thought about you today.",
    "The garden feels happier when you visit.",
    "Even quiet flowers are still growing.",
    "You make ordinary days feel softer."
  ],
  decorations: ["Moon lamp", "Tiny piano", "Mini mailbox", "Blue watering can", "Purple balloon", "Picnic blanket"]
};

// Edit flower names, weather labels, garden messages, and decorations here.
