// Toast Notification Utility with Glassmorphic styling
class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create toast container if not present
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }
    this.container = container;
  }

  show({ message, type = 'success', duration = 3500, title = null }) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto transform transition-all duration-300 ease-out translate-y-4 opacity-0 flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border';

    // Theme and icon configuration
    let borderClass = 'border-emerald-400/40 bg-slate-900/90 text-slate-100 shadow-emerald-500/10';
    let iconClass = 'fa-solid fa-circle-check text-emerald-300';
    let defaultTitle = 'สำเร็จ / Success';

    if (type === 'error') {
      borderClass = 'border-rose-400/40 bg-slate-900/90 text-slate-100 shadow-rose-500/10';
      iconClass = 'fa-solid fa-circle-xmark text-rose-300';
      defaultTitle = 'เกิดข้อผิดพลาด / Error';
    } else if (type === 'warning') {
      borderClass = 'border-amber-300/40 bg-slate-900/90 text-slate-100 shadow-amber-500/10';
      iconClass = 'fa-solid fa-triangle-exclamation text-amber-300';
      defaultTitle = 'แจ้งเตือน / Warning';
    } else if (type === 'info') {
      borderClass = 'border-indigo-400/40 bg-slate-900/90 text-slate-100 shadow-indigo-500/10';
      iconClass = 'fa-solid fa-circle-info text-indigo-300';
      defaultTitle = 'ข้อมูล / Information';
    }

    toast.className += ` ${borderClass}`;

    toast.innerHTML = `
      <div class="text-xl mt-0.5 shrink-0">
        <i class="${iconClass}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm tracking-wide">${title || defaultTitle}</div>
        <div class="text-xs text-slate-300 mt-0.5 break-words leading-relaxed">${message}</div>
      </div>
      <button type="button" class="text-slate-400 hover:text-slate-100 transition-colors p-1 -mr-1 -mt-1 rounded-lg">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
    `;

    // Close button
    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      this.dismiss(toast);
    });

    this.container.appendChild(toast);

    // Animate entrance
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

  dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, title = null) {
    return this.show({ message, type: 'success', title });
  }

  error(message, title = null) {
    return this.show({ message, type: 'error', title });
  }

  info(message, title = null) {
    return this.show({ message, type: 'info', title });
  }

  warning(message, title = null) {
    return this.show({ message, type: 'warning', title });
  }
}

const Toast = new ToastManager();
window.Toast = Toast;
