// ============================================
// AJAX İŞLEMLERİ
// ============================================

class AjaxHandler {
  /**
   * JSON dosyası yükle
   */
  static async loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('JSON yükleme hatası:', error);
      return null;
    }
  }

  /**
   * Sağlık konularını yükle
   */
  static async loadHealthTopics() {
    return await this.loadJSON('src/data/health-topics.json');
  }

  /**
   * Quiz sorularını yükle
   */
  static async loadQuizQuestions() {
    return await this.loadJSON('src/data/quiz-questions.json');
  }

  /**
   * Başarıları yükle
   */
  static async loadAchievements() {
    return await this.loadJSON('src/data/achievements.json');
  }

  /**
   * Seviyeleri yükle
   */
  static async loadLevels() {
    return await this.loadJSON('src/data/levels.json');
  }

  /**
   * Liderlik tablosunu yükle
   */
  static async loadLeaderboard() {
    return await this.loadJSON('src/data/leaderboard.json');
  }

  /**
   * Skor kaydet (simüle edilmiş POST)
   */
  static async saveScore(playerName, score, level) {
    // Gerçek bir API olsaydı:
    // return await fetch('/api/scores', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ playerName, score, level })
    // });

    // Şimdilik LocalStorage kullan
    const leaderboard = loadFromLocalStorage('leaderboard', []);
    leaderboard.push({
      playerName: playerName,
      score: score,
      level: level,
      timestamp: Date.now()
    });
    
    // En yüksek 10 skoru tut
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    
    saveToLocalStorage('leaderboard', top10);
    return true;
  }

  /**
   * Belirli bir konu hakkında bilgi al
   */
  static async getTopicInfo(topicId) {
    const topics = await this.loadHealthTopics();
    if (!topics) return null;
    
    return topics.konular.find(k => k.id === topicId);
  }

  /**
   * Kategori'ye göre quiz soruları al
   */
  static async getQuizByCategory(category) {
    const quizData = await this.loadQuizQuestions();
    if (!quizData) return [];
    
    return quizData[category] || [];
  }
}

// Global yardımcı fonksiyonlar

/**
 * Sağlık konularını göster
 */
async function showTopics() {
  const topics = await AjaxHandler.loadHealthTopics();
  
  if (!topics) {
    alert('Sağlık konuları yüklenemedi!');
    return;
  }
  
  switchScreen('main-menu', 'level-select');
  
  const container = document.getElementById('levels-container');
  container.innerHTML = '';
  
  topics.konular.forEach((konu, index) => {
    const card = document.createElement('div');
    card.className = 'topic-card animate-fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="topic-icon">${konu.ikon}</div>
      <h3>${konu.baslik}</h3>
      <p>${konu.altKonular ? konu.altKonular.length : 0} alt konu</p>
      <button onclick="showTopicDetail('${konu.id}')" class="btn-primary">
        Detayları Gör
      </button>
    `;
    container.appendChild(card);
  });
}

/**
 * Konu detayını göster
 */
async function showTopicDetail(topicId) {
  const topic = await AjaxHandler.getTopicInfo(topicId);
  
  if (!topic) {
    alert('Konu bulunamadı!');
    return;
  }
  
  // Modal içeriği oluştur
  document.getElementById('info-icon').textContent = topic.ikon;
  document.getElementById('info-title').textContent = topic.baslik;
  
  if (topic.altKonular && topic.altKonular.length > 0) {
    const firstSubtopic = topic.altKonular[0];
    document.getElementById('info-description').textContent = firstSubtopic.icerik;
  }
  
  showModal('info-modal');
}

/**
 * Başarıları göster
 */
async function showAchievements() {
  const achievements = await AjaxHandler.loadAchievements();
  
  if (!achievements) {
    alert('Başarılar yüklenemedi!');
    return;
  }
  
  alert('Başarılar sayfası yakında eklenecek!');
}

/**
 * Liderlik tablosunu göster
 */
async function showLeaderboard() {
  const leaderboard = loadFromLocalStorage('leaderboard', []);
  
  if (leaderboard.length === 0) {
    alert('Henüz kayıtlı skor yok!');
    return;
  }
  
  let html = '<h2>🏆 En Yüksek Skorlar</h2><ol>';
  leaderboard.forEach((entry, i) => {
    html += `<li>${entry.playerName}: ${formatNumber(entry.score)} puan (Seviye ${entry.level})</li>`;
  });
  html += '</ol>';
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      ${html}
      <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Kapat</button>
    </div>
  `;
  document.body.appendChild(modal);
}

/**
 * Info modal kapat
 */
function closeInfoModal() {
  hideModal('info-modal');
}
