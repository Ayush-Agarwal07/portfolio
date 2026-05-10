"use client";

import { useEffect, useState } from "react";

function indianapolisTime() {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Indiana/Indianapolis",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "—";
  }
}

export function CurrentYear() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}

export function LocalTime() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    const update = () => setTime(`IND ${indianapolisTime()}`);
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
