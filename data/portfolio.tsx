import type { ReactNode } from "react";

export type Tone = "terra" | "blue";

export type Stat = {
  value: string;
  label: string;
  tone?: Tone;
};

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#featured", label: "AgentQR" },
  { href: "#disadus", label: "Disadus" },
  { href: "#contact", label: "Contact" },
];

export const heroMeta = [
  {
    label: "Currently",
    value: (
      <>
        Research with <a href="#">Prof. Tianyi Zhang</a> · Project Lead at Boiler Quant
      </>
    ),
  },
  { label: "Studying", value: "B.S. Computer Science · Purdue · '29" },
  { label: "Located", value: "Palo Alto, CA" },
  { label: "Index", value: "001 — Portfolio · v2026.05", mono: true },
];

export const tapeItems = [
  { key: "paper", value: "arXiv:2312.15157", tone: "glyph" },
  { key: "project", value: "AgentQR · run #4127" },
  { key: "sharpe", value: "0.74 ▲", tone: "up" },
  { key: "latency", value: "p50 312ms · p99 941ms" },
  { key: "eval", value: "relevance +30%", tone: "up" },
  { key: "agents", value: "5 in debate" },
  { key: "corpus", value: "SEC + transcripts" },
  { key: "hyperscaler", value: "capex YoY +41%", tone: "up" },
  { key: "hbm3e", value: "lead time 22w", tone: "down" },
  { key: "mode", value: "research" },
  { key: "student", value: "500+ on Disadus" },
  { key: "cv-precision", value: "+5%", tone: "up" },
  { key: "gpa", value: "3.8 / 4.0" },
  { key: "now reading", value: '"Cognitive architectures for LMs"', tone: "glyph" },
];

export const agentQrStats: Stat[] = [
  { value: "~45–90s", label: "End-to-end research run", tone: "terra" },
  { value: "5", label: "Engineers led" },
  { value: "384-d", label: "Local embeddings · zero LLM bill", tone: "blue" },
];

export const disadusStats: Stat[] = [
  { value: "500+", label: "Active students" },
  { value: "8", label: "School deployments", tone: "terra" },
  { value: "3y", label: "Operated · 2022 → 2025", tone: "blue" },
];

export const workItems: Array<{
  number: string;
  org: string;
  role: string;
  body: ReactNode;
  stats?: Stat[];
  tags: string[];
  when: ReactNode;
}> = [
    {
      number: "01",
      org: "Agent memory research",
      role: "Research · Purdue · Prof. Tianyi Zhang",
      body: (
        <>
          Conducting end-to-end benchmarking of LLM-based systems — cataloging failure
          modes across taxonomies and synthesizing findings into{" "}
          <strong>weekly research presentations</strong> for a team of 3 PhDs.
          Currently testing hypotheses about agent memory architecture through{" "}
          <strong>controlled perturbation experiments</strong>, isolating which
          signals are most predictive of performance gains.
        </>
      ),
      stats: [
        { value: "30+", label: "Papers synthesized", tone: "terra" },
        { value: "50+", label: "Experiments run", tone: "blue" },
      ],
      tags: [
        "Benchmarking",
        "Perturbation studies",
        "Architecture decisions",
      ],
      when: (
        <>
          Jan&nbsp;2026
          <br />— Present
        </>
      ),
    },
    {
      number: "02",
      org: "RepoChat at MightyBot",
      role: "SWE Intern · Palo Alto",
      body: (
        <>
          Shipped an AI-powered analysis platform serving{" "}
          <strong>GPT-4o queries over GitHub repositories</strong> end-to-end — from
          architecture to deployment to iterative improvement. I built the query
          decomposition layer (LangChain agents + Pydantic schemas) that routes
          complex multi-file questions into file-scoped subtasks.
        </>
      ),
      stats: [
        { value: "+30%", label: "Answer relevance · LLM-as-judge", tone: "terra" },
        { value: "−60%", label: "End-to-end latency", tone: "blue" },
        { value: "+25%", label: "Comprehensiveness" },
      ],
      tags: ["LangChain", "Pydantic", "GPT-4o", "Eval suite"],
      when: (
        <>
          Jan&nbsp;2025
          <br />
          —&nbsp;Jun&nbsp;2025
        </>
      ),
    },
    {
      number: "03",
      org: "Awareye",
      role: "SWE Intern · Edge CV",
      body: (
        <>
          Raised production CV model precision <strong>+5%</strong> through targeted
          data augmentation and systematic hyperparameter search on an edge-deployed
          real-time object-detection pipeline. Shipped cross-platform mobile apps in{" "}
          <strong>React Native and Swift</strong> across multiple enterprise client
          deployment cycles.
        </>
      ),
      stats: [
        { value: "+5%", label: "Production CV precision", tone: "terra" },
      ],
      tags: ["Real-time CV", "Edge inference", "React Native", "Swift"],
      when: (
        <>
          Dec&nbsp;2023
          <br />— Feb&nbsp;2024
        </>
      ),
    },
    {
      number: "04",
      org: "Code-idiom mining",
      role: "Research · UC Berkeley · Prof. Koushik Sen",
      body: (
        <>
          Designed and maintained a Python data-mining pipeline over{" "}
          <strong>100+ GitHub repositories</strong> to extract, deduplicate, and
          cluster code snippets for a code-idiom similarity model. Research
          contributed to{" "}
          <a className="inline-link" href="https://arxiv.org/abs/2312.15157">
            arXiv:2312.15157
          </a>
          .
        </>
      ),
      stats: [
        { value: "100+", label: "GitHub repos mined", tone: "terra" },
      ],
      tags: ["Python", "Static analysis", "Clustering", "arXiv 2023"],
      when: (
        <>
          Oct&nbsp;2022
          <br />— Jul&nbsp;2023
        </>
      ),
    },
  ];

export const contacts = [
  { label: "Email", value: "agarw534@purdue.edu", href: "mailto:agarw534@purdue.edu" },
  {
    label: "GitHub",
    value: "@Ayush-Agarwal07",
    href: "https://github.com/Ayush-Agarwal07",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "/in/ayush-agarwal07",
    href: "https://linkedin.com/in/ayush-agarwal07",
    external: true,
  },
  { label: "Phone", value: "+1 (408) 375-8756", href: "tel:+14083758756" },
];
