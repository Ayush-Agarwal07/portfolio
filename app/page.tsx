import { AsciiArt } from "@/components/AsciiArt";
import { BlackHoleHero } from "@/components/BlackHoleHero";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  contact,
  email,
  experienceTitle,
  hero,
  horizon,
  jobs,
  navLinks,
  projectMoreLabel,
  projects,
  projectsTitle,
  research,
  researchTitle,
  resumeHref,
  site,
} from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="nav wrap">
          <a href="#top" className="nav-name">
            {site.name}
          </a>
          <div className="nav-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <ThemeToggle />
            <a href={resumeHref} className="pill pill-solid pill-sm">
              {site.resumeLabel}
            </a>
          </div>
        </nav>
      </header>

      <main>
        <BlackHoleHero figLabel={hero.figLabel} feedLabel={hero.feedLabel}>
          <h1 className="hero-title">{hero.title}</h1>
          <p className="hero-intro">{hero.intro}</p>
          <div className="hero-actions">
            <a href={`mailto:${email}`} className="pill pill-solid">
              {hero.primary}
            </a>
            <a href={hero.secondary.href} className="pill pill-outline">
              {hero.secondary.label}
            </a>
          </div>
        </BlackHoleHero>

        <div className="horizon">
          <h2>{horizon.title}</h2>
        </div>

        <section id="experience" className="section">
          <div className="wrap split">
            <h2 className="section-title">{experienceTitle}</h2>
            <ol className="jobs">
              {jobs.map((job) => (
                <li key={job.org} className="job">
                  <span className="job-dates">{job.dates}</span>
                  <div className="job-body">
                    <div className="job-head">
                      <span className="job-org">{job.org}</span>
                      <span className="job-role">{job.role}</span>
                    </div>
                    <p>{job.desc}</p>
                    <div className="tags">
                      {job.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="wrap stack">
            <h2 className="section-title">{projectsTitle}</h2>
            <div className="project-grid">
              {projects.map((p) => (
                <article key={p.title} className="project">
                  <div className="project-art">
                    <AsciiArt name={p.art} className={`art-${p.art}`} />
                  </div>
                  <div className="project-body">
                    <div className="project-meta">{p.meta}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="project-stack">{p.stack}</div>
                    <details className="project-more">
                      <summary>
                        {projectMoreLabel} <span aria-hidden="true">↓</span>
                      </summary>
                      {p.more.body.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                      <dl className="project-stats">
                        {p.more.stats.map((st) => (
                          <div key={st.label}>
                            <dt>{st.label}</dt>
                            <dd>{st.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="section">
          <div className="wrap split">
            <h2 className="section-title">{researchTitle}</h2>
            <div className="research">
              {research.map((r) => (
                <div key={r.title} className="research-item">
                  <span className="research-title">{r.title}</span>
                  <span className="research-detail">{r.detail}</span>
                  {r.link ? (
                    <a href={r.link.href} className="research-link">
                      {r.link.label}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="wrap contact-inner">
          <AsciiArt name="orbit" className="art-orbit" />
          <h2>{contact.title}</h2>
          <a href={`mailto:${email}`} className="pill pill-solid pill-lg">
            {email}
          </a>
          <div className="contact-links">
            {contact.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="contact-base">
            <span>{contact.copyright}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
