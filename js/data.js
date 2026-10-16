// Initial Default Data for Chinathip Sriwaranon (ชินาธิป ศรีวรานนท์)
const DEFAULT_PROFILE = {
  nameTh: "ชินาธิป ศรีวรานนท์",
  nameEn: "Chinathip Sriwaranon",
  roleTh: "นักศึกษาคณะเทคโนโลยีสารสนเทศ (ICT) ชั้นปีที่ 2",
  roleEn: "2nd Year ICT Student",
  bioTh: "กำลังศึกษาชั้นปีที่ 2 คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยศรีปทุม (บางเขน) มีความมุ่งมั่นในการเรียนรู้ด้านการพัฒนาเว็บไซต์ เทคโนโลยีสารสนเทศ และระบบคอมพิวเตอร์ พร้อมเปิดรับโอกาสในการเรียนรู้และพัฒนาตนเอง",
  bioEn: "2nd-year undergraduate student in Information and Communication Technology (ICT), Faculty of Information Technology at Sripatum University (Bangkhen). Eager to learn web technologies and open to opportunities.",
  gpax: "ชั้นปีที่ 2",
  email: "deede4500@gmail.com",
  phone: "093-210-9040",
  locationTh: "นครปฐม, ประเทศไทย",
  locationEn: "Nakhon Pathom, Thailand",
  github: "https://github.com/Chinathipsriwaranon",
  avatar: "img/profile.png"
};

const DEFAULT_EDUCATION = {
  degreeTh: "ระดับปริญญาตรี (กำลังศึกษาชั้นปีที่ 2)",
  degreeEn: "Bachelor's Degree (2nd Year Undergraduate)",
  facultyTh: "คณะเทคโนโลยีสารสนเทศ",
  facultyEn: "Faculty of Information Technology",
  majorTh: "สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)",
  majorEn: "Information and Communication Technology (ICT)",
  universityTh: "มหาวิทยาลัยศรีปทุม (บางเขน)",
  universityEn: "Sripatum University (Bangkhen)",
  period: "กำลังศึกษา (2025 - ปัจจุบัน)",
  gpax: "ชั้นปีที่ 2 (Sophomore)",
  courseworkTh: "การเขียนโปรแกรมคอมพิวเตอร์, การพัฒนาเว็บไซต์, ระบบฐานข้อมูล, เครือข่ายคอมพิวเตอร์เบื้องต้น, เทคโนโลยีสารสนเทศและการสื่อสาร",
  courseworkEn: "Computer Programming, Web Development, Database Systems, Computer Networks, Information and Communication Technology"
};

const DEFAULT_SKILLS = [
  {
    category: "languages",
    titleTh: "ภาษาคอมพิวเตอร์ (Programming Languages)",
    titleEn: "Programming Languages",
    icon: "fa-solid fa-code",
    items: [
      { name: "JavaScript (ES6+)", level: 80, icon: "fa-brands fa-js" },
      { name: "HTML5 / CSS3", level: 85, icon: "fa-brands fa-html5" },
      { name: "Python", level: 75, icon: "fa-brands fa-python" },
      { name: "SQL", level: 70, icon: "fa-solid fa-database" },
      { name: "C / C++", level: 65, icon: "fa-solid fa-terminal" }
    ]
  },
  {
    category: "frontend",
    titleTh: "การพัฒนาส่วนติดต่อผู้ใช้ (Frontend)",
    titleEn: "Frontend Development",
    icon: "fa-solid fa-palette",
    items: [
      { name: "HTML5 Semantic", level: 85, icon: "fa-brands fa-html5" },
      { name: "Tailwind CSS", level: 80, icon: "fa-solid fa-wind" },
      { name: "CSS Grid & Flexbox", level: 85, icon: "fa-solid fa-border-all" },
      { name: "Responsive Web Design", level: 80, icon: "fa-solid fa-mobile-screen" }
    ]
  },
  {
    category: "backend",
    titleTh: "ระบบหลังบ้านและฐานข้อมูล (Backend & Database)",
    titleEn: "Backend & Database",
    icon: "fa-solid fa-server",
    items: [
      { name: "Node.js (พื้นฐาน)", level: 65, icon: "fa-brands fa-node-js" },
      { name: "MySQL / PostgreSQL", level: 70, icon: "fa-solid fa-database" },
      { name: "REST API Concept", level: 70, icon: "fa-solid fa-network-wired" },
      { name: "Cloudflare D1 & Pages", level: 65, icon: "fa-solid fa-cloud" }
    ]
  },
  {
    category: "tools",
    titleTh: "เครื่องมือและโปรแกรม (Tools & Environment)",
    titleEn: "Tools & Environment",
    icon: "fa-solid fa-screwdriver-wrench",
    items: [
      { name: "Git & GitHub", level: 80, icon: "fa-brands fa-github" },
      { name: "Visual Studio Code", level: 90, icon: "fa-solid fa-code" },
      { name: "Figma (UI Design)", level: 75, icon: "fa-brands fa-figma" },
      { name: "Postman", level: 70, icon: "fa-solid fa-paper-plane" }
    ]
  }
];

// ประสบการณ์ทำงาน: ยังไม่มี (พร้อมเปิดรับโอกาสการฝึกงาน)
const DEFAULT_EXPERIENCES = [];

// ผลงานของฉัน: ยังไม่มี (พร้อมสำหรับเพิ่มผลงานใหม่ผ่านระบบ CRUD)
const DEFAULT_PROJECTS = [];

const DEFAULT_CERTIFICATIONS = [];
