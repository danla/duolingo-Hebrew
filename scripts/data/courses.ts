// Shared curriculum used to seed every course.
// Each concept is translated into every supported language, so the same
// lessons can be taught in any direction (e.g. English -> Hebrew,
// Hebrew -> English, Hebrew -> Spanish).

export type Language = "en" | "he" | "es";

type Concept = {
  en: string;
  he: string;
  // Latin transliteration shown next to Hebrew for non-Hebrew speakers.
  heTranslit: string;
  es: string;
  imageSrc?: string;
  // Recorded audio per language (falls back to speech synthesis if missing).
  audio?: Partial<Record<Language, string>>;
};

type Lesson = {
  title: Record<"en" | "he", string>;
  concepts: Concept[];
};

type Unit = {
  lessons: Lesson[];
};

export const CURRICULUM: Unit[] = [
  {
    lessons: [
      {
        title: { en: "People", he: "אנשים" },
        concepts: [
          {
            en: "the man",
            he: "האיש",
            heTranslit: "ha'ish",
            es: "el hombre",
            imageSrc: "/man.svg",
            audio: { es: "/es_man.mp3" },
          },
          {
            en: "the woman",
            he: "האישה",
            heTranslit: "ha'isha",
            es: "la mujer",
            imageSrc: "/woman.svg",
            audio: { es: "/es_woman.mp3" },
          },
          {
            en: "the boy",
            he: "הילד",
            heTranslit: "hayeled",
            es: "el chico",
            imageSrc: "/boy.svg",
            audio: { es: "/es_boy.mp3" },
          },
          {
            en: "the girl",
            he: "הילדה",
            heTranslit: "hayalda",
            es: "la niña",
            imageSrc: "/girl.svg",
            audio: { es: "/es_girl.mp3" },
          },
          {
            en: "the zombie",
            he: "הזומבי",
            heTranslit: "hazombi",
            es: "el zombie",
            imageSrc: "/zombie.svg",
            audio: { es: "/es_zombie.mp3" },
          },
          {
            en: "the robot",
            he: "הרובוט",
            heTranslit: "harobot",
            es: "el robot",
            imageSrc: "/robot.svg",
            audio: { es: "/es_robot.mp3" },
          },
        ],
      },
      {
        title: { en: "Greetings", he: "ברכות" },
        concepts: [
          { en: "hello", he: "שלום", heTranslit: "shalom", es: "hola" },
          { en: "thank you", he: "תודה", heTranslit: "toda", es: "gracias" },
          {
            en: "please",
            he: "בבקשה",
            heTranslit: "bevakasha",
            es: "por favor",
          },
          { en: "yes", he: "כן", heTranslit: "ken", es: "sí" },
          { en: "no", he: "לא", heTranslit: "lo", es: "no" },
          {
            en: "goodbye",
            he: "להתראות",
            heTranslit: "lehitra'ot",
            es: "adiós",
          },
        ],
      },
      {
        title: { en: "Family", he: "משפחה" },
        concepts: [
          { en: "mom", he: "אמא", heTranslit: "ima", es: "mamá" },
          { en: "dad", he: "אבא", heTranslit: "aba", es: "papá" },
          { en: "brother", he: "אח", heTranslit: "ach", es: "hermano" },
          { en: "sister", he: "אחות", heTranslit: "achot", es: "hermana" },
          { en: "son", he: "בן", heTranslit: "ben", es: "hijo" },
          { en: "daughter", he: "בת", heTranslit: "bat", es: "hija" },
        ],
      },
      {
        title: { en: "Food", he: "אוכל" },
        concepts: [
          { en: "water", he: "מים", heTranslit: "mayim", es: "agua" },
          { en: "bread", he: "לחם", heTranslit: "lechem", es: "pan" },
          { en: "coffee", he: "קפה", heTranslit: "kafe", es: "café" },
          { en: "apple", he: "תפוח", heTranslit: "tapuach", es: "manzana" },
          { en: "milk", he: "חלב", heTranslit: "chalav", es: "leche" },
          { en: "cheese", he: "גבינה", heTranslit: "gvina", es: "queso" },
        ],
      },
      {
        title: { en: "Numbers", he: "מספרים" },
        concepts: [
          { en: "one", he: "אחת", heTranslit: "achat", es: "uno" },
          { en: "two", he: "שתיים", heTranslit: "shtayim", es: "dos" },
          { en: "three", he: "שלוש", heTranslit: "shalosh", es: "tres" },
          { en: "four", he: "ארבע", heTranslit: "arba", es: "cuatro" },
          { en: "five", he: "חמש", heTranslit: "chamesh", es: "cinco" },
          { en: "ten", he: "עשר", heTranslit: "eser", es: "diez" },
        ],
      },
    ],
  },
  {
    lessons: [
      {
        title: { en: "Colors", he: "צבעים" },
        concepts: [
          { en: "red", he: "אדום", heTranslit: "adom", es: "rojo" },
          { en: "blue", he: "כחול", heTranslit: "kachol", es: "azul" },
          { en: "green", he: "ירוק", heTranslit: "yarok", es: "verde" },
          { en: "white", he: "לבן", heTranslit: "lavan", es: "blanco" },
          { en: "black", he: "שחור", heTranslit: "shachor", es: "negro" },
          { en: "yellow", he: "צהוב", heTranslit: "tsahov", es: "amarillo" },
        ],
      },
      {
        title: { en: "Places", he: "מקומות" },
        concepts: [
          { en: "house", he: "בית", heTranslit: "bayit", es: "casa" },
          {
            en: "school",
            he: "בית ספר",
            heTranslit: "beit sefer",
            es: "escuela",
          },
          { en: "city", he: "עיר", heTranslit: "ir", es: "ciudad" },
          { en: "street", he: "רחוב", heTranslit: "rechov", es: "calle" },
          { en: "store", he: "חנות", heTranslit: "chanut", es: "tienda" },
          { en: "sea", he: "ים", heTranslit: "yam", es: "mar" },
        ],
      },
      {
        title: { en: "Time", he: "זמן" },
        concepts: [
          { en: "day", he: "יום", heTranslit: "yom", es: "día" },
          { en: "night", he: "לילה", heTranslit: "laila", es: "noche" },
          { en: "today", he: "היום", heTranslit: "hayom", es: "hoy" },
          { en: "tomorrow", he: "מחר", heTranslit: "machar", es: "mañana" },
          { en: "yesterday", he: "אתמול", heTranslit: "etmol", es: "ayer" },
          { en: "week", he: "שבוע", heTranslit: "shavua", es: "semana" },
        ],
      },
      {
        title: { en: "Verbs", he: "פעלים" },
        concepts: [
          { en: "to eat", he: "לאכול", heTranslit: "le'echol", es: "comer" },
          { en: "to drink", he: "לשתות", heTranslit: "lishtot", es: "beber" },
          { en: "to go", he: "ללכת", heTranslit: "lalechet", es: "ir" },
          { en: "to speak", he: "לדבר", heTranslit: "ledaber", es: "hablar" },
          { en: "to read", he: "לקרוא", heTranslit: "likro", es: "leer" },
          {
            en: "to write",
            he: "לכתוב",
            heTranslit: "lichtov",
            es: "escribir",
          },
        ],
      },
      {
        title: { en: "Phrases", he: "ביטויים" },
        concepts: [
          {
            en: "good morning",
            he: "בוקר טוב",
            heTranslit: "boker tov",
            es: "buenos días",
          },
          {
            en: "good night",
            he: "לילה טוב",
            heTranslit: "laila tov",
            es: "buenas noches",
          },
          {
            en: "how are you?",
            he: "מה שלומך?",
            heTranslit: "ma shlomcha?",
            es: "¿cómo estás?",
          },
          {
            en: "what's your name?",
            he: "איך קוראים לך?",
            heTranslit: "eich kor'im lecha?",
            es: "¿cómo te llamas?",
          },
          { en: "excuse me", he: "סליחה", heTranslit: "slicha", es: "perdón" },
          {
            en: "welcome",
            he: "ברוכים הבאים",
            heTranslit: "bruchim haba'im",
            es: "bienvenidos",
          },
        ],
      },
    ],
  },
];

type CourseDefinition = {
  title: string;
  imageSrc: string;
  // Language the learner already speaks (questions are written in it).
  from: "en" | "he";
  // Language being taught (answers are written in it).
  to: Language;
};

export const COURSES: CourseDefinition[] = [
  { title: "Spanish", imageSrc: "/es.svg", from: "en", to: "es" },
  { title: "Hebrew", imageSrc: "/il.svg", from: "en", to: "he" },
  { title: "אנגלית · English", imageSrc: "/us.svg", from: "he", to: "en" },
  { title: "ספרדית · Spanish", imageSrc: "/es.svg", from: "he", to: "es" },
];

const LANGUAGE_NAMES: Record<Language, Record<"en" | "he", string>> = {
  en: { en: "English", he: "אנגלית" },
  he: { en: "Hebrew", he: "עברית" },
  es: { en: "Spanish", he: "ספרדית" },
};

export const getUnitText = (course: CourseDefinition, index: number) => {
  const language = LANGUAGE_NAMES[course.to][course.from];

  if (course.from === "he")
    return {
      title: `יחידה ${index + 1}`,
      description: index === 0 ? `יסודות ה${language}` : `${language} למתקדמים`,
    };

  return {
    title: `Unit ${index + 1}`,
    description:
      index === 0
        ? `Learn the basics of ${language}`
        : `Learn intermediate ${language}`,
  };
};

// Text the learner reads in their own language.
export const getPrompt = (concept: Concept, from: "en" | "he") => concept[from];

// Text in the language being taught.
export const getAnswer = (concept: Concept, to: Language, from: "en" | "he") =>
  to === "he" && from !== "he"
    ? `${concept.he} (${concept.heTranslit})`
    : concept[to];

export const getSelectQuestion = (prompt: string, from: "en" | "he") =>
  from === "he"
    ? `איזו מהאפשרויות היא "${prompt}"?`
    : `Which one of these is "${prompt}"?`;

export const getAudioSrc = (concept: Concept, to: Language) =>
  concept.audio?.[to] ?? null;

export type { Concept, CourseDefinition };
