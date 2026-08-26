# Partner logos

Drop each partner's logo file here, then set its `logo` path in the
`PARTNERS` array in `src/app/[locale]/page.tsx`.

| Partner              | Suggested file                | Set logo to                          |
| -------------------- | ----------------------------- | ------------------------------------ |
| WWF                  | wwf.svg                       | /images/partners/wwf.svg             |
| Oceana               | oceana.svg                    | /images/partners/oceana.svg          |
| National Geographic  | national-geographic.svg       | /images/partners/national-geographic.svg |
| The Body Shop        | the-body-shop.svg             | /images/partners/the-body-shop.svg   |
| Patagonia Foundation | patagonia.svg                 | /images/partners/patagonia.svg       |
| Google.org           | google-org.svg                | /images/partners/google-org.svg      |

## Notes

- Logos render **grayscale + 60% opacity**, going to full color on hover
  (`grayscale opacity-60 hover:grayscale-0 hover:opacity-100`).
- Prefer **SVG** or transparent **PNG**; single-color / monochrome versions
  look best in a grayscale strip.
- Only use logos you have permission to display. AFT has WWF logo-use approval.
- Any partner left with `logo: null` shows its **text name** (also desaturated)
  as a fallback — nothing breaks.
