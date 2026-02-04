// ============================================
// OYUNCU (PLAYER) SINIFI
// ============================================

class Player {
  constructor(x, y, size = 20, speed = 3) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.health = 100;
    this.maxHealth = 100;
    this.score = 0;
    this.combo = 0;
    this.direction = 'down'; // up, down, left, right
    this.isMoving = false;
    this.inventory = [];
    
    // Animasyon
    this.frame = 0;
    this.animationSpeed = 10;
    this.frameCounter = 0;
    
    // İmmunity (hasar sonrası geçici bağışıklık)
    this.isImmune = false;
    this.immunityDuration = 1000; // 1 saniye
    this.immunityTimer = 0;
  }

  /**
   * Oyuncuyu hareket ettir
   */
  move(dx, dy, maze) {
    const newX = this.x + dx * this.speed;
    const newY = this.y + dy * this.speed;
    
    // Labirenin sınırlarını kontrol et
    if (this.canMoveTo(newX, newY, maze)) {
      this.x = newX;
      this.y = newY;
      this.isMoving = true;
      
      // Yön güncelle
      if (dx > 0) this.direction = 'right';
      else if (dx < 0) this.direction = 'left';
      else if (dy > 0) this.direction = 'down';
      else if (dy < 0) this.direction = 'up';
      
      // Animasyon frame'i güncelle
      this.updateAnimation();
    }
  }

  /**
   * Belirli pozisyona hareket edebilir mi kontrol et
   */
  canMoveTo(x, y, maze) {
    // Maze duvarları ile çarpışma kontrolü
    const playerLeft = x - this.size / 2;
    const playerRight = x + this.size / 2;
    const playerTop = y - this.size / 2;
    const playerBottom = y + this.size / 2;
    
    // Canvas sınırları
    if (playerLeft < 0 || playerRight > maze.width ||
        playerTop < 0 || playerBottom > maze.height) {
      return false;
    }
    
    // Duvar kontrolü
    for (const wall of maze.walls) {
      if (this.checkCollisionWithRect(
        playerLeft, playerTop, this.size, this.size,
        wall.x, wall.y, wall.width, wall.height
      )) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Dikdörtgen çarpışma kontrolü
   */
  checkCollisionWithRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
           x1 + w1 > x2 &&
           y1 < y2 + h2 &&
           y1 + h1 > y2;
  }

  /**
   * Animasyon güncelle
   */
  updateAnimation() {
    this.frameCounter++;
    if (this.frameCounter >= this.animationSpeed) {
      this.frame = (this.frame + 1) % 4; // 4 frame animasyon
      this.frameCounter = 0;
    }
  }

  /**
   * Hasar al
   */
  takeDamage(amount) {
    if (this.isImmune) return false;
    
    this.health -= amount;
    this.health = Math.max(0, this.health);
    this.combo = 0; // Combo sıfırla
    
    // İmmunity başlat
    this.isImmune = true;
    setTimeout(() => {
      this.isImmune = false;
    }, this.immunityDuration);
    
    // Titreşim
    vibrate(200);
    
    return true;
  }

  /**
   * Can ekle
   */
  heal(amount) {
    this.health += amount;
    this.health = Math.min(this.maxHealth, this.health);
  }

  /**
   * Puan ekle
   */
  addScore(points, showPopup = true) {
    this.score += points;
    
    if (showPopup && typeof showScorePopup === 'function') {
      showScorePopup(this.x, this.y - 30, points);
    }
  }

  /**
   * Combo ekle
   */
  addCombo() {
    this.combo++;
    
    // Combo bonusları
    const comboBonuses = {
      3: 50,
      5: 150,
      10: 500
    };
    
    if (comboBonuses[this.combo]) {
      this.addScore(comboBonuses[this.combo]);
    }
  }

  /**
   * Obje topla
   */
  collectItem(item) {
    this.inventory.push(item);
    this.addCombo();
  }

  /**
   * Oyuncu ölü mü
   */
  isDead() {
    return this.health <= 0;
  }

  /**
   * Oyuncuyu sıfırla
   */
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.health = this.maxHealth;
    this.score = 0;
    this.combo = 0;
    this.inventory = [];
    this.isImmune = false;
    this.direction = 'down';
    this.isMoving = false;
  }

  /**
   * Oyuncuyu çiz
   */
  draw(ctx) {
    // İmmunity durumunda yanıp sön
    if (this.isImmune && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    // Basit karakter çizimi (emoji)
    const emoji = this.getEmoji();
    drawEmoji(ctx, emoji, this.x, this.y, this.size * 2);
    
    // Alpha'yı sıfırla
    ctx.globalAlpha = 1.0;
    
    // Debug mod: Çarpışma kutusu
    if (window.DEBUG_MODE) {
      ctx.strokeStyle = 'yellow';
      ctx.strokeRect(
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }
  }

  /**
   * Yöne göre emoji al
   */
  getEmoji() {
    const emojis = {
      up: '🧍',
      down: '🧍',
      left: '🏃',
      right: '🏃'
    };
    return emojis[this.direction] || '🧍';
  }

  /**
   * Oyuncu verilerini kaydet
   */
  save() {
    return {
      x: this.x,
      y: this.y,
      health: this.health,
      score: this.score,
      combo: this.combo,
      inventory: this.inventory
    };
  }

  /**
   * Oyuncu verilerini yükle
   */
  load(data) {
    this.x = data.x;
    this.y = data.y;
    this.health = data.health;
    this.score = data.score;
    this.combo = data.combo;
    this.inventory = data.inventory || [];
  }

  /**
   * Güncelleme (her frame)
   */
  update(deltaTime) {
    // İmmunity timer güncelle
    if (this.isImmune) {
      this.immunityTimer += deltaTime;
    }
    
    // Hareket durumu sıfırla
    this.isMoving = false;
  }
}

// Klavye kontrolleri için yardımcı sınıf
class KeyboardController {
  constructor() {
    this.keys = {};
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      
      // Oyun kontrolleri için varsayılan davranışı engelle
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  isKeyPressed(key) {
    return this.keys[key] === true;
  }

  getMovementInput() {
    let dx = 0;
    let dy = 0;

    // WASD ve Arrow keys
    if (this.isKeyPressed('ArrowUp') || this.isKeyPressed('w')) dy -= 1;
    if (this.isKeyPressed('ArrowDown') || this.isKeyPressed('s')) dy += 1;
    if (this.isKeyPressed('ArrowLeft') || this.isKeyPressed('a')) dx -= 1;
    if (this.isKeyPressed('ArrowRight') || this.isKeyPressed('d')) dx += 1;

    // Diagonal hareketi normalize et
    if (dx !== 0 && dy !== 0) {
      const len = Math.sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;
    }

    return { dx, dy };
  }

  reset() {
    this.keys = {};
  }
}
