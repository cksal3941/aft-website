import type { Locale } from "@/i18n/routing";

// Local content source for projects (기획서: 콘텐츠는 로컬 파일로 시작).
// Swap for a headless CMS later without changing the component layer.

export type ProjectStatus = "open" | "ongoing" | "completed";
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
  /** path to a real cover photo, e.g. "/images/project-our-ocean.jpg"; null = placeholder */
  cover?: string | null;
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
    slug: "plastic-free-plates",
    status: "open",
    title: {
      en: "Plastic-Free Plates",
      ko: "플라스틱 프리 식판",
    },
    oneLiner: {
      en: "Design a children's plate that makes daily plastic use visible.",
      ko: "일상 속 플라스틱 사용량을 눈으로 보여주는 어린이 식판을 디자인합니다.",
    },
    field: { en: "Product Design", ko: "제품디자인" },
    country: "KR",
    city: { en: "Online", ko: "온라인" },
    mode: "online",
    ageRange: "14–18",
    language: "KR",
    deadline: "2026-10-15",
    cost: null,
    cover: "/images/project-plastic-free-plates.jpg",
  },
  {
    slug: "city-heat-island-app",
    status: "ongoing",
    title: {
      en: "City Heat Island App",
      ko: "도시 열섬 앱",
    },
    oneLiner: {
      en: "Youth-led app concept that maps and communicates urban heat islands.",
      ko: "도시 열섬 문제를 지도화하고 알리는 청소년 주도 앱 아이디어.",
    },
    field: { en: "Public Design", ko: "공공디자인" },
    country: "KR",
    city: { en: "Seoul", ko: "서울" },
    mode: "hybrid",
    ageRange: "15–19",
    language: "KR / EN",
    cost: null,
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
      ko: "청소년의 예술이 실제 제품이 되고, 제품 판매가 실제 기부로 이어졌습니다. 총 1,434,000원을 조성하고 WWF에 1,000,000원을 기부했습니다.",
    },
    impactStats: [
      {
        label: { en: "Youth participants", ko: "참여 청소년" },
        value: "28",
      },
      {
        label: { en: "Raised through art", ko: "예술로 조성한 모금액" },
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
  };
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
