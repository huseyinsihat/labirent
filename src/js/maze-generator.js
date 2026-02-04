// ============================================
// LABİREN OLUŞTURUCU (MAZE GENERATOR)
// ============================================

class MazeGenerator {
  constructor(width, height, cellSize = 40) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);
    this.grid = [];
    this.walls = [];
    this.paths = [];
  }

  /**
   * Yeni labiren oluştur
   */
  generate() {
    this.initializeGrid();
    this.carvePassages(0, 0);
    this.convertToWalls();
    return {
      width: this.width,
      height: this.height,
      walls: this.walls,
      paths: this.paths,
      cellSize: this.cellSize
    };
  }

  /**
   * Grid'i başlat
   */
  initializeGrid() {
    this.grid = [];
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push({
          x: x,
          y: y,
          visited: false,
          walls: {
            top: true,
            right: true,
            bottom: true,
            left: true
          }
        });
      }
      this.grid.push(row);
    }
  }

  /**
   * Hücreyi al
   */
  getCell(x, y) {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
      return null;
    }
    return this.grid[y][x];
  }

  /**
   * Komşu hücreleri al
   */
  getNeighbors(cell) {
    const neighbors = [];
    const directions = [
      { x: 0, y: -1, wall: 'top' },    // Üst
      { x: 1, y: 0, wall: 'right' },   // Sağ
      { x: 0, y: 1, wall: 'bottom' },  // Alt
      { x: -1, y: 0, wall: 'left' }    // Sol
    ];

    for (const dir of directions) {
      const neighbor = this.getCell(cell.x + dir.x, cell.y + dir.y);
      if (neighbor && !neighbor.visited) {
        neighbors.push({ cell: neighbor, direction: dir });
      }
    }

    return neighbors;
  }

  /**
   * İki hücre arasındaki duvarı kaldır
   */
  removeWall(current, neighbor, direction) {
    if (direction === 'top') {
      current.walls.top = false;
      neighbor.walls.bottom = false;
    } else if (direction === 'right') {
      current.walls.right = false;
      neighbor.walls.left = false;
    } else if (direction === 'bottom') {
      current.walls.bottom = false;
      neighbor.walls.top = false;
    } else if (direction === 'left') {
      current.walls.left = false;
      neighbor.walls.right = false;
    }
  }

  /**
   * Recursive Backtracking algoritması ile yol aç
   */
  carvePassages(startX, startY) {
    const stack = [];
    const current = this.getCell(startX, startY);
    current.visited = true;
    stack.push(current);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = this.getNeighbors(current);

      if (neighbors.length > 0) {
        // Rastgele komşu seç
        const chosen = randomChoice(neighbors);
        const neighbor = chosen.cell;
        
        // Duvarı kaldır
        this.removeWall(current, neighbor, chosen.direction.wall);
        
        // Komşuyu ziyaret edildi olarak işaretle
        neighbor.visited = true;
        stack.push(neighbor);
      } else {
        // Geri git (backtrack)
        stack.pop();
      }
    }
  }

  /**
   * Grid'i duvar objelerine çevir
   */
  convertToWalls() {
    this.walls = [];
    this.paths = [];
    const wallThickness = 4;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.grid[y][x];
        const pixelX = x * this.cellSize;
        const pixelY = y * this.cellSize;

        // Yol olarak kaydet
        this.paths.push({
          x: pixelX + this.cellSize / 2,
          y: pixelY + this.cellSize / 2,
          gridX: x,
          gridY: y
        });

        // Duvarları ekle
        if (cell.walls.top) {
          this.walls.push({
            x: pixelX,
            y: pixelY,
            width: this.cellSize,
            height: wallThickness
          });
        }
        if (cell.walls.right) {
          this.walls.push({
            x: pixelX + this.cellSize - wallThickness,
            y: pixelY,
            width: wallThickness,
            height: this.cellSize
          });
        }
        if (cell.walls.bottom) {
          this.walls.push({
            x: pixelX,
            y: pixelY + this.cellSize - wallThickness,
            width: this.cellSize,
            height: wallThickness
          });
        }
        if (cell.walls.left) {
          this.walls.push({
            x: pixelX,
            y: pixelY,
            width: wallThickness,
            height: this.cellSize
          });
        }
      }
    }

    // Dış duvarları ekle
    this.addBorderWalls();
  }

  /**
   * Dış duvarları ekle
   */
  addBorderWalls() {
    const wallThickness = 8;
    
    // Üst duvar
    this.walls.push({
      x: 0,
      y: 0,
      width: this.width,
      height: wallThickness
    });
    
    // Alt duvar
    this.walls.push({
      x: 0,
      y: this.height - wallThickness,
      width: this.width,
      height: wallThickness
    });
    
    // Sol duvar
    this.walls.push({
      x: 0,
      y: 0,
      width: wallThickness,
      height: this.height
    });
    
    // Sağ duvar
    this.walls.push({
      x: this.width - wallThickness,
      y: 0,
      width: wallThickness,
      height: this.height
    });
  }

  /**
   * Rastgele bir yol pozisyonu al
   */
  getRandomPathPosition() {
    if (this.paths.length === 0) return { x: this.width / 2, y: this.height / 2 };
    return randomChoice(this.paths);
  }

  /**
   * Başlangıç pozisyonu al
   */
  getStartPosition() {
    return {
      x: this.cellSize * 1.5,
      y: this.cellSize * 1.5
    };
  }

  /**
   * Bitiş pozisyonu al (en uzak köşe)
   */
  getEndPosition() {
    return {
      x: this.width - this.cellSize * 1.5,
      y: this.height - this.cellSize * 1.5
    };
  }

  /**
   * Labireni çiz
   */
  draw(ctx) {
    // Zemin
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, this.width, this.height);

    // Grid çizgileri (isteğe bağlı)
    if (window.DEBUG_MODE) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= this.cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * this.cellSize, 0);
        ctx.lineTo(x * this.cellSize, this.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= this.rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * this.cellSize);
        ctx.lineTo(this.width, y * this.cellSize);
        ctx.stroke();
      }
    }

    // Duvarları çiz
    ctx.fillStyle = '#263238';
    for (const wall of this.walls) {
      // Gölge efekti
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
    
    // Gölgeyi sıfırla
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Başlangıç ve bitiş işaretleri
    const start = this.getStartPosition();
    const end = this.getEndPosition();
    
    // Başlangıç (yeşil)
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.beginPath();
    ctx.arc(start.x, start.y, this.cellSize / 2, 0, Math.PI * 2);
    ctx.fill();
    drawEmoji(ctx, '🏁', start.x, start.y, 24);
    
    // Bitiş (mavi)
    ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
    ctx.beginPath();
    ctx.arc(end.x, end.y, this.cellSize / 2, 0, Math.PI * 2);
    ctx.fill();
    drawEmoji(ctx, '🎯', end.x, end.y, 24);
  }
}

// Basit labiren oluşturucu (daha az karmaşık)
class SimpleMazeGenerator {
  constructor(width, height, cellSize = 60) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.walls = [];
  }

  /**
   * Basit labiren oluştur (manuel düzen)
   */
  generate() {
    this.walls = [];
    
    // Dış duvarlar
    const wallThickness = 8;
    
    this.walls.push(
      { x: 0, y: 0, width: this.width, height: wallThickness },
      { x: 0, y: this.height - wallThickness, width: this.width, height: wallThickness },
      { x: 0, y: 0, width: wallThickness, height: this.height },
      { x: this.width - wallThickness, y: 0, width: wallThickness, height: this.height }
    );

    // İç duvarlar (basit düzen)
    const cs = this.cellSize;
    const innerWalls = [
      { x: cs * 2, y: cs, width: cs * 3, height: wallThickness },
      { x: cs, y: cs * 2, width: cs * 2, height: wallThickness },
      { x: cs * 4, y: cs * 2, width: cs * 3, height: wallThickness },
      { x: cs * 2, y: cs * 3, width: wallThickness, height: cs * 2 },
      { x: cs * 5, y: cs * 3, width: wallThickness, height: cs * 2 }
    ];

    this.walls.push(...innerWalls);

    return {
      width: this.width,
      height: this.height,
      walls: this.walls,
      cellSize: this.cellSize
    };
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#263238';
    for (const wall of this.walls) {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
  }
}
