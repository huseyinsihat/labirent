// ============================================
// ANA UYGULAMA BAŞLATICI
// ============================================

// DOM yüklendikten sonra başlat
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏥 Sağlık Labireni başlatılıyor...');
  
  // Debug modu
  window.DEBUG_MODE = false;
  
  // Canvas ayarla
  setupCanvas();
  
  // Event listener'ları ayarla
  setupEventListeners();
  
  // İlk yükleme
  initializeApp();
  
  console.log('✅ Uygulama hazır!');
});

/**
 * Canvas ayarları
 */
function setupCanvas() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  
  // Responsive canvas boyutu
  function resizeCanvas() {
    const container = canvas.parentElement;
    const maxWidth = Math.min(1200, container.clientWidth - 40);
    const maxHeight = Math.min(800, window.innerHeight - 200);
    
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    
    // Oyun varsa yeniden çiz
    if (game && game.state === 'playing') {
      game.width = maxWidth;
      game.height = maxHeight;
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', debounce(resizeCanvas, 250));
}

/**
 * Event listener'lar
 */
function setupEventListeners() {
  // Modal kapatma - dışarı tıklama
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // Klavye kısayolları
  document.addEventListener('keydown', (e) => {
    // F11 - Tam ekran
    if (e.key === 'F11') {
      e.preventDefault();
      if (document.fullscreenElement) {
        exitFullscreen();
      } else {
        requestFullscreen();
      }
    }
    
    // D - Debug mode
    if (e.key === 'd' && e.ctrlKey) {
      e.preventDefault();
      window.DEBUG_MODE = !window.DEBUG_MODE;
      console.log('Debug mode:', window.DEBUG_MODE);
    }
  });
  
  // Touch kontrolleri (mobil)
  if (isMobile()) {
    setupTouchControls();
  }
}

/**
 * Touch kontrolleri ayarla
 */
function setupTouchControls() {
  const gameScreen = document.getElementById('game-screen');
  
  // D-Pad oluştur
  const dpad = document.createElement('div');
  dpad.className = 'controls d-pad';
  dpad.innerHTML = `
    <button class="btn-up" data-key="up">⬆️</button>
    <button class="btn-left" data-key="left">⬅️</button>
    <button class="btn-right" data-key="right">➡️</button>
    <button class="btn-down" data-key="down">⬇️</button>
  `;
  
  gameScreen.appendChild(dpad);
  
  // Touch event'leri
  dpad.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const key = btn.dataset.key;
      if (game && game.keyboard) {
        const keyMap = {
          'up': 'ArrowUp',
          'down': 'ArrowDown',
          'left': 'ArrowLeft',
          'right': 'ArrowRight'
        };
        game.keyboard.keys[keyMap[key]] = true;
      }
    });
    
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      const key = btn.dataset.key;
      if (game && game.keyboard) {
        const keyMap = {
          'up': 'ArrowUp',
          'down': 'ArrowDown',
          'left': 'ArrowLeft',
          'right': 'ArrowRight'
        };
        game.keyboard.keys[keyMap[key]] = false;
      }
    });
  });
}

/**
 * Uygulamayı başlat
 */
async function initializeApp() {
  // LocalStorage'dan kayıtlı ilerleme var mı kontrol et
  const savedProgress = loadFromLocalStorage('gameProgress');
  
  if (savedProgress) {
    console.log('💾 Kayıtlı ilerleme bulundu:', savedProgress);
    // Kullanıcıya devam etmek isteyip istemediğini sor
    // (Şimdilik otomatik yükleme yok)
  }
  
  // Veri dosyalarını ön yükle (isteğe bağlı)
  try {
    await preloadData();
  } catch (error) {
    console.error('Veri ön yükleme hatası:', error);
  }
  
  // Hoş geldin mesajı
  setTimeout(() => {
    if (uiManager) {
      uiManager.showNotification('🏥 Sağlık Labirenine Hoş Geldin!', 'success', 4000);
    }
  }, 500);
}

/**
 * Veri dosyalarını ön yükle
 */
async function preloadData() {
  console.log('📦 Veri dosyaları yükleniyor...');
  
  try {
    const [topics, questions, achievements] = await Promise.all([
      AjaxHandler.loadHealthTopics(),
      AjaxHandler.loadQuizQuestions(),
      AjaxHandler.loadAchievements()
    ]);
    
    console.log('✅ Veriler yüklendi:', {
      topics: topics ? 'OK' : 'FAIL',
      questions: questions ? 'OK' : 'FAIL',
      achievements: achievements ? 'OK' : 'FAIL'
    });
  } catch (error) {
    console.warn('⚠️ Bazı veri dosyaları yüklenemedi:', error);
  }
}

/**
 * Sayfa yenileme uyarısı (oyun devam ediyorsa)
 */
window.addEventListener('beforeunload', (e) => {
  if (game && (game.state === 'playing' || game.state === 'paused')) {
    e.preventDefault();
    e.returnValue = 'Oyununuz kaydedilmeyebilir. Çıkmak istediğinizden emin misiniz?';
    
    // Son kaydı yap
    if (game.player) {
      game.saveProgress();
    }
  }
});

// Global fonksiyonlar (düğmeler için)
window.startGame = startGame;
window.showTopics = showTopics;
window.showAchievements = showAchievements;
window.showLeaderboard = showLeaderboard;
window.togglePause = togglePause;
window.nextLevel = nextLevel;
window.restartLevel = restartLevel;
window.showMainMenu = showMainMenu;
window.closeInfoModal = closeInfoModal;

// Performans izleme (isteğe bağlı)
if (window.performance && window.performance.memory) {
  setInterval(() => {
    if (window.DEBUG_MODE) {
      console.log('Memory:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB'
      });
    }
  }, 10000);
}
