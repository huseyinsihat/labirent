// ============================================
// QUIZ YÖNETİCİSİ (QUIZ MANAGER)
// ============================================

class QuizManager {
  constructor() {
    this.questions = [];
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
  }

  /**
   * Quiz başlat
   */
  async startQuiz(category) {
    this.questions = await AjaxHandler.getQuizByCategory(category);
    
    if (!this.questions || this.questions.length === 0) {
      alert('Bu kategori için quiz sorusu bulunamadı!');
      return false;
    }
    
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    
    // Soruları karıştır
    this.questions = shuffleArray(this.questions);
    
    return true;
  }

  /**
   * Mevcut soruyu al
   */
  getCurrentQuestion() {
    return this.questions[this.currentQuestion];
  }

  /**
   * Cevapla
   */
  answer(selectedIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = selectedIndex === question.dogruCevap;
    
    this.answers.push({
      questionId: question.id,
      selected: selectedIndex,
      correct: isCorrect
    });
    
    if (isCorrect) {
      this.score += this.getPointsForDifficulty(question.zorluk);
    }
    
    return {
      isCorrect,
      explanation: question.aciklama
    };
  }

  /**
   * Zorluk'a göre puan
   */
  getPointsForDifficulty(difficulty) {
    const points = {
      'kolay': 10,
      'orta': 20,
      'zor': 30
    };
    return points[difficulty] || 10;
  }

  /**
   * Sonraki soru
   */
  nextQuestion() {
    this.currentQuestion++;
    return this.currentQuestion < this.questions.length;
  }

  /**
   * Quiz bitti mi
   */
  isFinished() {
    return this.currentQuestion >= this.questions.length;
  }

  /**
   * Sonuçları al
   */
  getResults() {
    const correct = this.answers.filter(a => a.correct).length;
    const total = this.questions.length;
    const percentage = (correct / total) * 100;
    
    return {
      score: this.score,
      correct,
      total,
      percentage: Math.round(percentage),
      passed: percentage >= 70
    };
  }
}

const quizManager = new QuizManager();
