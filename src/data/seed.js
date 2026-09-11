// Auto-ported seed data for demo requests + notifications (in-memory only).
export const SEED_REQUESTS = [
    {id:'UB-2026-004821', serviceId:'it-helpdesk', status:'verification', submitted:'2026-09-02',
     department:{en:'IT Department', ar:'إدارة تقنية المعلومات'}, expected:'2026-09-15',
     course:'', reason:{en:'Persistent Blackboard (LMS) login error preventing access to course materials.', ar:'خطأ متكرر في تسجيل الدخول إلى نظام بلاكبورد يمنع الوصول إلى مواد المقرر.'}},
    {id:'UB-2026-004777', serviceId:'enrollment-letter', status:'completed', submitted:'2026-08-20',
     department:{en:'Admissions & Registration', ar:'القبول والتسجيل'}, expected:'2026-08-24',
     course:'', reason:{en:'Enrollment letter for scholarship application.', ar:'خطاب تعريف بالقيد لطلب منحة.'}},
  ];

export const SEED_NOTIFICATIONS = [
    {id:1,cat:'academic',read:false,when:'today',time:'2h',title:{en:'Course registration opens in 3 days.', ar:'يفتح تسجيل المقررات خلال ٣ أيام.'}},
    {id:2,cat:'graduation',read:false,when:'today',time:'5h',title:{en:'You have 2 remaining graduation requirements.', ar:'لديك متطلبان متبقيان للتخرج.'}},
    {id:3,cat:'request',read:false,when:'today',time:'6h',title:{en:'Your request UB-2026-004821 moved to Department Verification.', ar:'تم نقل طلبك UB-2026-004821 إلى مرحلة التحقق من القسم.'}},
    {id:4,cat:'library',read:true,when:'earlier',time:'1d',title:{en:'Your library book is due in 2 days.', ar:'موعد إرجاع كتاب المكتبة بعد يومين.'}},
    {id:5,cat:'university',read:true,when:'earlier',time:'2d',title:{en:'University holiday: Saudi National Day begins September 23.', ar:'إجازة جامعية: يبدأ اليوم الوطني السعودي في ٢٣ سبتمبر.'}},
    {id:6,cat:'system',read:true,when:'earlier',time:'3d',title:{en:'Your password will expire soon.', ar:'ستنتهي صلاحية كلمة المرور قريباً.'}},
  ];

export const STAGES = ['submitted', 'review', 'verification', 'completed'];
