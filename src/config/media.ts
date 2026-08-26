// Central image manifest — the single place to point each page slot at a real photo.
//
// HOW TO ADD REAL YOUTH ARTWORK PHOTOS:
//   1. Drop the file into `public/images/` (see public/images/README.md for names).
//   2. Set `src` below to `/images/<filename>` (e.g. "/images/home-hero.jpg").
//   3. That's it — the slot swaps from the gradient placeholder to the photo.
//
// Leave `src: null` for any slot you don't have a photo for yet.

export type MediaSlot = {
  src: string | null;
  alt: string;
  tone?: "default" | "ocean";
};

export const media = {
  // HOME — hero background + section images (map 1:1 to 구현이미지.png)
  homeHero: { src: null, alt: "AFT youth at an exhibition" },
  aboutGrid1: { src: null, alt: "Youth creating artwork" },
  aboutGrid2: { src: null, alt: "Youth exhibition" },
  aboutGrid3: { src: null, alt: "Youth presenting" },
  aboutGrid4: { src: null, alt: "Youth activity" },
  impactImg1: { src: null, alt: "Youth presenting" },
  impactImg2: { src: null, alt: "Youth artwork" },
  impactImg3: { src: null, alt: "Eco-goods" },
  homeFeatured: {
    src: null,
    alt: "Our Ocean, Our Tomorrow project artwork",
    tone: "ocean",
  },
  featWide: { src: null, alt: "Exhibition gallery" },
  featThumb1: { src: null, alt: "Exhibition photo" },
  featThumb2: { src: null, alt: "Youth artwork" },
  featThumb3: { src: null, alt: "Campaign photo" },
  featThumb4: { src: null, alt: "Eco-goods" },
  wwdCreate: { src: null, alt: "Young artist creating" },
  wwdConnect: { src: null, alt: "Youth exhibition audience" },
  wwdAct: { src: null, alt: "Youth presenting a project" },
  wwdChange: { src: null, alt: "Youth-led change project" },
  homeCommunity: { src: null, alt: "Young creators collaborating at a table" },
  homeLab: { src: null, alt: "Youth in the creative lab with a mentor" },
  labImg1: { src: null, alt: "Youth product design" },
  labImg2: { src: null, alt: "Youth prototype" },
  homeStory1: { src: null, alt: "Youth creator portrait" },
  homeStory2: { src: null, alt: "Youth creator portrait" },
  homeStory3: { src: null, alt: "Youth creator portrait" },
  homeSupport: { src: null, alt: "A young creator sharing their work" },
  news1: { src: null, alt: "News thumbnail" },
  news2: { src: null, alt: "News thumbnail" },
  news3: { src: null, alt: "News thumbnail" },

  aboutHero: { src: null, alt: "AFT youth presenting their work" },
  aboutBook1: { src: null, alt: "Youth picture book cover" },
  aboutBook2: { src: null, alt: "Youth picture book cover" },
  aboutBook3: { src: null, alt: "Youth picture book cover" },

  impactFeatured: {
    src: null,
    alt: "Our Ocean, Our Tomorrow exhibition",
    tone: "ocean",
  },

  joinHero: { src: null, alt: "Young creators at an AFT workshop" },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;
