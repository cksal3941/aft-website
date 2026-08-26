# AFT images — drop real youth artwork photos here

Put photo files in this folder, then point the app at them. Two kinds of images:

## 1) Fixed page slots — edit `src/config/media.ts`

Drop a file here, then set that slot's `src` to `/images/<filename>`.
Recommended filenames (any format: .jpg / .webp / .png):

| Slot (in media.ts) | Suggested file          | Used on            | Ratio  |
| ------------------ | ----------------------- | ------------------ | ------ |
| homeHero           | home-hero.jpg           | HOME hero          | 4:3    |
| homeAbout          | home-about.jpg          | HOME about         | 4:3    |
| homeFeatured       | home-featured.jpg       | HOME featured      | 16:10  |
| homeJoin           | home-join.jpg           | HOME ways-to-join  | 4:3    |
| homeStory1/2/3     | home-story-1.jpg …      | HOME youth stories | 4:3    |
| aboutHero          | about-hero.jpg          | ABOUT hero         | 4:3    |
| aboutBook1/2/3     | about-book-1.jpg …      | ABOUT youth books  | 3:4    |
| impactFeatured     | impact-featured.jpg     | IMPACT featured    | 16:10  |
| joinHero           | join-hero.jpg           | JOIN hero          | 4:3    |

Example (in `src/config/media.ts`):

```ts
homeHero: { src: "/images/home-hero.jpg", alt: "AFT youth creating artwork together" },
```

## 2) Project & story covers — edit the content files

- Projects: set `cover: "/images/project-<slug>.jpg"` in `src/content/projects.ts`
- Stories:  set `cover: "/images/story-<slug>.jpg"` in `src/content/stories.ts`

## Notes

- Any slot left as `src: null` (or a project/story with no `cover`) keeps the
  current gradient placeholder — nothing breaks.
- Images are served by `next/image` (auto-optimized). Use reasonably large
  originals (≈1600px wide) and let Next resize.
- Prefer real youth artwork / activity photos with consent to publish.
