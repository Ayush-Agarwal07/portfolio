"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/portfolio";
import { CurrentYear, LocalTime } from "./LocalTime";

const sideNavItems = [{ href: "#top", label: "Intro" }, ...navItems];

export function SideNav() {
  const [activeHref, setActiveHref] = useState(sideNavItems[0].href);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      const viewportAnchor = window.innerHeight * 0.42;
      let nextHref = sideNavItems[0].href;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const item of sideNavItems) {
        const section = document.getElementById(item.href.slice(1));
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
          nextHref = item.href;
          break;
        }

        const distance = Math.abs(rect.top - viewportAnchor);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextHref = item.href;
        }
      }

      setProgress(pct);
      setActiveHref((current) => (current === nextHref ? current : nextHref));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="side-nav" aria-label="Site">
      <a href="#top" className="mark" onClick={() => setActiveHref("#top")}>
        <span className="mark-full">
          Ayush <span className="ampersand">·</span> Agarwal
        </span>
        <span className="mark-short">AA</span>
      </a>

      <div className="side-nav-progress" aria-hidden="true">
        <span style={{ height: `${progress}%` }} />
      </div>

      <nav className="side-nav-links" aria-label="Section navigation">
        {sideNavItems.map((item, index) => {
          const active = activeHref === item.href;

          return (
            <a
              aria-current={active ? "page" : undefined}
              className={`side-nav-link${active ? " is-active" : ""}`}
              href={item.href}
              key={item.href}
              onClick={() => setActiveHref(item.href)}
            >
              <span className="side-nav-tick" aria-hidden="true" />
              <span className="side-nav-copy">
                <span className="side-nav-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="side-nav-label">{item.label}</span>
              </span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <span>
          © <CurrentYear /> · Ayush Agarwal
        </span>
        <span className="right">
          <LocalTime />
          <span>v2026.05</span>
        </span>
      </div>
    </footer>
  );
}
