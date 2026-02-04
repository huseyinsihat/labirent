// ============================================
// ÇARPIŞMA ALGILAMA (COLLISION DETECTION)
// ============================================

class CollisionDetector {
  /**
   * İki dikdörtgen çarpışıyor mu (AABB)
   */
  static rectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
           x1 + w1 > x2 &&
           y1 < y2 + h2 &&
           y1 + h1 > y2;
  }

  /**
   * İki daire çarpışıyor mu
   */
  static circleCircle(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
  }

  /**
   * Daire-dikdörtgen çarpışması
   */
  static circleRect(cx, cy, radius, rx, ry, rw, rh) {
    // En yakın noktayı bul
    const closestX = clamp(cx, rx, rx + rw);
    const closestY = clamp(cy, ry, ry + rh);
    
    // Mesafeyi hesapla
    const dx = cx - closestX;
    const dy = cy - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < radius;
  }

  /**
   * Nokta-dikdörtgen çarpışması
   */
  static pointRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw &&
           py >= ry && py <= ry + rh;
  }

  /**
   * Nokta-daire çarpışması
   */
  static pointCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius;
  }

  /**
   * Oyuncu-obje çarpışması kontrolü
   */
  static playerItem(player, item) {
    return this.circleCircle(
      player.x, player.y, player.size / 2,
      item.x, item.y, item.size / 2
    );
  }

  /**
   * Oyuncu-düşman çarpışması
   */
  static playerEnemy(player, enemy) {
    return this.circleCircle(
      player.x, player.y, player.size / 2,
      enemy.x, enemy.y, enemy.size / 2
    );
  }

  /**
   * Oyuncu-duvar çarpışması
   */
  static playerWall(player, wall) {
    return this.circleRect(
      player.x, player.y, player.size / 2,
      wall.x, wall.y, wall.width, wall.height
    );
  }

  /**
   * Çarpışma tepkisi hesapla (fizik)
   */
  static resolveCollision(obj1, obj2) {
    const dx = obj2.x - obj1.x;
    const dy = obj2.y - obj1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { dx: 0, dy: 0 };
    
    // Normalize edilmiş yön vektörü
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Overlap miktarı
    const overlap = (obj1.size / 2 + obj2.size / 2) - distance;
    
    return {
      dx: nx * overlap / 2,
      dy: ny * overlap / 2
    };
  }

  /**
   * Sweep test (hareket sırasında çarpışma)
   */
  static sweepAABB(x1, y1, w1, h1, vx, vy, x2, y2, w2, h2) {
    // Genişletilmiş hedef kutu
    const expandedX = x2 - w1 / 2;
    const expandedY = y2 - h1 / 2;
    const expandedW = w2 + w1;
    const expandedH = h2 + h1;
    
    // Ray-box intersection
    const centerX = x1 + w1 / 2;
    const centerY = y1 + h1 / 2;
    
    let tmin = 0;
    let tmax = 1;
    
    // X ekseni
    if (vx !== 0) {
      const tx1 = (expandedX - centerX) / vx;
      const tx2 = (expandedX + expandedW - centerX) / vx;
      tmin = Math.max(tmin, Math.min(tx1, tx2));
      tmax = Math.min(tmax, Math.max(tx1, tx2));
    }
    
    // Y ekseni
    if (vy !== 0) {
      const ty1 = (expandedY - centerY) / vy;
      const ty2 = (expandedY + expandedH - centerY) / vy;
      tmin = Math.max(tmin, Math.min(ty1, ty2));
      tmax = Math.min(tmax, Math.max(ty1, ty2));
    }
    
    return tmin <= tmax && tmax >= 0 ? tmin : -1;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CollisionDetector;
}
