import { assetPath } from "../utils/assets";

export interface BtsPicture {
  id: string;
  src: string;
  alt: string;
  category: "group" | "suga" | "funny" | "cute" | "blue" | "retro";
  featured?: boolean;
  caption?: string;
}

const btsPic = (fileName: string) => assetPath(`bts-pics/${fileName}`);

export const btsPictures: BtsPicture[] = [
  {
    id: "photo-01",
    src: btsPic("photo-01.jpg"),
    category: "retro",
    alt: "Retro BTS group photo decoration",
    featured: true
  },
  {
    id: "photo-02",
    src: btsPic("photo-02.jpg"),
    category: "group",
    alt: "BTS group screen photo decoration"
  },
  {
    id: "photo-03",
    src: btsPic("photo-03.jpg"),
    category: "blue",
    alt: "Blue-toned BTS group photo decoration",
    featured: true
  },
  {
    id: "photo-04",
    src: btsPic("photo-04.jpg"),
    category: "cute",
    alt: "Cute solo BTS photo decoration with blue hearts"
  },
  {
    id: "photo-05",
    src: btsPic("photo-05.jpg"),
    category: "funny",
    alt: "Funny solo BTS photo decoration with pink bow"
  },
  {
    id: "photo-06",
    src: btsPic("photo-06.jpg"),
    category: "cute",
    alt: "Cute solo BTS photo decoration with pink bow"
  },
  {
    id: "photo-07",
    src: btsPic("photo-07.jpg"),
    category: "suga",
    alt: "SUGA solo photo decoration with white bow"
  },
  {
    id: "photo-08",
    src: btsPic("photo-08.jpg"),
    category: "suga",
    alt: "Blue stage SUGA photo decoration",
    featured: true
  }
];

export const btsPictureById = Object.fromEntries(
  btsPictures.map((picture) => [picture.id, picture])
) as Record<string, BtsPicture>;

if (import.meta.env.DEV && typeof Image !== "undefined") {
  btsPictures.forEach((picture) => {
    const image = new Image();
    image.src = picture.src;
    image.onerror = () => {
      console.warn(`Missing BTS picture: ${picture.src}`);
    };
  });
}
