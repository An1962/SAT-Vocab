import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  MessageCircle,
  Share2,
  Star,
  CheckCircle,
  Brain,
  RefreshCw,
  Sparkles,
  ExternalLink,
  History,
  ArrowRight,
  Calendar,
  Trophy,
  FileSpreadsheet,
  Flame,
  Volume2,
  Layers,
  X,
  ChevronRight,
  ChevronLeft,
  Target,
  Medal,
  Crown,
  Zap,
  Map,
  Lightbulb,
  User,
  Home,
  Book,
  Timer,
  ListPlus,
  Trash2,
  Clock,
  MoreHorizontal,
  Quote,
  Edit2,
  Check,
} from "lucide-react";

/**
 * SAT THỦ KHOA ĐỨC AN - ULTIMATE UI VERSION (REFINED)
 * - Added: User Name Editing Feature.
 * - Visuals: Enhanced glassmorphism, smoother gradients, refined shadows.
 * - UX: Text update for official website link.
 * - Animations: Staggered entry, interactive hover states.
 */

// --- CONSTANTS & DATA ---
const DAILY_WORDS = [
  "Serendipity",
  "Ephemeral",
  "Ubiquitous",
  "Pragmatic",
  "Magnanimous",
  "Esoteric",
  "Cacophony",
  "Ennui",
  "Languid",
  "Fastidious",
  "Alacrity",
  "Benevolent",
  "Gregarious",
  "Iconoclast",
  "Docile",
  "Disparate",
  "Chicanery",
];

const QUOTES = [
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
  },
  { text: "Education is the passport to the future.", author: "Malcolm X" },
  {
    text: "Thiên tài chỉ là 1% cảm hứng, 99% là mồ hôi.",
    author: "Thomas Edison",
  },
  {
    text: "Sự học như con thuyền đi trên dòng nước ngược, không tiến ắt phải lùi.",
    author: "Cổ nhân",
  },
  {
    text: "Don't let what you cannot do interfere with what you can do.",
    author: "John Wooden",
  },
];

const MOCK_LEADERBOARD = [
  { name: "Nguyễn Văn A", xp: 15000, id: "u1" },
  { name: "Trần Thị B", xp: 12500, id: "u2" },
  { name: "Lê Hoàng C", xp: 9800, id: "u3" },
  { name: "Phạm Minh D", xp: 5200, id: "u4" },
];

const RANKS = [
  { level: 1, title: "Học Viên Mới", minXP: 0 },
  { level: 5, title: "Sĩ Tử Chăm Chỉ", minXP: 500 },
  { level: 10, title: "Chiến Binh SAT", minXP: 1500 },
  { level: 20, title: "Cao Thủ Từ Vựng", minXP: 4000 },
  { level: 50, title: "SAT Thủ Khoa", minXP: 10000 },
];

const XP_REWARDS = {
  SEARCH: 15,
  QUIZ_EASY: 10,
  QUIZ_MEDIUM: 20,
  QUIZ_HARD: 30,
  DAILY_GOAL_MET: 100,
  DAILY_LOGIN: 50,
  SPEED_REVIEW_CORRECT: 20,
};

const DAILY_GOAL = 5;

// --- SUB-COMPONENTS ---

const QuizModule = ({ quizzes, onReward }) => {
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState({});

  if (!quizzes || quizzes.length === 0) return null;

  const currentQuiz = quizzes[currentIndex];

  const handleAnswer = (option) => {
    if (status[currentIndex] === "correct") return;

    const selected = option.trim().toLowerCase();
    const correct = currentQuiz.answer.trim().toLowerCase();

    if (selected === correct) {
      setStatus((prev) => ({ ...prev, [currentIndex]: "correct" }));
      let reward = XP_REWARDS.QUIZ_EASY;
      if (currentIndex === 1) reward = XP_REWARDS.QUIZ_MEDIUM;
      if (currentIndex === 2) reward = XP_REWARDS.QUIZ_HARD;
      onReward(reward);
    } else {
      setStatus((prev) => ({ ...prev, [currentIndex]: "incorrect" }));
    }
  };

  if (!active) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 text-center text-white border border-slate-700/50 group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shadow-inner">
          <Brain className="w-8 h-8 text-[#FFD700]" />
        </div>
        <h3 className="text-2xl font-bold text-[#FFD700] uppercase mb-2 tracking-wide">
          Tháp Kiến Thức
        </h3>
        <p className="text-slate-300 mb-6 font-serif text-lg">
          Chinh phục 3 cấp độ câu hỏi để nhận XP!
        </p>
        <button
          onClick={() => setActive(true)}
          className="px-8 py-3 bg-[#004488] hover:bg-[#003366] text-white font-bold rounded-xl border-b-4 border-[#002244] active:border-b-0 active:translate-y-1 transition-all shadow-lg flex items-center justify-center mx-auto"
        >
          <Zap className="w-5 h-5 mr-2 text-[#FFD700]" /> Bắt đầu Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden transition-all duration-500 animate-fade-in-up border border-slate-700/50">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-[#FFD700] uppercase flex items-center tracking-wide">
          <Brain className="w-6 h-6 mr-2" /> Quiz Arena
        </h3>
        <div className="flex items-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-[#FFD700] shadow-[0_0_10px_#FFD700]" : i < currentIndex ? "bg-green-500" : "bg-slate-700"}`}
            ></div>
          ))}
        </div>
      </div>

      <span
        className={`inline-block mb-4 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${currentIndex === 0 ? "bg-green-900/50 text-green-400 border border-green-700" : currentIndex === 1 ? "bg-yellow-900/50 text-yellow-400 border border-yellow-700" : "bg-red-900/50 text-red-400 border border-red-700"}`}
      >
        Level {currentIndex + 1}:{" "}
        {currentQuiz.level ||
          (currentIndex === 0
            ? "Dễ"
            : currentIndex === 1
              ? "Trung Bình"
              : "Khó")}
      </span>

      <p className="text-xl font-serif mb-8 leading-relaxed text-slate-100">
        {currentQuiz.question}
      </p>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {currentQuiz.options.map((option, idx) => {
          const quizState = status[currentIndex];
          const isSelectedCorrect =
            quizState === "correct" &&
            option.trim().toLowerCase() ===
              currentQuiz.answer.trim().toLowerCase();

          let btnClass =
            "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#FFD700] text-slate-300";
          if (isSelectedCorrect) {
            btnClass =
              "bg-green-600/20 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={quizState === "correct"}
              className={`p-4 rounded-xl text-left font-medium transition-all duration-200 border-2 ${btnClass} flex justify-between items-center group`}
            >
              <span className="flex items-center">
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center mr-3 text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  {String.fromCharCode(65 + idx)}
                </span>{" "}
                {option}
              </span>
              {isSelectedCorrect && (
                <CheckCircle className="w-5 h-5 text-green-400 animate-pop-in" />
              )}
            </button>
          );
        })}
      </div>

      {status[currentIndex] && (
        <div className="animate-fade-in-up bg-black/20 rounded-xl p-5 border border-white/10 backdrop-blur-sm shadow-inner">
          <div className="flex items-center mb-2 font-bold text-sm uppercase tracking-wider">
            {status[currentIndex] === "correct" ? (
              <>
                <span className="text-green-400 mr-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> Chính xác!
                </span>{" "}
                <span className="text-[#FFD700]">
                  +{currentIndex === 0 ? 10 : currentIndex === 1 ? 20 : 30} XP
                </span>
              </>
            ) : (
              <span className="text-[#FFD700] flex items-center">
                <Lightbulb className="w-4 h-4 mr-1" /> Giải thích
              </span>
            )}
          </div>
          <p className="text-slate-300 font-serif text-base leading-relaxed border-l-2 border-[#FFD700] pl-4 ml-1">
            {currentQuiz.explanation}
          </p>

          <div className="flex justify-end mt-5">
            <button
              disabled={currentIndex === quizzes.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className={`px-6 py-2.5 rounded-lg transition-all flex items-center font-bold text-sm ${status[currentIndex] === "correct" ? "bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5" : "bg-white/10 hover:bg-white/20 text-slate-400 cursor-not-allowed"}`}
            >
              {currentIndex < quizzes.length - 1
                ? "Câu hỏi tiếp theo"
                : "Hoàn thành"}{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const VocabularyCard = ({ data, onSearch, onReward, index, total }) => {
  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Stagger animation delay based on index
  const animationDelay = `${index * 0.15}s`;

  return (
    <div
      className="mb-12 relative animate-fade-in-up"
      style={{ animationDelay }}
    >
      {/* Batch Counter Badge - Floating Style */}
      {total > 1 && (
        <div className="absolute -top-3 -left-2 z-20 bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg border border-slate-700 flex items-center transform -rotate-2">
          #{index + 1} / {total}
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
        {/* HEADER SECTION */}
        <div className="relative bg-gradient-to-r from-[#004488] to-[#003366] p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#FFD700] backdrop-blur-sm border border-white/10 shadow-sm">
                  {data.type}
                </span>
                {/* Audio Button */}
                <button
                  onClick={() => playAudio(data.word)}
                  className="p-1.5 bg-white/10 rounded-full hover:bg-[#FFD700] hover:text-[#004488] transition text-white/80 active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
                {data.word}
              </h1>
              <p className="text-xl md:text-2xl font-serif text-blue-100 italic opacity-90">
                {data.phonetic}
              </p>
            </div>
            {/* Decorative Icon */}
            <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Star
                className="w-10 h-10 text-[#FFD700] drop-shadow-lg"
                fill="#FFD700"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-2xl md:text-3xl font-serif text-[#FFD700] leading-relaxed font-medium">
              "{data.vietnamese}"
            </p>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
          {/* Blurb & Origin Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-yellow-200 transition-colors group/card h-full">
              <div className="flex items-center mb-3 text-[#004488]">
                <div className="p-2 bg-blue-50 rounded-lg mr-3 group-hover/card:bg-yellow-50 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  The Blurb
                </h3>
              </div>
              <p className="text-lg text-slate-700 font-serif leading-relaxed">
                {data.blurb}
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group/card h-full">
              <div className="flex items-center mb-3 text-[#004488]">
                <div className="p-2 bg-blue-50 rounded-lg mr-3 group-hover/card:bg-blue-100 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  Gốc từ (Origin)
                </h3>
              </div>
              <p className="text-lg text-slate-700 font-serif leading-relaxed italic text-slate-500">
                {data.origin || "Đang cập nhật..."}
              </p>
            </div>
          </div>

          {/* Examples Section */}
          {data.examples && data.examples.length > 0 && (
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] to-transparent rounded-full opacity-70"></div>
              <div className="pl-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center">
                  <Layers className="w-4 h-4 mr-2" /> Ngữ cảnh & Văn học
                </h3>
                <div className="space-y-4">
                  {data.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="group/ex relative bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-l-4 hover:border-l-[#004488]"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-[#004488] bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                          {ex.type}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {ex.source}
                        </span>
                      </div>
                      <p className="text-xl text-slate-800 italic font-serif leading-relaxed">
                        "{ex.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Synonyms & Antonyms */}
          {(data.synonyms?.length > 0 || data.antonyms?.length > 0) && (
            <div className="flex flex-col md:flex-row gap-6">
              {data.synonyms?.length > 0 && (
                <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-500 uppercase text-xs mb-3 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm"></span>{" "}
                    Đồng Nghĩa
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.synonyms.map((syn, i) => (
                      <button
                        key={i}
                        onClick={() => onSearch(null, syn)}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold border border-green-100 hover:bg-green-100 hover:-translate-y-0.5 transition-transform"
                      >
                        {syn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {data.antonyms?.length > 0 && (
                <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-500 uppercase text-xs mb-3 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-sm"></span>{" "}
                    Trái Nghĩa
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.antonyms.map((ant, i) => (
                      <button
                        key={i}
                        onClick={() => onSearch(null, ant)}
                        className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold border border-red-100 hover:bg-red-100 hover:-translate-y-0.5 transition-transform"
                      >
                        {ant}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quiz Module */}
          <QuizModule
            quizzes={data.quizzes || (data.quiz ? [data.quiz] : [])}
            onReward={onReward}
          />

          {/* Suggestions Footer */}
          {data.suggestions && data.suggestions.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                <Map className="w-4 h-4 mr-1" /> Khám phá tiếp
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.suggestions.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSearch(null, word)}
                    className="flex items-center px-4 py-2 bg-white hover:bg-[#FFF8E1] text-[#004488] rounded-full text-sm font-bold border border-slate-200 hover:border-[#FFD700] transition-all shadow-sm hover:shadow group/btn"
                  >
                    {word}{" "}
                    <ArrowRight className="w-3 h-3 ml-1 opacity-50 group-hover/btn:opacity-100 transition-all transform group-hover/btn:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const SATVocabularyTool = () => {
  // --- STATE ---
  const [inputWord, setInputWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("study");
  const [streak, setStreak] = useState(0);
  const [wordsToday, setWordsToday] = useState(0);
  const [dailyWord, setDailyWord] = useState("");
  const [dailyQuote, setDailyQuote] = useState(QUOTES[0]);
  const [weeklyActivity, setWeeklyActivity] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [notification, setNotification] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showDailyBonus, setShowDailyBonus] = useState(false);
  const [showBadgeDetails, setShowBadgeDetails] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speedReviewMode, setSpeedReviewMode] = useState(false);
  const [speedReviewData, setSpeedReviewData] = useState({
    questions: [],
    currentIndex: 0,
    score: 0,
    timeLeft: 30,
    isActive: false,
    isFinished: false,
  });
  const [reviewSuggestion, setReviewSuggestion] = useState(null);

  // NEW: User Name State
  const [userName, setUserName] = useState("Sĩ Tử SAT");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  const topRef = useRef(null);
  const apiKey = "AIzaSyCtiChnx7H4szQGOsIpFxUuk2EPYSqQq30";

  useEffect(() => {
    // Load History
    const savedHistory = localStorage.getItem("sat_vocab_history_v2");
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed);
      if (parsed.length > 0)
        setReviewSuggestion(parsed[Math.floor(Math.random() * parsed.length)]);
    }

    // Load User Name
    const savedName = localStorage.getItem("user_name");
    if (savedName) setUserName(savedName);

    const savedXP = parseInt(localStorage.getItem("user_xp") || "0");
    setXP(savedXP);
    calculateLevel(savedXP);

    const savedWeekly = localStorage.getItem("weekly_activity");
    if (savedWeekly) setWeeklyActivity(JSON.parse(savedWeekly));

    const lastVisit = localStorage.getItem("last_visit_date");
    const currentStreak = parseInt(localStorage.getItem("study_streak") || "0");
    const savedWordsToday = parseInt(
      localStorage.getItem("words_learned_today") || "0",
    );
    const today = new Date().toDateString();
    const todayDayIndex =
      new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        const newStreak = currentStreak + 1;
        setStreak(newStreak);
        localStorage.setItem("study_streak", newStreak.toString());
      } else {
        setStreak(1);
        localStorage.setItem("study_streak", "1");
      }

      setWordsToday(0);
      localStorage.setItem("words_learned_today", "0");
      localStorage.setItem("last_visit_date", today);
      setShowDailyBonus(true);

      setWeeklyActivity((prev) => {
        const newWeek = [...prev];
        if (todayDayIndex >= 0 && todayDayIndex < 7) {
          newWeek[todayDayIndex] = true;
        }
        localStorage.setItem("weekly_activity", JSON.stringify(newWeek));
        return newWeek;
      });
    } else {
      setStreak(currentStreak);
      setWordsToday(savedWordsToday);
    }

    const dayIndex = new Date().getDate() % DAILY_WORDS.length;
    setDailyWord(DAILY_WORDS[dayIndex]);
    setDailyQuote(QUOTES[dayIndex % QUOTES.length]);
  }, []);

  useEffect(() => {
    let timer;
    if (
      speedReviewMode &&
      speedReviewData.isActive &&
      speedReviewData.timeLeft > 0
    ) {
      timer = setInterval(() => {
        setSpeedReviewData((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (speedReviewData.timeLeft === 0 && speedReviewData.isActive) {
      setSpeedReviewData((prev) => ({
        ...prev,
        isActive: false,
        isFinished: true,
      }));
    }
    return () => clearInterval(timer);
  }, [speedReviewMode, speedReviewData.isActive, speedReviewData.timeLeft]);

  const addXP = (amount) => {
    const newXP = xp + amount;
    setXP(newXP);
    localStorage.setItem("user_xp", newXP.toString());
    calculateLevel(newXP);
    showNotification(`+${amount} XP`, "success");
  };

  const calculateLevel = (currentXP) => {
    const newLevel = Math.floor(Math.sqrt(currentXP / 50)) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
    } else {
      setLevel(newLevel);
    }
  };

  const getCurrentRank = () => {
    return [...RANKS].reverse().find((r) => level >= r.level) || RANKS[0];
  };

  const showNotification = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateWordsToday = () => {
    const newCount = wordsToday + 1;
    setWordsToday(newCount);
    localStorage.setItem("words_learned_today", newCount.toString());
    if (newCount === DAILY_GOAL) {
      addXP(XP_REWARDS.DAILY_GOAL_MET);
      showNotification(
        `🎉 Đạt mục tiêu ngày! +${XP_REWARDS.DAILY_GOAL_MET} XP`,
        "success",
      );
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      localStorage.setItem("user_name", tempName);
      showNotification("Đã cập nhật tên!", "success");
    }
    setIsEditingName(false);
  };

  const addToHistory = (data) => {
    setHistory((prev) => {
      const exists = prev.some(
        (item) => item.word.toLowerCase() === data.word.toLowerCase(),
      );
      if (!exists) {
        const newHistory = [data, ...prev].slice(0, 100);
        localStorage.setItem(
          "sat_vocab_history_v2",
          JSON.stringify(newHistory),
        );
        updateWordsToday();
        addXP(XP_REWARDS.SEARCH);
        return newHistory;
      }
      return prev;
    });
  };

  const generateAIContent = async (word) => {
    const systemPrompt = `
      Bạn là chuyên gia luyện thi SAT. Từ cần giải thích: "${word}".
      YÊU CẦU: Trả về JSON thuần (không markdown).
      1. "origin": Etymology ngắn gọn.
      2. "suggestions": 3 từ SAT nâng cao liên quan (chỉ tiếng Anh).
      3. "quizzes": 3 câu hỏi trắc nghiệm (Dễ, Trung bình, Khó).
      
      JSON Structure:
      {
        "word": "${word}", "phonetic": "/.../", "type": "adj.", "vietnamese": "...", "origin": "...",
        "blurb": "Một đoạn văn ngắn súc tích giải thích từ này theo phong cách học thuật nhưng dễ nhớ.",
        "synonyms": ["..."], "antonyms": ["..."],
        "examples": [{"type": "Classic Literature", "source": "Tên tác phẩm", "text": "Câu trích dẫn..."}],
        "quizzes": [
           { "level": "Dễ", "question": "...", "options": ["A", "B", "C", "D"], "answer": "...", "explanation": "..." },
           { "level": "TB", "question": "...", "options": ["A", "B", "C", "D"], "answer": "...", "explanation": "..." },
           { "level": "Khó", "question": "...", "options": ["A", "B", "C", "D"], "answer": "...", "explanation": "..." }
        ],
        "suggestions": ["...", "...", "..."]
      }
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
          }),
        },
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        let text = data.candidates[0].content.parts[0].text;
        text = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        return JSON.parse(text);
      }
    } catch (error) {
      console.error("AI Error:", error);
      return null;
    }
  };

  const handleSearch = async (e, wordOverride = null) => {
    if (e) e.preventDefault();

    let rawInput = wordOverride || inputWord;

    const keywords = [
      ...new Set(
        rawInput
          .split(/[,;\n|\/]+/)
          .map((w) => w.trim())
          .map((w) => w.replace(/^[\d]+\.\s*/, "").replace(/^[-*•]\s*/, ""))
          .filter((w) => w.length > 0),
      ),
    ];

    if (keywords.length === 0) return;

    if (wordOverride) setInputWord(rawInput);

    setActiveTab("study");
    if (window.innerWidth < 1024) {
      setTimeout(
        () => topRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }

    setLoading(true);
    setResults([]);

    const newBatchResults = [];

    for (let i = 0; i < keywords.length; i++) {
      const word = keywords[i];
      setLoadingText(
        `Đang phân tích: "${word}" (${i + 1}/${keywords.length})...`,
      );

      if (i > 0) await new Promise((r) => setTimeout(r, 500));

      const aiResult = await generateAIContent(word);

      if (aiResult) {
        if (aiResult.quizzes) {
          aiResult.quizzes = aiResult.quizzes.map((q) => ({
            ...q,
            options: q.options.map((opt) => opt.trim()),
            answer: q.answer.trim(),
          }));
        }
        newBatchResults.push(aiResult);
        addToHistory(aiResult);
        setResults([...newBatchResults]);
      } else {
        newBatchResults.push({
          word: word,
          phonetic: "Error",
          type: "N/A",
          vietnamese: "Không tìm thấy/Lỗi",
          blurb: "Hệ thống không thể phân tích từ này lúc này.",
          synonyms: [],
          antonyms: [],
          examples: [],
          quizzes: [],
          suggestions: [],
        });
        setResults([...newBatchResults]);
      }
    }

    setLoading(false);
    setLoadingText("");
  };

  const startSpeedReview = () => {
    const validHistory = history.filter((item) => item.word && item.vietnamese);
    if (validHistory.length < 4) {
      showNotification("Cần ít nhất 4 từ vựng để mở khóa!", "info");
      return;
    }

    const questions = [];
    const usedIndices = new Set();

    for (let i = 0; i < 5; i++) {
      if (validHistory.length <= i) break;
      let correctIdx;
      let attempts = 0;
      do {
        correctIdx = Math.floor(Math.random() * validHistory.length);
        attempts++;
      } while (usedIndices.has(correctIdx) && attempts < 20);
      usedIndices.add(correctIdx);

      const correctWord = validHistory[correctIdx];
      const options = [correctWord.vietnamese];
      while (options.length < 4) {
        const randomWrong =
          validHistory[Math.floor(Math.random() * validHistory.length)]
            .vietnamese;
        if (!options.includes(randomWrong)) options.push(randomWrong);
      }

      questions.push({
        word: correctWord.word,
        correct: correctWord.vietnamese,
        options: options.sort(() => Math.random() - 0.5),
      });
    }

    setSpeedReviewData({
      questions,
      currentIndex: 0,
      score: 0,
      timeLeft: 30,
      isActive: true,
      isFinished: false,
    });
    setSpeedReviewMode(true);
  };

  const handleSpeedAnswer = (selected) => {
    const currentQ = speedReviewData.questions[speedReviewData.currentIndex];
    const isCorrect = selected === currentQ.correct;
    setSpeedReviewData((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentIndex: prev.currentIndex + 1,
      isFinished: prev.currentIndex + 1 >= prev.questions.length,
      isActive: !(prev.currentIndex + 1 >= prev.questions.length),
    }));
  };

  const exportToExcel = () => {
    if (history.length === 0) {
      showNotification("Chưa có từ vựng để xuất!", "info");
      return;
    }
    const headers = ["Thứ Tự", "Từ", "Phát âm", "Nghĩa", "Gốc từ", "Ví dụ"];

    const rows = history.map((item, index) => {
      const clean = (t) => {
        if (!t) return '""';
        return `"${String(t).replace(/"/g, '""').replace(/\n/g, " ")}"`;
      };

      return [
        index + 1,
        clean(item.word),
        clean(item.phonetic),
        clean(item.vietnamese),
        clean(item.origin),
        clean(item.examples?.[0]?.text),
      ].join(";");
    });

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `SAT_Vocabulary_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const xpForCurrentLevel = (level - 1) * (level - 1) * 50;
  const xpForNextLevel = level * level * 50;
  const xpProgress = Math.min(
    ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100,
    100,
  );

  return (
    <div
      className="min-h-screen bg-slate-50 font-serif text-slate-800 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"
      ref={topRef}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-serif { font-family: 'Crimson Pro', serif; }
        .text-gold { color: #FFD700; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop-in { animation: popIn 0.4s ease-out forwards; }
        
        @keyframes floatUp { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-float-up { animation: floatUp 0.6s ease-out forwards; }
        
        @keyframes fade-in-up { 
            from { opacity: 0; transform: translateY(10px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }

        .logo-glow { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(0, 68, 136, 0.3); }
        
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(5deg); }
        }
        .shake-animation { animation: shake 2s infinite ease-in-out; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.location.reload()}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-[#004488] rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="https://d21acfi38wn3iy.cloudfront.net/resource/documents/9d2dd8b7-2de4-4dea-9c36-f8a2abc3dece/1761724790727-anh-group-fb-png.png"
                alt="Logo SAT Thủ Khoa Đức An"
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-md object-cover bg-white"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-[#004488] uppercase leading-none tracking-tight">
                SAT Thủ Khoa Đức An
              </h1>
              <a
                href="https://satfelis.izteach.vn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[10px] md:text-xs text-slate-500 font-bold tracking-widest hover:text-[#004488] transition mt-1 uppercase"
              >
                <ExternalLink className="w-3 h-3 mr-1" /> WEBSITE CHÍNH THỨC
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100 shadow-sm">
              <Flame
                className={`w-4 h-4 mr-1 ${streak > 0 ? "fill-orange-500 text-orange-500" : "text-slate-300"}`}
              />
              <span className="font-bold text-sm">{streak}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-blue-50 text-[#004488] rounded-full border border-blue-100 shadow-sm">
              <Star className="w-4 h-4 mr-1 fill-blue-500 text-blue-500" />
              <span className="font-bold text-sm">{xp}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MODALS */}
      {notification && (
        <div className="fixed top-24 right-4 z-[100] animate-float-up bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center pr-8 max-w-sm">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-bold text-slate-800">
            {notification.message}
          </span>
        </div>
      )}

      {showLevelUp && (
        <div
          className="fixed inset-0 z-[80] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowLevelUp(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 text-center max-w-sm w-full animate-pop-in relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white opacity-50"></div>
            <div className="relative z-10">
              <Crown className="w-24 h-24 text-[#FFD700] mx-auto mb-4 drop-shadow-md animate-bounce" />
              <h2 className="text-3xl font-extrabold text-[#004488] uppercase mb-2">
                Thăng Cấp!
              </h2>
              <p className="text-lg font-bold text-slate-600 mb-6">
                Level {level} -{" "}
                <span className="text-amber-500">{getCurrentRank().title}</span>
              </p>
              <button
                onClick={() => setShowLevelUp(false)}
                className="w-full py-3 bg-[#004488] hover:bg-[#003366] text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                Tuyệt vời
              </button>
            </div>
          </div>
        </div>
      )}

      {speedReviewMode && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden animate-pop-in shadow-2xl">
            <div className="p-5 bg-gradient-to-r from-[#004488] to-[#003366] text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center text-lg">
                <Timer className="w-6 h-6 mr-2 text-[#FFD700]" /> Speed Review
              </h3>
              <div className="flex items-center font-mono text-xl bg-white/10 px-3 py-1 rounded-lg">
                <Clock className="w-5 h-5 mr-2 text-[#FFD700]" />{" "}
                {speedReviewData.timeLeft}s
              </div>
            </div>
            <div className="p-8 text-center bg-slate-50">
              {!speedReviewData.isFinished ? (
                <>
                  <div className="mb-8">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">
                      Từ vựng
                    </p>
                    <h2 className="text-5xl font-extrabold text-[#004488] drop-shadow-sm">
                      {
                        speedReviewData.questions[speedReviewData.currentIndex]
                          ?.word
                      }
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {speedReviewData.questions[
                      speedReviewData.currentIndex
                    ]?.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpeedAnswer(opt)}
                        className="p-4 rounded-2xl border-2 border-slate-200 hover:bg-[#004488] hover:border-[#004488] hover:text-white font-bold text-slate-600 transition-all duration-200 shadow-sm hover:shadow-md text-lg"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <Trophy className="w-24 h-24 text-[#FFD700] mx-auto mb-6 drop-shadow-md" />
                  <h2 className="text-4xl font-extrabold text-[#004488] mb-2">
                    Hoàn Thành!
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    Kết quả:{" "}
                    <span className="font-bold text-green-600 text-2xl">
                      {speedReviewData.score}
                    </span>{" "}
                    / {speedReviewData.questions.length}
                  </p>
                  <button
                    onClick={() => {
                      addXP(
                        speedReviewData.score * XP_REWARDS.SPEED_REVIEW_CORRECT,
                      );
                      setSpeedReviewMode(false);
                    }}
                    className="px-10 py-4 bg-[#FFD700] hover:bg-yellow-400 text-[#004488] font-extrabold rounded-2xl shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wide"
                  >
                    Nhận Thưởng
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showFlashcards && history.length > 0 && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div
            className="w-full max-w-lg perspective-1000 aspect-[3/4] md:aspect-[4/3] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-[#004488] to-[#002244] rounded-3xl flex flex-col items-center justify-center text-white backface-hidden p-8 shadow-2xl border-4 border-[#FFD700] ${isFlipped ? "hidden" : "flex"}`}
              >
                <h2 className="text-5xl font-extrabold mb-6 text-center drop-shadow-md">
                  {history[currentCardIndex].word}
                </h2>
                <div
                  className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(history[currentCardIndex].word);
                  }}
                >
                  <Volume2 className="w-6 h-6 text-[#FFD700]" />
                  <span className="text-xl font-serif italic">
                    {history[currentCardIndex].phonetic}
                  </span>
                </div>
                <p className="absolute bottom-10 text-xs text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                  Chạm để lật
                </p>
              </div>
              {/* Back Side */}
              <div
                className={`absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center backface-hidden rotate-y-180 p-8 shadow-2xl text-center border-4 border-[#004488] ${isFlipped ? "flex" : "hidden"}`}
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-extrabold text-[#004488] mb-4">
                    {history[currentCardIndex].vietnamese}
                  </h3>
                  <div className="w-16 h-1 bg-[#FFD700] rounded-full mb-6"></div>
                  <p className="text-slate-600 italic font-serif text-xl leading-relaxed px-4">
                    "
                    {history[currentCardIndex].examples?.[0]?.text ||
                      history[currentCardIndex].origin}
                    "
                  </p>
                </div>
                <div
                  className="flex justify-between items-center w-full pt-6 border-t border-slate-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    disabled={currentCardIndex === 0}
                    onClick={() => {
                      setCurrentCardIndex((c) => c - 1);
                      setIsFlipped(false);
                    }}
                    className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full disabled:opacity-30 transition"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#004488]" />
                  </button>
                  <span className="font-bold text-slate-400 text-sm tracking-widest">
                    {currentCardIndex + 1} / {history.length}
                  </span>
                  <button
                    disabled={currentCardIndex === history.length - 1}
                    onClick={() => {
                      setCurrentCardIndex((c) => c + 1);
                      setIsFlipped(false);
                    }}
                    className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full disabled:opacity-30 transition"
                  >
                    <ChevronRight className="w-6 h-6 text-[#004488]" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFlashcards(false);
                  }}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8 pb-32 lg:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Tools & History */}
        <div className="lg:col-span-4 space-y-8">
          {/* PROFILE CARD */}
          <div
            className={`bg-white p-6 rounded-3xl shadow-lg border border-white/50 backdrop-blur-sm ${activeTab === "stats" ? "block" : "hidden lg:block"}`}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mr-4 border border-blue-200 shadow-sm text-2xl font-bold text-[#004488]">
                {level}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  {getCurrentRank().title}
                </p>
                {isEditingName ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Nhập tên mới..."
                      className="w-full text-sm font-bold text-[#004488] border-b-2 border-blue-300 focus:border-blue-500 outline-none px-1 py-1 mr-2"
                      onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h3
                    className="text-xl font-bold text-[#004488] flex items-center group/name cursor-pointer"
                    onClick={() => {
                      setTempName(userName);
                      setIsEditingName(true);
                    }}
                  >
                    {userName}{" "}
                    <Edit2 className="w-4 h-4 ml-2 opacity-0 group-hover/name:opacity-100 transition-opacity text-slate-400" />
                  </h3>
                )}
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#004488] to-[#0066CC] h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wide">
              <span>{xp} XP</span>
              <span>Next Lvl: {xpForNextLevel}</span>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div
            className={`bg-white p-6 rounded-3xl shadow-lg border border-white/50 backdrop-blur-sm ${activeTab === "study" ? "block" : "hidden lg:block"}`}
          >
            <h2 className="text-xl font-bold text-[#004488] mb-6 uppercase flex items-center tracking-tight">
              <Search className="w-6 h-6 mr-2 text-[#FFD700]" /> Bulk Search
            </h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  placeholder="Nhập danh sách từ vựng...&#10;Ví dụ:&#10;1. Apple&#10;2. Banana"
                  className="w-full px-5 py-4 text-lg border-2 border-slate-100 rounded-2xl focus:border-[#004488] outline-none transition-all duration-300 font-medium min-h-[140px] resize-none bg-slate-50 focus:bg-white focus:shadow-md group-hover:border-slate-200"
                />
                {inputWord && (
                  <button
                    type="button"
                    onClick={() => setInputWord("")}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-400 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {/* CUSTOMIZED CTA BUTTON: Yellow Background, Blue Text, 3D Effect */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 bg-[#FFD700] hover:bg-[#FFC000] text-[#004488] font-extrabold text-xl uppercase rounded-2xl shadow-[0_6px_0_#B8860B] active:shadow-[0_2px_0_#B8860B] active:translate-y-[4px] hover:-translate-y-[2px] transition-all flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <RefreshCw className="animate-spin w-6 h-6" />
                ) : (
                  <>
                    <ListPlus className="w-6 h-6 mr-2" /> Phân Tích Ngay
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 font-medium text-center bg-slate-50 py-2 rounded-lg">
                Tự động làm sạch số thứ tự & ký tự lạ
              </p>
            </form>
          </div>

          {/* HISTORY */}
          <div
            className={`bg-white p-6 rounded-3xl shadow-lg border border-white/50 backdrop-blur-sm ${activeTab === "library" ? "block" : "hidden lg:block"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center tracking-wider">
                <History className="w-4 h-4 mr-2" /> Thư viện từ
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={startSpeedReview}
                  className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition tooltip"
                  title="Speed Review"
                >
                  <Timer className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                    setShowFlashcards(true);
                  }}
                  className="p-2 bg-blue-50 text-[#004488] rounded-lg hover:bg-blue-100 transition tooltip"
                  title="Flashcards"
                >
                  <Layers className="w-5 h-5" />
                </button>
                <button
                  onClick={exportToExcel}
                  className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition tooltip"
                  title="Export Excel"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(null, item.word)}
                    className="px-4 py-2 bg-slate-50 hover:bg-[#004488] hover:text-white text-slate-600 rounded-xl text-sm font-bold transition-all border border-slate-100 hover:border-[#004488]"
                  >
                    {item.word}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic w-full text-center py-4">
                  Chưa có lịch sử tra cứu.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div
          className={`lg:col-span-8 ${activeTab === "study" ? "block" : "hidden lg:block"}`}
        >
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in-up bg-white/50 rounded-3xl border border-white backdrop-blur-sm">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-100 border-t-[#FFD700] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[#004488] animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-[#004488] mb-2">
                  {loadingText || "AI đang phân tích..."}
                </p>
                <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-[#FFD700] animate-pulse w-2/3 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center py-10 lg:py-20 animate-fade-in-up text-center">
              <div className="mb-8 p-6 bg-white rounded-full shadow-xl border-4 border-slate-50">
                <Quote className="w-16 h-16 text-[#FFD700]" />
              </div>
              <p className="text-2xl font-serif text-slate-700 italic mb-3 max-w-2xl leading-relaxed">
                "{dailyQuote.text}"
              </p>
              <p className="text-sm font-bold text-[#004488] uppercase tracking-[0.2em] mb-12 opacity-60">
                — {dailyQuote.author}
              </p>

              {/* Daily Word Card */}
              <div
                className="group bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-[#FFD700] cursor-pointer hover:shadow-2xl transition-all duration-300 max-w-sm w-full relative overflow-hidden"
                onClick={() => handleSearch(null, dailyWord)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" /> Word of the Day
                  </p>
                  <h2 className="text-5xl font-extrabold text-[#004488] mb-4">
                    {dailyWord}
                  </h2>
                  <span className="inline-block px-4 py-2 bg-slate-100 text-slate-500 text-sm font-bold rounded-full group-hover:bg-[#004488] group-hover:text-white transition-colors">
                    Nhấn để học ngay
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-16 pb-12">
              {/* Results Header */}
              <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-slate-100 sticky top-20 z-30">
                <h2 className="text-lg font-bold text-slate-700 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" /> Đã
                  phân tích{" "}
                  <span className="ml-1 text-[#004488]">
                    {results.length} từ
                  </span>
                </h2>
                <button
                  onClick={() => {
                    setResults([]);
                    setInputWord("");
                  }}
                  className="text-sm text-red-500 font-bold flex items-center hover:bg-red-50 px-4 py-2 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Xóa kết quả
                </button>
              </div>

              {/* RENDER BATCH LIST */}
              <div className="space-y-12">
                {results.map((item, index) => (
                  <div key={index + item.word}>
                    <VocabularyCard
                      data={item}
                      index={index}
                      total={results.length}
                      onSearch={handleSearch}
                      onReward={addXP}
                    />
                    {index < results.length - 1 && (
                      <div className="flex justify-center my-12">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FLOATING CONTACT BUTTONS (Shaking) */}
      <div className="fixed bottom-24 lg:bottom-10 right-6 flex flex-col space-y-4 z-50">
        <a
          href="https://www.facebook.com/nghiemducan.10/"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white shake-animation group relative"
        >
          <Share2 className="w-7 h-7 text-white" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-white text-[#1877F2] text-xs font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Facebook
          </span>
        </a>
        <a
          href="https://zalo.me/0812358277"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white shake-animation group relative"
          style={{ animationDelay: "0.5s" }}
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-white text-[#0068FF] text-xs font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat Zalo
          </span>
        </a>
      </div>

      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 flex justify-around py-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
        <button
          onClick={() => setActiveTab("study")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-all ${activeTab === "study" ? "text-[#004488]" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Home
            className={`w-6 h-6 mb-1 ${activeTab === "study" && "fill-current"}`}
          />
          <span className="text-[10px] font-bold">Học tập</span>
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-all ${activeTab === "stats" ? "text-[#004488]" : "text-slate-400 hover:text-slate-600"}`}
        >
          <User
            className={`w-6 h-6 mb-1 ${activeTab === "stats" && "fill-current"}`}
          />
          <span className="text-[10px] font-bold">Hồ sơ</span>
        </button>
        <button
          onClick={() => setActiveTab("library")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-all ${activeTab === "library" ? "text-[#004488]" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Book
            className={`w-6 h-6 mb-1 ${activeTab === "library" && "fill-current"}`}
          />
          <span className="text-[10px] font-bold">Kho từ</span>
        </button>
      </nav>
    </div>
  );
};

export default SATVocabularyTool;
