/**
 * Polish Years & Grammar Cases Listening Practice App
 * Logic, Polish Year Declension Engine, Speech Synthesis & State Management
 */

const PREPOSITIONS = [
  { id: 'w', prefix: 'w ', suffix: ' roku', case: 'loc', label: 'w ... roku (in ...)' },
  { id: 'od', prefix: 'od ', suffix: ' roku', case: 'gen', label: 'od ... roku (since ...)' },
  { id: 'do', prefix: 'do ', suffix: ' roku', case: 'gen', label: 'do ... roku (until ...)' },
  { id: 'z', prefix: 'z ', suffix: ' roku', case: 'gen', label: 'z ... roku (from / of ...)' },
  { id: 'na', prefix: 'na rok ', suffix: '', case: 'acc', label: 'na rok ... (for the year ...)' },
  { id: 'przed', prefix: 'przed ', suffix: ' rokiem', case: 'inst', label: 'przed ... rokiem (before ...)' },
  { id: 'po', prefix: 'po ', suffix: ' roku', case: 'loc', label: 'po ... roku (after ...)' }
];

const ORDINALS = {
  1: { loc: 'pierwszym', gen: 'pierwszego', acc: 'pierwszy', inst: 'pierwszym' },
  2: { loc: 'drugim', gen: 'drugiego', acc: 'drugi', inst: 'drugim' },
  3: { loc: 'trzecim', gen: 'trzeciego', acc: 'trzeci', inst: 'trzecim' },
  4: { loc: 'czwartym', gen: 'czwartego', acc: 'czwarty', inst: 'czwartym' },
  5: { loc: 'piątym', gen: 'piątego', acc: 'piąty', inst: 'piątym' },
  6: { loc: 'szóstym', gen: 'szóstego', acc: 'szósty', inst: 'szóstym' },
  7: { loc: 'siódmym', gen: 'siódmego', acc: 'siódmy', inst: 'siódmym' },
  8: { loc: 'ósmym', gen: 'ósmego', acc: 'ósmy', inst: 'ósmym' },
  9: { loc: 'dziewiątym', gen: 'dziewiątego', acc: 'dziewiąty', inst: 'dziewiątym' },
  10: { loc: 'dziesiątym', gen: 'dziesiątego', acc: 'dziesiąty', inst: 'dziesiątym' },
  11: { loc: 'jedenastym', gen: 'jedenastego', acc: 'jedenasty', inst: 'jedenastym' },
  12: { loc: 'dwunastym', gen: 'dwunastego', acc: 'dwunasty', inst: 'dwunastym' },
  13: { loc: 'trzynastym', gen: 'trzynastego', acc: 'trzynasty', inst: 'trzynastym' },
  14: { loc: 'czternastym', gen: 'czternastego', acc: 'czternasty', inst: 'czternastym' },
  15: { loc: 'piętnastym', gen: 'piętnastego', acc: 'piętnasty', inst: 'piętnastym' },
  16: { loc: 'szesnastym', gen: 'szesnastego', acc: 'szesnasty', inst: 'szesnastym' },
  17: { loc: 'siedemnastym', gen: 'siedemnastego', acc: 'siedemnasty', inst: 'siedemnastym' },
  18: { loc: 'osiemnastym', gen: 'osiemnastego', acc: 'osiemnasty', inst: 'osiemnastym' },
  19: { loc: 'dziewiętnastym', gen: 'dziewiętnastego', acc: 'dziewiętnasty', inst: 'dziewiętnastym' }
};

const TENS_ORDINALS = {
  20: { loc: 'dwudziestym', gen: 'dwudziestego', acc: 'dwudziesty', inst: 'dwudziestym' },
  30: { loc: 'trzydziestym', gen: 'trzydziestego', acc: 'trzydziesty', inst: 'trzydziestym' },
  40: { loc: 'czterdziestym', gen: 'czterdziestego', acc: 'czterdziesty', inst: 'czterdziestym' },
  50: { loc: 'pięćdziesiątym', gen: 'pięćdziesiątego', acc: 'pięćdziesiąty', inst: 'pięćdziesiątym' },
  60: { loc: 'sześćdziesiątym', gen: 'sześćdziesiątego', acc: 'sześćdziesiąty', inst: 'sześćdziesiątym' },
  70: { loc: 'siedemdziesiątym', gen: 'siedemdziesiątego', acc: 'siedemdziesiąty', inst: 'siedemdziesiątym' },
  80: { loc: 'osiemdziesiątym', gen: 'osiemdziesiątego', acc: 'osiemdziesiąty', inst: 'osiemdziesiątym' },
  90: { loc: 'dziewięćdziesiątym', gen: 'dziewięćdziesiątego', acc: 'dziewięćdziesiąty', inst: 'dziewięćdziesiątym' }
};

const HUNDREDS_CARDINAL = {
  100: 'sto',
  200: 'dwieście',
  300: 'trzysta',
  400: 'czterysta',
  500: 'pięćset',
  600: 'sześćset',
  700: 'siedemset',
  800: 'osiemset',
  900: 'dziewięćset'
};

const HUNDREDS_ORDINALS = {
  100: { loc: 'stnym', gen: 'stnego', acc: 'stny', inst: 'stnym' },
  200: { loc: 'dwusetnym', gen: 'dwusetnego', acc: 'dwusetny', inst: 'dwusetnym' },
  300: { loc: 'trzysetnym', gen: 'trzysetnego', acc: 'trzysetny', inst: 'trzysetnym' },
  400: { loc: 'czterochsetnym', gen: 'czterochsetnego', acc: 'czterochsetny', inst: 'czterochsetnym' },
  500: { loc: 'pięcisetnym', gen: 'pięcisetnego', acc: 'pięcisetny', inst: 'pięcisetnym' },
  600: { loc: 'sześćsetnym', gen: 'sześćsetnego', acc: 'sześćsetny', inst: 'sześćsetnym' },
  700: { loc: 'siedemsetnym', gen: 'siedemsetnego', acc: 'siedemsetny', inst: 'siedemsetnym' },
  800: { loc: 'osiemsetnym', gen: 'osiemsetnego', acc: 'osiemsetny', inst: 'osiemsetnym' },
  900: { loc: 'dziewięćsetnym', gen: 'dziewięćsetnego', acc: 'dziewięćsetny', inst: 'dziewięćsetnym' }
};

function yearToPolishWords(year, caseType) {
  if (year === 2000) {
    const r2000 = { loc: 'dwutysięcznym', gen: 'dwutysięcznego', acc: 'dwutysięczny', inst: 'dwutysięcznym' };
    return r2000[caseType];
  }

  const parts = [];

  // Thousands
  const thousands = Math.floor(year / 1000);
  const remainder1000 = year % 1000;

  if (thousands === 1) {
    parts.push('tysiąc');
  } else if (thousands === 2) {
    parts.push('dwa tysiące');
  }

  // Hundreds & Tens/Units
  const hundreds = Math.floor(remainder1000 / 100) * 100;
  const lastTwo = remainder1000 % 100;

  if (lastTwo === 0 && hundreds > 0) {
    parts.push(HUNDREDS_ORDINALS[hundreds][caseType]);
  } else {
    if (hundreds > 0) {
      parts.push(HUNDREDS_CARDINAL[hundreds]);
    }

    if (lastTwo > 0) {
      if (lastTwo < 20) {
        parts.push(ORDINALS[lastTwo][caseType]);
      } else {
        const tens = Math.floor(lastTwo / 10) * 10;
        const units = lastTwo % 10;
        parts.push(TENS_ORDINALS[tens][caseType]);
        if (units > 0) {
          parts.push(ORDINALS[units][caseType]);
        }
      }
    }
  }

  return parts.join(' ');
}

class PolishYearsPractice {
  constructor() {
    this.minYear = 1900;
    this.maxYear = 2099;
    this.selectedPrep = 'all';
    this.currentRound = null;
    this.speechRate = 1.0;
    this.synth = window.speechSynthesis;
    this.polishVoice = null;
    this.voices = [];
    this.isAnsweredState = false;
    
    this.stats = {
      correct: 0,
      total: 0,
      streak: 0,
      maxStreak: 0
    };
    
    this.history = [];
    
    this.selectors = {
      playBtn: document.getElementById('play-btn'),
      playSlowBtn: document.getElementById('play-slow-btn'),
      userInput: document.getElementById('user-input'),
      checkBtn: document.getElementById('check-btn'),
      revealBtn: document.getElementById('reveal-btn'),
      skipBtn: document.getElementById('skip-btn'),
      feedbackEl: document.getElementById('feedback'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackMessage: document.getElementById('feedback-message'),
      feedbackSpelling: document.getElementById('feedback-spelling'),
      prepSelect: document.getElementById('prep-select'),
      rangePresetBtns: document.querySelectorAll('.range-preset-btn'),
      voiceSelect: document.getElementById('voice-select'),
      statsCorrect: document.getElementById('stats-correct'),
      statsTotal: document.getElementById('stats-total'),
      statsAccuracy: document.getElementById('stats-accuracy'),
      statsStreak: document.getElementById('stats-streak'),
      statsMaxStreak: document.getElementById('stats-max-streak'),
      historyList: document.getElementById('history-list'),
      resetStatsBtn: document.getElementById('reset-stats-btn'),
      voiceWarning: document.getElementById('voice-warning')
    };
  }

  init() {
    this.loadStateFromStorage();
    this.setupEventListeners();
    this.initVoices();
    
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.initVoices();
    }
    
    this.newRound();
  }

  loadStateFromStorage() {
    const savedStats = localStorage.getItem('pl_years_stats');
    if (savedStats) {
      try {
        this.stats = JSON.parse(savedStats);
      } catch (e) {
        console.error('Failed to parse saved stats', e);
      }
    }
    
    const savedRange = localStorage.getItem('pl_years_range');
    if (savedRange) {
      try {
        const range = JSON.parse(savedRange);
        this.minYear = range.min;
        this.maxYear = range.max;
        this.updateActiveRangePreset();
      } catch (e) {
        console.error('Failed to parse saved range', e);
      }
    }

    const savedPrep = localStorage.getItem('pl_years_prep');
    if (savedPrep) {
      this.selectedPrep = savedPrep;
      if (this.selectors.prepSelect) {
        this.selectors.prepSelect.value = savedPrep;
      }
    }

    const savedHistory = localStorage.getItem('pl_years_history');
    if (savedHistory) {
      try {
        this.history = JSON.parse(savedHistory);
        this.renderHistory();
      } catch (e) {
        console.error('Failed to parse saved history', e);
      }
    }
    
    this.updateStatsUI();
  }

  saveStateToStorage() {
    localStorage.setItem('pl_years_stats', JSON.stringify(this.stats));
    localStorage.setItem('pl_years_range', JSON.stringify({ min: this.minYear, max: this.maxYear }));
    localStorage.setItem('pl_years_prep', this.selectedPrep);
    localStorage.setItem('pl_years_history', JSON.stringify(this.history.slice(0, 30)));
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    const plVoices = this.voices.filter(v => v.lang.includes('pl') || v.lang.includes('PL'));
    
    if (this.selectors.voiceSelect) {
      this.selectors.voiceSelect.innerHTML = '';
      
      if (plVoices.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Brak głosów polskich w przeglądarce (Default OS voice used)';
        this.selectors.voiceSelect.appendChild(option);
        if (this.selectors.voiceWarning) this.selectors.voiceWarning.style.display = 'block';
      } else {
        if (this.selectors.voiceWarning) this.selectors.voiceWarning.style.display = 'none';
        plVoices.forEach((voice, index) => {
          const option = document.createElement('option');
          option.value = voice.name;
          option.textContent = `${voice.name} (${voice.lang})`;
          if (index === 0) option.selected = true;
          this.selectors.voiceSelect.appendChild(option);
        });
        this.polishVoice = plVoices[0];
      }
    }
  }

  setupEventListeners() {
    this.selectors.playBtn.addEventListener('click', () => {
      this.playAudio(1.0);
      this.selectors.userInput.focus();
    });

    this.selectors.playSlowBtn.addEventListener('click', () => {
      this.playAudio(0.55);
      this.selectors.userInput.focus();
    });
    
    this.selectors.checkBtn.addEventListener('click', () => {
      if (this.isAnsweredState) {
        this.newRound();
      } else {
        this.checkAnswer();
      }
    });

    this.selectors.revealBtn.addEventListener('click', () => this.revealAnswer());
    this.selectors.skipBtn.addEventListener('click', () => this.newRound());
    
    if (this.selectors.prepSelect) {
      this.selectors.prepSelect.addEventListener('change', (e) => {
        this.selectedPrep = e.target.value;
        this.saveStateToStorage();
        this.newRound();
      });
    }

    this.selectors.rangePresetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const min = parseInt(e.target.dataset.min, 10);
        const max = parseInt(e.target.dataset.max, 10);
        this.minYear = min;
        this.maxYear = max;
        this.updateActiveRangePreset();
        this.saveStateToStorage();
        this.newRound();
      });
    });

    this.selectors.voiceSelect.addEventListener('change', (e) => {
      const selectedName = e.target.value;
      this.polishVoice = this.voices.find(v => v.name === selectedName) || null;
    });

    this.selectors.userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.isAnsweredState) {
          this.newRound();
        } else {
          this.checkAnswer();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (document.activeElement !== this.selectors.userInput) {
        if (e.code === 'Space') {
          e.preventDefault();
          this.playAudio(1.0);
        }
      }
      if (e.key === 'Escape') {
        this.newRound();
      }
    });

    this.selectors.resetStatsBtn.addEventListener('click', () => this.resetStats());
  }

  updateActiveRangePreset() {
    this.selectors.rangePresetBtns.forEach(btn => {
      const min = parseInt(btn.dataset.min, 10);
      const max = parseInt(btn.dataset.max, 10);
      if (min === this.minYear && max === this.maxYear) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  generateRandomRound() {
    let nextRound;
    let attempts = 0;
    const totalCombinations = (this.maxYear - this.minYear + 1) * (this.selectedPrep === 'all' ? PREPOSITIONS.length : 1);

    do {
      attempts++;
      const year = Math.floor(Math.random() * (this.maxYear - this.minYear + 1)) + this.minYear;
      let prepObj;
      if (this.selectedPrep === 'all') {
        prepObj = PREPOSITIONS[Math.floor(Math.random() * PREPOSITIONS.length)];
      } else {
        prepObj = PREPOSITIONS.find(p => p.id === this.selectedPrep) || PREPOSITIONS[0];
      }

      const words = yearToPolishWords(year, prepObj.case);
      const fullText = `${prepObj.prefix}${words}${prepObj.suffix}`;
      const displayForm = prepObj.suffix.trim() ? `${prepObj.prefix}${year}${prepObj.suffix}` : `${prepObj.prefix}${year}`;

      nextRound = {
        year,
        prep: prepObj,
        words,
        fullText,
        displayForm
      };
    } while (
      this.currentRound &&
      nextRound.fullText === this.currentRound.fullText &&
      totalCombinations > 1 &&
      attempts < 30
    );

    return nextRound;
  }

  newRound() {
    this.currentRound = this.generateRandomRound();
    this.isAnsweredState = false;
    
    // Re-enable inputs
    this.selectors.userInput.disabled = false;
    this.selectors.checkBtn.disabled = false;
    this.selectors.revealBtn.disabled = false;
    this.selectors.checkBtn.textContent = 'Sprawdź (Check)';
    
    this.selectors.userInput.value = '';
    this.selectors.feedbackEl.className = 'feedback hidden';
    
    const existingNext = document.getElementById('next-round-btn');
    if (existingNext) existingNext.remove();

    setTimeout(() => {
      this.selectors.userInput.value = '';
      this.selectors.userInput.focus();
    }, 50);

    this.playAudio(1.0);
  }

  playAudio(rate = 1.0) {
    if (!this.currentRound || !this.synth) return;
    
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(this.currentRound.fullText);
    utterance.lang = 'pl-PL';
    utterance.rate = rate;
    
    if (this.polishVoice) {
      utterance.voice = this.polishVoice;
    }
    
    const btn = rate === 1.0 ? this.selectors.playBtn : this.selectors.playSlowBtn;
    btn.classList.add('playing');
    
    utterance.onend = () => {
      btn.classList.remove('playing');
    };

    utterance.onerror = () => {
      btn.classList.remove('playing');
    };
    
    this.synth.speak(utterance);
  }

  normalizeInput(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');
  }

  checkAnswer() {
    if (this.isAnsweredState || !this.currentRound) return;
    
    const rawVal = this.selectors.userInput.value;
    const normalizedInput = this.normalizeInput(rawVal);
    
    if (!normalizedInput) return;
    
    const yearStr = this.currentRound.year.toString();
    const displayFormNorm = this.normalizeInput(this.currentRound.displayForm);
    const fullTextNorm = this.normalizeInput(this.currentRound.fullText);
    const prepPrefixNorm = this.normalizeInput(this.currentRound.prep.prefix);
    
    const isCorrect = (
      normalizedInput === yearStr ||
      normalizedInput === displayFormNorm ||
      normalizedInput === `${prepPrefixNorm}${yearStr}` ||
      normalizedInput === `${yearStr} roku` ||
      normalizedInput === `${yearStr} rokiem` ||
      normalizedInput === fullTextNorm
    );
    
    this.stats.total++;
    
    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.streak;
      }
      this.showFeedback(true, 'Dobrze! (Correct!)');
    } else {
      this.stats.streak = 0;
      this.showFeedback(false, 'Niecałkowicie poprawnie (Not quite correct)');
    }
    
    this.addHistoryItem(isCorrect, rawVal);
    this.updateStatsUI();
    this.saveStateToStorage();
    this.isAnsweredState = true;
  }

  revealAnswer() {
    if (this.isAnsweredState || !this.currentRound) return;
    
    this.stats.total++;
    this.stats.streak = 0;
    
    this.showFeedback(false, 'Odpowiedź odkryta (Revealed)');
    this.addHistoryItem(false, '[Odkryto / Revealed]');
    this.updateStatsUI();
    this.saveStateToStorage();
    this.isAnsweredState = true;
  }

  showFeedback(isCorrect, titleText) {
    this.selectors.feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    this.selectors.feedbackTitle.textContent = titleText;
    this.selectors.feedbackMessage.innerHTML = `Forma (Year Phrase): <strong>${this.currentRound.displayForm}</strong>`;
    this.selectors.feedbackSpelling.innerHTML = `Słownie (In words): <span class="polish-spelling-highlight">${this.currentRound.fullText}</span>`;
    
    // Transform check button into Next button and keep it enabled
    this.selectors.checkBtn.disabled = false;
    this.selectors.checkBtn.textContent = 'Następny (Next ↵)';
    this.selectors.checkBtn.focus();
  }

  addHistoryItem(isCorrect, userGuess) {
    const item = {
      displayForm: this.currentRound.displayForm,
      fullText: this.currentRound.fullText,
      isCorrect,
      userGuess,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    this.history.unshift(item);
    if (this.history.length > 30) this.history.pop();
    
    this.renderHistory();
  }

  renderHistory() {
    if (!this.selectors.historyList) return;
    
    if (this.history.length === 0) {
      this.selectors.historyList.innerHTML = '<li class="history-empty">Brak historii sesji (No session history yet)</li>';
      return;
    }
    
    this.selectors.historyList.innerHTML = this.history.map((item) => `
      <li class="history-item ${item.isCorrect ? 'history-correct' : 'history-incorrect'}">
        <div class="history-header">
          <span class="history-badge ${item.isCorrect ? 'badge-correct' : 'badge-incorrect'}">${item.isCorrect ? '✓' : '✗'}</span>
          <span class="history-number">${item.displayForm}</span>
          <button class="history-replay-btn" onclick="app.speakText('${item.fullText.replace(/'/g, "\\'")}')">🔊</button>
        </div>
        <div class="history-spelling">${item.fullText}</div>
      </li>
    `).join('');
  }

  speakText(text) {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 1.0;
    if (this.polishVoice) utterance.voice = this.polishVoice;
    this.synth.speak(utterance);
  }

  updateStatsUI() {
    const accuracy = this.stats.total > 0 
      ? Math.round((this.stats.correct / this.stats.total) * 100) 
      : 0;
      
    this.selectors.statsCorrect.textContent = this.stats.correct;
    this.selectors.statsTotal.textContent = this.stats.total;
    this.selectors.statsAccuracy.textContent = `${accuracy}%`;
    this.selectors.statsStreak.textContent = this.stats.streak;
    this.selectors.statsMaxStreak.textContent = this.stats.maxStreak;
  }

  resetStats() {
    if (confirm('Czy na pewno chcesz zresetować statystyki sesji? (Reset session stats?)')) {
      this.stats = { correct: 0, total: 0, streak: 0, maxStreak: 0 };
      this.history = [];
      this.updateStatsUI();
      this.renderHistory();
      this.saveStateToStorage();
    }
  }
}

// Global initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new PolishYearsPractice();
  app.init();
});
