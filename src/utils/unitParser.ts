export function extractAndRemoveUnit(text: string): {
  text: string;
  unit: string;
} {
  const units: Record<string, string> = {
    "kilogram": "kg",
    "kilogramy": "kg",
    "kilogramów": "kg",
    "kilogramie": "kg",
    "kilogramom": "kg",
    "kilogramami": "kg",
    "kg": "kg",
    "kilo": "kg",
    "kilka kilo": "kg",
    "kilka kilogramów": "kg",
    "kilka kilogram": "kg",
    "pare kilo": "kg",
    "pare kilogramów": "kg",
    "pare kilogram": "kg",
    "litr": "l",
    "litry": "l",
    "litrów": "l",
    "litra": "l",
    "litrom": "l",
    "litrami": "l",
    "l": "l",
    "sztuka": "sztuk",
    "sztuki": "sztuk",
    "sztuk": "sztuk",
    "szt": "sztuk",
    "opakowanie": "sztuk",
    "opakowania": "sztuk",
    "opakowań": "sztuk",
    "puszka": "sztuk",
    "puszki": "sztuk",
    "puszek": "sztuk",
    "butelka": "sztuk",
    "butelki": "sztuk",
    "butelek": "sztuk",
    "karton": "sztuk",
    "kartony": "sztuk",
    "kartonów": "sztuk",
  };

  const sortedKeys = Object.keys(units).sort((a, b) => b.length - a.length);
  let foundUnit = "";
  let result = text;
  for (const key of sortedKeys) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    if (regex.test(result)) {
      foundUnit = units[key];
      result = result.replace(regex, "");
      break;
    }
  }
  result = result.replace(/[\s,]+/g, " ").trim();
  return { text: result, unit: foundUnit || "sztuk" };
}
