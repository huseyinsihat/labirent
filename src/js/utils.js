// ============================================
// YARDIMCI FONKSİYONLAR (UTILITIES)
// ============================================

/**
 * Rastgele sayı üretir (min ve max dahil)
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rastgele ondalıklı sayı üretir
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Diziden rastgele eleman seçer
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Diziyi karıştırır (Fisher-Yates shuffle)
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * İki nokta arası mesafe hesaplar
 */
function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Değeri belirli aralıkta tutar (clamp)
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Debounce fonksiyonu - Sık tetiklemeleri sınırlar
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle fonksiyonu - Belirli sürede bir kez çalıştırır
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * LocalStorage'a veri kaydet
 */
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('LocalStorage kayıt hatası:', e);
    return false;
  }
}

/**
 * LocalStorage'dan veri oku
 */
function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('LocalStorage okuma hatası:', e);
    return defaultValue;
  }
}

/**
 * Saniyeyi dakika:saniye formatına çevirir
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Sayıyı binlik ayıraçlarla formatlar
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * DOM elementini göster/gizle
 */
function toggleElement(element, show) {
  if (show) {
    element.classList.remove('hidden');
    element.classList.add('visible');
  } else {
    element.classList.add('hidden');
    element.classList.remove('visible');
  }
}

/**
 * Modal göster
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Modal gizle
 */
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Ekran değiştir
 */
function switchScreen(hideScreenId, showScreenId) {
  const hideScreen = document.getElementById(hideScreenId);
  const showScreen = document.getElementById(showScreenId);
  
  if (hideScreen) hideScreen.classList.remove('active');
  if (showScreen) showScreen.classList.add('active');
}

/**
 * Parçacık efekti oluştur
 */
function createParticle(x, y, text, color = 'green') {
  const particle = document.createElement('div');
  particle.className = `particle ${color}`;
  particle.textContent = text;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

/**
 * Skor popup göster
 */
function showScorePopup(x, y, score) {
  const popup = document.createElement('div');
  popup.className = 'score-popup';
  popup.textContent = `+${score}`;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
  }, 1000);
}

/**
 * Konfeti animasyonu
 */
function createConfetti() {
  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${randomInt(0, window.innerWidth)}px`;
      confetti.style.top = '-20px';
      confetti.style.backgroundColor = randomChoice(colors);
      confetti.style.animationDelay = `${randomFloat(0, 1)}s`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 50);
  }
}

/**
 * Canvas'ı temizle
 */
function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Dikdörtgen çiz
 */
function drawRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/**
 * Daire çiz
 */
function drawCircle(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Metin çiz
 */
function drawText(ctx, text, x, y, fontSize = 16, color = '#fff', align = 'center') {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

/**
 * Emoji çiz (canvas'ta)
 */
function drawEmoji(ctx, emoji, x, y, size = 32) {
  ctx.font = `${size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, x, y);
}

/**
 * Grid hücresi koordinatını piksel koordinatına çevir
 */
function gridToPixel(gridX, gridY, cellSize) {
  return {
    x: gridX * cellSize,
    y: gridY * cellSize
  };
}

/**
 * Piksel koordinatını grid hücresine çevir
 */
function pixelToGrid(pixelX, pixelY, cellSize) {
  return {
    x: Math.floor(pixelX / cellSize),
    y: Math.floor(pixelY / cellSize)
  };
}

/**
 * Ses çal (basit)
 */
function playSound(soundId) {
  const audio = document.getElementById(soundId);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Ses çalma hatası:', e));
  }
}

/**
 * Titreşim (mobil cihazlarda)
 */
function vibrate(duration = 100) {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

/**
 * Cihaz mobil mi kontrol et
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Touch event'leri destekliyor mu kontrol et
 */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Tam ekran aç
 */
function requestFullscreen(element = document.documentElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Tam ekrandan çık
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Kopyalama (deep copy)
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Hata yönetimi wrapper
 */
function safeExecute(func, errorMessage = 'Bir hata oluştu') {
  try {
    return func();
  } catch (error) {
    console.error(errorMessage, error);
    return null;
  }
}

// Export (ES6 modules için - isteğe bağlı)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    randomInt, randomFloat, randomChoice, shuffleArray,
    distance, clamp, lerp, debounce, throttle,
    saveToLocalStorage, loadFromLocalStorage,
    formatTime, formatNumber, toggleElement,
    showModal, hideModal, switchScreen,
    createParticle, showScorePopup, createConfetti,
    clearCanvas, drawRect, drawCircle, drawText, drawEmoji,
    gridToPixel, pixelToGrid, playSound, vibrate,
    isMobile, isTouchDevice, requestFullscreen, exitFullscreen,
    deepClone, safeExecute
  };
}
