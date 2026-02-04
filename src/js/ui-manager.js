// ============================================
// UI YÖNETİCİSİ (UI MANAGER)
// ============================================

class UIManager {
  constructor() {
    this.notifications = [];
  }

  /**
   * Bildirim göster
   */
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slide-in-right`;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = `${20 + this.notifications.length * 70}px`;
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = this.getNotificationColor(type);
    notification.style.color = '#fff';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '2000';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    document.body.appendChild(notification);
    this.notifications.push(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        notification.remove();
        this.notifications = this.notifications.filter(n => n !== notification);
      }, 300);
    }, duration);
  }

  /**
   * Bildirim rengi
   */
  getNotificationColor(type) {
    const colors = {
      'info': '#2196F3',
      'success': '#4CAF50',
      'warning': '#FF9800',
      'error': '#F44336'
    };
    return colors[type] || colors['info'];
  }

  /**
   * Loading spinner göster
   */
  showLoading() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.className = 'modal active';
    loader.innerHTML = `
      <div class="modal-content" style="background: transparent; box-shadow: none;">
        <div class="loading-spinner"></div>
        <p style="color: #fff; margin-top: 20px;">Yükleniyor...</p>
      </div>
    `;
    document.body.appendChild(loader);
  }

  /**
   * Loading spinner gizle
   */
  hideLoading() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.remove();
  }

  /**
   * Onay dialog'u göster
   */
  confirm(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Onay</h3>
        <p>${message}</p>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="this.closest('.modal').remove()">İptal</button>
          <button class="btn-primary" id="confirm-yes">Evet</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('confirm-yes').addEventListener('click', () => {
      modal.remove();
      callback();
    });
  }
}

const uiManager = new UIManager();
