// ============================================
// OYUN MOTORU (GAME ENGINE)
// ============================================

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    // Oyun durumu
    this.state = 'menu'; // menu, playing, paused, levelComplete, gameOver
    this.currentLevel = 1;
    this.maxLevel = 10;
    
    // Oyun objeleri
    this.maze = null;
    this.player = null;
    this.itemManager = new ItemManager();
    this.enemyManager = new EnemyManager();
    this.keyboard = new KeyboardController();
    
    // Süre
    this.levelTime = 180; // 3 dakika
    this.remainingTime = this.levelTime;
    this.elapsedTime = 0;
    
    // Seviye bilgileri
    this.levelConfig = null;
    
    // Animasyon
    this.lastTime = 0;
    this.animationId = null;
    
    // İstatistikler
    this.stats = {
      itemsCollected: 0,
      enemiesAvoided: 0,
      totalScore: 0,
      levelsCompleted: 0
    };
  }

  /**
   * Oyunu başlat
   */
  start(level = 1) {
    this.currentLevel = level;
    this.loadLevel(level);
    this.state = 'playing';
    this.lastTime = performance.now();
    this.gameLoop();
  }

  /**
   * Seviye yükle
   */
  loadLevel(levelNum) {
    // Seviye konfigürasyonu al
    this.levelConfig = this.getLevelConfig(levelNum);
    
    // Labireni oluştur
    const mazeGen = new MazeGenerator(this.width, this.height, 40);
    this.maze = mazeGen.generate();
    
    // Oyuncuyu yerleştir
    const startPos = mazeGen.getStartPosition();
    if (!this.player) {
      this.player = new Player(startPos.x, startPos.y);
    } else {
      this.player.reset(startPos.x, startPos.y);
    }
    
    // Objeleri yerleştir
    this.itemManager.populateMaze(
      this.maze,
      this.levelConfig.itemCount,
      this.levelConfig.type
    );
    
    // Düşmanları yerleştir
    this.enemyManager.populateMaze(
      this.maze,
      this.levelConfig.enemyCount,
      this.levelConfig.type
    );
    
    // Süreyi sıfırla
    this.remainingTime = this.levelTime;
    this.elapsedTime = 0;
    
    // UI güncelle
    this.updateUI();
  }

  /**
   * Seviye konfigürasyonu al
   */
  getLevelConfig(levelNum) {
    const configs = [
      { level: 1, type: 'beslenme', name: 'Dengeli Beslenme - Başlangıç', itemCount: 10, enemyCount: 3 },
      { level: 2, type: 'beslenme', name: 'Dengeli Beslenme - Orta', itemCount: 15, enemyCount: 5 },
      { level: 3, type: 'hijyen', name: 'Kişisel Hijyen - Başlangıç', itemCount: 12, enemyCount: 4 },
      { level: 4, type: 'hijyen', name: 'Kişisel Hijyen - Orta', itemCount: 15, enemyCount: 6 },
      { level: 5, type: 'bagisiklik', name: 'Bağışıklık Sistemi - Başlangıç', itemCount: 12, enemyCount: 5 },
      { level: 6, type: 'bagisiklik', name: 'Bağışıklık Sistemi - Orta', itemCount: 18, enemyCount: 7 },
      { level: 7, type: 'egzersiz', name: 'Fiziksel Aktivite - Başlangıç', itemCount: 10, enemyCount: 4 },
      { level: 8, type: 'egzersiz', name: 'Fiziksel Aktivite - Orta', itemCount: 15, enemyCount: 6 },
      { level: 9, type: 'zararli', name: 'Zararlı Alışkanlıklar - Zor', itemCount: 20, enemyCount: 8 },
      { level: 10, type: 'beslenme', name: 'Final Seviyesi', itemCount: 25, enemyCount: 10 }
    ];
    
    return configs[levelNum - 1] || configs[0];
  }

  /**
   * Oyun döngüsü
   */
  gameLoop(currentTime = 0) {
    if (this.state === 'menu' || this.state === 'gameOver') {
      return;
    }

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Güncelle
    if (this.state === 'playing') {
      this.update(deltaTime);
    }

    // Çiz
    this.render();

    // Sonraki frame
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  /**
   * Güncelleme
   */
  update(deltaTime) {
    // Klavye girdisi
    const input = this.keyboard.getMovementInput();
    this.player.move(input.dx, input.dy, this.maze);
    
    // Oyuncu güncelle
    this.player.update(deltaTime);
    
    // Objeleri güncelle
    this.itemManager.update(deltaTime);
    this.itemManager.checkCollisions(this.player);
    
    // Düşmanları güncelle
    this.enemyManager.update(this.player, this.maze, deltaTime);
    this.enemyManager.checkCollisions(this.player);
    
    // Süre güncelle
    this.elapsedTime += deltaTime;
    this.remainingTime = Math.max(0, this.levelTime - this.elapsedTime / 1000);
    
    // UI güncelle
    this.updateUI();
    
    // Koşulları kontrol et
    this.checkWinCondition();
    this.checkLoseCondition();
  }

  /**
   * Render (çizim)
   */
  render() {
    // Canvas'ı temizle
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Arka plan
    this.ctx.fillStyle = '#0f0f1e';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Labireni çiz
    if (this.maze) {
      const mazeGen = new MazeGenerator(this.width, this.height);
      mazeGen.walls = this.maze.walls;
      mazeGen.draw(this.ctx);
    }
    
    // Objeleri çiz
    this.itemManager.draw(this.ctx);
    
    // Düşmanları çiz
    this.enemyManager.draw(this.ctx);
    
    // Oyuncuyu çiz
    if (this.player) {
      this.player.draw(this.ctx);
    }
    
    // Pause durumunda overlay
    if (this.state === 'paused') {
      this.drawPauseOverlay();
    }
  }

  /**
   * Pause overlay çiz
   */
  drawPauseOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('⏸️ DURAKLADI', this.width / 2, this.height / 2);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillText('Devam etmek için ESC\'ye bas', this.width / 2, this.height / 2 + 50);
  }

  /**
   * UI güncelle
   */
  updateUI() {
    // Can barı
    const healthFill = document.getElementById('health-fill');
    if (healthFill && this.player) {
      const healthPercent = (this.player.health / this.player.maxHealth) * 100;
      healthFill.style.width = `${healthPercent}%`;
      
      if (healthPercent < 30) {
        healthFill.style.background = 'linear-gradient(90deg, #F44336, #E57373)';
      } else if (healthPercent < 60) {
        healthFill.style.background = 'linear-gradient(90deg, #FF9800, #FFB74D)';
      } else {
        healthFill.style.background = 'linear-gradient(90deg, #8BC34A, #4CAF50)';
      }
    }
    
    // Puan
    const scoreValue = document.getElementById('score-value');
    if (scoreValue && this.player) {
      scoreValue.textContent = formatNumber(this.player.score);
    }
    
    // Süre
    const timerValue = document.getElementById('timer-value');
    if (timerValue) {
      timerValue.textContent = formatTime(this.remainingTime);
      
      if (this.remainingTime < 30) {
        timerValue.style.color = '#F44336';
        timerValue.classList.add('animate-blink');
      } else {
        timerValue.style.color = '#FF9800';
        timerValue.classList.remove('animate-blink');
      }
    }
    
    // Seviye bilgisi
    const levelName = document.getElementById('level-name');
    if (levelName && this.levelConfig) {
      levelName.textContent = `Seviye ${this.currentLevel}: ${this.levelConfig.name}`;
    }
    
    // Hedef
    const objectiveText = document.getElementById('objective-text');
    if (objectiveText) {
      const remaining = this.itemManager.getRemainingCount();
      objectiveText.textContent = `Hedef: ${remaining} sağlıklı obje topla`;
    }
  }

  /**
   * Kazanma koşulu kontrol
   */
  checkWinCondition() {
    const remaining = this.itemManager.getRemainingCount();
    
    if (remaining === 0) {
      this.levelComplete();
    }
  }

  /**
   * Kaybetme koşulu kontrol
   */
  checkLoseCondition() {
    if (this.player.isDead()) {
      this.gameOver();
    }
    
    if (this.remainingTime <= 0) {
      this.gameOver();
    }
  }

  /**
   * Seviye tamamlandı
   */
  levelComplete() {
    this.state = 'levelComplete';
    this.stats.levelsCompleted++;
    
    // Bonus hesapla
    const timeBonus = Math.floor(this.remainingTime * 10);
    const healthBonus = this.player.health === this.player.maxHealth ? 200 : 0;
    const totalBonus = timeBonus + healthBonus;
    
    this.player.addScore(totalBonus, false);
    
    // Modal göster
    document.getElementById('final-score').textContent = formatNumber(this.player.score);
    document.getElementById('final-time').textContent = formatTime(this.levelTime - this.remainingTime);
    document.getElementById('final-bonus').textContent = `+${formatNumber(totalBonus)}`;
    
    showModal('level-complete-modal');
    
    // Konfeti
    createConfetti();
    
    // LocalStorage'a kaydet
    this.saveProgress();
  }

  /**
   * Oyun bitti
   */
  gameOver() {
    this.state = 'gameOver';
    showModal('game-over-modal');
    vibrate(500);
  }

  /**
   * Pause/Resume
   */
  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      document.getElementById('pause-icon').textContent = '▶️';
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.lastTime = performance.now();
      document.getElementById('pause-icon').textContent = '⏸️';
    }
  }

  /**
   * Sonraki seviye
   */
  nextLevel() {
    hideModal('level-complete-modal');
    
    if (this.currentLevel < this.maxLevel) {
      this.currentLevel++;
      this.loadLevel(this.currentLevel);
      this.state = 'playing';
      this.lastTime = performance.now();
    } else {
      // Oyun tamamlandı
      alert('🎉 Tebrikler! Tüm seviyeleri tamamladınız!');
      this.returnToMenu();
    }
  }

  /**
   * Seviyeyi yeniden başlat
   */
  restartLevel() {
    hideModal('game-over-modal');
    this.loadLevel(this.currentLevel);
    this.state = 'playing';
    this.lastTime = performance.now();
  }

  /**
   * Ana menüye dön
   */
  returnToMenu() {
    this.state = 'menu';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    switchScreen('game-screen', 'main-menu');
  }

  /**
   * İlerlemeyi kaydet
   */
  saveProgress() {
    const progress = {
      currentLevel: this.currentLevel,
      totalScore: this.player.score,
      stats: this.stats,
      timestamp: Date.now()
    };
    saveToLocalStorage('gameProgress', progress);
  }

  /**
   * İlerlemeyi yükle
   */
  loadProgress() {
    const progress = loadFromLocalStorage('gameProgress');
    if (progress) {
      this.currentLevel = progress.currentLevel;
      this.stats = progress.stats;
      return true;
    }
    return false;
  }

  /**
   * Temizle ve durdur
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.itemManager.clear();
    this.enemyManager.clear();
    this.keyboard.reset();
  }
}

// Global oyun nesnesi
let game = null;

/**
 * Oyunu başlat (global fonksiyon)
 */
function startGame() {
  switchScreen('main-menu', 'game-screen');
  
  if (!game) {
    game = new GameEngine('game-canvas');
  }
  
  game.start(1);
}

/**
 * Pause toggle (global)
 */
function togglePause() {
  if (game) {
    game.togglePause();
  }
}

/**
 * Sonraki seviye (global)
 */
function nextLevel() {
  if (game) {
    game.nextLevel();
  }
}

/**
 * Seviyeyi yeniden başlat (global)
 */
function restartLevel() {
  if (game) {
    game.restartLevel();
  }
}

/**
 * Ana menü (global)
 */
function showMainMenu() {
  if (game) {
    game.returnToMenu();
  } else {
    switchScreen('game-screen', 'main-menu');
    switchScreen('level-select', 'main-menu');
  }
}

// ESC tuşu ile pause
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && game && (game.state === 'playing' || game.state === 'paused')) {
    togglePause();
  }
});
