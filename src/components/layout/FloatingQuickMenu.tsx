/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const ICON_BASE = "/fq/";
const EMAIL = "hello@aft.org";

// TODO: replace with real AFT links once confirmed.
const SNS_LINKS = {
  instagram: "#",
  youtube: "#",
  naverBlog: "#",
};
const PHONE = "#"; // e.g. "tel:+8210..."

// Floating quick menu (contact · phone · SNS · TOP). Ported from CnA.
export function FloatingQuickMenu() {
  const [snsOpen, setSnsOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <aside className="footer-quick">
      <ul className="fq-list">
        {/* Email */}
        <li className="fq-item">
          <a href={`mailto:${EMAIL}`} className="fq-circle" aria-label="이메일 문의">
            <img src={`${ICON_BASE}icon-email.svg`} alt="이메일" width={22} height={22} />
          </a>
        </li>

        {/* Phone */}
        <li className="fq-item">
          <a href={PHONE} className="fq-circle" aria-label="전화 문의">
            <img src={`${ICON_BASE}icon-phone.svg`} alt="전화" width={20} height={20} />
          </a>
        </li>

        {/* SNS toggle */}
        <li className="fq-item fq-sns">
          <button
            type="button"
            className="fq-circle fq-sns-toggle"
            onClick={() => setSnsOpen((v) => !v)}
            aria-expanded={snsOpen}
            aria-label="SNS 열기"
          >
            <span className="fq-sns-label">SNS</span>
            <img
              src={`${ICON_BASE}icon-lang-arrow.svg`}
              alt=""
              width={10}
              height={10}
              className={`fq-sns-arrow${snsOpen ? " open" : ""}`}
            />
          </button>
          <div
            className={`fq-sns-panel${snsOpen ? " open" : ""}`}
            aria-hidden={!snsOpen}
          >
            <div className="fq-sns-inner">
              <a
                href={SNS_LINKS.instagram}
                className="fq-circle fq-sns-item"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="인스타그램"
              >
                <img src={`${ICON_BASE}icon-instagram.svg`} alt="Instagram" width={20} height={20} />
              </a>
              <a
                href={SNS_LINKS.youtube}
                className="fq-circle fq-sns-item"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="유튜브"
              >
                <img src={`${ICON_BASE}icon-youtube.svg`} alt="YouTube" width={20} height={20} />
              </a>
              <a
                href={SNS_LINKS.naverBlog}
                className="fq-circle fq-sns-item"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="네이버 블로그"
              >
                <img src={`${ICON_BASE}icon-naverblog.svg`} alt="Naver Blog" width={20} height={20} />
              </a>
            </div>
          </div>
        </li>

        {/* TOP */}
        <li className="fq-item">
          <button
            type="button"
            className="fq-circle fq-top"
            onClick={scrollToTop}
            aria-label="맨 위로"
          >
            TOP
          </button>
        </li>
      </ul>
    </aside>
  );
}
