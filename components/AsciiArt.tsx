"use client";

import { useRef } from "react";
import { chartFrame, orbitFrame, searchFrame, treeFrame } from "./asciiFrames";
import { useAsciiLoop } from "./useAsciiLoop";

const frames = { chart: chartFrame, search: searchFrame, tree: treeFrame, orbit: orbitFrame };
export type AsciiName = keyof typeof frames;

export function AsciiArt({ name, className }: { name: AsciiName; className?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  useAsciiLoop(ref, frames[name]);
  return (
    <pre ref={ref} aria-hidden="true" className={className}>
      {frames[name](0)}
    </pre>
  );
}
