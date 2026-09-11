// Dummy digital-library catalog for the "Digital Libraries & Research
// Portals" service. `field` matches a student's program key ('cybersecurity'
// | 'sharia') so ServiceDetail.jsx can show resources relevant to whoever is
// logged in; 'general' entries are shown to everyone regardless of program.
export const LIBRARY_RESOURCES = [
  // Cybersecurity
  {
    field: 'cybersecurity',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Network Security Essentials', ar: 'أساسيات أمن الشبكات' },
    author: 'William Stallings',
  },
  {
    field: 'cybersecurity',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: "The Web Application Hacker's Handbook", ar: 'دليل اختراق تطبيقات الويب' },
    author: 'Dafydd Stuttard & Marcus Pinto',
  },
  {
    field: 'cybersecurity',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Applied Cryptography', ar: 'التشفير التطبيقي' },
    author: 'Bruce Schneier',
  },
  {
    field: 'cybersecurity',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Practical Malware Analysis', ar: 'التحليل العملي للبرمجيات الخبيثة' },
    author: 'Michael Sikorski & Andrew Honig',
  },
  {
    field: 'cybersecurity',
    type: { en: 'Database', ar: 'قاعدة بيانات' },
    title: { en: 'IEEE Xplore Digital Library', ar: 'مكتبة IEEE Xplore الرقمية' },
    author: 'IEEE',
  },

  // Sharia
  {
    field: 'sharia',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: "Al-Muwafaqat fi Usul al-Shari'ah", ar: 'الموافقات في أصول الشريعة' },
    author: 'Al-Shatibi',
  },
  {
    field: 'sharia',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Bidayat al-Mujtahid', ar: 'بداية المجتهد ونهاية المقتصد' },
    author: 'Ibn Rushd',
  },
  {
    field: 'sharia',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Al-Risalah', ar: 'الرسالة' },
    author: 'Imam al-Shafi‘i',
  },
  {
    field: 'sharia',
    type: { en: 'Book', ar: 'كتاب' },
    title: { en: 'Tafsir al-Tabari', ar: 'تفسير الطبري' },
    author: 'Ibn Jarir al-Tabari',
  },
  {
    field: 'sharia',
    type: { en: 'Database', ar: 'قاعدة بيانات' },
    title: { en: 'Al-Maktaba al-Shamila', ar: 'المكتبة الشاملة' },
    author: 'Islamic Digital Library',
  },

  // General — shown to every student regardless of program
  {
    field: 'general',
    type: { en: 'Database', ar: 'قاعدة بيانات' },
    title: { en: 'Saudi Digital Library (SDL)', ar: 'المكتبة الرقمية السعودية' },
    author: 'National academic database',
  },
  {
    field: 'general',
    type: { en: 'Database', ar: 'قاعدة بيانات' },
    title: { en: 'JSTOR', ar: 'JSTOR' },
    author: 'Multidisciplinary journal archive',
  },
  {
    field: 'general',
    type: { en: 'Database', ar: 'قاعدة بيانات' },
    title: { en: 'ProQuest Dissertations & Theses', ar: 'قاعدة بروكويست للرسائل الجامعية' },
    author: 'Graduate research archive',
  },
];
