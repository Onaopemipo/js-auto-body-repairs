import { contactConfig, type BusinessHoursEntry } from "@/config/contact";

interface BrisbaneDateParts {
  weekday: BusinessHoursEntry["day"];
  hour: number;
  minute: number;
}

export interface BusinessOpenStatus {
  isOpen: boolean;
  label: "Open now" | "Closed";
  detail: string;
}

function getBrisbaneDateParts(date: Date): BrisbaneDateParts {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: contactConfig.timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value as
    BusinessHoursEntry["day"] | undefined;

  const hour = Number(parts.find((part) => part.type === "hour")?.value);

  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  return {
    weekday: weekday ?? "Monday",
    hour: Number.isFinite(hour) ? hour : 0,
    minute: Number.isFinite(minute) ? minute : 0,
  };
}

function timeToMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);

  return hour * 60 + minute;
}

function formatOpeningTime(value: string) {
  const [hourValue, minuteValue] = value.split(":").map(Number);

  const period = hourValue >= 12 ? "PM" : "AM";

  const hour = hourValue % 12 || 12;

  return `${hour}:${String(minuteValue).padStart(2, "0")} ${period}`;
}

function findNextOpenDay(currentIndex: number) {
  for (let offset = 1; offset <= contactConfig.hours.length; offset += 1) {
    const index = (currentIndex + offset) % contactConfig.hours.length;

    const entry = contactConfig.hours[index];

    if (entry.opens) {
      return {
        entry,
        offset,
      };
    }
  }

  return null;
}

export function getBusinessOpenStatus(date = new Date()): BusinessOpenStatus {
  const current = getBrisbaneDateParts(date);

  const currentIndex = contactConfig.hours.findIndex(
    (entry) => entry.day === current.weekday,
  );

  const today = contactConfig.hours[currentIndex >= 0 ? currentIndex : 0];

  const currentMinutes = current.hour * 60 + current.minute;

  if (today.opens && today.closes) {
    const openingMinutes = timeToMinutes(today.opens);

    const closingMinutes = timeToMinutes(today.closes);

    if (currentMinutes >= openingMinutes && currentMinutes < closingMinutes) {
      return {
        isOpen: true,
        label: "Open now",
        detail: `Closes at ${formatOpeningTime(today.closes)}`,
      };
    }

    if (currentMinutes < openingMinutes) {
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens today at ${formatOpeningTime(today.opens)}`,
      };
    }
  }

  const next = findNextOpenDay(currentIndex >= 0 ? currentIndex : 0);

  if (!next?.entry.opens) {
    return {
      isOpen: false,
      label: "Closed",
      detail: "Opening time unavailable",
    };
  }

  const dayLabel = next.offset === 1 ? "tomorrow" : next.entry.day;

  return {
    isOpen: false,
    label: "Closed",
    detail: `Opens ${dayLabel} at ${formatOpeningTime(next.entry.opens)}`,
  };
}
