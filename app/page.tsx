import { SectionHeader } from "@/components/SectionHeader";
import { Footer, Topbar } from "@/components/SiteChrome";
import { Stats } from "@/components/Stats";
import { TickerTape } from "@/components/TickerTape";
import { HeroCanvas } from "@/components/HeroCanvas";
import { AgentDiagram, DisadusBoard } from "@/components/ProjectVisuals";
import {
  agentQrStats,
  contacts,
  disadusStats,
  heroMeta,
  workItems,
} from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <TickerTape />
        <SelectedWork />
        <AgentQr />
        <Disadus />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <HeroCanvas />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="label">Available · Fall 2026</span>
            </div>
            <h1 className="display">Ayush Agarwal.</h1>
            <p className="lede">
              CS undergrad at Purdue. I work on LLM agents and low-latency systems — currently
              leading AgentQR at Boiler Quant and doing research with Prof. Tianyi Zhang.
            </p>
          </div>

          <aside className="hero-meta">
            {heroMeta.map((item) => (
              <div className="hero-meta-row" key={item.label}>
                <span className="label">{item.label}</span>
                <span className={`v${item.mono ? " mono" : ""}`}>{item.value}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function AgentQr() {
  return (
    <section className="featured" id="featured" data-screen-label="03 Featured · AgentQR">
      <div className="wrap">
        <SectionHeader label="§ 02 — Featured · 2026" compact>
          An automated research desk: four specialist agents, every claim <em>traceable</em> to a
          10-K.
        </SectionHeader>

        <div className="featured-grid">
          <div className="featured-text">
            <span className="label">Boiler Quant · AgentQR · Project Lead</span>
            <h3>Multi-agent RAG over SEC filings, deterministic indicators, and a synthesized Buy/Hold/Sell.</h3>
            <p>
              I lead a 5-engineer team building <strong>AgentQR</strong>, a quantitative research
              system that ingests 10-K/10-Q filings from <strong>SEC EDGAR</strong>, embeds them
              locally with <span className="mono">bge-small-en-v1.5</span> (384-dim,
              namespace-per-ticker in Pinecone), and runs four specialist agents on top —
              orchestrated through an async <strong>FastAPI</strong> backend streaming over SSE to a{" "}
              <strong>Next.js 14</strong> dashboard.
            </p>
            <p>
              The agents split <em>reasoning</em> from <em>math</em>: fundamentals (P/E, ROE, D/E,
              DCF), technicals (RSI, MACD, Bollinger, SMA crossover, ATR), and a 2-year backtest
              (Sharpe / MaxDD / Win Rate) are computed deterministically via the{" "}
              <span className="mono">ta</span> library — never inferred by the LLM. An{" "}
              <strong>Orchestrator</strong> synthesizes a Buy/Hold/Sell with a confidence score and
              price targets, every line grounded in a retrieved, timestamped chunk.
            </p>
            <Stats stats={agentQrStats} />
          </div>

          <AgentDiagram />
        </div>
      </div>
    </section>
  );
}

function Disadus() {
  return (
    <section className="featured disadus-feat" id="disadus" data-screen-label="04 Featured · Disadus">
      <div className="wrap">
        <SectionHeader label="§ 02b — Featured · 2022–25" compact>
          <em>“The helpful tool students deserve.”</em> A real, shipped LMS.
        </SectionHeader>

        <div className="featured-grid disadus-grid">
          <div className="featured-text">
            <span className="label">Disadus · Co-founder · disadus.app</span>
            <h3>Courses, communities, and a <em>tilde-prefixed</em> path search students actually use.</h3>
            <p>
              Disadus is a student-first learning platform we shipped to production at{" "}
              <strong>disadus.app</strong> — courses, modules, materials, announcements, grades, and
              per-class community spaces, all wrapped in a Next.js 13 PWA that works offline on a
              Chromebook. The signature interaction: type{" "}
              <span className="mono">~Lectures/Day&nbsp;23</span> in the search bar to jump straight
              to a file path across every course you&apos;re enrolled in.
            </p>
            <p>
              I co-founded the company and led the engineering — onboarding flows, the course
              dashboard, the realtime community layer (Socket.io), the in-browser PDF viewer
              (PDFTron WebViewer), and a markdown renderer with KaTeX + Twemoji for assignments. We
              grew it through direct relationships with administrators to{" "}
              <strong>500+ active students across 8 schools</strong>, driving roadmap with cohort
              analysis on 90-day post-launch windows.
            </p>
            <Stats stats={disadusStats} />
          </div>

          <DisadusBoard />
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="work" data-screen-label="02 Selected work">
      <div className="wrap">
        <SectionHeader label="§ 01 — Work Experience">
          Some of my <em>experiences</em>.
        </SectionHeader>

        <div className="work-list">
          {workItems.map((work) => (
            <article className="work-item" key={work.number}>
              <div className="work-num">{work.number}</div>
              <div className="work-meta">
                <div className="org">{work.org}</div>
                <div className="role">{work.role}</div>
              </div>
              <div className="work-body">
                <p>{work.body}</p>
                {work.stats ? <Stats stats={work.stats} /> : null}
                <div className="tag-row">
                  {work.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-when">{work.when}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" data-screen-label="06 Experience">
      <div className="wrap">
        <SectionHeader label="§ 04 — Career">
          A short <em>résumé</em>, in one column.
        </SectionHeader>

        <div className="timeline">
          {timelineItems.map(([when, what, role, where]) => (
            <div className="tl-row" key={`${when}-${what}`}>
              <div className="tl-when">{when}</div>
              <div className="tl-what">
                {what} <span className="role">— {role}</span>
              </div>
              <div className="tl-where">{where}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section id="toolkit" data-screen-label="07 Toolkit">
      <div className="wrap">
        <SectionHeader label="§ 05 — Toolkit">
          What I reach for, <em>and why</em>.
        </SectionHeader>

        <div className="toolkit">
          {toolkitGroups.map((group) => (
            <div className="tk-col" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => {
                  if (Array.isArray(item)) {
                    const [name, context] = item;
                    return (
                      <li key={name}>
                        {name} <span className="dim">— {context}</span>
                      </li>
                    );
                  }

                  return <li key={item}>{item}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Now() {
  return (
    <section id="now" data-screen-label="08 Now">
      <div className="wrap">
        <SectionHeader label="§ 06 — Currently">
          What&apos;s open on my <em>desk</em> right now.
        </SectionHeader>

        <div className="now-grid">
          {nowCards.map((card) => (
            <article className="now-card" key={card.label}>
              <span className="label">{card.label}</span>
              <div className="ttl">{card.title}</div>
              <div className="desc">{card.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" data-screen-label="09 Contact">
      <div className="wrap">
        <div className="contact-inner">
          <h2>
            If my work interests you, <a href="mailto:agarw534@purdue.edu">say hi&nbsp;↗</a>
          </h2>

          <div className="contact-list">
            {contacts.map((contact) => (
              <a
                className="contact-row"
                href={contact.href}
                key={contact.label}
                rel={contact.external ? "noopener" : undefined}
                target={contact.external ? "_blank" : undefined}
              >
                <span className="l">{contact.label}</span>
                <span className="r">{contact.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
