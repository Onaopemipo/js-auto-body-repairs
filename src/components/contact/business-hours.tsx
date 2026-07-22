import { Clock3 } from "lucide-react";

import { OpenStatus } from "@/components/contact/open-status";
import { contactConfig } from "@/config/contact";

export function BusinessHours() {
  return (
    <section className="border border-white/10 bg-[var(--page-background-elevated)] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Clock3
          aria-hidden="true"
          className="size-5 text-[var(--brand-primary-hover)]"
        />

        <h2 className="text-xl font-semibold">Workshop hours</h2>
      </div>

      <div className="mt-6 border-b border-white/10 pb-6">
        <OpenStatus />
      </div>

      <dl className="mt-6 space-y-3">
        {contactConfig.hours.map((entry) => (
          <div
            key={entry.day}
            className="flex items-center justify-between gap-6 text-sm"
          >
            <dt className="text-white/60">{entry.day}</dt>

            <dd
              className={
                entry.opens ? "font-medium text-white" : "text-white/35"
              }
            >
              {entry.display}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
