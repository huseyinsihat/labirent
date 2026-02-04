// ============================================
// TOPLANABİLİR OBJELER (ITEMS)
// ============================================

class Item {
  constructor(x, y, type, value = 50) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.value = value;
    this.size = 16;
    this.collected = false;
    this.emoji = this.getEmoji();
    this.color = this.getColor();
    
    // Animasyon
    this.floatOffset = 0;
    this.floatSpeed = 0.05;
    this.rotation = 0;
    this.rotationSpeed = 0.02;
  }

  /**
   * Tip'e göre emoji al
   */
  getEmoji() {
    const emojiMap = {
      // Sağlıklı besinler
      'meyve': ['🍎', '🍊', '🍌', '🍇', '🥝'][randomInt(0, 4)],
      'sebze': ['🥕', '🥦', '🥬', '🌶️', '🍅'][randomInt(0, 4)],
      'su': '💧',
      'tahil': '🌾',
      
      // Vitaminler
      'vitamin_a': '💊',
      'vitamin_b': '💊',
      'vitamin_c': '💊',
      'vitamin_d': '💊',
      'vitamin_e': '💊',
      
      // Hijyen
      'sabun': '🧼',
      'dis_fircasi': '🪥',
      'dezenfektan': '🧴',
      
      // Egzersiz
      'top': '⚽',
      'ip': '🪢',
      'dambil': '🏋️',
      
      // Zararlı
      'cips': '🍟',
      'kola': '🥤',
      'hamburger': '🍔',
      'seker': '🍬',
      'sigara': '🚬',
      
      // Özel
      'kalp': '❤️',
      'yildiz': '⭐',
      'bonus': '🎁'
    };
    return emojiMap[this.type] || '❓';
  }

  /**
   * Tip'e göre renk al
   */
  getColor() {
    const colorMap = {
      'meyve': '#FF6B6B',
      'sebze': '#51CF66',
      'su': '#339AF0',
      'tahil': '#FFD43B',
      'vitamin_a': '#FFA94D',
      'vitamin_b': '#845EF7',
      'vitamin_c': '#FF6B6B',
      'vitamin_d': '#FFD43B',
      'vitamin_e': '#51CF66',
      'sabun': '#4DABF7',
      'dis_fircasi': '#74C0FC',
      'dezenfektan': '#A9E34B',
      'top': '#FF8787',
      'ip': '#FFD43B',
      'dambil': '#868E96',
      'kalp': '#FA5252',
      'yildiz': '#FFD43B',
      'bonus': '#BE4BDB'
    };
    return colorMap[this.type] || '#90A4AE';
  }

  /**
   * Obje iyi mi kötü mü
   */
  isGood() {
    const badTypes = ['cips', 'kola', 'hamburger', 'seker', 'sigara'];
    return !badTypes.includes(this.type);
  }

  /**
   * Objeyi topla
   */
  collect() {
    this.collected = true;
    return {
      score: this.value,
      type: this.type,
      isGood: this.isGood()
    };
  }

  /**
   * Güncelle (animasyon)
   */
  update(deltaTime) {
    // Yukarı aşağı yüzme animasyonu
    this.floatOffset += this.floatSpeed;
    
    // Dönme animasyonu
    this.rotation += this.rotationSpeed;
  }

  /**
   * Çiz
   */
  draw(ctx) {
    if (this.collected) return;

    const floatY = Math.sin(this.floatOffset) * 3;
    
    // Glow efekti
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    
    // Objeyi çiz
    drawEmoji(ctx, this.emoji, this.x, this.y + floatY, this.size * 2);
    
    // Gölgeyi sıfırla
    ctx.shadowBlur = 0;
    
    // Debug mod: Çarpışma kutusu
    if (window.DEBUG_MODE) {
      ctx.strokeStyle = this.isGood() ? 'green' : 'red';
      ctx.strokeRect(
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }
  }
}

// Obje yöneticisi
class ItemManager {
  constructor() {
    this.items = [];
  }

  /**
   * Obje ekle
   */
  addItem(x, y, type, value) {
    const item = new Item(x, y, type, value);
    this.items.push(item);
    return item;
  }

  /**
   * Rastgele obje ekle
   */
  addRandomItem(x, y, levelType = 'beslenme') {
    const itemTypes = this.getItemTypesForLevel(levelType);
    const type = randomChoice(itemTypes);
    const value = this.getValueForType(type);
    return this.addItem(x, y, type, value);
  }

  /**
   * Seviye tipine göre obje türleri
   */
  getItemTypesForLevel(levelType) {
    const types = {
      'beslenme': ['meyve', 'sebze', 'su', 'tahil', 'cips', 'kola', 'hamburger'],
      'hijyen': ['sabun', 'dis_fircasi', 'dezenfektan'],
      'bagisiklik': ['vitamin_a', 'vitamin_b', 'vitamin_c', 'vitamin_d', 'vitamin_e'],
      'egzersiz': ['top', 'ip', 'dambil'],
      'zararli': ['sigara', 'seker']
    };
    return types[levelType] || types['beslenme'];
  }

  /**
   * Tip'e göre değer
   */
  getValueForType(type) {
    const values = {
      'meyve': 50,
      'sebze': 50,
      'su': 30,
      'tahil': 40,
      'vitamin_a': 100,
      'vitamin_b': 100,
      'vitamin_c': 100,
      'vitamin_d': 100,
      'vitamin_e': 100,
      'sabun': 75,
      'dis_fircasi': 75,
      'dezenfektan': 75,
      'top': 80,
      'ip': 80,
      'dambil': 80,
      'cips': -100,
      'kola': -100,
      'hamburger': -100,
      'seker': -50,
      'sigara': -200,
      'kalp': 50, // Can yeniler
      'yildiz': 200,
      'bonus': 500
    };
    return values[type] || 50;
  }

  /**
   * Labiren'e objeleri yerleştir
   */
  populateMaze(maze, count = 15, levelType = 'beslenme') {
    this.items = [];
    const paths = maze.paths || [];
    
    if (paths.length === 0) {
      console.warn('Labiren yolları bulunamadı');
      return;
    }

    // Rastgele pozisyonlara objeler ekle
    const usedPositions = new Set();
    let attempts = 0;
    const maxAttempts = count * 3;

    while (this.items.length < count && attempts < maxAttempts) {
      const path = randomChoice(paths);
      const posKey = `${path.gridX},${path.gridY}`;
      
      if (!usedPositions.has(posKey)) {
        this.addRandomItem(path.x, path.y, levelType);
        usedPositions.add(posKey);
      }
      
      attempts++;
    }
  }

  /**
   * Oyuncu ile çarpışmaları kontrol et
   */
  checkCollisions(player) {
    const collected = [];

    for (const item of this.items) {
      if (item.collected) continue;

      if (CollisionDetector.playerItem(player, item)) {
        const result = item.collect();
        collected.push(result);

        // Skor ve efektler
        if (result.isGood) {
          player.addScore(result.score);
          player.collectItem(item);
          createParticle(item.x, item.y, result.score > 0 ? `+${result.score}` : result.score, 'green');
          if (typeof playSound === 'function') playSound('collect');
        } else {
          player.takeDamage(Math.abs(result.score));
          createParticle(item.x, item.y, result.score, 'red');
          if (typeof playSound === 'function') playSound('damage');
        }
      }
    }

    return collected;
  }

  /**
   * Tüm objeleri güncelle
   */
  update(deltaTime) {
    for (const item of this.items) {
      item.update(deltaTime);
    }
  }

  /**
   * Tüm objeleri çiz
   */
  draw(ctx) {
    for (const item of this.items) {
      item.draw(ctx);
    }
  }

  /**
   * Toplanmayan obje sayısı
   */
  getRemainingCount() {
    return this.items.filter(item => !item.collected && item.isGood()).length;
  }

  /**
   * Tüm objeleri temizle
   */
  clear() {
    this.items = [];
  }
}
