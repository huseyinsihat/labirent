// ============================================
// SES YÖNETİCİSİ (AUDIO MANAGER)
// ============================================

class AudioManager {
  constructor() {
    this.sounds = {};
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.muted = false;
  }

  /**
   * Ses dosyası yükle (simülasyon - gerçek dosyalar olsaydı)
   */
  loadSound(id, url) {
    const audio = new Audio(url);
    audio.volume = this.sfxVolume;
    this.sounds[id] = audio;
  }

  /**
   * Ses çal
   */
  play(soundId) {
    if (this.muted) return;
    
    const sound = this.sounds[soundId];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => {
        console.log(`Ses çalma hatası (${soundId}):`, e);
      });
    }
  }

  /**
   * Müziği başlat
   */
  playMusic(soundId) {
    if (this.muted) return;
    
    const music = this.sounds[soundId];
    if (music) {
      music.loop = true;
      music.volume = this.musicVolume;
      music.play().catch(e => {
        console.log('Müzik çalma hatası:', e);
      });
    }
  }

  /**
   * Müziği durdur
   */
  stopMusic(soundId) {
    const music = this.sounds[soundId];
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  }

  /**
   * Tüm sesleri durdur
   */
  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Mute/Unmute
   */
  toggleMute() {
    this.muted = !this.muted;
    
    Object.values(this.sounds).forEach(sound => {
      sound.muted = this.muted;
    });
    
    return this.muted;
  }

  /**
   * Ses seviyesi ayarla
   */
  setSfxVolume(volume) {
    this.sfxVolume = clamp(volume, 0, 1);
    
    Object.values(this.sounds).forEach(sound => {
      if (!sound.loop) {
        sound.volume = this.sfxVolume;
      }
    });
  }

  /**
   * Müzik seviyesi ayarla
   */
  setMusicVolume(volume) {
    this.musicVolume = clamp(volume, 0, 1);
    
    Object.values(this.sounds).forEach(sound => {
      if (sound.loop) {
        sound.volume = this.musicVolume;
      }
    });
  }
}

// Global audio manager
const audioManager = new AudioManager();

// Basit ses simülasyonları (gerçek dosyalar olmadan)
// Gerçek projede bu sesler src/assets/sounds/ klasöründe olacak

// Web Audio API ile basit sesler oluştur
function playBeep(frequency = 440, duration = 200) {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Ses fonksiyonları için placeholder'lar
function playSound(soundId) {
  switch(soundId) {
    case 'collect':
      playBeep(800, 100);
      break;
    case 'damage':
      playBeep(200, 300);
      break;
    case 'complete':
      playBeep(600, 200);
      setTimeout(() => playBeep(800, 200), 150);
      break;
    default:
      playBeep(440, 150);
  }
}
