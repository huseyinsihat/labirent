# 🏥 Sağlık Labireni - Eğitici Oyun

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Ortaokul öğrencileri için eğlenceli ve eğitici web tabanlı sağlık oyunu**

</div>

---

## 🎯 Hakkında

**Sağlık Labireni**, öğrencilerin sağlık konularında bilinçlenmesini sağlamak için geliştirilmiş interaktif bir web oyunudur. Labiren mekaniği ile sağlık eğitimini birleştirerek öğrenmeyi eğlenceli hale getirir.

### 🎓 Hedef Kitle

Ortaokul öğrencileri (8-14 yaş), eğitimciler ve ebeveynler

---

## ✨ Özellikler

- 🌀 **Dinamik Labiren**: Her oyunda farklı labiren düzenleri
- 🎯 **10+ Seviye**: Dengeli beslenme, hijyen, bağışıklık, spor, zararlı alışkanlıklar
- 📚 **70+ Sağlık Bilgisi**: Oyun içi eğitici kartlar
- ⌨️ **Kolay Kontrol**: Ok tuşları veya WASD ile hareket
- 📱 **Responsive**: Mobil, tablet ve masaüstü uyumlu
- 💯 **Puanlama Sistemi**: Combo bonusları ve başarı rozetleri
- 🎨 **Modern Tasarım**: Renkli ve kullanıcı dostu arayüz

---

## 🛠️ Teknolojiler

- **HTML5** - Canvas API ile oyun motoru
- **CSS3** - Modern animasyonlar ve responsive tasarım
- **JavaScript (Vanilla)** - Sıfır framework bağımlılığı
- **JSON** - Dinamik içerik yönetimi

---

## 🚀 Kurulum

### Gereksinimler
Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)

### Çalıştırma

**1. Projeyi indirin:**
```bash
git clone https://github.com/huseyinsihat/labirent.git
cd labirent
```

**2. index.html dosyasını tarayıcıda açın**

veya yerel sunucu ile:
```bash
# Python ile
python -m http.server 8000

# VS Code Live Server ile
# Sağ tık → "Open with Live Server"
```

**3. Tarayıcıda görüntüleyin:**
```
http://localhost:8000
```

---

## 🎮 Nasıl Oynanır

### Kontroller
- `↑ ↓ ← →` veya `W A S D` - Hareket
- `ESC` - Duraklat
- `R` - Yeniden başlat

### Oyun Kuralları
- ✅ Yeşil objeleri toplayın (sağlıklı besinler, vitaminler)
- ❌ Kırmızı objelerden kaçının (zararlı maddeler)
- 📚 Bilgi kartlarını okuyarak puan kazanın
- 🏆 Hedefleri tamamlayıp çıkışa ulaşın

---

## 📚 Sağlık Konuları

1. **🥗 Dengeli Beslenme** - Besin grupları, öğün düzeni, su tüketimi
2. **🧼 Kişisel Hijyen** - El yıkama, diş sağlığı, vücut temizliği
3. **🛡️ Bağışıklık Sistemi** - Aşılar, hastalıklardan korunma
4. **💪 Fiziksel Aktivite** - Egzersiz, sporun faydaları
5. **🚭 Zararlı Alışkanlıklar** - Sigara, bağımlılık, sağlıklı seçimler

---

## 📂 Dosya Yapısı

```
labirent/
├── index.html                    # Ana sayfa
├── README.md                     # Dokümantasyon
├── spec.md                       # Teknik şartname
│
└── src/
    ├── css/                      # Stil dosyaları
    │   ├── main.css
    │   ├── animations.css
    │   └── responsive.css
    │
    ├── js/                       # JavaScript dosyaları
    │   ├── player.js
    │   ├── maze-generator.js
    │   ├── collision.js
    │   ├── items.js
    │   ├── enemies.js
    │   ├── game-engine.js
    │   └── utils.js
    │
    ├── data/                     # JSON veri dosyaları
    │   ├── health-topics.json
    │   ├── quiz-questions.json
    │   └── levels.json
    │
    └── assets/                   # Görseller ve sesler
        ├── images/sprites/
        └── sounds/sfx/
```

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Commit edin (`git commit -m 'Yeni özellik'`)
4. Push edin (`git push origin feature/yeniOzellik`)
5. Pull Request açın

---

## 📝 Lisans

MIT Lisansı - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 📞 İletişim

- **GitHub**: [@huseyinsihat](https://github.com/huseyinsihat)
- **Proje**: [github.com/huseyinsihat/labirent](https://github.com/huseyinsihat/labirent)

---

<div align="center">

**Eğlenerek öğren, sağlıklı yaşa! 🏥💚**

⭐ Beğendiyseniz yıldız vermeyi unutmayın!

</div>

