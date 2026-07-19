import { assetPath } from "../utils/assets";

export type FriendshipDatePrecision = "exact" | "month" | "year" | "approximate";

export interface PlaylistSong {
  title: string;
  artist: string;
  reason?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  coverImage?: string;
  audioPreview?: string;
}

export interface FavoriteQuote {
  quote: string;
  context?: string;
}

export interface ProfilePhoto {
  image: string;
  explanation?: string;
}

export interface InsideJoke {
  text: string;
  image?: string;
}

export interface FriendLetter {
  title?: string;
  image?: string;
  body: string[];
  signature?: string;
  imageAlt?: string;
}

export interface FriendBirthdayEdit {
  title: string;
  description: string;
  videoSrc: string;
}

export interface FriendProfile {
  id: string;
  displayName: string;
  username: string;
  twitterUrl: string;
  profileImage: string;
  friendsSince: string;
  friendsSinceLabel?: string;
  friendshipDatePrecision?: FriendshipDatePrecision;
  metAt?: string;
  chosenFlower?: string;

  letter: FriendLetter;

  reasons: {
    admire?: string;
    funnyThing?: string;
    favoriteMemory?: string;
    wishForThisYear?: string;
  };

  playlistSongs: PlaylistSong[];
  favoriteQuotes?: FavoriteQuote[];
  photos?: ProfilePhoto[];
  insideJokes?: InsideJoke[];
  birthdayEdit?: FriendBirthdayEdit;

  friendship?: {
    whenWeMet: string;
    firstImpression: string;
    impressionNow: string;
  };

  secretMessage?: string;
}

export type Friend = FriendProfile;

const lalaLetterText = [
  "Dear Blue ",
  "I love you so much.",
  "I don't think I tell you this enough, but I just want you to know how much you mean to me.",
  "You are such an incredible person, Blue.",
  "You have the kindest heart, the most beautiful soul, and a smile that can brighten even the darkest days.",
  "You make life better just by being in it, and I'm so grateful to know you. ",
  "I want you to know how loved you are.",
  "There are so many people who care about you, who admire you, who are inspired by you, and who are so lucky to have you in their lives.",
  "Even on the days when your mind tries to convince you otherwise, please remember:",
  "You are never alone.",
  "You never will be.",
  "I'm always going to be here for you.",
  "Through your happiest moments, your hardest days, your overthinking at 3 a.m., your random rants, your breakdowns, your achievements, your doubts—everything.",
  "I'll be here for it all.",
  "Always.",
  "I am so incredibly proud of you, Blue.",
  "Proud of how far you've come, proud of how strong you are, proud of how you keep choosing to fight for yourself even when it's not easy.",
  "You are growing into someone so amazing, and I can't wait to see everything you will accomplish in the future.",
  "You are so loved.",
  "You are so smart.",
  "You are so fun to be around.",
  "You make people laugh.",
  "You make people feel comfortable.",
  "You make every moment better.",
  "You're the kind of person people remember, the kind of person people appreciate, and the kind of person the world needs more of.",
  "I hope the next years are gentle on you.",
  "I hope they bring you peace, happiness, success, healing, and all the things your heart desires.",
  "I hope you continue to dream big, laugh often, and never forget how amazing you are.",
  "No matter what happens, no matter where life takes us, I want you to know one thing clearly:",
  "I'm always here for you, for everything.",
  "I love you endlessly, Blue."
];

const haruLetterText = [
  "HAPPY BIRTHDAY BLUEYYYYY!! ",
  "I HONESTLY DON'T EVEN KNOW WHERE TO START BECAUSE THERE ARE SO MANY THINGS I WANT TO SAY.",
  "I'M JUST REALLY, REALLY GRATEFUL THAT I GOT TO MEET YOU. OUT OF ALL THE PEOPLE I COULD'VE COME ACROSS ON TWT, I'M SO HAPPY IT WAS YOU. YOU'RE GENUINELY ONE OF THE KINDEST, SWEETEST, AND MOST LOVABLE PEOPLE I'VE EVER MET. EVERY INTERACTION WITH YOU SOMEHOW MAKES MY DAY BRIGHTER, AND YOU HAVE THIS COMFORTING ENERGY THAT MAKES EVERYONE AROUND YOU FEEL WELCOME.",
  "THANK YOU FOR ALWAYS BEING SO NICE, CARING, AND SUPPORTIVE. YOU'RE THE TYPE OF PERSON WHO MAKES FRIENDSHIPS FEEL EFFORTLESS, AND I HOPE YOU KNOW HOW APPRECIATED YOU ARE. I ADMIRE HOW GENUINE YOU ARE. YOU NEVER HAVE TO TRY TO BE SOMEONE ELSE BECAUSE YOUR KINDNESS SPEAKS FOR ITSELF. YOU DESERVE EVERY BIT OF LOVE YOU'RE RECEIVING TODAY AND SO MUCH MORE.",
  "I HOPE THIS YEAR BRINGS YOU ENDLESS HAPPINESS, GOOD HEALTH, LOTS OF LAUGHTER, AND COUNTLESS REASONS TO SMILE. I HOPE ALL YOUR DREAMS BECOME REALITY AND THAT YOU CONTINUE MEETING PEOPLE WHO CHERISH YOU THE SAME WAY YOU MAKE OTHERS FEEL CHERISHED.",
  "THANK YOU FOR EXISTING AND FOR BEING SUCH A WONDERFUL FRIEND. I'M REALLY LUCKY THAT OUR PATHS CROSSED, AND I HOPE WE'LL CONTINUE MAKING MORE MEMORIES TOGETHER FOR A VERY LONG TIME.",
  "HAPPY BIRTHDAY ONCE AGAIN, BLUIE. I LOVE YOU SO MUCH, AND I HOPE TODAY IS JUST AS BEAUTIFUL AS YOU ARE. PLEASE NEVER STOP BEING THE AMAZING PERSON YOU ARE. "
];

const caraLetterText = [
  "Dear Bluey ",
  "Wishing u a very happy birthday and best wishes from me.",
  "You talk less but your gifs and emojis speak volumes—and somehow that makes all of our days even better ",
  "Here's hoping that we stay just the way you are and always prioritize your happiness and peace first.",
  "Enjoy this day to the max and eat lots of delicious food.",
  "HAPPY BIRTHDAY BLUEYYYY ",
  "With love,",
  "Cara "
];

const aureniLetterText = [
  "Dear Blueeiii,",
  "Happiest Birthdayyyy!",
  "May all your wishes come true, and may you achieve all the things you wish for.",
  "Thank you for being such a nice friend of mine, and for being here.",
  "You are very strong.",
  "I don't think we have had enough conversations yet—we barely do lol—but I love the ones we have, even the shorter ones.",
  "Enjoy a lot, love.",
  "I love you.",
  "— Aurenie"
];

const oceanLetterText = [
  "Happy Birthday Blueii!! ",
  "I'm really glad we met because you're genuinely such a kind and calming person to have around.",
  "I hope this year brings you lots of happiness, good memories, and reminds you that you're appreciated more than you think.",
  "There are people who like you and are happy to have you in their lives, me included.",
  "I also made you a little birthday edit!",
  'I picked your favorite song and your favorite color, so I tried to make it as "you" as possible.',
  "I really hope you like it because I had fun making something I thought you'd enjoy.",
  "Have the best birthday, and take good care of yourself.",
  "Here's to another year of random chats and friendship.",
  "Happy Birthday once again! ",
  "~ Ocean"
];

const wildieLetterText = [
  "Hey Blue ",
  "To be honest I have so much yet very little bit to talk. It's your first birthday with me.",
  "I wish nothing but happiness, which is obviously in your hand.",
  "We both know you are strong. I'm proud of you really, but I also know you can be stronger.",
  "Looking back now, you gave me many memories. Hopefully you got them from me too. ",
  "Thank you for being the biggest support when I needed it. Your presence was enough and yeah, in future I will be there for you too. ♡",
  "One thing for sure, I won't ever forget the fact I used to have an online friend called Blue. You have given me enough memories for it, and I love you for that and I mean it. ",
  "Finally, wishing you many more happy returns of the day.",
  "Enjoy your special day.",
  "Happy Birthday!! ♡",
  "~ Wildie "
];

const berrymomLetterText = [
  "My Blueybaby,",
  "First of all, a very happy birthday to you.",
  "If I start to write all the things I like about you, I might end up writing a novel.",
  "You have always been considerate of everyone while struggling yourself, and you always light up everyone's day just like you light up mine.",
  "I genuinely can't imagine what would have happened if I hadn't met you.",
  "You are one of the first people to whom I became close, and now I even got the important title of your mommy.",
  "I love the flowers you send whenever you see someone having a hard time.",
  "That is your way of showing love, and the feeling when I receive one is so precious to me.",
  "I just want to squeeze your cheeks and hug you tightly.",
  "I hope you have a happy year, and if life gets hard, you can always talk to me.",
  "With love,",
  "Berrymom"
];

const tannyyLetterText = [
  "My lil baby, my Blueyyy.",
  "Happiest Birthday my child. ",
  "I'm genuinely so grateful that we met.",
  "You've become such a special part of my life, and I'm so proud of the beautiful person you are.",
  "You are literally the cutest and most adorable baby ever.",
  "Even the little things you do, like sending me flowers whenever I'm feeling down, mean so much to me.",
  "You're so incredibly sweet.",
  "I hope you always know how loved and cherished you are.",
  "I hope this year brings you endless happiness, success, and all the beautiful things you deserve.",
  "I hope we stay together for a really, really long time. ",
  "Love you so much, my baby.",
  "Mommy is always here for you.",
  "Have the happiest birthday ever.",
  "Mwahhh!!! ✨"
];

const kookooLetterText = [
  "Happiest birthday my Honeybun Blueiii!",
  "I hope you achieve everything you've ever dreamed of and always stay happy.",
  "It hasn't been a long time since we met, but that doesn't make our bond any weaker.",
  "I love how we became so close in such a short time.",
  "You're so cute and kind—literally the precious little one.",
  "I remember our first interaction was when I found out you were Mommy Harshi's daughter too!!",
  "Honestly, I always get sulky when I find out Mommy has many kids, but when I met you, you felt so small and fluffy that I wanted to protect you.",
  "You're special and the cutest, my soulmate.",
  "I hope you always feel comfortable sharing whatever is bothering you.",
  "I'll always be here to listen.",
  "You're the Yoon to my Min, and I love you so much!!",
  "I hope you enjoy your day and that we stay together making new memories.",
  "Your Buttercup loves you.",
  "Mwah :3",
  "— Kookoo"
];

const namuLetterText = [
  "Happy birthday my cutie Blueii ",
  "Always be happy and healthy.",
  "I love your flowers and your selfless soul.",
  "We adore you and love you.",
  "Always be happy.",
  "If you ever feel down, we're here for you.",
  "Happy Birthday Blueyyyy ",
  "With love,",
  "Namu ✨️"
];

const vilyLetterText = [
  "Happiest birthday dear Bluie!",
  "Wishing you many many happy returns of the day!!",
  "You are a beautiful soul and a wonderful person inside out.",
  "Your presence is beautiful and radiates positive energy.",
  "Thank you for always brightening my mornings with your wishes and flowers every day.",
  "It means more to me than words can express.",
  "I hope I can make your day just as special.",
  "I hope this day brings happiness and blessings into your life.",
  "Mwahhh",
  "— Vily"
];

const kimchiLetterText = [
  "Happy Birthday, Bluie!",
  "Hope this year you smile a little brighter.",
  "Live a little louder.",
  "Feel even happier.",
  "May your dreams hold your hand a little tighter.",
  "— Your Kimchi"
];

const apoLetterText = [
  "Happy Birthday to my Blueiiii.",
  "Many many happy returns of the day, baby.",
  "May all your wishes come true and you become everything you want to be.",
  "May your day be filled with warmth, joy and happiness.",
  "I hope you feel loved and also love yourself a little more this year.",
  "I hope you realize how precious you are and that other people's opinions don't matter.",
  "You are loved, Blueii.",
  "One day you'll be surrounded by people who truly value you.",
  "Until then, don't be hard on yourself.",
  "You deserve everything in the world.",
  "I'm grateful I got to know such an amazing soul.",
  "Celebrate your birthday to the fullest.",
  "Lots of love to you.",
  "I love you Blueiiii ",
  "Happy Birthday!!",
  "— Apooo"
];

const atifLetterText = [
  "Happy birthday to my adorably lovely wife. ♡",
  "Even though we've only known each other for a few months, I can confidently say you're the most adorable person I've met here.",
  "I really love when you get all pouty when I'm not online.",
  "It's way too cute for my heart.",
  "And you know what's even cuter?",
  "When I tease you and you get all sulky. ",
  "I'm really glad you came into my life.",
  "I love you a lot, kitty.",
  "May every moment of your special day be filled with joy, laughter and love.",
  "Happiest birthday ever.",
  "Love. ♡"
];

const realFriends: FriendProfile[] = [
  {
    id: "lala",
    displayName: "Lala",
    username: "@MinniiTannies7",
    twitterUrl: "https://x.com/MinniiTannies7",
    profileImage: "",
    friendsSince: "2025-07-16T00:00:00",
    friendshipDatePrecision: "exact",
    metAt: "Jinhit Headquarters group chat",
    chosenFlower: "Blue forget-me-not",
    letter: {
      title: "Dear Blue",
      image: assetPath("images/friends/lala/lala-letter-art.png"),
      imageAlt: "Illustrated blue birthday letter from Lala to Blue",
      body: lalaLetterText
    },
    reasons: {
      admire:
        "Your strength. You keep going even when things get difficult, and even if you do not always realize it, you are incredibly resilient. You have such a caring heart, and the way you care about the people around you is something I truly admire.",
      funnyThing: "The random emoji or picture spamming. It is so cute and always makes the group chat funnier.",
      favoriteMemory:
        "It is difficult to choose only one. My favorite memories are all the random conversations where we talked about absolutely everything and sent random pictures in the group chat. Those moments always made my days a little brighter.",
      wishForThisYear:
        "I hope this year is gentle on your heart. I hope you find peace in places you never expected, meet people who remind you how worthy you are of care, and learn to see yourself through the eyes of everyone who cares about you. You deserve happiness, comfort, and all the beautiful things life has to offer."
    },
    playlistSongs: [
      {
        title: "Let There Be Love",
        artist: "Oasis",
        reason:
          "This song reminds me of you because it feels warm, hopeful, and full of kindness. Every time I hear it, I think about how much care and happiness you deserve in your life. It reminds me that even when life becomes overwhelming, there is always room for hope, healing, and people who genuinely care about you. That is exactly what I want for you.",
        spotifyUrl: "https://open.spotify.com/track/570oJcBwoLGZz95xTNa0JB?si=90010000c8bc4374"
      },
      {
        title: "Blue",
        artist: "V",
        reason:
          "Besides the obvious reason that it is called Blue, this song reminds me of you because it has such a comforting and emotional feeling. It is soft, thoughtful, and quietly beautiful, just like the way I see you. Whenever I listen to it, it makes me think of our friendship and the moments we have shared, and it reminds me how grateful I am that you are in my life.",
        spotifyUrl: "https://open.spotify.com/track/2UU11hvjN1JIn4iihEodNT?si=56595e3c002448b1"
      }
    ],
    insideJokes: [
      { text: "Saying bye but still staying in the group chat." },
      { text: "Random picture and emoji spamming." }
    ],
    friendship: {
      whenWeMet: "We met on July 16, 2025, in the Jinhit Headquarters group chat.",
      firstImpression:
        "I thought you seemed really sweet, funny, and easy to talk to. You had a warmth about you that made me want to know you better.",
      impressionNow:
        "Now I know you are one of the kindest people I have ever met. You are caring, incredibly smart, funny without even trying, and someone who makes people feel comfortable being themselves. You have become someone I genuinely care about, and no matter where life takes us, I will always hope you are happy, healthy, and surrounded by people who remind you how appreciated you are."
    },
    secretMessage:
      "If you have made it this far, I hope you remember one thing: you are deeply cared for.\n\nYou matter more than you realize, and there are so many people who are thankful that you exist, including me. Thank you for every conversation, every laugh, every late-night talk, every random joke, and every little memory we have made together. They mean more to me than you probably know.\n\nNo matter where life takes us, I will always be cheering you on, celebrating your victories, and hoping that life is kind to you. I hope the next chapters of your life are filled with peace, happiness, and people who appreciate you as much as you deserve.\n\nHappy Birthday, Blue. Thank you for being you.\n\nWith so much friendship and care,\n- Lala"
  },
  {
    id: "cara",
    displayName: "Cara",
    username: "@butyouisamazee",
    twitterUrl: "https://x.com/butyouisamazee",
    profileImage: "",
    friendsSince: "2025-01-01T00:00:00",
    friendsSinceLabel: "2025",
    friendshipDatePrecision: "year",
    letter: {
      image: assetPath("images/friends/cara/cara-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Cara to Blue",
      body: caraLetterText
    },
    reasons: {
      admire: "Her personality ",
      funnyThing: "She spams emojis randomly ",
      favoriteMemory: "When Bluie was feeling down and they had a deep 5–6 minute conversation ",
      wishForThisYear: "Hope all her aspirations come true ✨"
    },
    playlistSongs: [
      {
        title: "Promise",
        artist: "Jimin",
        reason: "It sounds soothing and peaceful, just like her.",
        spotifyUrl: "https://open.spotify.com/track/2RUcwyW74Sv4VracHFrKdh?si=3aa4c8e06b8b4a10"
      }
    ],
    favoriteQuotes: [
      {
        quote: "‍♀️ this emoji"
      }
    ],
    photos: [],
    insideJokes: [
      {
        image: `${import.meta.env.BASE_URL}images/friends/cara/inside-joke-01.jpg`,
        text: "Remember when u spammed my notifs by mass liking my posts  I still laugh whenever I remember that lol."
      }
    ],
    secretMessage: "Enjoy this day and try to be happy cuz your happiness matters the most "
  },
  {
    id: "namu",
    displayName: "Namu✨️",
    username: "@Kim_Namu95",
    twitterUrl: "https://x.com/Kim_Namu95",
    profileImage: "",
    friendsSince: "2026-01-01T00:00:00",
    friendsSinceLabel: "2026",
    friendshipDatePrecision: "year",
    letter: {
      image: assetPath("images/friends/namu/namu-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Namu✨️ to Blue",
      body: namuLetterText
    },
    reasons: {
      admire: "Cutieee",
      funnyThing: "Her ‍♂️ emoji",
      favoriteMemory: "Her encouragement, being a good listener, and bubbly personality",
      wishForThisYear: "Be happy, healthy, and get whatever you want ✨️"
    },
    playlistSongs: [
      {
        title: "Blue",
        artist: "V",
        reason: "Blue (Layover)",
        spotifyUrl: "https://open.spotify.com/track/2UU11hvjN1JIn4iihEodNT?si=9bb302b14b5e4166"
      },
      {
        title: "People Pt.2",
        artist: "Agust D",
        reason: "A song chosen for Blue by Namu✨️",
        spotifyUrl: "https://open.spotify.com/track/4EaQ0ouIydfeAgQUz284EF?si=c28bb8eac9c84728"
      }
    ],
    favoriteQuotes: [
      {
        quote: "She gave me flowers, which touched my heart, and she's supportive."
      }
    ],
    photos: [],
    insideJokes: [
      {
        text: "Bangtan jokes when we get excited talking about them."
      }
    ],
    secretMessage: "Lob you✨️"
  },
  {
    id: "vily",
    displayName: "Vily",
    username: "@vminvibes_7",
    twitterUrl: "https://x.com/vminvibes_7",
    profileImage: "",
    friendsSince: "2025-10-01T00:00:00",
    friendsSinceLabel: "Late 2025",
    friendshipDatePrecision: "approximate",
    letter: {
      image: assetPath("images/friends/vily/vily-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Vily to Blue",
      body: vilyLetterText
    },
    reasons: {
      admire: "Her sweet and positive presence; she's lovely.",
      funnyThing: "‍♀️ the standing emoji",
      favoriteMemory: "Her everyday morning wishes with bouquets ",
      wishForThisYear: "Hope she gets everything she's been dreaming of, with lots of happiness and peace."
    },
    playlistSongs: [
      {
        title: "Blue & Grey",
        artist: "BTS",
        reason: "A song Vily chose for Blue ",
        spotifyUrl: "https://open.spotify.com/track/7Ki0hse0IfXEcXUlpyECbJ?si=aac9900a385b4887"
      }
    ],
    favoriteQuotes: [],
    // Replace with the downloaded image from the submitted Google Drive link.
    photos: [
      {
        image: assetPath("images/friends/vily/photo-01.jpg"),
        explanation: "I will forever admire her morning wishes as it really brightened up my days!!"
      }
    ],
    insideJokes: [],
    secretMessage:
      "You are such a beautiful person inside out, Bluie. Always know how much you matter and remember you have us all—always by your side whenever you need us! Happy Birthday again."
  },
  {
    id: "kookoo",
    displayName: "Kookoo",
    username: "@lilmeowzz_",
    twitterUrl: "https://x.com/lilmeowzz_",
    profileImage: "",
    friendsSince: "2026-06-01T00:00:00",
    friendsSinceLabel: "June 2026",
    friendshipDatePrecision: "month",
    letter: {
      image: assetPath("images/friends/kookoo/kookoo-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Kookoo to Blue",
      body: kookooLetterText
    },
    reasons: {
      admire: "She's so soft and cutesy ",
      funnyThing: "Comes into the GC, drops cute stickers, then leaves ",
      favoriteMemory: "Matching profile pictures and becoming soulmates (Yoon to my Min).",
      wishForThisYear: "I wish she always stays happy!!"
    },
    playlistSongs: [
      {
        title: "Friends",
        artist: "VMin",
        reason: "Because we're soulmates ",
        spotifyUrl: "https://open.spotify.com/track/5RjUtRlDonw3TBgGGMLC5b?si=1e1f9980525e4748"
      }
    ],
    favoriteQuotes: [
      {
        quote: "The world is better with you in it. Don't forget that. "
      }
    ],
    // Replace with the downloaded images from the submitted Google Drive link.
    photos: [
      {
        image: `${import.meta.env.BASE_URL}images/friends/kookoo/photo-01.jpg`,
        explanation: "It's when we did matching profile pictures (so cute, I love it)."
      },
      {
        image: `${import.meta.env.BASE_URL}images/friends/kookoo/photo-02.jpg`,
        explanation: "It's when we did matching profile pictures (so cute, I love it)."
      }
    ],
    insideJokes: [
      {
        text: "I'm her Buttercup, she's my Honeybun "
      }
    ],
    secretMessage:
      "Bunnn, I'm so grateful that I met such an innocent soul like you. Always love yourself, keep shining and growing. I'm always rooting for you!!!✨"
  },
  {
    id: "kimchi",
    displayName: "Kimchi",
    username: "@BangtaniKimchi",
    twitterUrl: "https://x.com/BangtaniKimchi",
    profileImage: "",
    friendsSince: "2025-11-05T00:00:00",
    friendsSinceLabel: "Winter, early November 2025",
    friendshipDatePrecision: "approximate",
    letter: {
      image: assetPath("images/friends/kimchi/kimchi-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Kimchi to Blue",
      body: kimchiLetterText
    },
    reasons: {
      admire: "Her presence.\nHer aesthetics.\nThe fact that she's silly in a good way. ㅠ.ㅠ",
      funnyThing: "She scolded Nabi for cancelling me ",
      favoriteMemory: "Seeing her profile for the first time in winter 2025 with a Jimin profile picture and a blue & white layout.",
      wishForThisYear: "Hope you get the results of your hard work and live without regret ♡"
    },
    playlistSongs: [
      {
        title: "Dream Glow",
        artist: "BTS, Charli XCX",
        reason: "Because of the vibe she gives off.",
        spotifyUrl: "https://open.spotify.com/track/0GjWvVr7TZzceNwdSDRuXy?si=52aa441b549241bc"
      }
    ],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [
      {
        text: "Bluie, how was your day apart from making files? — because she usually replies, “I was making files today.” "
      }
    ],
    secretMessage: "In the name of Yoongi the Kitty-chan, 'Future's gonna be okay!' Stress hajima! Enjoy your birthday ♡"
  },
  {
    id: "atif",
    displayName: "Atif",
    username: "@i_flirting",
    twitterUrl: "https://x.com/i_flirting",
    profileImage: "",
    friendsSince: "2025-12-01T00:00:00",
    friendsSinceLabel: "December 2025",
    friendshipDatePrecision: "month",
    letter: {
      image: assetPath("images/friends/atif/atif-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Atif to Blue",
      body: atifLetterText
    },
    reasons: {
      admire: "",
      funnyThing: "",
      favoriteMemory: "",
      wishForThisYear: "May the tears that come from your eyes be only happy tears."
    },
    playlistSongs: [],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [
      {
        text: ""
      }
    ],
    secretMessage: ""
  },
  {
    id: "haru",
    displayName: "Haru",
    username: "@ot7_purple_bts",
    twitterUrl: "https://x.com/ot7_purple_bts",
    profileImage: "",
    friendsSince: "",
    friendsSinceLabel: "",
    friendshipDatePrecision: "approximate",
    letter: {
      image: assetPath("images/friends/haru/haru-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Haru to Blue",
      title: "HAPPY BIRTHDAY BLUEYYYYY!! ",
      body: haruLetterText
    },
    reasons: {
      admire: "",
      funnyThing: "",
      favoriteMemory: "",
      wishForThisYear: ""
    },
    playlistSongs: [],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [],
    secretMessage: ""
  },
  {
    id: "berrymom",
    displayName: "Berrymom",
    username: "@7_LilBerries",
    twitterUrl: "https://x.com/7_LilBerries",
    profileImage: "",
    friendsSince: "2025-08-01",
    friendsSinceLabel: "August 2025",
    friendshipDatePrecision: "month",
    letter: {
      image: assetPath("images/friends/berrymom/berrymom-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Berrymom to Blue",
      body: berrymomLetterText
    },
    reasons: {
      admire: "Her ability to sense other people's emotions and comfort them.",
      funnyThing: "She sulks cutely.",
      favoriteMemory: "Playing games together and simply having conversations.",
      wishForThisYear: "I hope she stays happy and gets the BTS album she wants."
    },
    playlistSongs: [
      {
        title: "Blue",
        artist: "Yung Kai",
        spotifyUrl: "https://open.spotify.com/track/3be9ACTxtcL6Zm4vJRUiPG?si=0074fb4711f444df"
      }
    ],
    favoriteQuotes: [
      {
        quote: "berrymom"
      }
    ],
    photos: [],
    insideJokes: [
      {
        text: "My brain goes blank when you tell me to think, but I'm sure there are more than 10."
      }
    ],
    secretMessage: "Bluey baby, this is Berrymom. I love you a lot and admire you <3"
  },
  {
    id: "wildie",
    displayName: "wildie",
    username: "@izel_aceso",
    twitterUrl: "https://x.com/izel_aceso",
    profileImage: "",
    friendsSince: "2025-08-01",
    friendsSinceLabel: "August 2025",
    friendshipDatePrecision: "month",
    letter: {
      image: assetPath("images/friends/wildie/wildie-letter-art.png"),
      imageAlt: "Illustrated birthday letter from wildie to Blue",
      body: wildieLetterText
    },
    reasons: {
      admire: "She's the kindest at heart.",
      funnyThing: "When she's angry, she looks like an angry duck.",
      favoriteMemory: "All the time we spent in Minorities.",
      wishForThisYear: "I hope she learns to love herself and believe in herself more this year."
    },
    playlistSongs: [
      {
        title: "Blue Hour",
        artist: "TXT",
        reason: "Because it's obvious with her name, and because her GC should make a comeback.",
        spotifyUrl: "https://open.spotify.com/track/3ObPkJQAgjAhTwYvDhPrAW?si=004114aedc024c49"
      }
    ],
    favoriteQuotes: [
      {
        quote: "I should be the one reacting like that. U bish."
      }
    ],
    // Replace with the downloaded images from the submitted Google Drive link.
    photos: [
      {
        image: `${import.meta.env.BASE_URL}images/friends/wildie/photo-01.jpg`,
        explanation: "Her hyper overthinking always replies to my concerns before Blue herself does lol. It's cute."
      },
      {
        image: `${import.meta.env.BASE_URL}images/friends/wildie/photo-02.jpg`,
        explanation: "Her hyper overthinking always replies to my concerns before Blue herself does lol. It's cute."
      },
      {
        image: `${import.meta.env.BASE_URL}images/friends/wildie/photo-03.jpg`,
        explanation: "Her hyper overthinking always replies to my concerns before Blue herself does lol. It's cute."
      }
    ],
    insideJokes: [
      {
        text: "She's my niece and daughter at the same time—our family. ‍♀️"
      }
    ],
    secretMessage: "Take care and love yourself for us, because we do love you."
  },
  {
    id: "aureni",
    displayName: "Aureni",
    username: "@aureum_vireyn",
    twitterUrl: "https://x.com/aureum_vireyn",
    profileImage: "",
    friendsSince: "2025",
    friendsSinceLabel: "Late 2025",
    friendshipDatePrecision: "approximate",
    letter: {
      image: assetPath("images/friends/aureni/aureni-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Aureni to Blue",
      body: aureniLetterText
    },
    reasons: {
      admire: "You're so strong, even if you don't realize it.",
      funnyThing: "She sometimes enters the GC with random GIFs (especially the frog waiting GIF).",
      favoriteMemory:
        "Even though we haven't talked much, I love how our conversations start with 'hi' and end with 'I'm good too.' It's funny. I also cherish the many moments we shared, especially how she loves giving flowers.",
      wishForThisYear: "May all your trials end in full bloom. "
    },
    playlistSongs: [
      {
        title: "Blue & Grey",
        artist: "BTS",
        reason: "Because the word 'Blue' immediately reminds me of her.",
        spotifyUrl: "https://open.spotify.com/track/7Ki0hse0IfXEcXUlpyECbJ?si=6426c8cc4cb7467c"
      }
    ],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [],
    secretMessage:
      "If you ever want someone to talk to, I'm one text away. Maybe I won't always have advice, but I'll always listen—no questions asked. Sending you lots of flowers and hugs."
  },
  {
    id: "apo",
    displayName: "Apo",
    username: "@Tanniiies7",
    twitterUrl: "https://x.com/Tanniiies7",
    profileImage: "",
    friendsSince: "",
    friendsSinceLabel: "",
    friendshipDatePrecision: "approximate",
    letter: {
      image: assetPath("images/friends/apo/apo-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Apo to Blue",
      body: apoLetterText
    },
    reasons: {},
    playlistSongs: [
      {
        title: "Blue",
        artist: "V",
        spotifyUrl: "https://open.spotify.com/track/2UU11hvjN1JIn4iihEodNT?si=3840702ba55847ea"
      }
    ],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [],
    secretMessage:
      "I love you, Blue. May you have a great year ahead, and don't think you don't deserve the attention you're getting on your day. Blue deserves every good thing in the world."
  },
  {
    id: "ocean",
    displayName: "Ocean",
    username: "@HappyJmMe",
    twitterUrl: "https://x.com/HappyJmMe",
    profileImage: "",
    friendsSince: "2026-01-01",
    friendsSinceLabel: "2026",
    friendshipDatePrecision: "year",
    letter: {
      image: assetPath("images/friends/ocean/ocean-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Ocean to Blue",
      body: oceanLetterText
    },
    reasons: {
      admire: "Her random pictures."
    },
    friendship: {
      whenWeMet:
        "I think it was random when I started talking with her, but I remember someone told me she didn't feel loved those days, so I wrote her a letter telling her that she matters—which is true—and that she could DM me anytime whenever she felt down. Later she told me she missed me when I was IA and that she read my letter again. That memory means a lot to me.",
      firstImpression: "",
      impressionNow: ""
    },
    birthdayEdit: {
      title: "A Birthday Edit from Ocean",
      description: "Ocean made this special edit for Blue using her favorite song and favorite color.",
      videoSrc: `${import.meta.env.BASE_URL}videos/friends/ocean/ocean-birthday-edit.mp4`
    },
    playlistSongs: [
      {
        title: "Mikrokosmos",
        artist: "BTS",
        spotifyUrl: "https://open.spotify.com/track/0jSccBRnhNU4KtACMQPvco?si=e91023cb74004a54"
      }
    ],
    favoriteQuotes: [],
    photos: [],
    insideJokes: [],
    secretMessage: ""
  },
  {
    id: "tannyy",
    displayName: "Tannyy",
    username: "@kooksmissright",
    twitterUrl: "https://x.com/kooksmissright",
    profileImage: "",
    friendsSince: "2026-01-01",
    friendsSinceLabel: "2026",
    friendshipDatePrecision: "year",
    letter: {
      image: assetPath("images/friends/tannyy/tannyy-letter-art.png"),
      imageAlt: "Illustrated birthday letter from Tannyy to Blue",
      body: tannyyLetterText
    },
    reasons: {
      admire:
        "She is effortlessly sweet and adorable. She always makes everyone around her feel comfortable and welcomed.",
      funnyThing: "She's so damn cute that I get overwhelmed and just start laughing kssksksk ",
      favoriteMemory:
        "Definitely when I adopted her as my daughter  I also love how she always checks up on me and sends me flowers from time to time. She's genuinely the sweetest and most caring daughter ever",
      wishForThisYear:
        "One wish I have for you this year is that life is kinder to you and brings you all the happiness, love, and good things you deserve. I hope this year is gentle with you and gives you countless reasons to smile"
    },
    playlistSongs: [
      {
        title: "Never Grow Up",
        artist: "Taylor Swift",
        reason:
          "Because you're my precious daughter and I'm not emotionally ready for you to grow up  I'll always be here to protect you and look out for you",
        spotifyUrl: "https://open.spotify.com/track/3JilapcaOXzjR9gtvCY8FO?si=16e2ed074b5d4b09"
      }
    ],
    favoriteQuotes: [
      {
        quote: "Flowers for you, mommy ❤️"
      }
    ],
    photos: [],
    insideJokes: [
      {
        text: "We don't really have one yet  We definitely need to make some first."
      }
    ],
    secretMessage:
      "Happy birthday to my precious daughter  I'm so glad I adopted you and that Twitter brought you into my life. You're genuinely one of the sweetest and most adorable people ever. You'll always be my little baby, no matter how much you grow up.  Love you forever, my precious Bluey "
  }
];

export const friends: FriendProfile[] = realFriends;
