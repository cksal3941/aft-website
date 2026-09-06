import type { Locale } from "@/i18n/routing";

// Local content source for projects (기획서: 콘텐츠는 로컬 파일로 시작).
// Swap for a headless CMS later without changing the component layer.

export type ProjectStatus = "coming-soon" | "open" | "ongoing" | "completed";
export type ProjectMode = "online" | "offline" | "hybrid";

type LocalizedText = Record<Locale, string>;

export type Project = {
  slug: string;
  status: ProjectStatus;
  title: LocalizedText;
  oneLiner: LocalizedText;
  field: LocalizedText;
  country: string;
  city: LocalizedText;
  mode: ProjectMode;
  ageRange: string;
  language: string;
  /** ISO date; present for open projects */
  deadline?: string;
  /** null = free */
  cost: LocalizedText | null;
  /** featured on HOME / IMPACT */
  featured?: boolean;
  coverTone?: "ocean" | "default";
  /** path to a real cover photo, e.g. "/images/project-our-ocean-our-tomorrow.jpg"; null = placeholder */
  cover?: string | null;
  /** CSS object-position for the hero crop (e.g. "center 70%") when the default
      centre crop cuts the subject. */
  coverPosition?: string;
  /** Description shown on the detail page for open calls / competitions
      (공모전 소개). Use "\n" to split paragraphs. */
  overview?: LocalizedText;
  /** Step-by-step "how to take part" list for open calls. */
  howToApply?: LocalizedText[];
};

export const projects: Project[] = [
  {
    slug: "our-ocean-our-tomorrow",
    status: "completed",
    title: {
      en: "Our Ocean, Our Tomorrow",
      ko: "Our Ocean, Our Tomorrow",
    },
    oneLiner: {
      en: "28 young artists explore marine environments through art, publishing, campaigns and a WWF donation.",
      ko: "청소년 28명이 해양환경을 예술·출판·캠페인, 그리고 WWF 기부로 풀어낸 융합예술 프로젝트.",
    },
    field: { en: "Convergence Art", ko: "융합예술" },
    country: "KR",
    city: { en: "Seoul", ko: "서울" },
    mode: "offline",
    ageRange: "13–19",
    language: "KR / EN",
    cost: null,
    featured: true,
    coverTone: "ocean",
    cover: "/images/project-our-ocean-our-tomorrow.jpg",
  },
  {
    slug: "hyangwoljae-gallery-2025",
    status: "completed",
    title: {
      en: "Hyangwoljae",
      ko: "향월재",
    },
    oneLiner: {
      en: "'Hyangwoljae' — AFT youth members' 2025 group exhibition.",
      ko: "AFT 청소년 회원들이 2025년에 연 단체 전시 '향월재'.",
    },
    field: { en: "Exhibition", ko: "전시" },
    country: "KR",
    city: { en: "Seoul", ko: "서울" },
    mode: "offline",
    // 초등 1학년(만 6세)부터. 상한 미정이라 우선 개방형(6+)으로 표기.
    ageRange: "6+",
    language: "KR",
    cost: null,
    cover: "/images/aft-3.jpg",
  },
  {
    slug: "aft-membership-2025",
    status: "completed",
    title: {
      en: "AFT Membership Recruitment",
      ko: "AFT 회원 모집",
    },
    oneLiner: {
      en: "The 2025 open call that gathered AFT's first youth members.",
      ko: "2025년, AFT의 첫 청소년 회원을 모집한 프로젝트.",
    },
    field: { en: "Membership", ko: "회원 모집" },
    country: "KR",
    city: { en: "Seoul", ko: "서울" },
    mode: "offline",
    ageRange: "6+",
    language: "KR",
    cost: null,
    cover: "/images/aft-18.jpg",
    // Group photo sits low in the frame — anchor the crop lower so faces aren't cut.
    coverPosition: "center 72%",
    overview: {
      en: "AFT (Arts For Tomorrow) is a global non-profit arts organization that helps young people turn creativity into real action. Through painting, music, writing and film, we stand beside young artists so their work can grow into exhibitions, projects and social change — in Korea and around the world.\nNow we are looking for the first youth members to begin that journey with us. Age, hometown and favourite medium don't matter. If you want to show the world what you've made — to find your voice through art — there is a place for you here.\nAs a member you won't simply take classes. You'll create your own work and hang it in a real exhibition, write your own artist statement, stand in front of an audience, and connect with fellow young creators across the globe. Reach out any time — AFT will help you prepare your very first stage.",
      ko: "AFT(Arts For Tomorrow)는 예술을 통해 청소년의 창의성을 실제 행동으로 이어가는 글로벌 비영리 예술단체입니다. 그림·음악·글·영상 등 저마다의 언어로 세상을 표현하고, 그 표현이 전시와 프로젝트, 나아가 사회적 변화로 이어지도록 청소년 곁에서 함께합니다.\nAFT는 그 여정을 함께 시작할 첫 청소년 회원을 찾습니다. 나이도, 사는 곳도, 좋아하는 표현 방식도 상관없습니다. '내가 만든 것을 세상에 보여주고 싶다', '예술로 나의 목소리를 내고 싶다'는 마음이 있다면 누구나 함께할 수 있습니다.\n회원이 되면 단순히 배우는 데 그치지 않습니다. 직접 작품을 만들어 전시를 열고, 작가노트를 쓰고, 관객 앞에 서며, 국내를 넘어 전 세계 또래 창작자들과 연결됩니다. 함께하고 싶다면 언제든 문의해 주세요 — 당신의 첫 무대를 AFT가 함께 준비하겠습니다.",
    },
  },
  {
    // Placeholder teaser — not a real project. Rendered as a "Coming Soon" card
    // (no image) via ProjectCard's coming-soon branch.
    slug: "coming-soon",
    status: "coming-soon",
    title: { en: "Coming Soon", ko: "공개 예정" },
    oneLiner: {
      en: "New youth projects are on the way.",
      ko: "새로운 청소년 프로젝트가\n곧 공개됩니다.",
    },
    field: { en: "—", ko: "—" },
    country: "KR",
    city: { en: "—", ko: "—" },
    mode: "online",
    ageRange: "—",
    language: "—",
    cost: null,
    cover: null,
  },
];

export type LocalizedProject = {
  slug: string;
  status: ProjectStatus;
  title: string;
  oneLiner: string;
  field: string;
  country: string;
  city: string;
  mode: ProjectMode;
  ageRange: string;
  language: string;
  deadline?: string;
  cost: string | null;
  featured?: boolean;
  coverTone?: "ocean" | "default";
  cover?: string | null;
  coverPosition?: string;
  overview?: string;
  howToApply?: string[];
};

export function localizeProject(p: Project, locale: Locale): LocalizedProject {
  return {
    slug: p.slug,
    status: p.status,
    title: p.title[locale],
    oneLiner: p.oneLiner[locale],
    field: p.field[locale],
    country: p.country,
    city: p.city[locale],
    mode: p.mode,
    ageRange: p.ageRange,
    language: p.language,
    deadline: p.deadline,
    cost: p.cost ? p.cost[locale] : null,
    featured: p.featured,
    coverTone: p.coverTone,
    cover: p.cover ?? null,
    coverPosition: p.coverPosition,
    overview: p.overview?.[locale],
    howToApply: p.howToApply?.map((x) => x[locale]),
  };
}

export function getProjects(locale: Locale): LocalizedProject[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function getProject(
  slug: string,
  locale: Locale
): LocalizedProject | undefined {
  const p = projects.find((x) => x.slug === slug);
  return p ? localizeProject(p, locale) : undefined;
}

// ---------------------------------------------------------------------------
// Rich detail content for PROJECT DETAIL (기획서 §5). Optional per project.
// ---------------------------------------------------------------------------

export type Stat = {
  label: LocalizedText;
  value: string;
  note?: LocalizedText;
};

export type VideoClip = {
  src: string;
  /** Poster frame shown before playback. */
  poster?: string;
  caption: LocalizedText;
};

export type Catalog = {
  /** Path to the downloadable PDF under /public. */
  src: string;
  /** Rendered page images for the in-browser preview, in order. */
  pages?: string[];
  note?: LocalizedText;
};

export type ProjectDetail = {
  facts: {
    duration: LocalizedText;
    location: LocalizedText;
    audience: LocalizedText;
  };
  challenge: LocalizedText;
  youngIdeas: LocalizedText[];
  creativeAction: LocalizedText[];
  impactSummary: LocalizedText;
  impactStats: Stat[];
  galleryCount: number;
  /** Real exhibition photos. When present, the detail page renders these
      instead of the `galleryCount` placeholder tiles. */
  gallery?: { src: string; alt: LocalizedText }[];
  /** Exhibition films, rendered as a video grid when present. */
  videos?: VideoClip[];
  /** Printed catalog (도록): download + optional page preview. */
  catalog?: Catalog;
};

const details: Record<string, ProjectDetail> = {
  "our-ocean-our-tomorrow": {
    facts: {
      duration: { en: "2026", ko: "2026년" },
      location: {
        en: "Skypark Hotel Myeongdong, 14F, Seoul",
        ko: "명동 스카이파크호텔 14층, 서울",
      },
      audience: { en: "28 youth (ages 13–19)", ko: "청소년 28명 (13–19세)" },
    },
    challenge: {
      en: "Marine ecosystems face plastic waste, climate change and coral loss. How can young people move beyond awareness to real action for the ocean?",
      ko: "해양 생태계는 플라스틱 쓰레기, 기후변화, 산호초 훼손에 직면해 있습니다. 청소년이 인식을 넘어 바다를 위한 실제 행동을 만들 수 있을까요?",
    },
    youngIdeas: [
      {
        en: "Investigate marine issues and translate them into paintings and illustrations.",
        ko: "해양 문제를 조사하고 회화·일러스트로 표현하기.",
      },
      {
        en: "Turn artwork into picture books, posters and eco-products.",
        ko: "작품을 그림책·포스터·친환경 굿즈로 확장하기.",
      },
      {
        en: "Plan the exhibition, run the campaign and present to visitors.",
        ko: "전시를 기획하고 캠페인을 운영하며 관람객에게 발표하기.",
      },
    ],
    creativeAction: [
      { en: "Exhibition & space design", ko: "전시 기획과 공간 구성" },
      { en: "Picture books & publishing", ko: "그림책과 출판" },
      { en: "Environmental campaign posters", ko: "환경 캠페인 포스터" },
      { en: "Promo & project films", ko: "홍보·프로젝트 영상" },
      { en: "Orchestra performance", ko: "오케스트라 공연" },
      { en: "Eco-goods & donation campaign", ko: "친환경 굿즈·기부 캠페인" },
    ],
    impactSummary: {
      en: "Youth art became real products, and product sales became a real donation: ₩1,434,000 raised, with ₩1,000,000 donated to WWF.",
      ko: "청소년의 예술이 실제 제품이 되었고, 그 판매 수익 1,434,000원 중 1,000,000원을 WWF에 기부했습니다.",
    },
    impactStats: [
      {
        label: { en: "Youth participants", ko: "참여 청소년" },
        value: "28",
      },
      {
        label: { en: "Raised through art", ko: "예술 굿즈 판매 수익" },
        value: "₩1,434,000",
        note: {
          en: "Eco-bags ₩1,152,000 + badges ₩282,000",
          ko: "에코백 1,152,000원 + 배지 282,000원",
        },
      },
      {
        label: { en: "Donated to WWF", ko: "WWF 기부금" },
        value: "₩1,000,000",
      },
    ],
    galleryCount: 9,
    gallery: [
      {
        src: "/images/GILL1409.jpg",
        alt: {
          en: "The 28 young artists together at the exhibition",
          ko: "전시 현장에 모인 참여 청소년 28명",
        },
      },
      {
        src: "/images/GILL1502.jpg",
        alt: {
          en: "A young artist beside her ocean paintings",
          ko: "자신의 해양 회화 작품 옆에 선 청소년 작가",
        },
      },
      {
        src: "/images/GILL1194.jpg",
        alt: {
          en: "A young artist presenting their artwork to the audience",
          ko: "관람객에게 자신의 작품을 발표하는 청소년 작가",
        },
      },
      {
        src: "/images/GILL0864.jpg",
        alt: {
          en: "Eco-goods made from the youth artwork at the entrance",
          ko: "청소년 작품으로 만든 친환경 굿즈 전시",
        },
      },
      {
        src: "/images/GILL1357.jpg",
        alt: {
          en: "Introducing an ocean artwork on stage",
          ko: "무대에서 해양 작품을 소개하는 청소년",
        },
      },
      {
        src: "/images/GILL1035.jpg",
        alt: {
          en: "The exhibition opening ceremony",
          ko: "전시 개막식 현장",
        },
      },
      {
        src: "/images/GILL1414.jpg",
        alt: {
          en: "All the young artists together on stage",
          ko: "무대에 함께 오른 참여 청소년 작가 전원",
        },
      },
      {
        src: "/images/GIL00345.jpg",
        alt: {
          en: "A young artist reading her statement aloud",
          ko: "자신의 작가노트를 발표하는 청소년 작가",
        },
      },
      {
        src: "/images/GILL1152.jpg",
        alt: {
          en: "A young artist presenting his picture book",
          ko: "자신의 그림책을 소개하는 청소년 작가",
        },
      },
    ],
    videos: [
      {
        src: "/videos/ocean-1.mp4",
        poster: "/images/video-ocean-1-poster.jpg",
        caption: {
          en: "A walk through the ocean exhibition",
          ko: "전시장 둘러보기",
        },
      },
      {
        src: "/videos/ocean-2.mp4",
        poster: "/images/video-ocean-2-poster.jpg",
        caption: {
          en: "Introducing the young artists",
          ko: "참여 작가 소개 발표회",
        },
      },
      {
        src: "/videos/ocean-3.mp4",
        poster: "/images/video-ocean-3-poster.jpg",
        caption: {
          en: "The opening string ensemble",
          ko: "오프닝 현악 앙상블 공연",
        },
      },
      {
        src: "/videos/ocean-4.mp4",
        poster: "/images/video-ocean-4-poster.jpg",
        caption: {
          en: "Welcoming visitors at the reception",
          ko: "행사장 리셉션과 관람객",
        },
      },
    ],
  },

  "hyangwoljae-gallery-2025": {
    facts: {
      duration: { en: "10–17 Jul 2025", ko: "2025.7.10 – 7.17" },
      location: {
        en: "Seoul",
        ko: "서울",
      },
      audience: {
        en: "AFT young artists (ages 6+)",
        ko: "AFT 청소년 작가 (만 6세 이상)",
      },
    },
    challenge: {
      en: "Everyone draws, but very few young people ever show their work to the world under their own name. How could AFT's youth members hold their first real exhibition — not as a school assignment, but as artists?",
      ko: "누구나 그림을 그리지만, 자신의 이름을 걸고 작품을 세상에 내보이는 청소년은 많지 않습니다. AFT 청소년 회원들이 숙제가 아니라 '작가'로서 여는 첫 전시를 어떻게 만들 수 있을까요?",
    },
    youngIdeas: [
      {
        en: "Look at the world through their own eyes and turn it into a painting — 'The Wonderful World of Me'.",
        ko: "자신만의 시선으로 세상을 바라보고 회화로 완성하기 — 'The Wonderful World of Me'.",
      },
      {
        en: "Write their own artist statement and caption for every work.",
        ko: "작품마다 작가노트와 설명을 직접 쓰기.",
      },
      {
        en: "Co-plan the exhibition and present their work to a live audience.",
        ko: "전시를 함께 기획하고, 관객 앞에서 자신의 작품을 소개하기.",
      },
    ],
    creativeAction: [
      { en: "Exhibition planning & installation", ko: "전시 기획과 작품 설치" },
      { en: "Artist notes & printed catalog", ko: "작가노트와 작품 도록" },
      { en: "Artwork presentation & artist talk", ko: "작품 발표와 아티스트 토크" },
      { en: "On-site film & documentation", ko: "전시 현장 영상 기록" },
      { en: "Opening string ensemble", ko: "오프닝 현악 앙상블 공연" },
    ],
    impactSummary: {
      en: "For a week in July 2025, AFT's young members became artists for the first time. 21 young artists hung their own paintings, 6 young musicians played the opening concert, and the whole exhibition — 'Hyangwoljae' — was planned by four of the students themselves. A whole world, made and run by young hands.",
      ko: "2025년 7월의 일주일 동안, AFT 청소년 회원들은 처음으로 '작가'가 되었습니다. 21명의 청소년 작가가 직접 그린 작품을 걸고, 6명의 청소년 음악가가 오프닝 공연을 열었으며, 전시 '향월재'는 4명의 청소년이 직접 기획했습니다. 청소년의 손으로 만들고 운영한 하나의 세계였습니다.",
    },
    impactStats: [
      {
        label: { en: "Young artists", ko: "참여 청소년 작가" },
        value: "21",
      },
      {
        label: { en: "Young musicians", ko: "참여 청소년 음악가" },
        value: "6",
      },
      {
        label: { en: "Youth curators", ko: "청소년 기획자" },
        value: "4",
      },
    ],
    galleryCount: 9,
    gallery: [
      {
        src: "/images/aft-1.jpg",
        alt: {
          en: "The exhibition opening, with the gallery full of visitors",
          ko: "관람객으로 가득 찬 전시 오프닝 현장",
        },
      },
      {
        src: "/images/aft-5.jpg",
        alt: {
          en: "Youth paintings hanging on the gallery wall",
          ko: "전시장 벽에 걸린 청소년 작가들의 회화 작품",
        },
      },
      {
        src: "/images/aft-6.jpg",
        alt: {
          en: "Paintings of the city, the sea and everyday life",
          ko: "도시·바다·일상을 담은 청소년 작품들",
        },
      },
      {
        src: "/images/aft-4.jpg",
        alt: {
          en: "Artworks lit by natural light in the gallery space",
          ko: "자연광이 드는 전시 공간의 작품들",
        },
      },
      {
        src: "/images/aft-17.jpg",
        alt: {
          en: "A young artist presenting her work with a microphone",
          ko: "마이크를 들고 자신의 작품을 소개하는 청소년 작가",
        },
      },
      {
        src: "/images/aft-19.jpg",
        alt: {
          en: "The opening string ensemble performance",
          ko: "오프닝 현악 앙상블 공연",
        },
      },
      {
        src: "/images/aft-10.jpg",
        alt: {
          en: "A cello duet at the opening reception",
          ko: "오프닝 리셉션의 첼로 이중주",
        },
      },
      {
        src: "/images/aft-12.jpg",
        alt: {
          en: "Guests gathered at the opening reception",
          ko: "개막 리셉션에 모인 관람객들",
        },
      },
      {
        src: "/images/aft-18.jpg",
        alt: {
          en: "The young artists together after the exhibition",
          ko: "전시를 마친 청소년 작가들의 단체 사진",
        },
      },
    ],
    videos: [
      {
        src: "/videos/aft-3.mp4",
        poster: "/images/video-aft-3-poster.jpg",
        caption: { en: "A walk through the exhibition", ko: "전시장 둘러보기" },
      },
      {
        src: "/videos/aft-4.mp4",
        poster: "/images/video-aft-4-poster.jpg",
        caption: {
          en: "The opening string ensemble",
          ko: "오프닝 현악 앙상블 공연",
        },
      },
      {
        src: "/videos/aft-9.mp4",
        poster: "/images/video-aft-9-poster.jpg",
        caption: {
          en: "A young artist introduces her work",
          ko: "자신의 작품을 소개하는 청소년 작가",
        },
      },
      {
        src: "/videos/aft-2.mp4",
        poster: "/images/video-aft-2-poster.jpg",
        caption: {
          en: "The youth members' opening presentation",
          ko: "청소년들의 오프닝 발표",
        },
      },
    ],
    catalog: {
      src: "/images/hyangwoljae-gallery-2025-catalog.pdf",
      note: {
        en: "The Wonderful World of Me — every young artist and their work.",
        ko: "The Wonderful World of Me — 청소년 작가 전원과 작품을 담은 전시 도록.",
      },
    },
  },
};

export type LocalizedStat = { label: string; value: string; note?: string };
export type LocalizedVideo = { src: string; poster?: string; caption: string };
export type LocalizedCatalog = { src: string; pages: string[]; note?: string };
export type LocalizedDetail = {
  facts: { duration: string; location: string; audience: string };
  challenge: string;
  youngIdeas: string[];
  creativeAction: string[];
  impactSummary: string;
  impactStats: LocalizedStat[];
  galleryCount: number;
  gallery: { src: string; alt: string }[];
  videos: LocalizedVideo[];
  catalog?: LocalizedCatalog;
};

export function getProjectDetail(
  slug: string,
  locale: Locale
): LocalizedDetail | undefined {
  const d = details[slug];
  if (!d) return undefined;
  return {
    facts: {
      duration: d.facts.duration[locale],
      location: d.facts.location[locale],
      audience: d.facts.audience[locale],
    },
    challenge: d.challenge[locale],
    youngIdeas: d.youngIdeas.map((x) => x[locale]),
    creativeAction: d.creativeAction.map((x) => x[locale]),
    impactSummary: d.impactSummary[locale],
    impactStats: d.impactStats.map((s) => ({
      label: s.label[locale],
      value: s.value,
      note: s.note?.[locale],
    })),
    galleryCount: d.galleryCount,
    gallery: (d.gallery ?? []).map((g) => ({ src: g.src, alt: g.alt[locale] })),
    videos: (d.videos ?? []).map((v) => ({
      src: v.src,
      poster: v.poster,
      caption: v.caption[locale],
    })),
    catalog: d.catalog
      ? {
          src: d.catalog.src,
          pages: d.catalog.pages ?? [],
          note: d.catalog.note?.[locale],
        }
      : undefined,
  };
}

// Coming-soon projects are teasers with no detail page, so they're excluded
// from static generation (their detail route 404s).
export function getProjectSlugs(): string[] {
  return projects.filter((p) => p.status !== "coming-soon").map((p) => p.slug);
}
