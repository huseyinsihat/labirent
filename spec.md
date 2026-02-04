# Sağlık Eğitimi Labiren Oyunu - Teknik Şartname

## 🎯 Proje Genel Bakış

Modern, etkileşimli ve eğitici bir web tabanlı sağlık oyunu. Ortaokul öğrencilerine yönelik, labiren mekanikleri ile sağlık bilgilerini birleştiren kapsamlı bir eğitim platformu.

## 📋 Temel Özellikler

### 1. Teknoloji Yığını
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Veri İletişimi**: AJAX (asenkron veri yükleme)
- **Animasyonlar**: CSS3 Animations & Transitions
- **Responsive**: Mobil, tablet, desktop uyumlu
- **Dil**: %100 Türkçe içerik

### 2. Oyun Mekanikleri

#### Labiren Sistemi
- **Dinamik Labiren Üretimi**: Her seviye için farklı labiren düzenleri
- **Seviye Sayısı**: Minimum 10 seviye (5 ana sağlık konusu x 2 zorluk)
- **Hareket Sistemi**: Klavye (ok tuşları/WASD) kontrolü
- **Kamera**: Oyuncu merkezli viewport
- **Zaman Sınırı**: Her seviye için geri sayım

#### Oyun Elementleri
```javascript
{
  "toplanabilir_objeler": {
    "saglikli_besinler": ["meyve", "sebze", "su", "tahil"],
    "vitamin_kapsulleri": ["A", "B", "C", "D", "E"],
    "hijyen_urunleri": ["sabun", "dis_fircasi", "dezenfektan"],
    "egzersiz_ekipmanlari": ["top", "ip", "dambıl"]
  },
  "kacinilacak_objeler": {
    "zararli_maddeler": ["sigara", "alkol", "uyusturucu"],
    "sagliksiz_besinler": ["cips", "kola", "hamburger", "seker"],
    "mikrop_virusler": ["bakteri", "virus", "mantar"]
  },
  "engeller": {
    "sabit": ["duvar", "kapi"],
    "hareketli": ["patrol_mikrop", "yuruyen_virus"],
    "tuzaklar": ["sugary_zone", "toxic_area"]
  }
}
```

### 3. Sağlık Konuları (Ortaokul Müfredatına Uygun)

#### Konu 1: Dengeli Beslenme
- Besin grupları ve özellikleri
- Öğün düzeni ve porsiyon kontrolü
- Su tüketiminin önemi
- Şeker ve tuz tüketimi kontrol
- 15+ detaylı bilgi kartı

#### Konu 2: Kişisel Hijyen
- El yıkama teknikleri
- Diş sağlığı ve fırçalama
- Vücut temizliği
- Çevre hijyeni
- 12+ detaylı bilgi kartı

#### Konu 3: Bağışıklık Sistemi
- Bağışıklık nasıl çalışır
- Aşıların önemi
- Hastalıklardan korunma
- Mikrop ve virüsler
- 15+ detaylı bilgi kartı

#### Konu 4: Fiziksel Aktivite
- Günlük egzersiz ihtiyacı
- Sporun sağlığa faydaları
- Doğru egzersiz teknikleri
- Ekran süresi yönetimi
- 12+ detaylı bilgi kartı

#### Konu 5: Zararlı Alışkanlıklar
- Sigara ve zararları
- Bağımlılık yapıcı maddeler
- Fast food ve obezite
- Sağlıklı yaşam tercihleri
- 15+ detaylı bilgi kartı

### 4. Kullanıcı Arayüzü Tasarımı

#### Ana Menü
```
┌─────────────────────────────────────┐
│     🏥 SAĞLIK LABİRENİ 🏥          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    🎮 OYUNA BAŞLA           │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │    📚 SAĞLIK KONULARI       │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │    🏆 BAŞARILARIM           │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │    📊 SKOR TABLOSU          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

#### Oyun Ekranı HUD
```
┌──────────────────────────────────────────────┐
│ 💚 Can: ████░░  ⭐ Puan: 1250  ⏱️ 2:45      │
├──────────────────────────────────────────────┤
│                                              │
│         [LABİREN OYUN ALANI]                 │
│                                              │
│              ┌─────┐                         │
│         ┌────┤  🧍  ├────┐                   │
│         │    └─────┘    │                   │
│                                              │
├──────────────────────────────────────────────┤
│ 📍 Seviye 3: Bağışıklık Sistemi             │
│ 🎯 Hedef: 5 aşı kapsülü topla               │
└──────────────────────────────────────────────┘
```

#### Bilgi Kartı Modal
```
┌─────────────────────────────────────┐
│  ℹ️  SAĞLIK BİLGİSİ                 │
├─────────────────────────────────────┤
│                                     │
│  🍎 C Vitamini Topladın!            │
│                                     │
│  C vitamini bağışıklık sistemini    │
│  güçlendirir ve hastalıklardan      │
│  korunmanı sağlar.                  │
│                                     │
│  📌 Kaynak: Turunçgiller, kivi,     │
│     çilek, yeşil biber              │
│                                     │
│  ✅ Günlük ihtiyaç: 75-90 mg        │
│                                     │
│  [ DEVAM ET ]                       │
└─────────────────────────────────────┘
```

### 5. Renk Paleti ve Tema

```css
:root {
  /* Ana Renkler */
  --primary-color: #4CAF50;      /* Sağlık yeşili */
  --secondary-color: #2196F3;    /* Bilgi mavisi */
  --accent-color: #FF9800;       /* Uyarı turuncu */
  --danger-color: #F44336;       /* Tehlike kırmızı */
  
  /* Arka Plan */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --bg-dark: #263238;
  
  /* Metin */
  --text-primary: #212121;
  --text-secondary: #757575;
  --text-light: #FFFFFF;
  
  /* Oyun Elementleri */
  --health-good: #81C784;
  --health-bad: #E57373;
  --neutral: #90A4AE;
  
  /* Gradientler */
  --gradient-success: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-warning: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### 6. Animasyon ve Etkileşimler

#### Mikro Animasyonlar
- **Buton Hover**: Scale + glow efekti (200ms)
- **Karakter Hareket**: Smooth transition (100ms)
- **Obje Toplama**: Pop + fade out (300ms)
- **Seviye Geçiş**: Fade + slide (500ms)
- **Puan Kazanma**: Bounce + number increment

#### Parçacık Efektleri
- Sağlıklı obje toplandığında yeşil ışıltılar
- Zararlı objeden kaçılınca kırmızı uyarı
- Seviye tamamlandığında konfeti patlaması
- Can kaybında kalp kırılma animasyonu

### 7. Puanlama Sistemi

```javascript
const skorSistemi = {
  toplananObjeler: {
    saglikliBesin: 50,
    vitaminKapsulu: 100,
    hijyenUrunu: 75,
    egzersizEkipmani: 80,
    suSisesi: 30
  },
  
  cezalar: {
    sagliksizBesinTemas: -100,
    mikropCarpismasi: -150,
    zamanAsimi: -50,
    duvaraCarpma: -10
  },
  
  bonuslar: {
    hiziTamamlama: {
      "< 1 dk": 500,
      "< 2 dk": 300,
      "< 3 dk": 100
    },
    canDolu: 200,
    tumBilgileriOkuma: 150,
    hatasizGecis: 250
  },
  
  comboBonusu: {
    "3 ardisik": 50,
    "5 ardisik": 150,
    "10 ardisik": 500
  }
};
```

### 8. Başarı Sistemi (Achievements)

```javascript
const basarilar = [
  {
    id: "beslenme_uzmani",
    isim: "Beslenme Uzmanı",
    aciklama: "Beslenme seviyelerini tam puan ile bitir",
    ikon: "🥗",
    puan: 500
  },
  {
    id: "hijyen_kahramani",
    isim: "Hijyen Kahramanı",
    aciklama: "Tüm hijyen ürünlerini tek seferde topla",
    ikon: "🧼",
    puan: 300
  },
  {
    id: "bagisiklik_savunucusu",
    isim: "Bağışıklık Savunucusu",
    aciklama: "Hiç mikrop yemeden 5 seviye bitir",
    ikon: "🛡️",
    puan: 750
  },
  {
    id: "spor_devi",
    isim: "Spor Devi",
    aciklama: "Tüm egzersiz seviyelerini hızlı bitir",
    ikon: "💪",
    puan: 400
  },
  {
    id: "bilgi_avcisi",
    isim: "Bilgi Avcısı",
    aciklama: "100 farklı sağlık bilgisi oku",
    ikon: "📚",
    puan: 1000
  }
];
```

### 9. Veri Yapısı (JSON)

#### quiz-questions.json
```json
{
  "beslenme": [
    {
      "id": 1,
      "soru": "Günde kaç öğün yemek yemek sağlıklıdır?",
      "secenekler": ["2 öğün", "3-4 öğün", "1 öğün", "5+ öğün"],
      "dogruCevap": 1,
      "aciklama": "Düzenli 3 ana öğün ve 2 ara öğün ile metabolizma dengeli çalışır.",
      "zorluk": "kolay"
    }
  ]
}
```

#### health-topics.json
```json
{
  "konular": [
    {
      "id": "beslenme",
      "baslik": "Dengeli Beslenme",
      "ikon": "🥗",
      "renk": "#4CAF50",
      "altKonular": [
        {
          "id": "besin_gruplari",
          "baslik": "Besin Grupları",
          "icerik": "Sağlıklı beslenmek için 4 temel besin grubu...",
          "gorseller": ["url1", "url2"],
          "interaktifTest": true
        }
      ]
    }
  ]
}
```

### 10. AJAX Kullanım Senaryoları

```javascript
// Skor kaydetme
function skorKaydet(oyuncuAdi, skor, seviye) {
  fetch('/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oyuncuAdi, skor, seviye })
  });
}

// Liderlik tablosu yükleme
async function liderlikTablosuGetir() {
  const response = await fetch('/api/leaderboard');
  const data = await response.json();
  return data;
}

// Sağlık bilgisi dinamik yükleme
async function saglikBilgisiGetir(konu, id) {
  const response = await fetch(`/data/health-topics.json`);
  const data = await response.json();
  return data.konular.find(k => k.id === konu);
}

// Quiz soruları çekme
async function quizSorulariYukle(kategori) {
  const response = await fetch(`/data/quiz-questions.json`);
  const data = await response.json();
  return data[kategori];
}
```

### 11. Performans Optimizasyonu

#### Teknik Gereksinimler
- **Yükleme Süresi**: < 2 saniye
- **FPS**: 60 FPS oyun akışı
- **Lazy Loading**: Görseller ve seviyeler taleple yüklenir
- **LocalStorage**: İlerleme ve ayarlar saklanır
- **Cache**: Statik varlıklar önbelleklenir
- **Minification**: CSS ve JS sıkıştırılmış

#### Optimizasyon Teknikleri
```javascript
// RequestAnimationFrame ile oyun döngüsü
function gameLoop(timestamp) {
  update(timestamp);
  render();
  requestAnimationFrame(gameLoop);
}

// Debounce ile pencere yeniden boyutlandırma
const handleResize = debounce(() => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}, 250);
```

### 12. Responsive Tasarım

```css
/* Mobil (< 768px) */
@media (max-width: 767px) {
  .game-canvas { width: 100vw; height: 60vh; }
  .hud { flex-direction: column; }
  .controls { display: block; } /* Ekran kontrolleri göster */
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .game-canvas { width: 90vw; height: 70vh; }
  .sidebar { width: 250px; }
}

/* Desktop (> 1024px) */
@media (min-width: 1025px) {
  .game-canvas { width: 1200px; height: 800px; }
  .sidebar { width: 350px; }
}
```

### 13. Dosya Yapısı

```
health-education-game/
│
├── index.html                 # Ana sayfa
├── README.md                  # Proje dokümantasyonu
├── spec.md                    # Bu dosya
│
├── src/
│   ├── css/
│   │   ├── main.css          # Ana stiller
│   │   ├── animations.css    # Animasyonlar
│   │   ├── responsive.css    # Responsive kurallar
│   │   └── themes.css        # Renk temaları
│   │
│   ├── js/
│   │   ├── app.js            # Ana uygulama başlatıcı
│   │   ├── game-engine.js    # Oyun motoru (canvas, fizik)
│   │   ├── player.js         # Oyuncu kontrolü
│   │   ├── maze-generator.js # Labiren üreteci
│   │   ├── collision.js      # Çarpışma algılama
│   │   ├── items.js          # Toplanabilir objeler
│   │   ├── enemies.js        # Düşman AI
│   │   ├── ui-manager.js     # Arayüz yönetimi
│   │   ├── quiz-manager.js   # Quiz sistem
│   │   ├── score-tracker.js  # Skor takibi
│   │   ├── ajax-handler.js   # AJAX işlemleri
│   │   ├── audio-manager.js  # Ses efektleri
│   │   └── utils.js          # Yardımcı fonksiyonlar
│   │
│   ├── data/
│   │   ├── health-topics.json     # Sağlık konuları
│   │   ├── quiz-questions.json    # Quiz soruları
│   │   ├── achievements.json      # Başarılar
│   │   ├── levels.json            # Seviye konfigürasyonları
│   │   └── leaderboard.json       # Skor tablosu (mock)
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── sprites/          # Karakter ve objeler
│   │   │   ├── backgrounds/      # Arka planlar
│   │   │   ├── icons/            # İkonlar
│   │   │   └── ui/               # UI elementleri
│   │   │
│   │   ├── sounds/
│   │   │   ├── music/            # Arka plan müziği
│   │   │   └── sfx/              # Ses efektleri
│   │   │
│   │   └── fonts/                # Özel fontlar
│   │
│   └── pages/
│       ├── game.html             # Oyun sayfası
│       ├── topics.html           # Sağlık konuları
│       ├── quiz.html             # Quiz sayfası
│       ├── achievements.html     # Başarılar
│       └── leaderboard.html      # Skor tablosu
│
└── docs/
    ├── user-guide.md             # Kullanıcı kılavuzu
    └── developer-notes.md        # Geliştirici notları
```

### 14. Geliştirme Aşamaları

#### Faz 1: Temel Altyapı (Hafta 1)
- [ ] HTML5 sayfa yapısı
- [ ] CSS grid/flexbox layout
- [ ] Temel navigasyon menüsü
- [ ] Canvas setup
- [ ] Karakter hareketi (keyboard input)

#### Faz 2: Oyun Mekanikleri (Hafta 2)
- [ ] Labiren generator algoritması
- [ ] Çarpışma algılama
- [ ] Toplanabilir objeler
- [ ] Düşman AI (basit)
- [ ] Skor sistemi

#### Faz 3: İçerik Entegrasyonu (Hafta 3)
- [ ] JSON veri dosyaları oluşturma
- [ ] AJAX veri yükleme
- [ ] Bilgi kartları modal
- [ ] Quiz sistemi
- [ ] 5 ana konu içeriği

#### Faz 4: UI/UX Geliştirme (Hafta 4)
- [ ] Modern arayüz tasarımı
- [ ] CSS animasyonlar
- [ ] Responsive tasarım
- [ ] Ses efektleri
- [ ] Particle effects

#### Faz 5: Test ve Optimizasyon (Hafta 5)
- [ ] Cross-browser test
- [ ] Performance optimizasyonu
- [ ] Kullanıcı testleri
- [ ] Bug fixes
- [ ] Final polish

### 15. Teknik Detaylar

#### Canvas Render Sistemi
```javascript
class GameRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  
  drawMaze(maze) {
    // Labiren çizimi
    maze.walls.forEach(wall => {
      this.ctx.fillStyle = '#263238';
      this.ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
  }
  
  drawPlayer(player) {
    // Karakter çizimi (sprite veya shape)
    this.ctx.fillStyle = player.color;
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
```

#### Labiren Üretim Algoritması
```javascript
class MazeGenerator {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }
  
  generate() {
    // Recursive backtracking algoritması
    // veya Prim's algoritması kullan
    const maze = this.initializeGrid();
    this.carvePassages(maze);
    this.addItems(maze);
    return maze;
  }
}
```

### 16. Erişilebilirlik (Accessibility)

- **Klavye Navigasyonu**: Tab ile menü gezinme
- **Alt Metinler**: Tüm görsellerde alt attribute
- **Renk Kontrastı**: WCAG AA standardı (4.5:1)
- **Font Boyutu**: Minimum 16px, ölçeklenebilir
- **Sesli Geri Bildirim**: Ekran okuyucu desteği
- **Pause Özelliği**: Oyunu durdurabilme

### 17. Tarayıcı Desteği

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 18. Başarı Kriterleri

- ✅ En az 10 oynanabilir seviye
- ✅ 70+ sağlık bilgisi kartı
- ✅ 50+ quiz sorusu
- ✅ Smooth 60 FPS oyun akışı
- ✅ Mobil uyumlu tam responsive
- ✅ < 2 saniye yükleme süresi
- ✅ %100 Türkçe içerik
- ✅ Eğitici ve eğlenceli denge

---

## 🚀 Sonuç

Bu şartname, ortaokul öğrencilerine yönelik, modern web teknolojileri kullanarak geliştirilecek kapsamlı bir sağlık eğitimi oyununun temel planını içermektedir. Oyun, eğlenceli labiren mekanikleri ile önemli sağlık bilgilerini birleştirerek öğrenmeyi motive edici hale getirmeyi amaçlamaktadır.

**Hedef**: Öğrencilerin sağlık konularında bilinçlenmesi ve sağlıklı yaşam alışkanlıkları edinmesi.

**Yaklaşım**: Oyunlaştırma (gamification) ile eğitimi birleştirme.

**Platform**: Web tabanlı, cross-platform erişilebilir uygulama.
