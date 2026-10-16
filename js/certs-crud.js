// Training & Certifications CRUD with PDF Attachment & Viewer
class CertificationsManager {
  constructor() {
    this.certs = this.loadCerts();
    this.editingId = null;
    this.tempPdfData = null; // { name, base64 }
    this.syncFromCloudflare();
  }

  async syncFromCloudflare() {
    try {
      const res = await fetch('/api/certifications');
      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          this.certs = cloudData.map(c => ({
            id: c.id,
            nameTh: c.name_th || c.nameTh,
            nameEn: c.name_en || c.nameEn,
            issuer: c.issuer,
            issueDate: c.issue_date || c.issueDate,
            credentialId: c.credential_id || c.credentialId,
            category: c.category,
            descriptionTh: c.description_th || c.descriptionTh,
            descriptionEn: c.description_en || c.descriptionEn,
            pdfData: c.pdf_r2_key ? `/api/files/${c.pdf_r2_key}` : null,
            pdfName: c.pdf_filename || 'Certificate.pdf'
          }));
          this.render();
        }
      }
    } catch (_) {
      // Running statically without Cloudflare Functions backend
    }
  }

  loadCerts() {
    try {
      const saved = localStorage.getItem('portfolio_certs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error loading certifications from localStorage:', e);
    }
    return [...DEFAULT_CERTIFICATIONS];
  }

  saveCerts() {
    try {
      localStorage.setItem('portfolio_certs', JSON.stringify(this.certs));
    } catch (e) {
      console.warn('Error saving certifications to localStorage:', e);
      if (window.Toast) {
        window.Toast.warning('พื้นที่จัดเก็บข้อมูลเต็ม อาจจัดเก็บไฟล์ PDF ขนาดใหญ่ไม่ได้');
      }
    }
  }

  render() {
    const container = document.getElementById('certs-grid');
    if (!container) return;

    const lang = window.I18n ? window.I18n.currentLang : 'th';

    if (this.certs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center glass-card rounded-2xl p-8 border border-dashed border-emerald-500/25">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-300 text-2xl">
            <i class="fa-solid fa-certificate"></i>
          </div>
          <p class="text-slate-300 text-base font-medium">${window.I18n ? window.I18n.get('emptyCerts') : 'ยังไม่มีรายการใบรับรองในขณะนี้'}</p>
          <button type="button" onclick="CertApp.openModal()" class="mt-4 btn-pastel-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-950 text-sm font-bold shadow-md transition-all">
            <i class="fa-solid fa-plus"></i> ${window.I18n ? window.I18n.get('btnAddCert') : 'เพิ่มใบรับรองใหม่'}
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.certs.map(cert => {
      const name = lang === 'th' ? (cert.nameTh || cert.nameEn) : (cert.nameEn || cert.nameTh);
      const desc = lang === 'th' ? (cert.descriptionTh || cert.descriptionEn) : (cert.descriptionEn || cert.descriptionTh);
      const hasPdf = Boolean(cert.pdfData || cert.pdfUrl);

      return `
        <div class="glass-card group flex flex-col justify-between rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden">
          <!-- Glow accent in corner -->
          <div class="absolute -right-12 -top-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all"></div>

          <div>
            <!-- Top Badges & Actions -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-award text-cyan-400"></i>
                  ${cert.category || 'Certification'}
                </span>
                <span class="text-xs text-slate-400 font-mono">
                  ${cert.issueDate || ''}
                </span>
              </div>

              <!-- Edit & Delete Buttons -->
              <div class="flex items-center gap-1 shrink-0">
                <button 
                  type="button" 
                  onclick="CertApp.openEditModal('${cert.id}')" 
                  class="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 border border-white/5 flex items-center justify-center transition-all text-xs"
                  title="${window.I18n ? window.I18n.get('btnEdit') : 'แก้ไข'}"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                  type="button" 
                  onclick="CertApp.deleteCert('${cert.id}')" 
                  class="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-white/5 flex items-center justify-center transition-all text-xs"
                  title="${window.I18n ? window.I18n.get('btnDelete') : 'ลบ'}"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <!-- Cert Name & Details -->
            <h3 class="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">
              ${name}
            </h3>

            <div class="flex items-center gap-2 mt-2 text-xs text-slate-300">
              <i class="fa-solid fa-building text-cyan-400"></i>
              <span class="font-medium">${cert.issuer || 'Issuer'}</span>
              ${cert.credentialId ? `
                <span class="text-slate-500">•</span>
                <span class="font-mono text-slate-400">${cert.credentialId}</span>
              ` : ''}
            </div>

            <p class="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              ${desc}
            </p>
          </div>

          <!-- PDF Attachment & View Controls -->
          <div class="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <!-- View PDF Button -->
              <button 
                type="button" 
                onclick="CertApp.viewPdf('${cert.id}')" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all shadow-sm shadow-cyan-500/20"
              >
                <i class="fa-solid fa-file-pdf"></i>
                <span>${window.I18n ? window.I18n.get('btnViewPdf') : 'เปิดดู PDF'}</span>
              </button>

              <!-- Attach / Replace PDF File Input -->
              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-white/10 cursor-pointer transition-all">
                <i class="fa-solid fa-paperclip"></i>
                <span>${window.I18n ? window.I18n.get('btnAttachPdf') : 'แนบไฟล์ PDF'}</span>
                <input type="file" accept="application/pdf" class="hidden" onchange="CertApp.attachDirectPdf('${cert.id}', this)" />
              </label>
            </div>

            <!-- PDF Status indicator -->
            <div class="text-[11px] text-slate-400 flex items-center gap-1">
              ${hasPdf ? `
                <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="truncate max-w-[120px] font-mono text-[10px] text-emerald-400">${cert.pdfName || 'Document.pdf'}</span>
              ` : `
                <span class="inline-block w-2 h-2 rounded-full bg-slate-500"></span>
                <span class="text-slate-500">ไม่มีไฟล์</span>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openModal(isEdit = false) {
    const modal = document.getElementById('cert-modal');
    const form = document.getElementById('cert-form');
    const modalTitle = document.getElementById('cert-modal-title');
    if (!modal || !form) return;

    this.tempPdfData = null;
    const fileLabel = document.getElementById('cert-pdf-filename');
    if (fileLabel) fileLabel.textContent = 'ยังไม่ได้เลือกไฟล์';

    if (!isEdit) {
      this.editingId = null;
      form.reset();
      if (modalTitle) {
        modalTitle.textContent = window.I18n ? window.I18n.get('modalAddCertTitle') : 'เพิ่มใบรับรองใหม่';
      }
    } else {
      if (modalTitle) {
        modalTitle.textContent = window.I18n ? window.I18n.get('modalEditCertTitle') : 'แก้ไขข้อมูลใบรับรอง';
      }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  openEditModal(id) {
    const cert = this.certs.find(c => c.id === id);
    if (!cert) return;

    this.editingId = id;
    this.openModal(true);

    document.getElementById('cert-name-th').value = cert.nameTh || '';
    document.getElementById('cert-name-en').value = cert.nameEn || '';
    document.getElementById('cert-issuer').value = cert.issuer || '';
    document.getElementById('cert-date').value = cert.issueDate || '';
    document.getElementById('cert-id').value = cert.credentialId || '';
    document.getElementById('cert-category').value = cert.category || '';
    document.getElementById('cert-desc-th').value = cert.descriptionTh || '';
    document.getElementById('cert-desc-en').value = cert.descriptionEn || '';

    const fileLabel = document.getElementById('cert-pdf-filename');
    if (fileLabel && (cert.pdfName || cert.pdfData)) {
      fileLabel.textContent = cert.pdfName || 'ไฟล์ที่แนบไว้แล้ว';
      this.tempPdfData = cert.pdfData ? { name: cert.pdfName, base64: cert.pdfData } : null;
    }
  }

  closeModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    this.editingId = null;
    this.tempPdfData = null;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const nameTh = document.getElementById('cert-name-th').value.trim();
    const nameEn = document.getElementById('cert-name-en').value.trim();
    const issuer = document.getElementById('cert-issuer').value.trim();
    const issueDate = document.getElementById('cert-date').value.trim();
    const credentialId = document.getElementById('cert-id').value.trim();
    const category = document.getElementById('cert-category').value.trim();
    const descTh = document.getElementById('cert-desc-th').value.trim();
    const descEn = document.getElementById('cert-desc-en').value.trim();

    if (!nameTh && !nameEn) {
      if (window.Toast) window.Toast.warning('กรุณากรอกชื่อใบรับรอง');
      return;
    }

    if (this.editingId) {
      const idx = this.certs.findIndex(c => c.id === this.editingId);
      if (idx !== -1) {
        this.certs[idx] = {
          ...this.certs[idx],
          nameTh: nameTh || nameEn,
          nameEn: nameEn || nameTh,
          issuer: issuer || 'Authorized Authority',
          issueDate: issueDate || '2026',
          credentialId,
          category: category || 'Certification',
          descriptionTh: descTh || descEn,
          descriptionEn: descEn || descTh,
          pdfData: this.tempPdfData ? this.tempPdfData.base64 : this.certs[idx].pdfData,
          pdfName: this.tempPdfData ? this.tempPdfData.name : (this.certs[idx].pdfName || 'Certificate.pdf')
        };
        this.saveCerts();
        this.render();
        this.closeModal();
        if (window.Toast) window.Toast.success(window.I18n ? window.I18n.get('toastCertUpdated') : 'อัปเดตข้อมูลใบรับรองสำเร็จ');
      }
    } else {
      const newCert = {
        id: 'cert-' + Date.now(),
        nameTh: nameTh || nameEn,
        nameEn: nameEn || nameTh,
        issuer: issuer || 'Authorized Authority',
        issueDate: issueDate || '2026',
        credentialId,
        category: category || 'Certification',
        descriptionTh: descTh || descEn,
        descriptionEn: descEn || descTh,
        pdfData: this.tempPdfData ? this.tempPdfData.base64 : null,
        pdfName: this.tempPdfData ? this.tempPdfData.name : 'Certificate.pdf'
      };
      this.certs.unshift(newCert);
      this.saveCerts();
      this.render();
      this.closeModal();
      if (window.Toast) window.Toast.success(window.I18n ? window.I18n.get('toastCertAdded') : 'เพิ่มใบรับรองใหม่สำเร็จ');
    }
  }

  deleteCert(id) {
    const confirmMsg = window.I18n ? window.I18n.get('confirmDeleteCert') : 'คุณแน่ใจหรือไม่ว่าต้องการลบใบรับรองนี้?';
    if (!confirm(confirmMsg)) return;

    this.certs = this.certs.filter(c => c.id !== id);
    this.saveCerts();
    this.render();
    if (window.Toast) window.Toast.info(window.I18n ? window.I18n.get('toastCertDeleted') : 'ลบข้อมูลใบรับรองเรียบร้อยแล้ว');
  }

  attachDirectPdf(id, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      if (window.Toast) window.Toast.warning('กรุณาเลือกไฟล์เอกสาร PDF เท่านั้น');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      if (window.Toast) window.Toast.warning('ขนาดไฟล์ PDF ไม่ควรเกิน 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const idx = this.certs.findIndex(c => c.id === id);
      if (idx !== -1) {
        this.certs[idx].pdfData = base64;
        this.certs[idx].pdfName = file.name;
        this.saveCerts();
        this.render();
        if (window.Toast) {
          window.Toast.success(`${window.I18n ? window.I18n.get('toastPdfAttached') : 'แนบไฟล์ PDF สำเร็จ'}: ${file.name}`);
        }
      }
    };
    reader.readAsDataURL(file);
  }

  handleModalPdfUpload(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      if (window.Toast) window.Toast.warning('กรุณาเลือกไฟล์ PDF เท่านั้น');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.tempPdfData = {
        name: file.name,
        base64: e.target.result
      };
      const label = document.getElementById('cert-pdf-filename');
      if (label) label.textContent = file.name;
      if (window.Toast) window.Toast.info(`เลือกไฟล์ ${file.name} เรียบร้อยแล้ว`);
    };
    reader.readAsDataURL(file);
  }

  viewPdf(id) {
    const cert = this.certs.find(c => c.id === id);
    if (!cert) return;

    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-viewer-frame');
    const title = document.getElementById('pdf-viewer-title');
    const fallbackBox = document.getElementById('pdf-fallback-box');

    const certName = window.I18n && window.I18n.currentLang === 'en' ? (cert.nameEn || cert.nameTh) : (cert.nameTh || cert.nameEn);
    if (title) title.textContent = `${certName} (${cert.pdfName || 'Document.pdf'})`;

    if (cert.pdfData) {
      // User uploaded custom PDF Data URI
      if (fallbackBox) fallbackBox.classList.add('hidden');
      if (iframe) {
        iframe.classList.remove('hidden');
        iframe.src = cert.pdfData;
      }
    } else {
      // Default sample certificate generator / sleek digital certificate display
      if (iframe) iframe.classList.add('hidden');
      if (fallbackBox) {
        fallbackBox.classList.remove('hidden');
        fallbackBox.innerHTML = `
          <div class="max-w-2xl mx-auto p-8 rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 text-center relative shadow-2xl">
            <div class="absolute top-4 left-4 text-cyan-400 text-3xl opacity-30"><i class="fa-solid fa-ribbon"></i></div>
            <div class="absolute bottom-4 right-4 text-teal-400 text-3xl opacity-30"><i class="fa-solid fa-award"></i></div>
            
            <div class="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Certificate of Achievement</div>
            <h2 class="text-2xl font-black text-slate-100 mb-2">${certName}</h2>
            <p class="text-sm text-slate-400 mb-6">Presented to <span class="text-cyan-300 font-bold">${window.DEFAULT_PROFILE ? window.DEFAULT_PROFILE.nameEn : 'ICT Student'}</span></p>

            <div class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-300 mb-6 leading-relaxed">
              ${cert.descriptionEn || cert.descriptionTh || 'Demonstrated technical competency and passed rigorous examination.'}
            </div>

            <div class="grid grid-cols-2 gap-4 text-left text-xs text-slate-400 pt-4 border-t border-white/10 font-mono">
              <div>
                <div>Issuer: <span class="text-slate-200 font-semibold">${cert.issuer}</span></div>
                <div>Issued: <span class="text-slate-200">${cert.issueDate}</span></div>
              </div>
              <div class="text-right">
                <div>ID: <span class="text-cyan-400 font-semibold">${cert.credentialId || 'CF-VERIFIED'}</span></div>
                <div class="text-emerald-400 font-semibold flex items-center justify-end gap-1"><i class="fa-solid fa-circle-check"></i> Verified</div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-center gap-3">
              <label class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer transition-all">
                <i class="fa-solid fa-upload"></i> อัปโหลดไฟล์ PDF ฉบับจริงจากเครื่อง
                <input type="file" accept="application/pdf" class="hidden" onchange="CertApp.attachDirectPdf('${cert.id}', this); CertApp.closePdfModal();" />
              </label>
            </div>
          </div>
        `;
      }
    }

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }
  }

  closePdfModal() {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-viewer-frame');
    if (!modal) return;
    if (iframe) iframe.src = 'about:blank';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  openPdfInNewTab(id) {
    const cert = this.certs.find(c => c.id === id);
    if (!cert) return;

    if (cert.pdfData) {
      const win = window.open();
      win.document.write(`<iframe src="${cert.pdfData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    } else {
      this.viewPdf(id);
    }
  }
}

const CertApp = new CertificationsManager();
window.CertApp = CertApp;
window.renderCertifications = () => CertApp.render();
