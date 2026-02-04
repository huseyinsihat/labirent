// ============================================
// SKOR TAKİPÇİSİ (SCORE TRACKER)
// ============================================

class ScoreTracker {
  constructor() {
    this.currentScore = 0;
    this.highScore = this.loadHighScore();
    this.scoreHistory = [];
    this.multiplier = 1.0;
  }

  /**
   * Puan ekle
   */
  addScore(points) {
    const actualPoints = Math.floor(points * this.multiplier);
    this.currentScore += actualPoints;
    
    this.scoreHistory.push({
      points: actualPoints,
      timestamp: Date.now()
    });
    
    // High score güncelle
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.saveHighScore();
    }
    
    return actualPoints;
  }

  /**
   * Çarpan ayarla
   */
  setMultiplier(multiplier) {
    this.multiplier = Math.max(1.0, multiplier);
  }

  /**
   * Combo'ya göre çarpan hesapla
   */
  calculateComboMultiplier(combo) {
    if (combo >= 10) return 3.0;
    if (combo >= 5) return 2.0;
    if (combo >= 3) return 1.5;
    return 1.0;
  }

  /**
   * Skoru sıfırla
   */
  reset() {
    this.currentScore = 0;
    this.scoreHistory = [];
    this.multiplier = 1.0;
  }

  /**
   * High score kaydet
   */
  saveHighScore() {
    saveToLocalStorage('highScore', this.highScore);
  }

  /**
   * High score yükle
   */
  loadHighScore() {
    return loadFromLocalStorage('highScore', 0);
  }

  /**
   * İstatistikleri al
   */
  getStats() {
    return {
      current: this.currentScore,
      high: this.highScore,
      multiplier: this.multiplier,
      historyCount: this.scoreHistory.length
    };
  }
}

// Global skor tracker
const scoreTracker = new ScoreTracker();
