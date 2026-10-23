const HEBREW_REGEX = /[֐-׿]/;

// Speech synthesis language for each course, keyed by the course flag.
const COURSE_SPEECH_LANGS: Record<string, string> = {
  "/es.svg": "es-ES",
  "/fr.svg": "fr-FR",
  "/hr.svg": "hr-HR",
  "/il.svg": "he-IL",
  "/it.svg": "it-IT",
  "/jp.svg": "ja-JP",
  "/us.svg": "en-US",
};

export const isHebrew = (text: string) => HEBREW_REGEX.test(text);

export const getCourseSpeechLang = (courseImageSrc: string) =>
  COURSE_SPEECH_LANGS[courseImageSrc];

// Reads text aloud with the browser's speech synthesis, used when an
// option has no recorded audio.
export const speak = (text: string, lang?: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  // Drop transliterations such as "שלום (shalom)".
  const utterance = new SpeechSynthesisUtterance(
    text.replace(/\s*\(.*?\)/g, "")
  );
  utterance.lang = isHebrew(text) ? "he-IL" : (lang ?? "en-US");

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
