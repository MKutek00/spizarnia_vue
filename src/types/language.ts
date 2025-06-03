export interface TranslatePronunciation {
  "source-text-phonetic": string | null;
  "source-text-audio": string | null;
  "destination-text-audio": string | null;
}

export interface TranslateTranslations {
  "all-translations": string[] | null;
  "possible-translations": string[] | null;
  "possible-mistakes": string[] | null;
}

export interface TranslateResponse {
  "source-language": string;
  "source-text": string;
  "destination-language": string;
  "destination-text": string;
  pronunciation: TranslatePronunciation;
  translations: TranslateTranslations;
  "definitions": string[] | null;
  "see-also": string[] | null;
}
