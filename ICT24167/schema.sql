-- Cloudflare D1 Database Schema & Seed Data for ICT Student Portfolio

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id TEXT PRIMARY KEY DEFAULT 'main-profile',
  name_th TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_th TEXT NOT NULL,
  role_en TEXT NOT NULL,
  bio_th TEXT,
  bio_en TEXT,
  gpax TEXT,
  email TEXT,
  phone TEXT,
  location_th TEXT,
  location_en TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title_th TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('fullstack', 'frontend', 'backend')),
  description_th TEXT,
  description_en TEXT,
  tags TEXT, -- JSON array string, e.g. '["React","Node.js"]'
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  name_th TEXT NOT NULL,
  name_en TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_id TEXT,
  category TEXT,
  description_th TEXT,
  description_en TEXT,
  pdf_r2_key TEXT, -- Key in Cloudflare R2 bucket
  pdf_filename TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Work Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_th TEXT NOT NULL,
  role_en TEXT NOT NULL,
  company_th TEXT NOT NULL,
  company_en TEXT NOT NULL,
  period_th TEXT NOT NULL,
  period_en TEXT NOT NULL,
  type_th TEXT NOT NULL,
  type_en TEXT NOT NULL,
  description_th TEXT,
  description_en TEXT,
  tech_stack TEXT, -- JSON array string
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- SEED DATA
-- =============================================

INSERT OR REPLACE INTO profile (
  id, name_th, name_en, role_th, role_en, bio_th, bio_en, gpax, email, phone, location_th, location_en, github_url, linkedin_url, avatar_url
) VALUES (
  'main-profile',
  'ชินาธิป ศรีวรานนท์',
  'Chinathip Sriwaranon',
  'นักศึกษาคณะเทคโนโลยีสารสนเทศ (ICT) ชั้นปีที่ 2 • มหาวิทยาลัยศรีปทุม (บางเขน)',
  '2nd Year ICT Student • Sripatum University (Bangkhen)',
  'กำลังศึกษาชั้นปีที่ 2 คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยศรีปทุม (บางเขน) มีความมุ่งมั่นในการเรียนรู้ด้านการพัฒนาเว็บไซต์ เทคโนโลยีสารสนเทศ และระบบคอมพิวเตอร์ พร้อมเปิดรับโอกาสในการเรียนรู้และพัฒนาตนเอง',
  '2nd-year undergraduate student in Information and Communication Technology (ICT), Faculty of Information Technology at Sripatum University (Bangkhen). Eager to learn web technologies and open to opportunities.',
  'ชั้นปีที่ 2',
  'deede4500@gmail.com',
  '093-210-9040',
  'นครปฐม, ประเทศไทย',
  'Nakhon Pathom, Thailand',
  'https://github.com/Chinathipsriwaranon',
  NULL,
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80'
);

INSERT OR REPLACE INTO projects (id, title_th, title_en, category, description_th, description_en, tags, image_url, demo_url, github_url) VALUES
('proj-1', 
 'CampusSync - ระบบบริหารจัดการกิจกรรมและสโมสรนักศึกษา', 
 'CampusSync - Student Activity & Club Management Portal', 
 'fullstack', 
 'เว็บแอปพลิเคชันแบบครบวงจรสำหรับลงทะเบียนกิจกรรมมหาวิทยาลัย ตรวจสอบชั่วโมงกิจกรรม และระบบจองห้องประชุมชมรม พร้อมระบบแจ้งเตือนผ่าน LINE Notify และ QR Code Check-in', 
 'Comprehensive campus web portal for university activity registration, student activity hours tracking, room booking system, QR Code check-in, and automated LINE notifications.', 
 '["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Cloudflare D1"]', 
 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80', 
 'https://example.com/campussync', 
 'https://github.com/example/campussync'),

('proj-2', 
 'IoTFarm Dashboard - แดชบอร์ดตรวจสอบและควบคุมฟาร์มอัจฉริยะ', 
 'IoTFarm Dashboard - Smart Agriculture Realtime Monitor', 
 'frontend', 
 'หน้าควบคุมแสดงผลข้อมูลเซนเซอร์วัดความชื้น อุณหภูมิ แสง และการให้น้ำแบบเรียลไทม์ผ่าน WebSocket แสดงผลด้วยกราฟสถิติ互動 และรองรับการแจ้งเตือนเมื่อค่าผิดปกติ', 
 'Interactive real-time telemetry dashboard monitoring soil moisture, temperature, ambient light, and automated irrigation via WebSockets with dynamic Chart.js visualizations.', 
 '["Vue.js", "Tailwind CSS", "Chart.js", "WebSocket", "IoT"]', 
 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80', 
 'https://example.com/iot-farm', 
 'https://github.com/example/iot-farm'),

('proj-3', 
 'DevQuery REST API - ระบบบริการแลกเปลี่ยนความรู้ด้านไอที', 
 'DevQuery REST API - Tech Knowledge Sharing Microservice', 
 'backend', 
 'ระบบ Backend API สำหรับแชร์บทความและคำถาม-ตอบทางเทคนิค มีระบบ Authentication แบบ JWT, Rate Limiting, Full-text Search และแคชข้อมูลด้วย Redis ลดภาระของฐานข้อมูลได้ 60%', 
 'High-performance backend REST API service for developer Q&A and technical blogging with JWT authentication, Redis caching, rate limiting, and full-text search.', 
 '["FastAPI", "Python", "PostgreSQL", "Redis", "Docker"]', 
 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80', 
 'https://example.com/devquery-api/docs', 
 'https://github.com/example/devquery-api');

INSERT OR REPLACE INTO certifications (id, name_th, name_en, issuer, issue_date, credential_id, category, description_th, description_en, pdf_r2_key, pdf_filename) VALUES
('cert-1',
 'Cloudflare Certified Associate: Cloud & Edge Computing',
 'Cloudflare Certified Associate: Cloud & Edge Computing',
 'Cloudflare',
 '2026-03',
 'CF-8892147-ICT',
 'Cloud & Edge',
 'ความเชี่ยวชาญด้าน Edge Computing, Cloudflare Pages, Workers, D1 Database, CDN Caching และ Web Application Firewall (WAF)',
 'Expertise in edge serverless computing, Cloudflare Pages, Workers, D1 distributed SQL, and DNS security.',
 NULL,
 'Cloudflare_Associate_Certification.pdf'),

('cert-2',
 'AWS Certified Cloud Practitioner (CLF-C02)',
 'AWS Certified Cloud Practitioner (CLF-C02)',
 'Amazon Web Services (AWS)',
 '2025-11',
 'AWS-CCP-992014',
 'Cloud',
 'รับรองความรู้พื้นฐานเกี่ยวกับโครงสร้างพื้นฐานระบบคลาวด์ การจัดการความปลอดภัยบน AWS (IAM, VPC, S3, EC2, RDS)',
 'Demonstrates core knowledge of cloud concepts, security compliance, architecture, and core AWS services.',
 NULL,
 'AWS_Certified_Cloud_Practitioner.pdf');
