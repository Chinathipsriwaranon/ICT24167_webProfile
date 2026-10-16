// Internationalization (i18n) Dictionary & Switcher
const TRANSLATIONS = {
  th: {
    // Navigation
    navPersonal: "ข้อมูลส่วนตัว",
    navEducation: "ประวัติการศึกษา",
    navSkills: "ทักษะความเชี่ยวชาญ",
    navExperience: "ประสบการณ์ทำงาน",
    navProjects: "ผลงานของฉัน",
    navCertifications: "การฝึกอบรม & ใบรับรอง",
    navBadge: "ICT Student Portfolio",
    navStatus: "พร้อมรับงาน / เปิดรับโอกาส",

    // Hero & Profile
    heroGreeting: "สวัสดีครับ, ผม",
    heroRoleDefault: "นักศึกษาคณะเทคโนโลยีสารสนเทศ (ICT) ชั้นปีที่ 2 • มหาวิทยาลัยศรีปทุม (บางเขน)",
    heroGpaxLabel: "ระดับการศึกษา",
    heroEmailLabel: "อีเมลติดต่อ",
    heroPhoneLabel: "เบอร์โทรศัพท์",
    heroLocationLabel: "ที่อยู่ / ที่ตั้ง",
    heroChangePhoto: "คลิกเพื่อเปลี่ยนรูปภาพโปรไฟล์",
    heroBtnContact: "ติดต่อฉัน",
    heroBtnCV: "ดาวน์โหลด Resume / CV",
    heroQuickStatsYears: "ชั้นปีที่ 2",
    heroQuickStatsYearsSub: "คณะเทคโนโลยีสารสนเทศ",
    heroQuickStatsProjects: "เปิดรับโอกาส",
    heroQuickStatsProjectsSub: "สหกิจศึกษา / ฝึกงาน",
    heroQuickStatsCerts: "ม.ศรีปทุม",
    heroQuickStatsCertsSub: "วิทยาเขตบางเขน",

    // Education
    eduSectionTitle: "ประวัติการศึกษา",
    eduSectionSubtitle: "กำลังศึกษา ชั้นปีที่ 2 คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยศรีปทุม (บางเขน)",
    eduDegreeLabel: "ระดับการศึกษา",
    eduMajorLabel: "สาขาวิชา",
    eduUnivLabel: "สถาบันการศึกษา",
    eduPeriodLabel: "ระยะเวลาศึกษา",
    eduGpaxLabel: "ระดับชั้นปี",
    eduCourseworkLabel: "วิชาสำคัญที่เกี่ยวข้อง (Relevant Coursework)",
    eduHighlightBadge: "กำลังศึกษา ชั้นปีที่ 2",

    // Skills
    skillsSectionTitle: "ทักษะความเชี่ยวชาญ",
    skillsSectionSubtitle: "เทคโนโลยีและเครื่องมือที่ใช้ในการพัฒนาซอฟต์แวร์ทั้ง 4 ด้าน",
    skillCatLanguages: "ภาษาคอมพิวเตอร์ (Programming Languages)",
    skillCatFrontend: "การพัฒนาส่วนติดต่อผู้ใช้ (Frontend)",
    skillCatBackend: "ระบบหลังบ้านและฐานข้อมูล (Backend & DB)",
    skillCatTools: "เครื่องมือและเดฟออปส์ (Tools & DevOps)",
    skillProficiency: "ระดับความชำนาญ",

    // Experience
    expSectionTitle: "ประสบการณ์ทำงาน",
    expSectionSubtitle: "ประวัติงานฝึกงาน และงาน Part-time / Freelance ในสายเทคโนโลยี",
    expInternshipBadge: "งานฝึกงาน",
    expParttimeBadge: "งาน Part-time",
    expFreelanceBadge: "ฟรีแลนซ์",
    expTechStackLabel: "เทคโนโลยีที่ใช้:",

    // Projects
    projectsSectionTitle: "ผลงานของฉัน",
    projectsSectionSubtitle: "โปรเจกต์เว็บแอปพลิเคชันและผลงานทางเทคโนโลยีที่ภาคภูมิใจ",
    filterAll: "ทั้งหมด",
    filterFullStack: "Full-Stack",
    filterFrontend: "Frontend",
    filterBackend: "Backend",
    btnAddProject: "เพิ่มผลงานใหม่",
    btnEdit: "แก้ไข",
    btnDelete: "ลบ",
    btnChangeImage: "ใส่/เปลี่ยนรูปภาพ",
    btnDemo: "เปิดดูเว็บจริง",
    btnCode: "ดูซอร์สโค้ด",
    emptyProjects: "ไม่พบผลงานในหมวดหมู่นี้",

    // Certifications
    certsSectionTitle: "การฝึกอบรม & ใบรับรอง",
    certsSectionSubtitle: "ใบรับรองมาตรฐานวิชาชีพและการฝึกอบรมเพื่อพัฒนาทักษะเฉพาะด้าน",
    btnAddCert: "เพิ่มใบรับรองใหม่",
    btnViewPdf: "เปิดดู PDF",
    btnAttachPdf: "แนบไฟล์ PDF",
    certIssuerLabel: "ผู้ออกใบรับรอง",
    certIssueDateLabel: "วันที่ได้รับ",
    certCredentialLabel: "รหัสใบรับรอง",
    emptyCerts: "ยังไม่มีรายการใบรับรองในขณะนี้",

    // Project Modal
    modalAddProjectTitle: "เพิ่มผลงานโปรเจกต์ใหม่",
    modalEditProjectTitle: "แก้ไขข้อมูลผลงานโปรเจกต์",
    modalLabelTitleTh: "ชื่อโปรเจกต์ (ภาษาไทย)",
    modalLabelTitleEn: "ชื่อโปรเจกต์ (English)",
    modalLabelCategory: "หมวดหมู่ผลงาน",
    modalLabelDescTh: "รายละเอียดโปรเจกต์ (ภาษาไทย)",
    modalLabelDescEn: "รายละเอียดโปรเจกต์ (English)",
    modalLabelTags: "เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค เช่น React, Node.js)",
    modalLabelDemo: "ลิงก์เว็บตัวอย่าง (Live Demo URL)",
    modalLabelGithub: "ลิงก์ GitHub Repository",
    modalLabelImage: "รูปภาพหน้าปกโปรเจกต์ (อัปโหลดจากเครื่อง)",
    modalBtnSave: "บันทึกข้อมูล",
    modalBtnCancel: "ยกเลิก",

    // Cert Modal
    modalAddCertTitle: "เพิ่มใบรับรองใหม่",
    modalEditCertTitle: "แก้ไขข้อมูลใบรับรอง",
    modalLabelCertNameTh: "ชื่อใบรับรอง (ภาษาไทย)",
    modalLabelCertNameEn: "ชื่อใบรับรอง (English)",
    modalLabelCertIssuer: "สถาบัน / องค์กรผู้ออกใบรับรอง",
    modalLabelCertDate: "ปี-เดือนที่ได้รับ (เช่น 2026-03)",
    modalLabelCertId: "รหัสอ้างอิงใบรับรอง (Credential ID)",
    modalLabelCertCategory: "หมวดหมู่ / ด้านความรู้",
    modalLabelCertDescTh: "คำอธิบายหลักสูตร (ภาษาไทย)",
    modalLabelCertDescEn: "คำอธิบายหลักสูตร (English)",
    modalLabelCertPdf: "แนบไฟล์เอกสารใบรับรอง (PDF)",

    // Confirmations & Toasts
    confirmDeleteProject: "คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?",
    confirmDeleteCert: "คุณแน่ใจหรือไม่ว่าต้องการลบใบรับรองนี้?",
    toastAvatarUpdated: "อัปเดตรูปภาพโปรไฟล์เรียบร้อยแล้ว!",
    toastProjectAdded: "เพิ่มผลงานโปรเจกต์ใหม่สำเร็จ!",
    toastProjectUpdated: "อัปเดตข้อมูลผลงานโปรเจกต์สำเร็จ!",
    toastProjectDeleted: "ลบผลงานโปรเจกต์เรียบร้อยแล้ว!",
    toastProjectImageUpdated: "เปลี่ยนรูปภาพผลงานโปรเจกต์เรียบร้อยแล้ว!",
    toastCertAdded: "เพิ่มข้อมูลใบรับรองใหม่สำเร็จ!",
    toastCertUpdated: "อัปเดตข้อมูลใบรับรองสำเร็จ!",
    toastCertDeleted: "ลบข้อมูลใบรับรองเรียบร้อยแล้ว!",
    toastPdfAttached: "แนบไฟล์เอกสาร PDF สำเร็จแล้ว!",
    toastCopied: "คัดลอกอีเมลลงในคลิปบอร์ดแล้ว!",
    toastThemeSwitched: "สลับโหมดการแสดงผลเรียบร้อยแล้ว",
    toastLangSwitched: "เปลี่ยนภาษาเป็นภาษาไทยแล้ว",

    // Cloudflare Footer
    cfBadgeTitle: "Cloudflare Ready Architecture",
    cfBadgeDesc: "รองรับการเชื่อมต่อ Cloudflare Pages, D1 Database และ R2 Object Storage",
    footerCopy: "สร้างขึ้นด้วย HTML5, Tailwind CSS & Vanilla JS • Glassmorphism Style"
  },
  en: {
    // Navigation
    navPersonal: "Personal Details",
    navEducation: "Education",
    navSkills: "Technical Skills",
    navExperience: "Experience",
    navProjects: "My Projects",
    navCertifications: "Certifications",
    navBadge: "ICT Student Portfolio",
    navStatus: "Available for Hire / Open to Work",

    // Hero & Profile
    heroGreeting: "Hello, I am",
    heroRoleDefault: "2nd Year ICT Student • Sripatum University (Bangkhen)",
    heroGpaxLabel: "Academic Status",
    heroEmailLabel: "Email Address",
    heroPhoneLabel: "Phone Number",
    heroLocationLabel: "Location",
    heroChangePhoto: "Click to change profile picture",
    heroBtnContact: "Contact Me",
    heroBtnCV: "Download Resume / CV",
    heroQuickStatsYears: "2nd Year",
    heroQuickStatsYearsSub: "Faculty of IT",
    heroQuickStatsProjects: "Open to Work",
    heroQuickStatsProjectsSub: "Internship / Co-op",
    heroQuickStatsCerts: "SPU",
    heroQuickStatsCertsSub: "Bangkhen Campus",

    // Education
    eduSectionTitle: "Education History",
    eduSectionSubtitle: "Currently 2nd-year ICT student at Sripatum University (Bangkhen)",
    eduDegreeLabel: "Degree",
    eduMajorLabel: "Major",
    eduUnivLabel: "Institution",
    eduPeriodLabel: "Academic Period",
    eduGpaxLabel: "Year Level",
    eduCourseworkLabel: "Relevant Coursework",
    eduHighlightBadge: "2nd Year Undergraduate",

    // Skills
    skillsSectionTitle: "Technical Competencies",
    skillsSectionSubtitle: "Proficiency across modern technologies and software development stacks",
    skillCatLanguages: "Programming Languages",
    skillCatFrontend: "Frontend Development",
    skillCatBackend: "Backend & Database",
    skillCatTools: "Tools & DevOps",
    skillProficiency: "Proficiency",

    // Experience
    expSectionTitle: "Work Experience",
    expSectionSubtitle: "Chronological journey of professional internships and part-time tech roles",
    expInternshipBadge: "Internship",
    expParttimeBadge: "Part-time Job",
    expFreelanceBadge: "Freelance",
    expTechStackLabel: "Technologies:",

    // Projects
    projectsSectionTitle: "My Projects",
    projectsSectionSubtitle: "Selected software engineering and web application projects",
    filterAll: "All",
    filterFullStack: "Full-Stack",
    filterFrontend: "Frontend",
    filterBackend: "Backend",
    btnAddProject: "Add New Project",
    btnEdit: "Edit",
    btnDelete: "Delete",
    btnChangeImage: "Set/Change Image",
    btnDemo: "Live Demo",
    btnCode: "Source Code",
    emptyProjects: "No projects found under this category",

    // Certifications
    certsSectionTitle: "Training & Certifications",
    certsSectionSubtitle: "Professional credentials and specialized certifications in technology",
    btnAddCert: "Add New Certificate",
    btnViewPdf: "View PDF",
    btnAttachPdf: "Attach PDF",
    certIssuerLabel: "Issuing Organization",
    certIssueDateLabel: "Issue Date",
    certCredentialLabel: "Credential ID",
    emptyCerts: "No certifications added yet",

    // Project Modal
    modalAddProjectTitle: "Add New Project",
    modalEditProjectTitle: "Edit Project Details",
    modalLabelTitleTh: "Project Title (Thai)",
    modalLabelTitleEn: "Project Title (English)",
    modalLabelCategory: "Category",
    modalLabelDescTh: "Project Description (Thai)",
    modalLabelDescEn: "Project Description (English)",
    modalLabelTags: "Technologies (Comma separated: React, Node.js)",
    modalLabelDemo: "Live Demo URL",
    modalLabelGithub: "GitHub Repository URL",
    modalLabelImage: "Project Cover Image (Local upload)",
    modalBtnSave: "Save Project",
    modalBtnCancel: "Cancel",

    // Cert Modal
    modalAddCertTitle: "Add New Certificate",
    modalEditCertTitle: "Edit Certificate Details",
    modalLabelCertNameTh: "Certificate Name (Thai)",
    modalLabelCertNameEn: "Certificate Name (English)",
    modalLabelCertIssuer: "Issuing Organization",
    modalLabelCertDate: "Issue Year-Month (e.g. 2026-03)",
    modalLabelCertId: "Credential ID / License",
    modalLabelCertCategory: "Category / Domain",
    modalLabelCertDescTh: "Description (Thai)",
    modalLabelCertDescEn: "Description (English)",
    modalLabelCertPdf: "Attach Certificate Document (PDF)",

    // Confirmations & Toasts
    confirmDeleteProject: "Are you sure you want to delete this project?",
    confirmDeleteCert: "Are you sure you want to delete this certificate?",
    toastAvatarUpdated: "Profile picture updated successfully!",
    toastProjectAdded: "New project added successfully!",
    toastProjectUpdated: "Project details updated successfully!",
    toastProjectDeleted: "Project deleted successfully!",
    toastProjectImageUpdated: "Project image updated successfully!",
    toastCertAdded: "New certificate added successfully!",
    toastCertUpdated: "Certificate updated successfully!",
    toastCertDeleted: "Certificate deleted successfully!",
    toastPdfAttached: "PDF certificate document attached successfully!",
    toastCopied: "Email address copied to clipboard!",
    toastThemeSwitched: "Display theme toggled successfully",
    toastLangSwitched: "Language switched to English",

    // Cloudflare Footer
    cfBadgeTitle: "Cloudflare Ready Architecture",
    cfBadgeDesc: "Engineered for Cloudflare Pages, D1 SQLite Database, and R2 Object Storage",
    footerCopy: "Crafted with HTML5, Tailwind CSS & Vanilla JS • Glassmorphism Style"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('portfolio_lang') || 'th';
  }

  get(key) {
    return TRANSLATIONS[this.currentLang]?.[key] || TRANSLATIONS['th']?.[key] || key;
  }

  setLang(lang) {
    if (lang !== 'th' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    this.apply();
  }

  toggle() {
    const nextLang = this.currentLang === 'th' ? 'en' : 'th';
    this.setLang(nextLang);
    if (window.Toast) {
      window.Toast.info(this.get('toastLangSwitched'));
    }
  }

  apply() {
    // Update data-i18n text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.get(key);
      if (val) el.textContent = val;
    });

    // Update data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.get(key);
      if (val) el.setAttribute('placeholder', val);
    });

    // Update data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = this.get(key);
      if (val) el.setAttribute('title', val);
    });

    // Update Language Button state
    const thBtn = document.getElementById('lang-btn-th');
    const enBtn = document.getElementById('lang-btn-en');
    const currentLangLabel = document.getElementById('current-lang-code');

    if (currentLangLabel) {
      currentLangLabel.textContent = this.currentLang.toUpperCase();
    }

    if (thBtn && enBtn) {
      if (this.currentLang === 'th') {
        thBtn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        thBtn.classList.remove('text-slate-400');
        enBtn.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        enBtn.classList.add('text-slate-400');
      } else {
        enBtn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        enBtn.classList.remove('text-slate-400');
        thBtn.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        thBtn.classList.add('text-slate-400');
      }
    }

    // Trigger re-render of dynamic sections (projects, certs, experiences, hero)
    if (window.renderHero) window.renderHero();
    if (window.renderEducation) window.renderEducation();
    if (window.renderSkills) window.renderSkills();
    if (window.renderExperiences) window.renderExperiences();
    if (window.renderProjects) window.renderProjects();
    if (window.renderCertifications) window.renderCertifications();
  }
}

const I18n = new I18nManager();
window.I18n = I18n;
