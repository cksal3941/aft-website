import type { Locale } from "@/i18n/routing";

// Local content for youth stories (기획서: YOUTH STORIES — 인터뷰·작품·활동 변화).
// Swap for a headless CMS later without changing the component layer.

type LocalizedText = Record<Locale, string>;

export type Story = {
  slug: string;
  name: LocalizedText;
  role: LocalizedText;
  project: LocalizedText;
  quote: LocalizedText;
  body: LocalizedText;
  coverTone?: "ocean" | "default";
  /** path to a real photo, e.g. "/images/story-from-drawing-to-donation.jpg"; null = placeholder */
  cover?: string | null;
};

export const stories: Story[] = [
  {
    slug: "from-drawing-to-donation",
    name: { en: "Youth Artist · Marine Team", ko: "청소년 예술가 · 해양팀" },
    role: { en: "Artist", ko: "예술가" },
    project: { en: "Our Ocean, Our Tomorrow", ko: "Our Ocean, Our Tomorrow" },
    quote: {
      en: "I used to think a drawing ends on the wall. Here, my painting became an eco-bag — and the sale became a donation.",
      ko: "그림은 전시로 끝나는 줄 알았어요. 그런데 제 그림이 에코백이 되고, 그 수익이 다시 나눔으로 이어졌어요.",
    },
    body: {
      en: "After researching plastic waste, this young artist turned a painting into a product design, then helped run the donation campaign that sent ₩1,000,000 to WWF.",
      ko: "플라스틱 문제를 조사한 뒤 그림을 제품 디자인으로 발전시켰고, WWF에 1,000,000원을 전달한 기부 캠페인 운영에도 참여했습니다.",
    },
    coverTone: "ocean",
    cover: "/images/wwf-ceremony.jpg",
  },
  {
    slug: "becoming-a-published-author",
    name: { en: "Youth Author · Publishing Team", ko: "청소년 작가 · 출판팀" },
    role: { en: "Author", ko: "작가" },
    project: { en: "Youth Picture Books", ko: "청소년 그림책" },
    quote: {
      en: "Seeing my book in a real online bookstore made me believe my story mattered.",
      ko: "제가 만든 책이 실제 서점에 올라온 걸 보고, 제 이야기도 누군가에게 의미가 될 수 있다는 걸 알게 됐어요.",
    },
    body: {
      en: "From planning the story to designing the cover, this member became a published author whose book carries an environmental message.",
      ko: "이야기 기획부터 표지 구성까지 맡아, 환경 메시지를 담은 책을 출판한 작가가 되었습니다.",
    },
    cover: "/images/story-becoming-a-published-author.jpg",
  },
  {
    slug: "leading-the-exhibition",
    name: { en: "Youth Host · Event Team", ko: "청소년 진행자 · 이벤트팀" },
    role: { en: "Leader", ko: "리더" },
    project: { en: "Our Ocean, Our Tomorrow", ko: "Our Ocean, Our Tomorrow" },
    quote: {
      en: "I hosted the event and explained our work to visitors. I found a voice I didn't know I had.",
      ko: "사람들 앞에서 우리 작품을 설명하며, 제 목소리에도 힘이 있다는 걸 알게 됐어요.",
    },
    body: {
      en: "Planning the exhibition flow and presenting on stage, this member led visitor programs and grew into a confident youth leader.",
      ko: "전시 동선을 기획하고 무대에서 발표하며 관람객 프로그램을 이끌었고, 자신감 있는 청소년 리더로 성장했습니다.",
    },
    cover: "/images/GIL00345.jpg",
  },
];

export type LocalizedStory = {
  slug: string;
  name: string;
  role: string;
  project: string;
  quote: string;
  body: string;
  coverTone?: "ocean" | "default";
  cover?: string | null;
};

export function getStories(locale: Locale): LocalizedStory[] {
  return stories.map((s) => ({
    slug: s.slug,
    name: s.name[locale],
    role: s.role[locale],
    project: s.project[locale],
    quote: s.quote[locale],
    body: s.body[locale],
    coverTone: s.coverTone,
    cover: s.cover ?? null,
  }));
}
