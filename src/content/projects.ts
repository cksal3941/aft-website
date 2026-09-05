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
      en: "Hyangwoljae Gallery Exhibition",
      ko: "향월재 갤러리 전시",
    },
    oneLiner: {
      en: "AFT youth members' 2025 group exhibition at Hyangwoljae Gallery.",
      ko: "AFT 청소년 회원들이 2025년 향월재 갤러리에서 연 단체 전시.",
    },
    field: { en: "Exhibition", ko: "전시" },
    country: "KR",
    city: { en: "Seoul", ko: "서울" },
    mode: "offline",
    // 초등 1학년(만 6세)부터. 상한 미정이라 우선 개방형(6+)으로 표기.
    ageRange: "6+",
    language: "KR",
    cost: null,
    // 전시 사진은 추후 추가 예정 (사진 들어오면 cover + details.gallery 채우기).
    cover: null,
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
    cover: null,
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
    galleryCount: 6,
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
    ],
  },
};

export type LocalizedStat = { label: string; value: string; note?: string };
export type LocalizedDetail = {
  facts: { duration: string; location: string; audience: string };
  challenge: string;
  youngIdeas: string[];
  creativeAction: string[];
  impactSummary: string;
  impactStats: LocalizedStat[];
  galleryCount: number;
  gallery: { src: string; alt: string }[];
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
  };
}

// Coming-soon projects are teasers with no detail page, so they're excluded
// from static generation (their detail route 404s).
export function getProjectSlugs(): string[] {
  return projects.filter((p) => p.status !== "coming-soon").map((p) => p.slug);
}
