export function extractAndReoveNumber(text: string): {
  number: number;
  text: string;
} {
  const liczebniki: Record<string, number> = {
    "zero": 0,
    "jeden": 1,
    "jedna": 1,
    "jedno": 1,
    "pierwszy": 1,
    "pierwsza": 1,
    "pierwsze": 1,
    "dwa": 2,
    "dwie": 2,
    "drugi": 2,
    "druga": 2,
    "drugie": 2,
    "trzy": 3,
    "trzeci": 3,
    "trzecia": 3,
    "trzecie": 3,
    "cztery": 4,
    "czwarty": 4,
    "czwarta": 4,
    "czwarte": 4,
    "pięć": 5,
    "piąty": 5,
    "piąta": 5,
    "piąte": 5,
    "sześć": 6,
    "szósty": 6,
    "szósta": 6,
    "szóste": 6,
    "siedem": 7,
    "siódmy": 7,
    "siódma": 7,
    "siódme": 7,
    "osiem": 8,
    "ósmy": 8,
    "ósma": 8,
    "ósme": 8,
    "dziewięć": 9,
    "dziewiąty": 9,
    "dziewiąta": 9,
    "dziewiąte": 9,
    "dziesięć": 10,
    "dziesiąty": 10,
    "dziesiąta": 10,
    "dziesiąte": 10,
    "jedenaście": 11,
    "jedenasty": 11,
    "jedenasta": 11,
    "jedenaste": 11,
    "dwanaście": 12,
    "dwunasty": 12,
    "dwunasta": 12,
    "dwunaste": 12,
    "trzynaście": 13,
    "trzynasty": 13,
    "trzynasta": 13,
    "trzynaste": 13,
    "czternaście": 14,
    "czternasty": 14,
    "czternasta": 14,
    "czternaste": 14,
    "piętnaście": 15,
    "piętnasty": 15,
    "piętnasta": 15,
    "piętnaste": 15,
    "szesnaście": 16,
    "szesnasty": 16,
    "szesnasta": 16,
    "szesnaste": 16,
    "siedemnaście": 17,
    "siedemnasty": 17,
    "siedemnasta": 17,
    "siedemnaste": 17,
    "osiemnaście": 18,
    "osiemnasty": 18,
    "osiemnasta": 18,
    "osiemnaste": 18,
    "dziewiętnaście": 19,
    "dziewiętnasty": 19,
    "dziewiętnasta": 19,
    "dziewiętnaste": 19,
    "dwadzieścia": 20,
    "dwudziesty": 20,
    "dwudziesta": 20,
    "dwudzieste": 20,
    "trzydzieści": 30,
    "czterdzieści": 40,
    "pięćdziesiąt": 50,
    "sześćdziesiąt": 60,
    "siedemdziesiąt": 70,
    "osiemdziesiąt": 80,
    "dziewięćdziesiąt": 90,
    "sto": 100,
    "setny": 100,
    "setna": 100,
    "setne": 100,
    "dwieście": 200,
    "trzysta": 300,
    "czterysta": 400,
    "pięćset": 500,
    "sześćset": 600,
    "siedemset": 700,
    "osiemset": 800,
    "dziewięćset": 900,
    "tysiąc": 1000,
    "tysiączny": 1000,
    "tysięczna": 1000,
    "tysięczne": 1000,
  };

  const numberByDigit = text.match(/\d+/);
  if (numberByDigit) {
    const number = parseFloat(numberByDigit[0]);
    let noNumberText = text.replace(/\d+/g, "");
    const liczebnikiRegex = new RegExp(
      `\\b(${Object.keys(liczebniki).join("|")})\\b`,
      "gi"
    );
    noNumberText = noNumberText.replace(liczebnikiRegex, "");
    noNumberText = noNumberText.replace(/[\s,]+/g, " ").trim();

    return { number, text: noNumberText };
  }

  const slowa = text.split(/[\s,.-]+/);
  let suma = 0;
  let ostatnia = 0;
  let znaleziono = false;

  for (let slowo of slowa) {
    slowo = slowo.toLowerCase();
    if (liczebniki[slowo] !== undefined) {
      znaleziono = true;
      const wartosc = liczebniki[slowo];
      if (wartosc === 1000) {
        suma = (suma + (ostatnia || 1)) * 1000;
        ostatnia = 0;
      } else if (wartosc >= 100) {
        ostatnia += wartosc;
      } else {
        ostatnia += wartosc;
      }
    }
  }
  const number = (znaleziono && suma + ostatnia) || 1;

  const liczebnikiRegex = new RegExp(
    `\\b(${Object.keys(liczebniki).join("|")})\\b`,
    "gi"
  );
  let noNumberText = text.replace(liczebnikiRegex, "");
  noNumberText = noNumberText.replace(/[\s,]+/g, " ").trim();

  return { number, text: noNumberText };
}
