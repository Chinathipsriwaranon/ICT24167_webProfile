// Projects CRUD & Filter Management
class ProjectManager {
  constructor() {
    this.projects = this.loadProjects();
    this.currentFilter = 'all';
    this.editingId = null;
    this.tempImageBase64 = null;
    this.syncFromCloudflare();
  }

  async syncFromCloudflare() {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          this.projects = cloudData.map(p => ({
            id: p.id,
            titleTh: p.title_th || p.titleTh,
            titleEn: p.title_en || p.titleEn,
            category: p.category,
            descriptionTh: p.description_th || p.descriptionTh,
            descriptionEn: p.description_en || p.descriptionEn,
            tags: p.tags,
            image: p.image_url || p.image,
            demoUrl: p.demo_url || p.demoUrl,
            githubUrl: p.github_url || p.githubUrl
          }));
          this.render();
        }
      }
    } catch (_) {
      // Running statically without Cloudflare Functions backend
    }
  }

  loadProjects() {
    try {
      const version = localStorage.getItem('portfolio_user_version');
      if (version !== 'chinathip_v1') {
        localStorage.setItem('portfolio_user_version', 'chinathip_v1');
        localStorage.setItem('portfolio_projects', JSON.stringify([]));
        return [];
      }
      const saved = localStorage.getItem('portfolio_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading projects from localStorage:', e);
    }
    return [...DEFAULT_PROJECTS];
  }

  saveProjects() {
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(this.projects));
    } catch (e) {
      console.warn('Error saving projects to localStorage:', e);
      if (window.Toast) {
        window.Toast.warning('พื้นที่จัดเก็บข้อมูลเต็ม อาจจัดเก็บรูปขนาดใหญ่ไม่ได้');
      }
    }
  }

  setFilter(category) {
    this.currentFilter = category;
    this.render();
  }

  getFilteredProjects() {
    if (this.currentFilter === 'all') return this.projects;
    return this.projects.filter(p => p.category.toLowerCase() === this.currentFilter.toLowerCase());
  }

  render() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = this.getFilteredProjects();
    const lang = window.I18n ? window.I18n.currentLang : 'th';

    // Update filter button styles
    document.querySelectorAll('[data-project-filter]').forEach(btn => {
      const cat = btn.getAttribute('data-project-filter');
      if (cat === this.currentFilter) {
        btn.classList.add('bg-gradient-to-r', 'from-emerald-300', 'to-indigo-300', 'text-slate-950', 'shadow-md', 'font-bold');
        btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-gradient-to-r', 'from-emerald-300', 'to-indigo-300', 'text-slate-950', 'shadow-md', 'font-bold');
        btn.classList.add('bg-slate-800/60', 'text-slate-300', 'hover:bg-slate-800');
      }
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center glass-card rounded-2xl p-8 border border-dashed border-emerald-500/25">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-300 text-2xl">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <p class="text-slate-300 text-base font-medium">${window.I18n ? window.I18n.get('emptyProjects') : 'ยังไม่มีผลงานในขณะนี้ สามารถกดปุ่ม [➕ เพิ่มผลงานใหม่] เพื่อบันทึกผลงานโปรเจกต์ได้เลยครับ'}</p>
          <button type="button" onclick="ProjectApp.openModal()" class="mt-4 btn-pastel-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-950 text-sm font-bold shadow-md transition-all">
            <i class="fa-solid fa-plus"></i> ${window.I18n ? window.I18n.get('btnAddProject') : 'เพิ่มผลงานใหม่'}
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const title = lang === 'th' ? (item.titleTh || item.titleEn) : (item.titleEn || item.titleTh);
      const desc = lang === 'th' ? (item.descriptionTh || item.descriptionEn) : (item.descriptionEn || item.descriptionTh);
      const tags = Array.isArray(item.tags) ? item.tags : [];
      
      let badgeLabel = 'Full-Stack';
      let badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      if (item.category === 'frontend') {
        badgeLabel = 'Frontend';
        badgeColor = 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      } else if (item.category === 'backend') {
        badgeLabel = 'Backend';
        badgeColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      }

      return `
        <article class="glass-card group flex flex-col rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
          <!-- Image Container with Action Overlays -->
          <div class="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
            <img 
              src="${item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'}" 
              alt="${title}" 
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
            
            <!-- Category Badge -->
            <span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${badgeColor}">
              ${badgeLabel}
            </span>

            <!-- Quick Image Change Overlay Button -->
            <label 
              title="${window.I18n ? window.I18n.get('btnChangeImage') : 'เปลี่ยนรูปภาพ'}"
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer transition-all shadow-md group/btn"
            >
              <i class="fa-solid fa-camera text-xs"></i>
              <input type="file" accept="image/*" class="hidden" onchange="ProjectApp.changeProjectImage('${item.id}', this)" />
            </label>
          </div>

          <!-- Content Body -->
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              ${title}
            </h3>
            
            <p class="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed flex-1">
              ${desc}
            </p>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
              ${tags.map(tag => `
                <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  ${tag}
                </span>
              `).join('')}
            </div>

            <!-- Card Actions -->
            <div class="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-white/5">
              <div class="flex items-center gap-2">
                ${item.demoUrl ? `
                  <a href="${item.demoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all shadow-sm shadow-cyan-500/20">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>${window.I18n ? window.I18n.get('btnDemo') : 'Demo'}</span>
                  </a>
                ` : ''}
                ${item.githubUrl ? `
                  <a href="${item.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/10 transition-all">
                    <i class="fa-brands fa-github"></i>
                    <span>${window.I18n ? window.I18n.get('btnCode') : 'Code'}</span>
                  </a>
                ` : ''}
              </div>

              <!-- Edit & Delete Controls -->
              <div class="flex items-center gap-1">
                <button 
                  type="button" 
                  onclick="ProjectApp.openEditModal('${item.id}')" 
                  class="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 border border-white/5 flex items-center justify-center transition-all text-xs"
                  title="${window.I18n ? window.I18n.get('btnEdit') : 'แก้ไข'}"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                  type="button" 
                  onclick="ProjectApp.deleteProject('${item.id}')" 
                  class="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-white/5 flex items-center justify-center transition-all text-xs"
                  title="${window.I18n ? window.I18n.get('btnDelete') : 'ลบ'}"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  openModal(isEdit = false) {
    const modal = document.getElementById('project-modal');
    const form = document.getElementById('project-form');
    const modalTitle = document.getElementById('project-modal-title');
    if (!modal || !form) return;

    this.tempImageBase64 = null;
    const preview = document.getElementById('project-image-preview');
    if (preview) {
      preview.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80';
    }

    if (!isEdit) {
      this.editingId = null;
      form.reset();
      if (modalTitle) {
        modalTitle.textContent = window.I18n ? window.I18n.get('modalAddProjectTitle') : 'เพิ่มผลงานโปรเจกต์ใหม่';
      }
    } else {
      if (modalTitle) {
        modalTitle.textContent = window.I18n ? window.I18n.get('modalEditProjectTitle') : 'แก้ไขข้อมูลผลงานโปรเจกต์';
      }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  openEditModal(id) {
    const item = this.projects.find(p => p.id === id);
    if (!item) return;

    this.editingId = id;
    this.openModal(true);

    // Populate inputs
    document.getElementById('proj-title-th').value = item.titleTh || '';
    document.getElementById('proj-title-en').value = item.titleEn || '';
    document.getElementById('proj-category').value = item.category || 'fullstack';
    document.getElementById('proj-desc-th').value = item.descriptionTh || '';
    document.getElementById('proj-desc-en').value = item.descriptionEn || '';
    document.getElementById('proj-tags').value = (item.tags || []).join(', ');
    document.getElementById('proj-demo').value = item.demoUrl || '';
    document.getElementById('proj-github').value = item.githubUrl || '';

    const preview = document.getElementById('project-image-preview');
    if (preview && item.image) {
      preview.src = item.image;
      this.tempImageBase64 = item.image;
    }
  }

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    this.editingId = null;
    this.tempImageBase64 = null;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const titleTh = document.getElementById('proj-title-th').value.trim();
    const titleEn = document.getElementById('proj-title-en').value.trim();
    const category = document.getElementById('proj-category').value;
    const descTh = document.getElementById('proj-desc-th').value.trim();
    const descEn = document.getElementById('proj-desc-en').value.trim();
    const tagsStr = document.getElementById('proj-tags').value.trim();
    const demoUrl = document.getElementById('proj-demo').value.trim();
    const githubUrl = document.getElementById('proj-github').value.trim();

    if (!titleTh && !titleEn) {
      if (window.Toast) window.Toast.warning('กรุณากรอกชื่อโปรเจกต์');
      return;
    }

    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : ['Web App'];
    const image = this.tempImageBase64 || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80';

    if (this.editingId) {
      // Edit mode
      const idx = this.projects.findIndex(p => p.id === this.editingId);
      if (idx !== -1) {
        this.projects[idx] = {
          ...this.projects[idx],
          titleTh: titleTh || titleEn,
          titleEn: titleEn || titleTh,
          category,
          descriptionTh: descTh || descEn,
          descriptionEn: descEn || descTh,
          tags,
          demoUrl,
          githubUrl,
          image: this.tempImageBase64 || this.projects[idx].image
        };
        this.saveProjects();
        this.render();
        this.closeModal();
        if (window.Toast) window.Toast.success(window.I18n ? window.I18n.get('toastProjectUpdated') : 'อัปเดตข้อมูลผลงานสำเร็จ');
      }
    } else {
      // Add mode
      const newProject = {
        id: 'proj-' + Date.now(),
        titleTh: titleTh || titleEn,
        titleEn: titleEn || titleTh,
        category,
        descriptionTh: descTh || descEn,
        descriptionEn: descEn || descTh,
        tags,
        demoUrl,
        githubUrl,
        image
      };
      this.projects.unshift(newProject);
      this.saveProjects();
      this.render();
      this.closeModal();
      if (window.Toast) window.Toast.success(window.I18n ? window.I18n.get('toastProjectAdded') : 'เพิ่มผลงานใหม่สำเร็จ');
    }
  }

  deleteProject(id) {
    const confirmMsg = window.I18n ? window.I18n.get('confirmDeleteProject') : 'คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?';
    if (!confirm(confirmMsg)) return;

    this.projects = this.projects.filter(p => p.id !== id);
    this.saveProjects();
    this.render();
    if (window.Toast) window.Toast.info(window.I18n ? window.I18n.get('toastProjectDeleted') : 'ลบผลงานเรียบร้อยแล้ว');
  }

  changeProjectImage(id, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    // Check size < 4MB
    if (file.size > 4 * 1024 * 1024) {
      if (window.Toast) window.Toast.warning('กรุณาเลือกไฟล์ภาพขนาดไม่เกิน 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const idx = this.projects.findIndex(p => p.id === id);
      if (idx !== -1) {
        this.projects[idx].image = base64;
        this.saveProjects();
        this.render();
        if (window.Toast) window.Toast.success(window.I18n ? window.I18n.get('toastProjectImageUpdated') : 'เปลี่ยนรูปภาพผลงานเรียบร้อยแล้ว');
      }
    };
    reader.readAsDataURL(file);
  }

  handleModalImageUpload(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      if (window.Toast) window.Toast.warning('กรุณาเลือกไฟล์ภาพขนาดไม่เกิน 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.tempImageBase64 = e.target.result;
      const preview = document.getElementById('project-image-preview');
      if (preview) {
        preview.src = this.tempImageBase64;
      }
      if (window.Toast) window.Toast.info('โหลดรูปภาพตัวอย่างเรียบร้อย');
    };
    reader.readAsDataURL(file);
  }
}

const ProjectApp = new ProjectManager();
window.ProjectApp = ProjectApp;
window.renderProjects = () => ProjectApp.render();
