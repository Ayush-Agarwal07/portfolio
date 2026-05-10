import { navItems } from "@/data/portfolio";
import { CurrentYear, LocalTime } from "./LocalTime";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a href="#top" className="mark">
          Ayush <span className="ampersand">·</span> Agarwal
        </a>
        <nav className="nav">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
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
