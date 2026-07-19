export type FinalUnlockMode = "immediate" | "birthday-only" | "passcode" | "visited-pages";
export type SecretUnlockMode = "progress-or-code" | "code-only" | "progress-only";

export const siteConfig = {
  recipientName: "Blue",
  siteTitle: "Blue's World",
  birthdayDate: "2026-07-20",
  birthdayMonth: 7,
  birthdayDay: 20,
  birthdayAge: 17,
  repositoryName: "blues-world",
  playlistUrl: "",
  finalUnlockMode: "immediate" as FinalUnlockMode,
  finalPasscode: "bluebell28",
  mainWelcomeMessage:
    "A soft birthday page made with letters, reasons, songs, BTS photos, and completely platonic friendship.",
  footerText: {
    left: "made by online friends from Twitter/X",
    center: "HAPPY BIRTHDAY, BLUE"
  },
  soundDefaults: {
    musicVolume: 0.52,
    musicMuted: false,
    interfaceSounds: false
  },
  navigation: [
    { label: "Home", path: "/" },
    { label: "Friends", path: "/oomfs" },
    { label: "Letters", path: "/letters" },
    { label: "Reasons We Love You", path: "/reasons" },
    { label: "Playlist", path: "/playlist" },
    { label: "Final Gift", path: "/final-gift" }
  ],
  giftMenu: [
    { title: "Meet Blue's Friends", label: "Friends", path: "/oomfs" },
    { title: "Read the Letters", label: "Letters", path: "/letters" },
    { title: "Reasons We Love You", label: "Reasons", path: "/reasons" },
    { title: "Play the Playlist", label: "Playlist", path: "/playlist" },
    { title: "Open the Final Gift", label: "Final Gift", path: "/final-gift" }
  ],
  secretCode: "bluebell28",
  secretUnlockMode: "progress-or-code" as SecretUnlockMode,
  mainSections: ["/", "/oomfs", "/letters", "/reasons", "/playlist", "/final-gift"],
  requiredSecretProgress: {
    visitedPages: 8,
    collectedStars: 0,
    discoveredFlowers: 0,
    readLetters: 0,
    visitedFriendProfiles: 0
  },
  themeColors: {
    babyBlue: "#d8f1ff",
    skyBlue: "#bee6f8",
    clearBlue: "#91cce7",
    deepBlue: "#5e8da8",
    cream: "#fffaf0",
    creamYellow: "#fff1b8",
    butterYellow: "#f4d874",
    warmWhite: "#fffdf7",
    softPurple: "#c3b3df",
    softPink: "#efbfd0",
    sageGreen: "#abc5ae",
    navyText: "#40546a",
    outlineBlue: "#547b96"
  },
  finalMessage:
    "Happy Birthday, Blue\n\nThis little world was made by the people whose timelines, conversations, playlists, and ordinary days became brighter after meeting you. Every letter, song, flower, and message here carries something someone wanted you to remember.\n\nYou are appreciated more than you probably realize. We hope this next year brings you gentle days, good health, comforting music, kind people, exciting memories, and many moments that make you genuinely happy.\n\nNo matter how far apart everyone may be, there will always be a small corner of the internet filled with people who are glad they found you.",
  finalLine: "From your oomfs, with an entire sky of friendship for you. ♡"
};
