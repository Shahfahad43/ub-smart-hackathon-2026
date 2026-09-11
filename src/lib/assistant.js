import avatar from '../assets/avatar-ubguide.jpg';

// UB Guide's name as a bilingual object — was previously hardcoded as a
// plain English string in several files, which is why it never switched to
// Arabic when the UI language changed. Always render it with L(ASSISTANT_NAME).
export const ASSISTANT_NAME = { en: 'UB Guide', ar: 'دليل الجامعة الذكي' };

export const ASSISTANT_AVATAR = avatar;
