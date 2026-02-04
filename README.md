# 🏥 Sağlık Labireni - Eğitici Oyun

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Modern, eğlenceli ve eğitici bir web tabanlı sağlık oyunu**  
*Ortaokul öğrencileri için özel olarak tasarlanmış interaktif öğrenme deneyimi*

[🎮 Demo](https://huseyinsihat.github.io/labirent) | [📖 Dokümantasyon](docs/) | [🐛 Hata Bildirimi](https://github.com/huseyinsihat/labirent/issues)

</div>

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Nasıl Oynanır](#-nasıl-oynanır)
- [Oyun Mekanikleri](#-oyun-mekanikleri)
- [Sağlık Konuları](#-sağlık-konuları)
- [Dosya Yapısı](#-dosya-yapısı)
- [Geliştirme](#-geliştirme)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🎯 Hakkında

**Sağlık Labireni**, ortaokul öğrencilerinin sağlık konularında bilinçlenmesini sağlamak için geliştirilmiş, eğitici ve eğlenceli bir web tabanlı oyundur. Oyun, klasik labiren mekaniklerini modern eğitim teknikleriyle birleştirerek öğrenmeyi oyunlaştırır (gamification).

### 🌟 Projenin Amacı

- ✅ Öğrencilere **dengeli beslenme** konusunda farkındalık kazandırmak
- ✅ **Kişisel hijyen** alışkanlıklarını geliştirmek
- ✅ **Bağışıklık sistemi** hakkında temel bilgiler vermek
- ✅ **Fiziksel aktivite** önemini vurgulamak
- ✅ **Zararlı alışkanlıklardan** kaçınmayı öğretmek

### 🎓 Hedef Kitle

- İlkokul ve ortaokul öğrencileri (8-14 yaş)
- Eğitimciler ve öğretmenler
- Sağlık eğitimi veren kurumlar
- Ebeveynler

---

## ✨ Özellikler

### 🎮 Oyun Özellikleri

- **🌀 Dinamik Labiren Üretimi**: Her oyunda farklı labiren düzenleri
- **🎯 10+ Seviye**: 5 farklı sağlık konusu üzerine çeşitli zorluk seviyeleri
- **⌨️ Kolay Kontroller**: Klavye (ok tuşları/WASD) ile basit hareket
- **📱 Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **⏱️ Zamana Karşı Yarış**: Her seviye için geri sayım
- **💯 Puanlama Sistemi**: Combo bonusları ve başarı rozetleri
- **🎨 Modern Arayüz**: Renkli, çekici ve kullanıcı dostu tasarım

### 📚 Eğitsel Özellikler

- **70+ Sağlık Bilgisi**: Oyun içi bilgilendirici kartlar
- **5 Ana Konu**: Beslenme, hijyen, bağışıklık, spor, zararlı alışkanlıklar
- **Quiz Sistemi**: 50+ interaktif test sorusu
- **Başarı Sistemi**: Öğrenme motivasyonu için rozetler
- **İlerleme Takibi**: LocalStorage ile kayıt sistemi

### 🎨 Teknik Özellikler

- **%100 Vanilla JavaScript**: Framework bağımlılığı yok
- **Canvas API**: Smooth 60 FPS oyun akışı
- **CSS3 Animasyonlar**: Akıcı ve modern görsel efektler
- **AJAX Veri Yükleme**: Dinamik içerik yönetimi
- **Performans Optimizasyonu**: <2 saniye yükleme süresi
- **Erişilebilirlik**: WCAG AA standartlarına uygun

---

## 🛠️ Teknolojiler

Bu proje tamamen modern web teknolojileri kullanılarak geliştirilmiştir:

```
Frontend:
├── HTML5          → Semantik yapı ve Canvas API
├── CSS3           → Flexbox, Grid, Animations, Custom Properties
└── JavaScript ES6 → Classes, Modules, Async/Await, Canvas 2D

Veri:
├── JSON           → Sağlık bilgileri, quiz soruları, seviye konfigürasyonları
└── LocalStorage   → Oyuncu ilerlemesi ve ayarlar

Araçlar:
├── Git            → Versiyon kontrolü
└── VS Code        → Geliştirme ortamı
```

### 📦 Bağımlılıklar

**Sıfır dış bağımlılık!** Proje tamamen vanilla JavaScript ile yazılmıştır. Node.js, npm veya herhangi bir framework gerekmez.

---

## 🚀 Kurulum

### Gereksinimler

- Modern bir web tarayıcısı (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Yerel bir web sunucusu (isteğe bağlı, ancak önerilir)

### Hızlı Başlangıç

#### 1️⃣ Projeyi İndirin

```bash
# Git ile klonlama
git clone https://github.com/huseyinsihat/labirent.git
cd labirent
```

#### 2️⃣ Projeyi Çalıştırın

**Yöntem 1: Doğrudan Tarayıcıda Açma**
```bash
# index.html dosyasını tarayıcınızda açın
# Çift tıklama veya sürükle-bırak yöntemi
```

**Yöntem 2: Yerel Web Sunucusu (Önerilen)**

```bash
# Python 3 varsa
python -m http.server 8000

# Python 2 varsa
python -m SimpleHTTPServer 8000

# Node.js varsa
npx http-server -p 8000

# VS Code Live Server eklentisi ile
# Sağ tık → "Open with Live Server"
```

#### 3️⃣ Tarayıcıda Görüntüleme

```
http://localhost:8000
```

**İşte bu kadar! Artık oyunu oynayabilirsiniz 🎉**

---

## 🎮 Nasıl Oynanır

### Kontroller

| Tuş | Aksiyon |
|-----|---------|
| `↑` veya `W` | Yukarı hareket |
| `↓` veya `S` | Aşağı hareket |
| `←` veya `A` | Sola hareket |
| `→` veya `D` | Sağa hareket |
| `ESC` | Oyunu duraklat |
| `R` | Seviyeyi yeniden başlat |

### Oyun Akışı

1. **Ana Menüden Başla**
   - "Oyuna Başla" butonuna tıklayın
   - Seviye seçimi yapın

2. **Labirende İlerle**
   - Karakterinizi ok tuşları ile hareket ettirin
   - Yeşil objeler (sağlıklı besinler, vitaminler) toplayın ✅
   - Kırmızı objelerden (zararlı maddeler) kaçının ❌
   - Duvarlara çarpmaktan kaçının 🚧

3. **Bilgi Kartlarını Okuyun**
   - Her obje topladığınızda sağlık bilgisi görüntülenir
   - Bu bilgileri okuyarak puan kazanın 📚

4. **Seviyeyi Tamamlayın**
   - Tüm hedef objeleri toplayın
   - Çıkış kapısına ulaşın 🚪
   - Bonus puanlarınızı kazanın 🏆

### Puanlama

```javascript
✅ Sağlıklı Besin:      +50 puan
✅ Vitamin Kapsülü:     +100 puan
✅ Hijyen Ürünü:        +75 puan
✅ Egzersiz Ekipmanı:   +80 puan

❌ Sağlıksız Besin:     -100 puan
❌ Mikroba Çarpma:      -150 puan
❌ Duvara Çarpma:       -10 puan

🎁 Hız Bonusu:          +500 puan (< 1 dk)
🎁 Can Dolu Bitirme:    +200 puan
🎁 Combo (3 ardışık):   +50 puan
```

---

## 🎲 Oyun Mekanikleri

### Labiren Sistemi

Oyun, **Recursive Backtracking** algoritması kullanarak her seferinde farklı labirenler oluşturur:

```javascript
class MazeGenerator {
  generate() {
    this.initializeGrid();        // Grid başlat
    this.carvePassages(0, 0);    // Yolları oluştur
    this.convertToWalls();       // Duvarları çiz
    this.addItems();             // Objeleri yerleştir
    return this.maze;
  }
}
```

### Çarpışma Algılama

Oyun, pixel-perfect çarpışma algılama kullanır:

- **Player vs Walls**: AABB (Axis-Aligned Bounding Box) collision
- **Player vs Items**: Circle collision detection
- **Player vs Enemies**: Circle-to-circle collision

### Canvas Rendering

60 FPS hedeflenen oyun döngüsü:

```javascript
function gameLoop(timestamp) {
  updateGameState(timestamp);
  clearCanvas();
  drawMaze();
  drawItems();
  drawPlayer();
  drawEnemies();
  requestAnimationFrame(gameLoop);
}
```

---

## 📚 Sağlık Konuları

Oyun 5 ana sağlık konusu içerir:

### 1. 🥗 Dengeli Beslenme
- Besin grupları (karbonhidrat, protein, vitamin, mineral)
- Günlük öğün düzeni
- Su tüketimi
- Şeker ve tuz kontrolü

### 2. 🧼 Kişisel Hijyen
- Doğru el yıkama teknikleri
- Diş sağlığı ve fırçalama
- Vücut temizliği
- Çevre hijyeni

### 3. 🛡️ Bağışıklık Sistemi
- Bağışıklık nasıl çalışır
- Aşıların önemi
- Hastalıklardan korunma yolları
- Mikrop ve virüsler

### 4. 💪 Fiziksel Aktivite
- Günlük egzersiz ihtiyacı
- Sporun sağlığa faydaları
- Doğru egzersiz teknikleri
- Ekran süresi yönetimi

### 5. 🚭 Zararlı Alışkanlıklar
- Sigara ve zararları
- Bağımlılık yapıcı maddeler
- Fast food ve obezite riski
- Sağlıklı yaşam seçimleri

---

## 📂 Dosya Yapısı

```
labirent/
│
├── 📄 index.html                    # Ana sayfa
├── 📄 README.md                     # Bu dosya
├── 📄 spec.md                       # Teknik şartname
│
├── 📁 src/
│   ├── 📁 css/
│   │   ├── main.css                # Ana stiller (renk paleti, layout)
│   │   ├── animations.css          # CSS animasyonları
│   │   └── responsive.css          # Responsive tasarım
│   │
│   ├── 📁 js/
│   │   ├── player.js               # Oyuncu kontrolü ve mantığı
│   │   ├── maze-generator.js       # Labiren oluşturma algoritması
│   │   ├── collision.js            # Çarpışma algılama
│   │   ├── items.js                # Toplanabilir objeler
│   │   ├── enemies.js              # Düşman AI
│   │   ├── game-engine.js          # Ana oyun döngüsü
│   │   └── utils.js                # Yardımcı fonksiyonlar
│   │
│   ├── 📁 data/
│   │   ├── health-topics.json      # Sağlık konuları ve bilgileri
│   │   ├── quiz-questions.json     # Test soruları
│   │   ├── achievements.json       # Başarı rozetleri
│   │   └── levels.json             # Seviye konfigürasyonları
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   │   └── 📁 sprites/         # Karakter ve obje görselleri
│   │   └── 📁 sounds/
│   │       └── 📁 sfx/             # Ses efektleri
│   │
│   └── 📁 pages/
│       ├── game.html               # Oyun sayfası
│       ├── topics.html             # Sağlık konuları
│       └── quiz.html               # Quiz sayfası
│
└── 📁 docs/
    ├── user-guide.md               # Kullanıcı kılavuzu
    └── developer-notes.md          # Geliştirici notları
```

---

## 🔧 Geliştirme

### Geliştirme Ortamı Kurulumu

```bash
# Projeyi klonlayın
git clone https://github.com/huseyinsihat/labirent.git
cd labirent

# VS Code ile açın
code .

# Live Server başlatın (VS Code eklentisi)
# veya başka bir yerel sunucu kullanın
```

### Kod Yapısı

#### Player Class (Oyuncu)

```javascript
class Player {
  constructor(x, y, size, speed) {
    this.x = x;              // X pozisyonu
    this.y = y;              // Y pozisyonu
    this.health = 100;       // Can
    this.score = 0;          // Puan
    this.speed = speed;      // Hareket hızı
  }
  
  move(dx, dy, maze) { }     // Hareket fonksiyonu
  takeDamage(amount) { }     // Hasar alma
  collectItem(item) { }      // Obje toplama
}
```

#### MazeGenerator Class (Labiren)

```javascript
class MazeGenerator {
  constructor(width, height, cellSize) {
    this.cols = width / cellSize;
    this.rows = height / cellSize;
  }
  
  generate() { }              // Labiren oluştur
  carvePassages(x, y) { }     // Yolları kaz
  convertToWalls() { }        // Duvarlara çevir
}
```

### Yeni Seviye Ekleme

1. `src/data/levels.json` dosyasını açın
2. Yeni seviye objesi ekleyin:

```json
{
  "id": 11,
  "name": "Yeni Seviye",
  "topic": "beslenme",
  "difficulty": "orta",
  "timeLimit": 180,
  "objectives": {
    "collectItems": 15,
    "avoidEnemies": 5
  }
}
```

### Yeni Sağlık Bilgisi Ekleme

1. `src/data/health-topics.json` dosyasını düzenleyin
2. İlgili konuya yeni bilgi kartı ekleyin:

```json
{
  "id": "yeni_bilgi",
  "baslik": "Bilgi Başlığı",
  "icerik": "Detaylı açıklama...",
  "icon": "🍎",
  "puan": 50
}
```

### Debug Modu

Geliştirme sırasında debug modunu açmak için:

```javascript
// src/js/game-engine.js dosyasında
const DEBUG_MODE = true;  // Çarpışma kutularını göster
const SHOW_FPS = true;    // FPS sayacını göster
const GOD_MODE = true;    // Sonsuz can
```

---

## 🎨 Özelleştirme

### Renk Teması Değiştirme

`src/css/main.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  --primary-color: #4CAF50;      /* Ana renk */
  --secondary-color: #2196F3;    /* İkincil renk */
  --accent-color: #FF9800;       /* Vurgu rengi */
  --danger-color: #F44336;       /* Tehlike rengi */
}
```

### Oyuncu Hızını Ayarlama

`src/js/player.js` dosyasında:

```javascript
constructor(x, y, size = 20, speed = 3) {  // speed değerini değiştirin
```

### Seviye Süresini Değiştirme

`src/data/levels.json` dosyasında `timeLimit` değerini saniye cinsinden ayarlayın.

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

1. **Fork** edin
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. **Pull Request** açın

### Katkı Kuralları

- ✅ Kod Türkçe yorumlarla belgelendirilmeli
- ✅ Değişkenler anlamlı isimlere sahip olmalı
- ✅ Her yeni özellik test edilmeli
- ✅ Responsive tasarıma uyumlu olmalı

---

## 🐛 Bilinen Sorunlar

- [ ] Safari'de bazı CSS animasyonları yavaş çalışabilir
- [ ] Çok küçük ekranlarda (<375px) layout sorunları olabilir
- [ ] LocalStorage doluysa ilerleme kaydedilmeyebilir

Sorunları [Issues](https://github.com/huseyinsihat/labirent/issues) sayfasından bildirebilirsiniz.

---

## 📝 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 📞 İletişim

- **GitHub**: [@huseyinsihat](https://github.com/huseyinsihat)
- **Proje Linki**: [https://github.com/huseyinsihat/labirent](https://github.com/huseyinsihat/labirent)

---

## 🙏 Teşekkürler

Bu proje aşağıdaki kaynaklardan ilham almıştır:

- Türkiye Sağlık Bakanlığı Eğitim Materyalleri
- Ortaokul Fen Bilimleri Müfredatı
- Modern Web Oyun Geliştirme Pratikleri

---

## 🎯 Sonraki Adımlar

- [ ] Çoklu dil desteği (İngilizce)
- [ ] Ses efektleri ve arka plan müziği
- [ ] Çok oyunculu mod
- [ ] Mobil uygulama (PWA)
- [ ] Backend entegrasyonu (skorlar için)
- [ ] Öğretmen paneli
- [ ] İstatistik ve raporlama

---

<div align="center">

**Eğlenerek öğren, sağlıklı yaşa! 🏥💚**

Yıldız ⭐ vermeyi unutmayın!

</div>
