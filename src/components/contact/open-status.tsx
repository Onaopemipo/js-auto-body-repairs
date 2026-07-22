"use client";

import { useSyncExternalStore } from "react";

import { getBusinessOpenStatus } from "@/lib/business-open-status";

let snapshot = Date.now();

function subscribe(callback: () => void) {
  const timer = window.setInterval(() => {
    snapshot = Date.now();
    callback();
  }, 60_000);

  return () => {
    window.clearInterval(timer);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return 0;
}

export function OpenStatus() {
  const currentTimestamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const status = getBusinessOpenStatus(
    currentTimestamp === 0 ? new Date() : new Date(currentTimestamp),
  );

  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className={[
          "mt-1.5 size-2.5",
          "shrink-0 rounded-full",
          status.isOpen
            ? ["bg-emerald-400", "shadow-[0_0_14px_rgba(52,211,153,0.7)]"].join(
                " ",
              )
            : "bg-white/35",
        ].join(" ")}
      />

      <div>
        <p
          className={[
            "font-semibold",
            status.isOpen ? "text-emerald-300" : "text-white",
          ].join(" ")}
        >
          {status.label}
        </p>

        <p className="mt-1 text-sm text-white/50">{status.detail}</p>

        <p className="mt-1 text-xs text-white/35">Australia/Brisbane time</p>
      </div>
    </div>
  );
}
