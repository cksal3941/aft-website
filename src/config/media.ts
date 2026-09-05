// Central image manifest — the single place to point each page slot at a real photo.
//
// HOW TO ADD REAL YOUTH ARTWORK PHOTOS:
//   1. Drop the file into `public/images/` (see public/images/README.md for names).
//   2. Set `src` below to `/images/<filename>` (e.g. "/images/home-featured.jpg").
//   3. That's it — the slot swaps from the gradient placeholder to the photo.
//
// Leave `src: null` for any slot you don't have a photo for yet.

export type MediaSlot = {
  src: string | null;
  alt: string;
  tone?: "default" | "ocean";
};

// HERO background video. `src` is the landscape (16:9) clip for tablet/desktop;
// `srcMobile` is the optional portrait (9:16) clip shown on phones. `poster` is
// the still shown before/while the video loads. All null → navy gradient.
export const homeHeroVideo: {
  src: string | null;
  srcMobile?: string | null;
  poster: string | null;
  posterMobile?: string | null;
} = {
  src: "/videos/hongik-hero-16x9.mp4",
  srcMobile: "/videos/hongik-hero-9x16.mp4",
  poster: "/images/hero-poster-16x9.jpg",
  posterMobile: "/images/hero-poster-9x16.jpg",
};

// AFT × WWF donation-ceremony clip (07 · DONATION & ECO ACTION). Same pattern
// as the hero: drop a file into public/videos/ and set `src`; `poster` is the
// ceremony still. Both null → a play badge sits over the placeholder image.
// Donation-ceremony (기부금 전달식) clip. No ceremony footage exists yet — the
// available clips are exhibition / goods / eco-walk, not the ₩1,000,000 handover.
// Drop the real ceremony file into public/videos/ and set `src` to swap the
// section's still image for a playable video (the "전달식 영상 보기" button wires
// up automatically). Until then `src` stays null and the WWF still is shown.
export const homeDonationVideo: { src: string | null; poster: string | null } = {
  src: null,
  poster: "/images/wwf-ceremony.jpg",
};

export const media = {
  // HOME — hero background + section images (map 1:1 to 구현이미지.png)
  homeHero: { src: null, alt: "AFT youth at an exhibition" },
  aboutGrid1: { src: "/images/GILL1502.jpg", alt: "Young artist beside their ocean-themed artwork" },
  aboutGrid2: { src: "/images/about-grid-2.jpg", alt: "Youth presenting on stage" },
  aboutGrid3: { src: "/images/about-grid-3.jpg", alt: "Youth with ocean-themed artwork" },
  aboutGrid4: { src: "/images/about-grid-4.jpg", alt: "Youth award ceremony" },
  impactImg1: { src: "/images/impact-img-1.jpg", alt: "Youth orchestra performing" },
  // Home "2026 주요 성과" right-side bleed image (home only — impact page keeps impactImg1).
  impactHomeImg: { src: "/images/GILL1409.jpg", alt: "AFT young artists group photo at the exhibition" },
  impactImg2: { src: "/images/impact-img-2.jpg", alt: "Exhibition reception" },
  impactImg3: { src: "/images/impact-img-3.jpg", alt: "Gallery of youth ocean artworks" },
  homeFeatured: {
    src: "/images/home-featured.jpg",
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
  homeCommunity: { src: "/images/home-community.jpg", alt: "AFT youth creators together" },
  joinYouth: { src: "/images/join-youth.jpg", alt: "AFT youth presenting on stage" },
  joinAdvisors: { src: "/images/story-shot-5.jpg", alt: "A presenter speaking at an AFT project" },
  joinPartners: { src: "/images/story-from-drawing-to-donation.jpg", alt: "A WWF Korea partner speaking at the AFT charity project" },
  homeLab: { src: null, alt: "Youth in the creative lab with a mentor" },
  labImg1: { src: null, alt: "Youth product design" },
  labImg2: { src: null, alt: "Youth prototype" },
  homeStory1: { src: "/images/home-story-1.jpg", alt: "Youth creator with their artwork" },
  homeStory2: { src: "/images/home-story-2.jpg", alt: "Youth creator with their artwork" },
  homeStory3: { src: "/images/home-story-3.jpg", alt: "Youth creator with their artwork" },
  // Story-began photo strip (04)
  storyShot1: { src: "/images/story-shot-1.jpg", alt: "Young artist with their artwork" },
  storyShot2: { src: "/images/story-shot-2.jpg", alt: "Exhibition gallery" },
  storyShot3: { src: "/images/story-shot-3.jpg", alt: "Exhibition reception" },
  storyShot4: { src: "/images/story-shot-4.jpg", alt: "Award ceremony on stage" },
  storyShot5: { src: "/images/story-shot-5.jpg", alt: "Youth orchestra performance" },
  wwfCeremony: { src: "/images/wwf-ceremony.jpg", alt: "WWF Korea representative at the AFT × WWF youth art charity project", tone: "ocean" },
  // WWF follow-up eco action (05)
  wwfFollow1: { src: "/images/wwf-follow-1.jpg", alt: "Environmental education session" },
  wwfFollow2: { src: "/images/wwf-follow-2.jpg", alt: "Youth interviews" },
  wwfFollow3: { src: "/images/wwf-follow-3.jpg", alt: "Cheonggyecheon eco walk" },
  // Dotted world map (Pixabay Content License — GDJ; free, no attribution required).
  // Leave src null to fall back to the built-in dot-grid motif.
  homeSupport: { src: "/images/support-earth-2.jpg", alt: "A hand holding a green planet Earth" },
  news1: { src: null, alt: "News thumbnail" },
  news2: { src: null, alt: "News thumbnail" },
  news3: { src: null, alt: "News thumbnail" },

  aboutHero: { src: "/images/about-hero.jpg", alt: "AFT youth presenting their work" },
  aboutBook1: { src: "/images/about-book-1.jpg", alt: "Youth picture book cover" },
  aboutBook2: { src: "/images/about-book-2.jpg", alt: "Youth picture book cover" },
  aboutBook3: { src: "/images/about-book-3.jpg", alt: "Youth picture book cover" },

  impactFeatured: {
    src: "/images/impact-featured.jpg",
    alt: "Our Ocean, Our Tomorrow exhibition",
    tone: "ocean",
  },

  joinHero: { src: "/images/join-hero.jpg", alt: "Young creators at an AFT workshop" },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;
