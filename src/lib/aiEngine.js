// Auto-ported local rule-based AI intent-detection engine.
// Pure keyword matching — runs entirely client-side, no external AI call.

export const INTENTS = {
  COURSE_FAIL: {kw:['failed','fail','fail a course','لم أنجح','رسبت','رسوب'], serviceId:'course-retake'},
  COURSE_RETAKE: {kw:['retake','retaking','اعادة','إعادة'], serviceId:'course-retake'},
  COURSE_DROP: {kw:['drop a course','drop course','withdraw from course','اسقاط','حذف مقرر','انسحاب من مقرر'], serviceId:'course-drop'},
  REGISTRATION: {kw:['registration','register','when does registration','تسجيل المقررات','متى التسجيل'], serviceId:'registration_virtual'},
  GRADUATION: {kw:['graduation','graduate','eligible for graduation','تخرج','أتخرج'], serviceId:'graduation-clearance'},
  HOUSING: {kw:['housing','dorm','accommodation','room request','سكن','إسكان'], serviceId:'housing'},
  ALLOWANCE: {kw:['allowance','stipend','monthly payment','مكافأة','راتب'], serviceId:'allowance'},
  IT_SUPPORT: {kw:['password','account not working',"isn't working",'login issue','IT','تقنية','كلمة المرور','لا يعمل'], serviceId:'it-support'},
  ACADEMIC_REGULATION: {kw:['regulation','regulations','rules','لوائح','لائحة'], serviceId:'regulation_virtual'},
  CERTIFICATE: {kw:['certificate','documents i need','شهادة','مستندات'], serviceId:'certificate'},
  CONTACT_DEPARTMENT: {kw:['contact department','talk to department','تواصل مع القسم'], serviceId:'student-affairs'},
};

export const AI_RESPONSES = {
  'course-retake': {
    title:{en:'Course Retake', ar:'إعادة مقرر'},
    desc:{en:'You may be able to retake the course depending on your academic status and applicable university regulations.', ar:'قد تكون مؤهلاً لإعادة المقرر وفق حالتك الأكاديمية واللوائح الجامعية المعمول بها.'},
    checks:[{en:'Academic status checked', ar:'تم التحقق من الحالة الأكاديمية'},{en:'Retake limit not exceeded', ar:'لم يتم تجاوز حد الإعادة المسموح'}],
    docs:[{en:'Academic record', ar:'السجل الأكاديمي'},{en:'Course information', ar:'بيانات المقرر'}],
    steps:3, serviceId:'course-retake', regulationId:'REG-002'
  },
  'course-drop': {
    title:{en:'Course Add / Drop', ar:'إضافة / حذف مقرر'},
    desc:{en:'You can submit a course withdrawal (add/drop) request while the official period is open.', ar:'يمكنك تقديم طلب إضافة أو حذف مقرر خلال الفترة الرسمية المتاحة.'},
    checks:[{en:'Add/drop window currently open', ar:'فترة الإضافة والحذف مفتوحة حالياً'}],
    docs:[{en:'Student ID', ar:'الرقم الجامعي'},{en:'Current schedule', ar:'الجدول الدراسي الحالي'}],
    steps:3, serviceId:'course-drop', regulationId:'REG-001'
  },
  'registration_virtual': {
    title:{en:'Course Registration', ar:'تسجيل المقررات'},
    desc:{en:'Registration for the upcoming semester opens in 3 days, based on the academic calendar. You can prepare your plan now.', ar:'يفتح تسجيل الفصل القادم خلال ٣ أيام وفق التقويم الأكاديمي. يمكنك تجهيز خطتك الآن.'},
    checks:[{en:'No registration holds on your account', ar:'لا توجد أي إيقافات على حسابك'}],
    docs:[{en:'Academic plan', ar:'الخطة الأكاديمية'}],
    steps:2, serviceId:'course-drop', regulationId:'REG-003'
  },
  'graduation-clearance': {
    title:{en:'Graduation Eligibility', ar:'أهلية التخرج'},
    desc:{en:'Based on your completed credit hours, you are approaching graduation eligibility. A clearance request confirms your final status.', ar:'بناءً على ساعاتك المكتملة، أنت تقترب من أهلية التخرج. يؤكد طلب إخلاء الطرف حالتك النهائية.'},
    checks:[{en:'Credit hours near completion', ar:'الساعات المعتمدة تقترب من الاكتمال'},{en:'No outstanding financial/library items (to verify)', ar:'التحقق من عدم وجود التزامات مالية أو مكتبية'}],
    docs:[{en:'Completed credit hours report', ar:'تقرير الساعات المكتملة'},{en:'Library & financial clearance', ar:'إخلاء طرف المكتبة والمالية'}],
    steps:3, serviceId:'graduation-clearance', regulationId:'REG-004'
  },
  'housing': {
    title:{en:'Housing Request', ar:'طلب سكن جامعي'},
    desc:{en:'You can apply for university housing. Priority is given based on distance from home city and academic standing.', ar:'يمكنك التقديم على السكن الجامعي. تُمنح الأولوية بناءً على بُعد المدينة والوضع الأكاديمي.'},
    checks:[{en:'Enrollment status verified', ar:'تم التحقق من حالة القيد'}],
    docs:[{en:'National ID / residency proof', ar:'الهوية الوطنية / إثبات السكن'},{en:'Enrollment certificate', ar:'شهادة القيد'}],
    steps:3, serviceId:'housing', regulationId:'REG-005'
  },
  'allowance': {
    title:{en:'Student Allowance', ar:'المكافأة الطلابية'},
    desc:{en:'Your monthly student stipend depends on attendance and academic standing. You can review or update your bank details.', ar:'تعتمد المكافأة الشهرية على الحضور والوضع الأكاديمي. يمكنك مراجعة بياناتك البنكية أو تحديثها.'},
    checks:[{en:'Attendance meets minimum threshold', ar:'الحضور يحقق الحد الأدنى المطلوب'}],
    docs:[{en:'Bank account (IBAN)', ar:'الحساب البنكي (آيبان)'}],
    steps:2, serviceId:'allowance', regulationId:'REG-006'
  },
  'it-support': {
    title:{en:'IT Support', ar:'الدعم التقني'},
    desc:{en:'I can route this to IT support. Common fixes include password resets and account reactivation.', ar:'يمكنني تحويل هذا إلى الدعم التقني. تشمل الحلول الشائعة إعادة تعيين كلمة المرور وتفعيل الحساب.'},
    checks:[{en:'Account lookup available', ar:'إمكانية البحث عن الحساب متاحة'}],
    docs:[{en:'University ID', ar:'الهوية الجامعية'}],
    steps:2, serviceId:'it-support', regulationId:null
  },
  'regulation_virtual': {
    title:{en:'Academic Regulations', ar:'اللوائح الأكاديمية'},
    desc:{en:'Here are the university regulations most relevant to your question. You can open the full text of any regulation.', ar:'فيما يلي اللوائح الجامعية الأكثر صلة بسؤالك. يمكنك فتح النص الكامل لأي لائحة.'},
    checks:[], docs:[], steps:1, serviceId:null, regulationId:'REG-003'
  },
  'certificate': {
    title:{en:'Certificate Request', ar:'طلب شهادة'},
    desc:{en:'You can request an enrollment or graduation certificate. Most certificates are issued digitally within 1–2 business days.', ar:'يمكنك طلب شهادة قيد أو تخرج. تُصدر معظم الشهادات رقمياً خلال ١–٢ يوم عمل.'},
    checks:[{en:'Good academic standing confirmed', ar:'تم تأكيد الوضع الأكاديمي الجيد'}],
    docs:[{en:'Student ID', ar:'الرقم الجامعي'}],
    steps:2, serviceId:'certificate', regulationId:null
  },
  'student-affairs': {
    title:{en:'Contact Department', ar:'التواصل مع القسم'},
    desc:{en:'I can route your message to the right department through a student affairs request.', ar:'يمكنني تحويل رسالتك إلى القسم المناسب عبر طلب شؤون الطلاب.'},
    checks:[], docs:[{en:'Description of the request', ar:'وصف الطلب'}], steps:2, serviceId:'student-affairs', regulationId:null
  }
};

export function detectIntent(text) {
  const low = text.toLowerCase();
  for (const key in INTENTS) {
    const hit = INTENTS[key].kw.some((k) => low.includes(k.toLowerCase()));
    if (hit) return { intent: key, ...INTENTS[key] };
  }
  return null;
}
