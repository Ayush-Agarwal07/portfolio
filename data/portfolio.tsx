import type { ReactNode } from "react";
import type { AsciiName } from "@/components/AsciiArt";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const email = "agarw534@purdue.edu";
export const resumeHref = `${basePath}/resume.pdf`;

export const site = {
  name: "Ayush Agarwal",
  resumeLabel: "Résumé ↓",
};

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  title: "Hi, I'm Ayush.",
  intro:
    "I lead the AgentQR team at Boiler Quant and research coding agents with Prof. Tianyi Zhang. Most recently, at Skan AI, I built a system that converts step-level process logs into agentic workflows and a synthetic data pipeline to model human operators.",
  primary: "Get in touch",
  secondary: { label: "See my work", href: "#projects" },
  figLabel: "Animated ASCII art of a black hole whose accretion disk is written in swirling text",
  feedLabel: "Feed the black hole",
};

export const horizon = {
  title: "Here's what I've built.",
};

export const experienceTitle = "Experience";

export const jobs = [
  {
    org: "Skan AI",
    role: "AI Engineering Intern",
    dates: "May – Aug 2026",
    desc: "Built an agentic pipeline that turns raw step-level process logs into executable workflows by grouping events and picking tools as it goes. It was validated on 6+ enterprise processes for customers like Fineos. For browser automation I wrote a generate-validate-repair loop (static checks, headless runs on live pages, and an LLM judge over screenshots) that passed 95% of runs on a 6-scenario benchmark I built. I also built a synthetic data pipeline that produced 8,000 labeled task recordings across 210 process variants, with per-persona typing, mouse and reading models and 17 kinds of injected noise so the runs behave like real operators.",
    tags: ["Agents", "Browser automation", "LLM-as-judge", "Synthetic data"],
  },
  {
    org: "Purdue University",
    role: "Research Assistant",
    dates: "Jan 2026 – Now",
    desc: "Studying why LLM program-repair agents fail on SWE-bench Verified, Lite and Pro with Prof. Tianyi Zhang. I sort agent trajectories by bug type, localization behavior, iteration count, cost and token usage, and present findings weekly to 3 PhD researchers. From a survey of 30+ papers on program repair, memory and fault localization, I'm co-designing a repair agent that remembers a repo's past bug patterns and patch outcomes to localize later bugs faster.",
    tags: ["SWE-bench", "Program repair", "Agent memory"],
  },
  {
    org: "MightyBot",
    role: "Software Engineering Intern",
    dates: "Jan – Jun 2025",
    desc: "Shipped RepoChat, a GPT-4o tool that answers multi-file questions about any cloned GitHub repo using async retrieval over a source-file map. I cut end-to-end latency by over 60% by profiling the request pipeline and replacing sequential steps with batched async I/O and semaphore-bounded concurrency. Splitting repo-level questions into file-scoped subtasks with LangChain and Pydantic raised answer relevance by over 30% in LLM-as-judge evals.",
    tags: ["GPT-4o", "LangChain", "Async Python", "Evals"],
  },
  {
    org: "Awareye",
    role: "Software Engineering Intern",
    dates: "Dec 2023 – Feb 2024",
    desc: "Raised computer-vision precision 5% on a client-image test set through hyperparameter tuning, relabeling and annotation fixes. Shipped client-facing iOS apps by building responsive views in Next.js and React, packaging them with Capacitor, and writing native behavior in Swift.",
    tags: ["Computer vision", "Next.js", "Capacitor", "Swift"],
  },
  {
    org: "UC Berkeley",
    role: "Research Assistant",
    dates: "Oct 2022 – Jul 2023",
    desc: "Built a Python pipeline that extracted, deduplicated and clustered code snippets from 100+ GitHub repositories. The corpus became training data for a code-idiom similarity model in Prof. Koushik Sen's group, published as arXiv:2312.15157.",
    tags: ["Python", "Clustering", "arXiv 2023"],
  },
];

export const projectsTitle = "Selected projects";

export type Project = {
  art: AsciiName;
  meta: string;
  title: string;
  desc: string;
  stack: string;
  /** Long-form write-up shown when the card is expanded. */
  more: { body: ReactNode[]; stats: { value: string; label: string }[] };
};

export const projectMoreLabel = "Details";

export const projects: Project[] = [
  {
    art: "chart",
    meta: "Boiler Quant · 2026",
    title: "AgentQR",
    desc: "Multi-agent equity research over SEC filings. Four agents, deterministic math, every claim cited to a 10-K. Leading a team of 5.",
    stack: "FastAPI · Pinecone · Next.js",
    more: {
      body: [
        <>
          I lead a 5-engineer team building <strong>AgentQR</strong>, a quantitative research
          system that ingests 10-K/10-Q filings from <strong>SEC EDGAR</strong>, embeds them
          locally with <code>bge-small-en-v1.5</code> (384-dim, namespace-per-ticker in Pinecone),
          and runs four specialist agents on top, orchestrated through an async{" "}
          <strong>FastAPI</strong> backend streaming over SSE to a <strong>Next.js 14</strong>{" "}
          dashboard.
        </>,
        <>
          The agents split <em>reasoning</em> from <em>math</em>: fundamentals (P/E, ROE, D/E,
          DCF), technicals (RSI, MACD, Bollinger, SMA crossover, ATR), and a 2-year backtest
          (Sharpe / MaxDD / Win Rate) are computed deterministically via the <code>ta</code>{" "}
          library, never inferred by the LLM. An <strong>Orchestrator</strong> synthesizes a
          Buy/Hold/Sell with a confidence score and price targets, every line grounded in a
          retrieved, timestamped chunk.
        </>,
      ],
      stats: [
        { value: "~45–90s", label: "End-to-end research run" },
        { value: "5", label: "Engineers led" },
        { value: "384-d", label: "Local embeddings · zero LLM bill" },
      ],
    },
  },
  {
    art: "search",
    meta: "Co-founder · 2022–2025",
    title: "Disadus",
    desc: "A student-first LMS used by 500+ students across 8 schools, with offline support and path search across every course.",
    stack: "Next.js · Socket.io · PWA",
    more: {
      body: [
        <>
          Disadus is a student-first learning platform we shipped to production at{" "}
          <strong>disadus.app</strong>: courses, modules, materials, announcements, grades, and
          per-class community spaces, all wrapped in a Next.js 13 PWA that works offline on a
          Chromebook. The signature interaction: type <code>~Lectures/Day&nbsp;23</code> in the
          search bar to jump straight to a file path across every course you&apos;re enrolled in.
        </>,
        <>
          I co-founded the company and led the engineering: onboarding flows, the course
          dashboard, the realtime community layer (Socket.io), the in-browser PDF viewer (PDFTron
          WebViewer), and a markdown renderer with KaTeX + Twemoji for assignments. We grew it
          through direct relationships with administrators to{" "}
          <strong>500+ active students across 8 schools</strong>, driving the roadmap with cohort
          analysis on 90-day post-launch windows.
        </>,
      ],
      stats: [
        { value: "500+", label: "Active students" },
        { value: "8", label: "School deployments" },
        { value: "3y", label: "Operated · 2022 → 2025" },
      ],
    },
  },
  {
    art: "tree",
    meta: "MightyBot · 2025",
    title: "RepoChat",
    desc: "Ask questions about any GitHub repo. Query decomposition into file-scoped subtasks cut latency 60% and raised answer relevance 30%.",
    stack: "LangChain · Pydantic · GPT-4o",
    more: {
      body: [
        <>
          Shipped an AI-powered analysis platform serving{" "}
          <strong>GPT-4o queries over GitHub repositories</strong> end to end, from architecture
          to deployment to iterative improvement. I built the query decomposition layer
          (LangChain agents + Pydantic schemas) that routes complex multi-file questions into
          file-scoped subtasks, with async retrieval over a source-file map.
        </>,
        <>
          Latency came from profiling the request pipeline for sequential bottlenecks and
          replacing them with <strong>batched async I/O</strong> and{" "}
          <strong>semaphore-bounded concurrency</strong> across parallel inference calls.
          Relevance was measured with an LLM-as-judge eval suite.
        </>,
      ],
      stats: [
        { value: "+30%", label: "Answer relevance · LLM-as-judge" },
        { value: "−60%", label: "End-to-end latency" },
        { value: "+25%", label: "Comprehensiveness" },
      ],
    },
  },
];

export const researchTitle = "Research";

export const research: { title: string; detail: string; link?: { label: string; href: string } }[] = [
  {
    title: "Failure modes and memory in LLM coding agents",
    detail:
      "Purdue · with Prof. Tianyi Zhang · 2026–present. Benchmarking agents and running controlled perturbation experiments.",
  },
  {
    title: "Code-idiom mining for similarity models",
    detail: "UC Berkeley · with Prof. Koushik Sen · 2022–2023.",
    link: { label: "arXiv:2312.15157 ↗", href: "https://arxiv.org/abs/2312.15157" },
  },
];

export const contact = {
  title: "Let's build something.",
  links: [
    { label: "GitHub", href: "https://github.com/Ayush-Agarwal07" },
    { label: "LinkedIn", href: "https://linkedin.com/in/ayush-agarwal07" },
    { label: "Résumé", href: resumeHref },
  ],
  copyright: "© 2026 Ayush Agarwal",
};
