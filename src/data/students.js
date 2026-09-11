import maleAvatar from '../assets/avatar-male.jpg';
import femaleAvatar from '../assets/avatar-female.jpg';

// Mock demo student profiles (fictional — no real students).
// Exactly two personas, each customized to their program.
export const STUDENTS = {
  cybersecurity: {
    key: 'cybersecurity',
    name: { en: 'Shah Fahad', ar: 'شاه فهد' },
    initials: 'SF',
    avatar: maleAvatar,
    studentId: '202356789',
    college: { en: 'College of Computing', ar: 'كلية الحوسبة' },
    department: { en: 'Cybersecurity Department', ar: 'قسم الأمن السيبراني' },
    program: { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
    level: 6,
    gpa: 4.55,
    creditsDone: 101,
    creditsTotal: 132,
    attendance: 96,
    gradYear: 2027,
    standing: { en: 'Good Standing', ar: 'وضع أكاديمي جيد' },
    email: 'shah.fahad@ub.edu.sa',
    phone: '+966 55 456 7890',
    advisor: { en: 'Dr. Yousef Al-Mutairi', ar: 'د. يوسف المطيري' },
    schedule: [
      { time: '08:00', course: { en: 'Network Security', ar: 'أمن الشبكات' }, room: 'B-210' },
      { time: '10:00', course: { en: 'Ethical Hacking', ar: 'الاختراق الأخلاقي' }, room: 'Lab 2' },
      { time: '12:00', course: { en: 'Break', ar: 'استراحة' }, room: '', isBreak: true },
      { time: '13:00', course: { en: 'Cryptography', ar: 'التشفير' }, room: 'B-104' },
    ],
    grades: [
      { course: { en: 'Network Security', ar: 'أمن الشبكات' }, grade: 'A+', credits: 3 },
      { course: { en: 'Ethical Hacking', ar: 'الاختراق الأخلاقي' }, grade: 'A', credits: 3 },
      { course: { en: 'Cryptography', ar: 'التشفير' }, grade: 'A', credits: 3 },
      { course: { en: 'Digital Forensics', ar: 'التحقيق الجنائي الرقمي' }, grade: 'A-', credits: 3 },
    ],
    courses: [
      'Network Security',
      'Ethical Hacking',
      'Cryptography',
      'Digital Forensics',
      'Malware Analysis',
      'Security Operations',
    ],
    recommendations: [
      {
        tag: { en: 'Competition', ar: 'مسابقة' },
        title: { en: 'National CTF Challenge', ar: 'تحدي التقاط العلم الوطني' },
        meta: { en: 'Sep 21 · Cybersecurity Lab', ar: '٢١ سبتمبر · مختبر الأمن السيبراني' },
      },
      {
        tag: { en: 'Workshop', ar: 'ورشة' },
        title: { en: 'Penetration Testing Workshop', ar: 'ورشة اختبار الاختراق' },
        meta: { en: 'Sep 27 · Innovation Lab', ar: '٢٧ سبتمبر · مختبر الابتكار' },
      },
      {
        tag: { en: 'Seminar', ar: 'ندوة' },
        title: { en: 'Cybersecurity Careers Seminar', ar: 'ندوة الوظائف في الأمن السيبراني' },
        meta: { en: 'Oct 4 · Main Auditorium', ar: '٤ أكتوبر · القاعة الرئيسية' },
      },
    ],
  },
  sharia: {
    key: 'sharia',
    name: { en: 'Malak Abdu Rahman', ar: 'ملك عبد الرحمن' },
    initials: 'MA',
    avatar: femaleAvatar,
    studentId: '202298765',
    college: { en: 'College of Sharia and Islamic Studies', ar: 'كلية الشريعة والدراسات الإسلامية' },
    department: { en: 'Fiqh Department', ar: 'قسم الفقه' },
    program: { en: 'Sharia', ar: 'الشريعة' },
    level: 5,
    gpa: 4.71,
    creditsDone: 88,
    creditsTotal: 128,
    attendance: 97,
    gradYear: 2027,
    standing: { en: "Dean's List", ar: 'قائمة العميد للتفوق' },
    email: 'malak.abdulrahman@ub.edu.sa',
    phone: '+966 55 234 5678',
    advisor: { en: 'Dr. Huda Al-Zahrani', ar: 'د. هدى الزهراني' },
    schedule: [
      { time: '08:00', course: { en: 'Usul al-Fiqh', ar: 'أصول الفقه' }, room: 'C-101' },
      { time: '10:00', course: { en: 'Quranic Sciences', ar: 'علوم القرآن' }, room: 'C-105' },
      { time: '12:00', course: { en: 'Break', ar: 'استراحة' }, room: '', isBreak: true },
      { time: '13:00', course: { en: 'Comparative Fiqh', ar: 'الفقه المقارن' }, room: 'C-201' },
    ],
    grades: [
      { course: { en: 'Usul al-Fiqh', ar: 'أصول الفقه' }, grade: 'A+', credits: 3 },
      { course: { en: 'Quranic Sciences', ar: 'علوم القرآن' }, grade: 'A+', credits: 3 },
      { course: { en: 'Comparative Fiqh', ar: 'الفقه المقارن' }, grade: 'A', credits: 3 },
      { course: { en: 'Hadith Studies', ar: 'دراسات الحديث' }, grade: 'A', credits: 3 },
    ],
    courses: ['Usul al-Fiqh', 'Quranic Sciences', 'Comparative Fiqh', 'Hadith Studies', 'Arabic Rhetoric', 'Islamic History'],
    recommendations: [
      {
        tag: { en: 'Seminar', ar: 'ندوة' },
        title: { en: 'Islamic Law Seminar', ar: 'ندوة الفقه الإسلامي' },
        meta: { en: 'Sep 21 · College of Sharia', ar: '٢١ سبتمبر · كلية الشريعة' },
      },
      {
        tag: { en: 'Workshop', ar: 'ورشة' },
        title: { en: 'Fiqh Research Workshop', ar: 'ورشة البحث الفقهي' },
        meta: { en: 'Sep 28 · Research Center', ar: '٢٨ سبتمبر · مركز البحوث' },
      },
      {
        tag: { en: 'Conference', ar: 'مؤتمر' },
        title: { en: 'Quranic Studies Conference', ar: 'مؤتمر الدراسات القرآنية' },
        meta: { en: 'Oct 5 · Main Auditorium', ar: '٥ أكتوبر · القاعة الرئيسية' },
      },
    ],
  },
};
