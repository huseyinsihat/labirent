// ============================================
// DÜŞMANLAR (ENEMIES) - Mikroplar & Virüsler
// ============================================

class Enemy {
  constructor(x, y, type = 'bakteri') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 20;
    this.speed = this.getSpeedForType();
    this.damage = this.getDamageForType();
    this.emoji = this.getEmojiForType();
    this.color = this.getColorForType();
    this.alive = true;
    
    // AI hareket
    this.direction = randomFloat(0, Math.PI * 2);
    this.changeDirectionTimer = 0;
    this.changeDirectionInterval = 2000; // 2 saniye
    
    // Patrol
    this.patrolPoints = [];
    this.currentPatrolIndex = 0;
    
    // Animasyon
    this.wobble = 0;
    this.wobbleSpeed = 0.1;
  }

  /**
   * Tip'e göre hız
   */
  getSpeedForType() {
    const speeds = {
      'bakteri': 1,
      'virus': 1.5,
      'mantar': 0.8,
      'patrol_mikrop': 1.2,
      'yuruyen_virus': 1.3
    };
    return speeds[this.type] || 1;
  }

  /**
   * Tip'e göre hasar
   */
  getDamageForType() {
    const damages = {
      'bakteri': 10,
      'virus': 15,
      'mantar': 8,
      'patrol_mikrop': 12,
      'yuruyen_virus': 15
    };
    return damages[this.type] || 10;
  }

  /**
   * Tip'e göre emoji
   */
  getEmojiForType() {
    const emojis = {
      'bakteri': '🦠',
      'virus': '🦠',
      'mantar': '🍄',
      'patrol_mikrop': '👾',
      'yuruyen_virus': '👹'
    };
    return emojis[this.type] || '🦠';
  }

  /**
   * Tip'e göre renk
   */
  getColorForType() {
    const colors = {
      'bakteri': '#E57373',
      'virus': '#BA68C8',
      'mantar': '#FFB74D',
      'patrol_mikrop': '#F44336',
      'yuruyen_virus': '#D32F2F'
    };
    return colors[this.type] || '#E57373';
  }

  /**
   * Patrol noktaları ayarla
   */
  setPatrolPoints(points) {
    this.patrolPoints = points;
  }

  /**
   * Rastgele hareket (wandering)
   */
  randomWander(maze, deltaTime) {
    this.changeDirectionTimer += deltaTime;
    
    // Belirli aralıklarla yön değiştir
    if (this.changeDirectionTimer >= this.changeDirectionInterval) {
      this.direction = randomFloat(0, Math.PI * 2);
      this.changeDirectionTimer = 0;
    }
    
    const dx = Math.cos(this.direction) * this.speed;
    const dy = Math.sin(this.direction) * this.speed;
    
    const newX = this.x + dx;
    const newY = this.y + dy;
    
    // Duvara çarparsa yön değiştir
    if (this.canMoveTo(newX, newY, maze)) {
      this.x = newX;
      this.y = newY;
    } else {
      this.direction = randomFloat(0, Math.PI * 2);
    }
  }

  /**
   * Oyuncuyu takip et (chase)
   */
  chasePlayer(player, maze, deltaTime) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 0) {
      const moveX = (dx / dist) * this.speed;
      const moveY = (dy / dist) * this.speed;
      
      const newX = this.x + moveX;
      const newY = this.y + moveY;
      
      if (this.canMoveTo(newX, newY, maze)) {
        this.x = newX;
        this.y = newY;
      }
    }
  }

  /**
   * Patrol hareketi
   */
  patrol(maze, deltaTime) {
    if (this.patrolPoints.length === 0) {
      this.randomWander(maze, deltaTime);
      return;
    }
    
    const target = this.patrolPoints[this.currentPatrolIndex];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 10) {
      // Sonraki patrol noktasına geç
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
    } else {
      const moveX = (dx / dist) * this.speed;
      const moveY = (dy / dist) * this.speed;
      
      this.x += moveX;
      this.y += moveY;
    }
  }

  /**
   * Hareket edebilir mi kontrol et
   */
  canMoveTo(x, y, maze) {
    // Canvas sınırları
    if (x < this.size || x > maze.width - this.size ||
        y < this.size || y > maze.height - this.size) {
      return false;
    }
    
    // Duvar kontrolü
    for (const wall of maze.walls) {
      if (CollisionDetector.circleRect(
        x, y, this.size / 2,
        wall.x, wall.y, wall.width, wall.height
      )) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Güncelle
   */
  update(player, maze, deltaTime, behavior = 'wander') {
    if (!this.alive) return;
    
    // Wobble animasyonu
    this.wobble += this.wobbleSpeed;
    
    // AI davranışı
    switch (behavior) {
      case 'wander':
        this.randomWander(maze, deltaTime);
        break;
      case 'chase':
        this.chasePlayer(player, maze, deltaTime);
        break;
      case 'patrol':
        this.patrol(maze, deltaTime);
        break;
    }
  }

  /**
   * Çiz
   */
  draw(ctx) {
    if (!this.alive) return;
    
    const wobbleOffset = Math.sin(this.wobble) * 2;
    
    // Glow efekti
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    
    // Düşmanı çiz
    drawEmoji(ctx, this.emoji, this.x + wobbleOffset, this.y, this.size * 2);
    
    // Gölgeyi sıfırla
    ctx.shadowBlur = 0;
    
    // Debug mod
    if (window.DEBUG_MODE) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      
      // Patrol yolu çiz
      if (this.patrolPoints.length > 0) {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(this.patrolPoints[0].x, this.patrolPoints[0].y);
        for (let i = 1; i < this.patrolPoints.length; i++) {
          ctx.lineTo(this.patrolPoints[i].x, this.patrolPoints[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}

// Düşman yöneticisi
class EnemyManager {
  constructor() {
    this.enemies = [];
  }

  /**
   * Düşman ekle
   */
  addEnemy(x, y, type = 'bakteri') {
    const enemy = new Enemy(x, y, type);
    this.enemies.push(enemy);
    return enemy;
  }

  /**
   * Rastgele düşman ekle
   */
  addRandomEnemy(x, y, levelType = 'beslenme') {
    const types = this.getEnemyTypesForLevel(levelType);
    const type = randomChoice(types);
    return this.addEnemy(x, y, type);
  }

  /**
   * Seviye tipine göre düşman türleri
   */
  getEnemyTypesForLevel(levelType) {
    const types = {
      'beslenme': ['bakteri'],
      'hijyen': ['bakteri', 'virus'],
      'bagisiklik': ['virus', 'bakteri', 'mantar'],
      'egzersiz': ['patrol_mikrop'],
      'zararli': ['yuruyen_virus', 'patrol_mikrop']
    };
    return types[levelType] || ['bakteri'];
  }

  /**
   * Labiren'e düşmanları yerleştir
   */
  populateMaze(maze, count = 5, levelType = 'beslenme') {
    this.enemies = [];
    const paths = maze.paths || [];
    
    if (paths.length === 0) {
      console.warn('Labiren yolları bulunamadı');
      return;
    }

    // İlk ve son hücreleri atla (başlangıç/bitiş bölgeleri)
    const safePaths = paths.filter((p, i) => i > 5 && i < paths.length - 5);
    
    for (let i = 0; i < count; i++) {
      if (safePaths.length === 0) break;
      
      const path = randomChoice(safePaths);
      const enemy = this.addRandomEnemy(path.x, path.y, levelType);
      
      // Patrol düşmanları için yol belirle
      if (enemy.type === 'patrol_mikrop' || enemy.type === 'yuruyen_virus') {
        const patrolPoints = [];
        for (let j = 0; j < 4; j++) {
          const pp = randomChoice(safePaths);
          patrolPoints.push({ x: pp.x, y: pp.y });
        }
        enemy.setPatrolPoints(patrolPoints);
      }
    }
  }

  /**
   * Oyuncu ile çarpışmaları kontrol et
   */
  checkCollisions(player) {
    const hits = [];

    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;

      if (CollisionDetector.playerEnemy(player, enemy)) {
        const damaged = player.takeDamage(enemy.damage);
        if (damaged) {
          hits.push(enemy);
          createParticle(enemy.x, enemy.y, `-${enemy.damage}`, 'red');
          if (typeof playSound === 'function') playSound('damage');
          
          // Oyuncuyu geri ittir
          const dx = player.x - enemy.x;
          const dy = player.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            player.x += (dx / dist) * 10;
            player.y += (dy / dist) * 10;
          }
        }
      }
    }

    return hits;
  }

  /**
   * Tüm düşmanları güncelle
   */
  update(player, maze, deltaTime) {
    for (const enemy of this.enemies) {
      // Davranış belirle
      let behavior = 'wander';
      
      if (enemy.type === 'patrol_mikrop' || enemy.type === 'yuruyen_virus') {
        behavior = 'patrol';
      }
      
      // Oyuncuya yakınsa takip et
      const dist = distance(player.x, player.y, enemy.x, enemy.y);
      if (dist < 150) {
        behavior = 'chase';
      }
      
      enemy.update(player, maze, deltaTime, behavior);
    }
  }

  /**
   * Tüm düşmanları çiz
   */
  draw(ctx) {
    for (const enemy of this.enemies) {
      enemy.draw(ctx);
    }
  }

  /**
   * Canlı düşman sayısı
   */
  getAliveCount() {
    return this.enemies.filter(e => e.alive).length;
  }

  /**
   * Tüm düşmanları temizle
   */
  clear() {
    this.enemies = [];
  }
}
