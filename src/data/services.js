export const SERVICES = [
  { id: 'academic-advising', category: 'academic', icon: 'user-check',
    name: { en: 'Academic Advising', ar: 'الإرشاد الأكاديمي' },
    desc: { en: 'Book a session with your academic advisor.', ar: 'حجز موعد مع المرشد الأكاديمي.' },
    time: { en: 'Scheduled within 3 days', ar: 'يُحدد خلال ٣ أيام' },
    eligibility: { en: 'Available to all enrolled students.', ar: 'متاحة لجميع الطلاب المسجلين.' },
    docs: [{ en: 'Current academic plan', ar: 'الخطة الأكاديمية الحالية' }],
    steps: [
      { en: 'Request an advising session', ar: 'طلب موعد إرشادي' },
      { en: 'Advisor confirms time slot', ar: 'تأكيد الموعد من المرشد' },
      { en: 'Session held & notes shared', ar: 'عقد الجلسة ومشاركة الملاحظات' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'Can I choose which advisor I meet with?', ar: 'هل يمكنني اختيار المرشد الذي أقابله؟' },
        a: { en: 'Sessions are usually booked with your assigned academic advisor, but you can request a change through Student Affairs.', ar: 'عادة ما تُحجز الجلسات مع مرشدك الأكاديمي المخصص، ويمكنك طلب تغييره عبر شؤون الطلاب.' } },
    ] },

  { id: 'digital-library', category: 'library', icon: 'book-open',
    name: { en: 'Digital Libraries & Research Portals', ar: 'المكتبات الرقمية وبوابات البحث' },
    desc: { en: 'Explore e-books, journals, and research databases curated for your field of study.', ar: 'استكشف الكتب الإلكترونية والدوريات وقواعد البيانات البحثية المنتقاة حسب تخصصك.' },
    time: { en: 'Instant access', ar: 'وصول فوري' },
    eligibility: { en: 'Available to all enrolled students and faculty with an active university account.', ar: 'متاحة لجميع الطلاب المسجلين وأعضاء هيئة التدريس بحساب جامعي فعال.' },
    docs: [{ en: 'University account login', ar: 'تسجيل الدخول بالحساب الجامعي' }],
    steps: [
      { en: 'Sign in with your university account', ar: 'تسجيل الدخول بحسابك الجامعي' },
      { en: 'Browse resources recommended for your program', ar: 'تصفح المصادر الموصى بها لتخصصك' },
      { en: 'Download or access online instantly', ar: 'التحميل أو الوصول عبر الإنترنت فوراً' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'Can I access these resources from off campus?', ar: 'هل يمكنني الوصول لهذه المصادر من خارج الحرم الجامعي؟' },
        a: { en: 'Yes — sign in with your university account through the library portal from anywhere.', ar: 'نعم — سجّل الدخول بحسابك الجامعي عبر بوابة المكتبة من أي مكان.' } },
    ],
    // Extra field specific to this service — see src/data/libraryBooks.js
    hasLibraryResources: true },

  { id: 'career-alumni', category: 'career', icon: 'briefcase',
    name: { en: 'Career Development & Alumni Network', ar: 'التطوير الوظيفي وشبكة الخريجين' },
    desc: { en: 'Access mentorship, job postings, and networking with UB Bisha alumni in your field.', ar: 'الوصول إلى الإرشاد الوظيفي وفرص العمل والتواصل مع خريجي جامعة بيشة في تخصصك.' },
    time: { en: 'Ongoing platform access', ar: 'وصول مستمر للمنصة' },
    eligibility: { en: 'Available to current students and UB Bisha graduates.', ar: 'متاحة للطلاب الحاليين وخريجي جامعة بيشة.' },
    docs: [{ en: 'Updated CV / resume', ar: 'سيرة ذاتية محدثة' }],
    steps: [
      { en: 'Create or update your career profile', ar: 'إنشاء أو تحديث ملفك الوظيفي' },
      { en: 'Browse job postings and alumni mentors', ar: 'تصفح فرص العمل والخريجين المرشدين' },
      { en: 'Request a mentorship session or apply directly', ar: 'طلب جلسة إرشاد أو التقديم مباشرة' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'Is this open to alumni too, or only current students?', ar: 'هل هذا متاح للخريجين أيضاً أم للطلاب الحاليين فقط؟' },
        a: { en: 'Both — alumni can join as mentors or continue using the job board after graduation.', ar: 'كلاهما — يمكن للخريجين الانضمام كمرشدين أو الاستمرار في استخدام لوحة الوظائف بعد التخرج.' } },
    ] },

  { id: 'transcript', category: 'documents', icon: 'file-text',
    name: { en: 'Academic Transcripts', ar: 'كشوف الدرجات الأكاديمية' },
    desc: { en: 'Request an official digital or physical academic transcript in Arabic or English.', ar: 'طلب كشف درجات رسمي رقمي أو ورقي باللغة العربية أو الإنجليزية.' },
    time: { en: '2–3 business days (digital), 5–7 (physical)', ar: '٢–٣ أيام عمل (رقمي)، ٥–٧ أيام (ورقي)' },
    eligibility: { en: 'Available to all currently enrolled and graduated students.', ar: 'متاحة لجميع الطلاب المسجلين والخريجين.' },
    docs: [{ en: 'Student ID', ar: 'الرقم الجامعي' }],
    steps: [
      { en: 'Choose transcript language (Arabic/English) and format (digital/physical)', ar: 'اختيار لغة الكشف (عربي/إنجليزي) والصيغة (رقمي/ورقي)' },
      { en: 'Registrar processes and verifies the request', ar: 'معالجة الطلب والتحقق منه من قبل القبول والتسجيل' },
      { en: 'Transcript issued or mailed', ar: 'إصدار الكشف أو إرساله بريدياً' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'Can I get both an Arabic and an English copy?', ar: 'هل يمكنني الحصول على نسخة عربية وأخرى إنجليزية؟' },
        a: { en: 'Yes, request both languages in the same form — each is processed and issued separately.', ar: 'نعم، اطلب اللغتين ضمن نفس النموذج — يتم إصدار كل نسخة بشكل منفصل.' } },
    ] },

  { id: 'enrollment-letter', category: 'documents', icon: 'file-check',
    name: { en: 'Enrollment Letters ("To Whom It May Concern")', ar: 'خطابات تعريف بالقيد ("إلى من يهمه الأمر")' },
    desc: { en: 'Generate an automated letter confirming your active student status for employers, embassies, or banks.', ar: 'إصدار خطاب آلي يؤكد حالة قيدك الفعلية لجهات مثل أصحاب العمل أو السفارات أو البنوك.' },
    time: { en: 'Instant – same day', ar: 'فوري – نفس اليوم' },
    eligibility: { en: 'Available to all currently enrolled students in good standing.', ar: 'متاحة لجميع الطلاب المسجلين حالياً وذوي الوضع الجيد.' },
    docs: [{ en: 'Purpose of the letter (employer / embassy / bank)', ar: 'الجهة المطلوب توجيه الخطاب إليها (جهة عمل / سفارة / بنك)' }],
    steps: [
      { en: 'Select the letter purpose and recipient', ar: 'تحديد الغرض من الخطاب والجهة المستلمة' },
      { en: 'System auto-generates the verification letter', ar: 'يقوم النظام بإصدار خطاب التحقق تلقائياً' },
      { en: 'Download the signed digital letter', ar: 'تحميل الخطاب الرقمي الموقع' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'Is the digital letter accepted officially, or do I need a wet signature?', ar: 'هل الخطاب الرقمي معتمد رسمياً أم أحتاج إلى توقيع يدوي؟' },
        a: { en: 'The digital letter carries an official verification code most institutions accept; contact Student Affairs if a physical copy is required.', ar: 'يحمل الخطاب الرقمي رمز تحقق رسمي تقبله معظم الجهات؛ تواصل مع شؤون الطلاب إذا لزمت نسخة ورقية.' } },
    ] },

  { id: 'it-helpdesk', category: 'it', icon: 'life-buoy',
    name: { en: 'IT Helpdesk Tickets', ar: 'تذاكر الدعم التقني' },
    desc: { en: 'Raise a support ticket for password resets, Wi-Fi access issues, or LMS/Blackboard errors.', ar: 'إرسال تذكرة دعم لإعادة تعيين كلمة المرور أو مشكلات الواي فاي أو أخطاء نظام بلاكبورد.' },
    time: { en: 'Same day – 2 business days', ar: 'نفس اليوم – يومي عمل' },
    eligibility: { en: 'Available to all students, faculty, and staff.', ar: 'متاحة لجميع الطلاب وأعضاء هيئة التدريس والموظفين.' },
    docs: [{ en: 'University ID', ar: 'الهوية الجامعية' }],
    steps: [
      { en: 'Choose the issue type (password / Wi-Fi / LMS)', ar: 'اختيار نوع المشكلة (كلمة المرور / واي فاي / نظام التعلم)' },
      { en: 'Describe the issue in detail', ar: 'وصف المشكلة بالتفصيل' },
      { en: 'IT team resolves and confirms', ar: 'حل المشكلة والتأكيد من فريق تقنية المعلومات' },
    ],
    regulationId: null,
    faqs: [
      { q: { en: 'What if my issue is urgent (e.g. locked out before an exam)?', ar: 'ماذا لو كانت مشكلتي عاجلة (مثل إغلاق الحساب قبل اختبار)؟' },
        a: { en: 'Mark the ticket as urgent — these are prioritized and typically resolved the same day.', ar: 'حدد التذكرة كعاجلة — تُعطى الأولوية وعادة ما تُحل في نفس اليوم.' } },
    ] },
];

export const CATEGORY_LABELS = {
  academic: { en: 'Academic', ar: 'أكاديمي' },
  library: { en: 'Library', ar: 'المكتبة' },
  career: { en: 'Career', ar: 'التطوير الوظيفي' },
  documents: { en: 'Documents', ar: 'المستندات' },
  it: { en: 'IT', ar: 'تقنية المعلومات' },
};
