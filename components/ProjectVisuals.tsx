export function AgentDiagram() {
  return (
    <div className="diagram" aria-hidden="true">
      <div className="diagram-head">
        <span>research pipeline · 4 agents per ticker</span>
        <span className="live">
          <span className="dot" /> SSE stream
        </span>
      </div>

      <div className="agents">
        <div className="agent">
          <div className="who bull">Sector Researcher · RAG</div>
          <div className="msg">
            Pulls grounded passages from <span className="h">10-K / 10-Q filings</span> in Pinecone
            (namespace-per-ticker). Embeds with <span className="h">bge-small-en-v1.5</span>{" "}
            (384-dim) and returns top-k chunks with timestamps for downstream citation.
          </div>
        </div>
        <div className="agent">
          <div className="who analyst">Fundamental Analyst</div>
          <div className="msg">
            Computes <span className="h">P/E, ROE, D/E, and a DCF fair-value band</span>{" "}
            deterministically from filings via the <span className="h">ta</span> library — never
            inferred by the LLM. Emits a health score the orchestrator can weight.
          </div>
        </div>
      </div>

      <div className="agent">
        <div className="who bear">Technical Analyst</div>
        <div className="msg">
          Runs <span className="h">RSI, MACD, Bollinger, SMA-crossover, ATR</span> on 2 years of
          price history and reports a backtest:{" "}
          <span className="h">Sharpe, MaxDD, Win Rate</span>. Pure math — same input always gives
          the same output.
        </div>
      </div>

      <div className="arrow">↓</div>

      <div className="synthesis">
        <div className="who">Orchestrator · synthesizes the call</div>
        <div className="msg">
          Combines the three agents into a <span className="h">Buy / Hold / Sell</span> with a
          confidence score and 12-month price targets. Every claim links back to a retrieved
          chunk — the LLM can&apos;t fabricate a number that didn&apos;t come from a filing or an
          indicator. Streams tokens to the UI over SSE as each agent finishes.
        </div>
        <div className="signal-line">
          <span>stack · FastAPI · AsyncAnthropic · Pinecone · fastembed · ta</span>
          <span>grounded · every claim → chunk</span>
        </div>
      </div>
    </div>
  );
}

export function DisadusBoard() {
  return (
    <div className="diagram" aria-hidden="true">
      <div className="diagram-head">
        <span>disadus.app · student client → LMS</span>
        <span className="live">
          <span className="dot" /> live · Socket.io
        </span>
      </div>

      <div className="agents">
        <div className="agent">
          <div className="who bull">Next.js 13 PWA · offline-first</div>
          <div className="msg">
            Course dashboard, modules, grades, and per-class community spaces. A service worker
            caches the last <span className="h">7 days of materials</span> so students on
            school-issued Chromebooks keep working when the wifi drops mid-class.
          </div>
        </div>
        <div className="agent">
          <div className="who analyst">Quick Search · ⌘K</div>
          <div className="msg">
            <span className="h">FuzzyMatchAsync</span> runs sublime-style scoring over course
            names and full material paths in parallel, then merges by score.{" "}
            <span className="h">Tab</span> scopes to the current course;{" "}
            <span className="h">↵</span> opens the file. Same keystrokes a developer already
            knows.
          </div>
        </div>
      </div>

      <div className="agent">
        <div className="who bear">Realtime layer · Socket.io</div>
        <div className="msg">
          One socket per session multiplexes{" "}
          <span className="h">upcoming, overdue, announcements, materials, structure</span>{" "}
          per course. A new assignment from a teacher lands in &quot;Today&quot; the moment it&apos;s
          posted — no polling, no refresh.
        </div>
      </div>

      <div className="arrow">↓</div>

      <div className="synthesis">
        <div className="who">Schoology bridge · OAuth 1.0a</div>
        <div className="msg">
          The backend signs every request as the student and proxies their real LMS data —{" "}
          <span className="h">courses, rosters, assignments, grades, submissions</span> — into
          our schema. No scraping, no shadow accounts. PDFs open in{" "}
          <span className="h">PDFTron WebViewer</span> so a student can annotate a worksheet and
          submit it back without leaving the tab.
        </div>
        <div className="signal-line">
          <span>stack · Next.js 13 · TS · Socket.io · Schoology OAuth · PDFTron · KaTeX</span>
          <span>shipped · 500+ students · 8 schools</span>
        </div>
      </div>
    </div>
  );
}
