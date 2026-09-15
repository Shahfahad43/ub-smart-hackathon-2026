// ============================================================================
// Blackboard AI Learning Companion — PROTOTYPE DATA ONLY.
//
// Everything in this file is hard-coded on purpose. This feature makes ZERO
// network/API calls — it is a self-contained frontend demo, kept completely
// separate from the real UB Guide AI integration (src/lib/ubGuideApi.js /
// api/guide.js), which this file does not touch or import.
// ============================================================================

export const BLACKBOARD_URL = 'https://blackboard.ub.edu.sa';

export const LECTURE_INFO = {
  course: { en: 'Database Systems', ar: 'أنظمة قواعد البيانات' },
  courseCode: 'CS301',
  lecture: { en: 'Database Normalization', ar: 'تسوية قواعد البيانات' },
  instructor: { en: 'Dr. Ahmed', ar: 'د. أحمد' },
  studentsOnline: 42,
  joinedMinutesLate: 18,
};

// Markdown text rendered via react-markdown, matching the same visual style
// already used by the real UB Guide page.
export const MOCK_RESPONSES = {
  whatMissed: {
    en: `You joined the class **18 minutes** after it started.

**Here's what you missed:**

### 10:00 – 10:05 — Introduction to Database Normalization
The instructor introduced database normalization and explained why reducing data redundancy is important.

### 10:05 – 10:12 — First Normal Form (1NF)
The instructor explained:
- Atomic values
- Removing repeating groups
- Unique records

### 10:12 – 10:18 — Practical Example
A student table was transformed into 1NF using a practical example.

**Important concepts:**
- Normalization
- Data redundancy
- Primary key
- 1NF

**Recommended:** Review the first 18 minutes of the lecture.`,
    ar: `انضممت إلى المحاضرة بعد **١٨ دقيقة** من بدايتها.

**إليك ما فاتك:**

### ١٠:٠٠ – ١٠:٠٥ — مقدمة عن تسوية قواعد البيانات
قدّم المحاضر مفهوم تسوية قواعد البيانات وأوضح أهمية تقليل تكرار البيانات.

### ١٠:٠٥ – ١٠:١٢ — الصيغة الطبيعية الأولى (1NF)
شرح المحاضر:
- القيم الذرية
- إزالة المجموعات المتكررة
- تفرّد السجلات

### ١٠:١٢ – ١٠:١٨ — مثال عملي
تم تحويل جدول طلاب إلى الصيغة الطبيعية الأولى باستخدام مثال عملي.

**مفاهيم مهمة:**
- التسوية
- تكرار البيانات
- المفتاح الأساسي
- الصيغة الطبيعية الأولى

**موصى به:** راجع أول ١٨ دقيقة من المحاضرة.`,
  },

  summarize: {
    en: `### Topic
Database Normalization

**Main Points:**
- Normalization organizes data efficiently.
- It reduces unnecessary data redundancy.
- First Normal Form requires atomic values.
- Repeating groups should be removed.
- Primary keys help uniquely identify records.

**Key Concepts:**
Normalization, Data Redundancy, Primary Key, 1NF, 2NF

**Learning Outcome:**
By the end of this lecture, students should understand why normalization is used and how to identify a table that satisfies 1NF.`,
    ar: `### الموضوع
تسوية قواعد البيانات

**النقاط الرئيسية:**
- التسوية تنظّم البيانات بكفاءة.
- تقلل من تكرار البيانات غير الضروري.
- الصيغة الطبيعية الأولى تتطلب قيمًا ذرية.
- يجب إزالة المجموعات المتكررة.
- المفاتيح الأساسية تساعد على تفرّد السجلات.

**المفاهيم الأساسية:**
التسوية، تكرار البيانات، المفتاح الأساسي، الصيغة الأولى، الصيغة الثانية

**نتاج التعلّم:**
بنهاية هذه المحاضرة، يجب أن يفهم الطالب سبب استخدام التسوية وكيفية تمييز جدول يحقق الصيغة الطبيعية الأولى.`,
  },

  notes: {
    en: `## Database Normalization — Lecture Notes

**1. What is Normalization?**
Normalization is the process of organizing data to reduce redundancy and improve data consistency.

**2. Why Use Normalization?**
- Reduce duplicate data
- Improve consistency
- Simplify database maintenance

**3. First Normal Form (1NF)**
A relation satisfies 1NF when:
- Each field contains a single atomic value.
- Repeating groups are removed.
- Each record can be uniquely identified.

**4. Important Terms**
- **Primary Key** — A field used to uniquely identify a record.
- **Data Redundancy** — Unnecessary repetition of the same data.
- **Normalization** — Organizing data to reduce redundancy.

> **Exam Tip:** 1NF → Atomic values + No repeating groups`,
    ar: `## تسوية قواعد البيانات — ملاحظات المحاضرة

**١. ما هي التسوية؟**
التسوية هي عملية تنظيم البيانات لتقليل التكرار وتحسين اتساق البيانات.

**٢. لماذا نستخدم التسوية؟**
- تقليل البيانات المكررة
- تحسين الاتساق
- تسهيل صيانة قاعدة البيانات

**٣. الصيغة الطبيعية الأولى (1NF)**
تحقق العلاقة الصيغة الأولى عندما:
- يحتوي كل حقل على قيمة ذرية واحدة.
- تُزال المجموعات المتكررة.
- يمكن تمييز كل سجل بشكل فريد.

**٤. مصطلحات مهمة**
- **المفتاح الأساسي** — حقل يُستخدم لتمييز السجل بشكل فريد.
- **تكرار البيانات** — تكرار غير ضروري لنفس البيانات.
- **التسوية** — تنظيم البيانات لتقليل التكرار.

> **نصيحة للاختبار:** الصيغة الأولى ← قيم ذرية + لا مجموعات متكررة`,
  },
};

export const QUIZ = [
  {
    question: { en: 'What is the main purpose of database normalization?', ar: 'ما الغرض الرئيسي من تسوية قواعد البيانات؟' },
    options: [
      { en: 'Increase data redundancy', ar: 'زيادة تكرار البيانات' },
      { en: 'Reduce data redundancy', ar: 'تقليل تكرار البيانات' },
      { en: 'Increase database size', ar: 'زيادة حجم قاعدة البيانات' },
      { en: 'Remove primary keys', ar: 'إزالة المفاتيح الأساسية' },
    ],
    correct: 1,
    explanation: { en: 'Normalization helps reduce unnecessary data redundancy.', ar: 'التسوية تساعد على تقليل تكرار البيانات غير الضروري.' },
  },
  {
    question: { en: 'Which of the following is required for a table to be in 1NF?', ar: 'أي مما يلي مطلوب لكي يحقق الجدول الصيغة الطبيعية الأولى؟' },
    options: [
      { en: 'Composite keys only', ar: 'مفاتيح مركّبة فقط' },
      { en: 'Atomic values in every field', ar: 'قيم ذرية في كل حقل' },
      { en: 'At least two foreign keys', ar: 'مفتاحان خارجيان على الأقل' },
      { en: 'No primary key', ar: 'عدم وجود مفتاح أساسي' },
    ],
    correct: 1,
    explanation: { en: 'Every field must hold a single, atomic value in 1NF.', ar: 'يجب أن يحتوي كل حقل على قيمة ذرية واحدة في الصيغة الأولى.' },
  },
  {
    question: { en: 'What does a primary key do?', ar: 'ما وظيفة المفتاح الأساسي؟' },
    options: [
      { en: 'Increases redundancy', ar: 'يزيد التكرار' },
      { en: 'Uniquely identifies a record', ar: 'يميّز السجل بشكل فريد' },
      { en: 'Stores duplicate data', ar: 'يخزّن بيانات مكررة' },
      { en: 'Removes atomic values', ar: 'يزيل القيم الذرية' },
    ],
    correct: 1,
    explanation: { en: 'A primary key uniquely identifies each record in a table.', ar: 'المفتاح الأساسي يميّز كل سجل في الجدول بشكل فريد.' },
  },
  {
    question: { en: 'True or False: Repeating groups are allowed in a table that satisfies 1NF.', ar: 'صح أم خطأ: يُسمح بوجود مجموعات متكررة في جدول يحقق الصيغة الطبيعية الأولى.' },
    options: [
      { en: 'True', ar: 'صح' },
      { en: 'False', ar: 'خطأ' },
    ],
    correct: 1,
    explanation: { en: 'Repeating groups must be removed for a table to satisfy 1NF.', ar: 'يجب إزالة المجموعات المتكررة حتى يحقق الجدول الصيغة الأولى.' },
  },
];

export const FLASHCARDS = [
  {
    term: { en: 'Normalization', ar: 'التسوية' },
    definition: { en: 'The process of organizing data to reduce redundancy and improve consistency.', ar: 'عملية تنظيم البيانات لتقليل التكرار وتحسين الاتساق.' },
  },
  {
    term: { en: 'Data Redundancy', ar: 'تكرار البيانات' },
    definition: { en: 'Unnecessary repetition of the same data across a database.', ar: 'تكرار غير ضروري لنفس البيانات داخل قاعدة البيانات.' },
  },
  {
    term: { en: 'Primary Key', ar: 'المفتاح الأساسي' },
    definition: { en: 'A field (or set of fields) used to uniquely identify each record in a table.', ar: 'حقل (أو مجموعة حقول) تُستخدم لتمييز كل سجل في الجدول بشكل فريد.' },
  },
  {
    term: { en: 'First Normal Form (1NF)', ar: 'الصيغة الطبيعية الأولى' },
    definition: { en: 'A table satisfies 1NF when every field holds a single atomic value and repeating groups are removed.', ar: 'يحقق الجدول الصيغة الأولى عندما يحتوي كل حقل على قيمة ذرية واحدة وتُزال المجموعات المتكررة.' },
  },
  {
    term: { en: 'Atomic Value', ar: 'القيمة الذرية' },
    definition: { en: 'A value that cannot be broken down further — e.g. one phone number, not a list of several in one field.', ar: 'قيمة لا يمكن تقسيمها أكثر — مثل رقم هاتف واحد، وليس قائمة أرقام في حقل واحد.' },
  },
];
