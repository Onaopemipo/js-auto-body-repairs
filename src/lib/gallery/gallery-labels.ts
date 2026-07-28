const categoryLabels: Record<string, string> = {
  "collision-repairs": "Collision repairs",
  "paint-refinishing": "Paint refinishing",
  "dent-removal": "Dent removal",
  "panel-restoration": "Panel restoration",
  other: "Other repair",
};

export function getGalleryCategoryLabel(
  category: string,
) {
  return (
    categoryLabels[category] ??
    category
      .split("-")
      .filter(Boolean)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(" ")
  );
}

export function getVehicleLabel(vehicle?: {
  year?: number;
  make?: string;
  model?: string;
}) {
  if (!vehicle) {
    return "";
  }

  return [
    vehicle.year,
    vehicle.make,
    vehicle.model,
  ]
    .filter(Boolean)
    .join(" ");
}
