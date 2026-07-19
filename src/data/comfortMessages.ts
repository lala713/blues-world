export type ComfortMood = "Happy" | "Tired" | "Sad" | "Excited" | "Quiet" | "Nostalgic" | "Missing everyone" | "Overwhelmed";

export const comfortMessages: Record<ComfortMood, { message: string; flower: string; weather: string; songHint: string }> = {
  Happy: {
    message: "Let the happy feeling stay without rushing it away.",
    flower: "Sunflower",
    weather: "Butterfly morning",
    songHint: "Play something bright from Songs for Blue."
  },
  Tired: {
    message: "Rest is not a failure. The garden keeps growing slowly too.",
    flower: "Moonflower",
    weather: "Light rain",
    songHint: "Try a quiet piano song."
  },
  Sad: {
    message: "You are allowed to be soft and still be held by everyone here.",
    flower: "Forget-me-not",
    weather: "Fireflies",
    songHint: "Try a comfort song."
  },
  Excited: {
    message: "Your joy deserves room to be loud, bright, and silly.",
    flower: "Tulip",
    weather: "Sunny petals",
    songHint: "Try a happy song."
  },
  Quiet: {
    message: "Quiet stars still light the sky.",
    flower: "Lavender",
    weather: "Lavender evening",
    songHint: "Visit the Moon Room."
  },
  Nostalgic: {
    message: "A memory can be a small lamp, not a place you have to stay.",
    flower: "Hydrangea",
    weather: "Star shower",
    songHint: "Open the playlist or a friend's profile."
  },
  "Missing everyone": {
    message: "Distance does not erase the care that built this place.",
    flower: "Bluebell",
    weather: "Fireflies",
    songHint: "Read a letter from a friend."
  },
  Overwhelmed: {
    message: "Take one breath, then another. Nothing here is asking you to hurry.",
    flower: "Cream rose",
    weather: "Light rain",
    songHint: "Sit quietly with the moon."
  }
};

// Edit mood responses, suggested flowers, weather, and song hints here.
