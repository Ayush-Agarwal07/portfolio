import type { Stat } from "@/data/portfolio";

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats">
      {stats.map((stat) => (
        <div className="stat" key={`${stat.value}-${stat.label}`}>
          <span className={`n${stat.tone ? ` ${stat.tone}` : ""}`}>{stat.value}</span>
          <span className="l">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
