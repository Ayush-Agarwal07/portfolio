import { tapeItems } from "@/data/portfolio";

const repeatedTapeItems = [...tapeItems, ...tapeItems];

export function TickerTape() {
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape-track">
        {repeatedTapeItems.map((item, index) => (
          <span className="tape-item" key={`${item.key}-${item.value}-${index}`}>
            <span className="k">{item.key}</span>
            <span className={`v${item.tone ? ` ${item.tone}` : ""}`}>{item.value}</span>
            <span className="glyph">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
