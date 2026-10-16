// Main Application Controller & Dynamic Section Renderers
class PortfolioApp {
  constructor() {
    this.profile = this.loadProfile();
    this.theme = localStorage.getItem('portfolio_theme') || 'dark';
    this.isMobileMenuOpen = false;
  }

  loadProfile() {
    try {
      const saved = localStorage.getItem('portfolio_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.nameTh === DEFAULT_PROFILE.nameTh) {
          if (!parsed.avatar || parsed.avatar.includes('unsplash.com')) {
            parsed.avatar = DEFAULT_PROFILE.avatar;
            this.saveProfile(parsed);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading profile:', e);
    }
    const prof = { ...DEFAULT_PROFILE };
    this.saveProfile(prof);
    return prof;
  }

  saveProfile(customProf = null) {
    try {
      localStorage.setItem('portfolio_profile', JSON.stringify(customProf || this.profile));
    } catch (e) {
      console.warn('Error saving profile:', e);
    }
  }

  init() {
    this.applyTheme(this.theme);
    this.bindEvents();
    this.renderAll();
    this.initScrollSpy();

    // Check Cloudflare connection hint
    console.log('%c🚀 Cloudflare Pages & D1 Ready Portfolio Initialized', 'color: #06b6d4; font-size: 14px; font-weight: bold;');
  }

  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('portfolio_theme', theme);
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-toggle-icon');

    if (theme === 'light') {
      html.classList.add('light-theme');
      html.classList.remove('dark');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon text-amber-500';
      }
    } else {
      html.classList.remove('light-theme');
      html.classList.add('dark');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun text-cyan-400';
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    if (window.Toast) {
      window.Toast.info(window.I18n ? window.I18n.get('toastThemeSwitched') : 'สลับธีมเรียบร้อย');
    }
  }

  bindEvents() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Language toggle buttons
    const langBtnTh = document.getElementById('lang-btn-th');
    const langBtnEn = document.getElementById('lang-btn-en');
    if (langBtnTh) langBtnTh.addEventListener('click', () => window.I18n && window.I18n.setLang('th'));
    if (langBtnEn) langBtnEn.addEventListener('click', () => window.I18n && window.I18n.setLang('en'));

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        this.toggleMobileSidebar();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeMobileSidebar();
      });
    }

    // Close mobile menu on clicking any nav link
    document.querySelectorAll('#sidebar nav a').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileSidebar();
      });
    });

    // Profile photo upload input
    const avatarInput = document.getElementById('profile-avatar-input');
    if (avatarInput) {
      avatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
    }

    // Project modal form submit
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
      projectForm.addEventListener('submit', (e) => window.ProjectApp && window.ProjectApp.handleFormSubmit(e));
    }

    // Cert modal form submit
    const certForm = document.getElementById('cert-form');
    if (certForm) {
      certForm.addEventListener('submit', (e) => window.CertApp && window.CertApp.handleFormSubmit(e));
    }

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (window.ProjectApp) window.ProjectApp.closeModal();
        if (window.CertApp) {
          window.CertApp.closeModal();
          window.CertApp.closePdfModal();
        }
      }
    });
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('translate-x-0');
      overlay.classList.remove('hidden');
    } else {
      this.closeMobileSidebar();
    }
  }

  closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    this.isMobileMenuOpen = false;
    if (sidebar) {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('translate-x-0');
    }
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }

  handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      if (window.Toast) window.Toast.warning('กรุณาเลือกไฟล์ภาพขนาดไม่เกิน 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.profile.avatar = event.target.result;
      this.saveProfile();
      this.renderHero();
      if (window.Toast) {
        window.Toast.success(window.I18n ? window.I18n.get('toastAvatarUpdated') : 'อัปเดตรูปภาพโปรไฟล์เรียบร้อยแล้ว!');
      }
    };
    reader.readAsDataURL(file);
  }

  copyEmail() {
    navigator.clipboard.writeText(this.profile.email).then(() => {
      if (window.Toast) {
        window.Toast.success(window.I18n ? window.I18n.get('toastCopied') : 'คัดลอกอีเมลลงในคลิปบอร์ดแล้ว!');
      }
    }).catch(() => {
      if (window.Toast) window.Toast.info(this.profile.email);
    });
  }

  renderAll() {
    this.renderHero();
    this.renderEducation();
    this.renderSkills();
    this.renderExperiences();
    if (window.ProjectApp) window.ProjectApp.render();
    if (window.CertApp) window.CertApp.render();
    if (window.I18n) window.I18n.apply();
  }

  renderHero() {
    const lang = window.I18n ? window.I18n.currentLang : 'th';
    const name = lang === 'th' ? this.profile.nameTh : this.profile.nameEn;
    const role = lang === 'th' ? this.profile.roleTh : this.profile.roleEn;
    const bio = lang === 'th' ? this.profile.bioTh : this.profile.bioEn;
    const location = lang === 'th' ? this.profile.locationTh : this.profile.locationEn;

    const elName = document.getElementById('hero-name');
    const elRole = document.getElementById('hero-role');
    const elBio = document.getElementById('hero-bio');
    const elGpax = document.getElementById('hero-gpax');
    const elEmail = document.getElementById('hero-email');
    const elPhone = document.getElementById('hero-phone');
    const elLocation = document.getElementById('hero-location');
    const elAvatar = document.getElementById('hero-avatar-img');
    const elSidebarAvatar = document.getElementById('sidebar-avatar-img');
    const elSidebarName = document.getElementById('sidebar-name');
    const elSidebarRole = document.getElementById('sidebar-role');

    if (elName) elName.textContent = name;
    if (elRole) elRole.textContent = role;
    if (elBio) elBio.textContent = bio;
    if (elGpax) elGpax.textContent = this.profile.gpax;
    if (elEmail) elEmail.textContent = this.profile.email;
    if (elPhone) elPhone.textContent = this.profile.phone;
    if (elLocation) elLocation.textContent = location;

    if (elAvatar) elAvatar.src = this.profile.avatar;
    if (elSidebarAvatar) elSidebarAvatar.src = this.profile.avatar;
    if (elSidebarName) elSidebarName.textContent = name;
    if (elSidebarRole) elSidebarRole.textContent = role;
  }

  renderEducation() {
    const container = document.getElementById('education-content');
    if (!container) return;

    const lang = window.I18n ? window.I18n.currentLang : 'th';
    const edu = DEFAULT_EDUCATION;

    const degree = lang === 'th' ? edu.degreeTh : edu.degreeEn;
    const major = lang === 'th' ? `${edu.facultyTh} • ${edu.majorTh}` : `${edu.facultyEn} • ${edu.majorEn}`;
    const univ = lang === 'th' ? edu.universityTh : edu.universityEn;
    const coursework = lang === 'th' ? edu.courseworkTh : edu.courseworkEn;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-500/20 relative overflow-hidden shadow-2xl">
        <!-- Ambient corner glows -->
        <div class="absolute -top-24 -right-24 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div class="flex items-start gap-4 sm:gap-5">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-300 to-indigo-300 p-0.5 shadow-md shadow-emerald-500/15 shrink-0">
              <div class="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-emerald-300 text-2xl sm:text-3xl">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
                <i class="fa-solid fa-user-graduate text-emerald-300 text-[10px]"></i>
                ${lang === 'th' ? 'กำลังศึกษา ชั้นปีที่ 2' : '2nd Year ICT Undergraduate'}
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-slate-100">${degree}</h3>
              <p class="text-base sm:text-lg font-semibold text-emerald-300 mt-1">${major}</p>
              <p class="text-sm text-slate-300 mt-1 flex items-center gap-2">
                <i class="fa-solid fa-school text-emerald-400"></i>
                ${univ}
              </p>
            </div>
          </div>

          <div class="flex flex-row lg:flex-col items-start lg:items-end justify-between gap-2 shrink-0 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
            <div class="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <i class="fa-regular fa-calendar-check text-emerald-400"></i>
              <span>${edu.period}</span>
            </div>
            <div class="text-right">
              <div class="text-xs text-slate-400">${lang === 'th' ? 'ระดับการศึกษา' : 'Academic Year'}</div>
              <div class="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-indigo-300">
                ${DEFAULT_PROFILE.gpax}
              </div>
            </div>
          </div>
        </div>

        <!-- Coursework & Academic Highlights -->
        <div class="mt-6 pt-2">
          <h4 class="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
            <i class="fa-solid fa-book-open text-emerald-400"></i>
            <span>${window.I18n ? window.I18n.get('eduCourseworkLabel') : 'วิชาสำคัญที่เกี่ยวข้อง'}</span>
          </h4>
          <div class="flex flex-wrap gap-2">
            ${coursework.split(', ').map(item => `
              <span class="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/30 text-xs transition-colors">
                ${item}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderSkills() {
    const container = document.getElementById('skills-content');
    if (!container) return;

    const lang = window.I18n ? window.I18n.currentLang : 'th';

    container.innerHTML = DEFAULT_SKILLS.map(cat => {
      const title = lang === 'th' ? cat.titleTh : cat.titleEn;

      return `
        <div class="glass-card rounded-2xl p-6 border border-emerald-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-lg">
              <i class="${cat.icon}"></i>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-100">${title}</h3>
          </div>

          <div class="space-y-4">
            ${cat.items.map(skill => `
              <div>
                <div class="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
                  <span class="text-slate-200 flex items-center gap-2">
                    <i class="${skill.icon} text-emerald-300 w-4 text-center"></i>
                    ${skill.name}
                  </span>
                  <span class="text-emerald-300 font-mono text-xs">${skill.level}%</span>
                </div>
                <div class="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-white/5">
                  <div 
                    class="h-full rounded-full bg-gradient-to-r from-emerald-300 to-indigo-300 transition-all duration-1000 ease-out" 
                    style="width: ${skill.level}%"
                  ></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  renderExperiences() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    const lang = window.I18n ? window.I18n.currentLang : 'th';

    if (DEFAULT_EXPERIENCES.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-8 border border-dashed border-cyan-500/30 text-center relative overflow-hidden">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-100">
            ${lang === 'th' ? 'ยังไม่มีประวัติการทำงานในขณะนี้' : 'No Work Experience Yet'}
          </h3>
          <p class="text-sm text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
            ${lang === 'th' 
              ? 'ปัจจุบันกำลังศึกษาชั้นปีที่ 2 คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยศรีปทุม (บางเขน) มีความพร้อม มุ่งมั่น และเปิดรับโอกาสการฝึกงานและสหกิจศึกษาเพื่อเพิ่มพูนทักษะประสบการณ์จริง' 
              : 'Currently a 2nd-year ICT student at Faculty of Information Technology, Sripatum University (Bangkhen). Eager and actively open to internship and cooperative education opportunities.'}
          </p>
          <div class="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>${lang === 'th' ? 'เปิดรับโอกาสฝึกงาน / สหกิจศึกษา (Open for Internship)' : 'Open for Internship Opportunities'}</span>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-8 sm:space-y-12">
        ${DEFAULT_EXPERIENCES.map((exp, idx) => {
          const role = lang === 'th' ? exp.roleTh : exp.roleEn;
          const company = lang === 'th' ? exp.companyTh : exp.companyEn;
          const period = lang === 'th' ? exp.periodTh : exp.periodEn;
          const desc = lang === 'th' ? exp.descriptionTh : exp.descriptionEn;
          const type = lang === 'th' ? exp.typeTh : exp.typeEn;

          return `
            <div class="relative group">
              <!-- Timeline node dot -->
              <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-400/50"></div>

              <div class="glass-card rounded-2xl p-6 sm:p-7 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 w-fit">
                    <i class="fa-solid fa-briefcase text-cyan-400 text-[10px]"></i>
                    ${type}
                  </span>
                  <span class="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <i class="fa-regular fa-clock text-cyan-400"></i>
                    ${period}
                  </span>
                </div>

                <h3 class="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  ${role}
                </h3>

                <div class="text-sm font-semibold text-teal-400 mt-1 flex items-center gap-2">
                  <i class="fa-solid fa-building-circle-check"></i>
                  ${company}
                </div>

                <p class="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  ${desc}
                </p>

                <div class="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                  <span class="text-xs text-slate-400 mr-1">${window.I18n ? window.I18n.get('expTechStackLabel') : 'เทคโนโลยี:'}</span>
                  ${exp.techStack.map(t => `
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 border border-cyan-500/20">
                      ${t}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#sidebar nav a');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentId) {
              link.classList.add('active-nav-link');
              link.classList.remove('text-slate-400');
            } else {
              link.classList.remove('active-nav-link');
              link.classList.add('text-slate-400');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

// Global exposure
const App = new PortfolioApp();
window.PortfolioApp = App;
window.renderHero = () => App.renderHero();
window.renderEducation = () => App.renderEducation();
window.renderSkills = () => App.renderSkills();
window.renderExperiences = () => App.renderExperiences();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
