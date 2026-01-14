import { motion, AnimatePresence } from "framer-motion";
import { Heart, Clock, Star, ArrowLeft, Play, Calendar } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  ageRating: string;
  poster: string;
  formats: string[];
  premiereDate?: string;
  synopsis?: string;
  director?: string;
  cast?: string[];
  trailer?: string;
}

interface Session {
  id: number;
  time: string;
  hall: string;
  format: string;
  price: number;
  seatsAvailable: number;
}

const currentMovies: Movie[] = [
  {
    id: 1,
    title: "Аватар 3",
    genre: "Фантастика",
    duration: "192 мин",
    rating: 8.5,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    formats: ["2D", "3D", "IMAX"],
    synopsis: "Джейк Салли и Нейтири вынуждены покинуть свой дом и исследовать неизведанные регионы Пандоры, чтобы спасти свою семью от новых угроз.",
    director: "Джеймс Кэмерон",
    cast: ["Сэм Уортингтон", "Зои Салдана", "Сигурни Уивер", "Кейт Уинслет"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Дюна: Часть 3",
    genre: "Фантастика",
    duration: "166 мин",
    rating: 8.8,
    ageRating: "16+",
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    formats: ["2D", "IMAX", "4DX"],
    synopsis: "Пол Атрейдес объединяется с Чани и фременами, чтобы отомстить тем, кто уничтожил его семью. Он должен выбрать между любовью и судьбой вселенной.",
    director: "Дени Вильнёв",
    cast: ["Тимоти Шаламе", "Зендея", "Ребекка Фергюсон", "Хавьер Бардем"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Оппенгеймер 2",
    genre: "Драма",
    duration: "180 мин",
    rating: 8.9,
    ageRating: "18+",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    formats: ["2D", "IMAX"],
    synopsis: "Продолжение истории создателя атомной бомбы. Новые открытия и моральные дилеммы в эпоху холодной войны.",
    director: "Кристофер Нолан",
    cast: ["Киллиан Мёрфи", "Эмили Блант", "Мэтт Дэймон"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Миссия невыполнима 9",
    genre: "Боевик",
    duration: "163 мин",
    rating: 7.8,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    formats: ["2D", "3D", "4DX"],
    synopsis: "Итан Хант возвращается с новой невозможной миссией. Гонка со временем, чтобы предотвратить глобальную катастрофу.",
    director: "Кристофер МакКуорри",
    cast: ["Том Круз", "Хейли Этвелл", "Ванесса Кирби"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Интерстеллар 2",
    genre: "Фантастика",
    duration: "185 мин",
    rating: 9.0,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    formats: ["2D", "IMAX"],
    synopsis: "Новое путешествие сквозь пространство и время. Человечество снова ищет ответы среди звёзд.",
    director: "Кристофер Нолан",
    cast: ["Мэттью Макконахи", "Энн Хэтэуэй", "Джессика Честейн"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Джокер 3",
    genre: "Драма",
    duration: "138 мин",
    rating: 8.2,
    ageRating: "18+",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    formats: ["2D", "3D"],
    synopsis: "Третья глава истории Артура Флека. Хаос в Готэме достигает апогея.",
    director: "Тодд Филлипс",
    cast: ["Хоакин Феникс", "Леди Гага", "Брендан Глисон"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const upcomingMovies: Movie[] = [
  {
    id: 101,
    title: "Матрица 5",
    genre: "Фантастика",
    duration: "150 мин",
    rating: 0,
    ageRating: "16+",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    formats: ["2D", "3D", "IMAX", "4DX"],
    premiereDate: "15 февраля 2025",
    synopsis: "Возвращение в мир Матрицы. Новый избранный должен раскрыть правду о симуляции.",
    director: "Лана Вачовски",
    cast: ["Киану Ривз", "Кэрри-Энн Мосс"],
  },
  {
    id: 102,
    title: "Гладиатор 2",
    genre: "Драма",
    duration: "165 мин",
    rating: 0,
    ageRating: "18+",
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
    formats: ["2D", "IMAX"],
    premiereDate: "1 марта 2025",
    synopsis: "Продолжение легендарной истории о гладиаторе. Новый герой выходит на арену Колизея.",
    director: "Ридли Скотт",
    cast: ["Пол Мескаль", "Дензел Вашингтон", "Педро Паскаль"],
  },
  {
    id: 103,
    title: "Властелин колец: Новая эра",
    genre: "Фэнтези",
    duration: "180 мин",
    rating: 0,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    formats: ["2D", "3D", "IMAX"],
    premiereDate: "20 марта 2025",
    synopsis: "Новая глава в истории Средиземья. Древнее зло пробуждается вновь.",
    director: "Питер Джексон",
    cast: ["Новый актёрский состав"],
  },
  {
    id: 104,
    title: "Тёмный рыцарь: Возрождение",
    genre: "Боевик",
    duration: "155 мин",
    rating: 0,
    ageRating: "16+",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    formats: ["2D", "IMAX", "4DX"],
    premiereDate: "5 апреля 2025",
    synopsis: "Готэм снова нуждается в своём защитнике. Новый Бэтмен выходит на улицы.",
    director: "Мэтт Ривз",
    cast: ["Роберт Паттинсон", "Зои Кравиц"],
  },
];

const genres = ["Все жанры", "Фантастика", "Драма", "Боевик", "Комедия", "Фэнтези"];
const formats = ["Все форматы", "2D", "3D", "IMAX", "4DX"];

const generateDates = () => {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    result.push({
      id: i,
      day: i === 0 ? "Сегодня" : i === 1 ? "Завтра" : days[date.getDay()],
      date: date.getDate(),
      month: date.toLocaleDateString("ru-RU", { month: "short" }),
    });
  }
  return result;
};

const generateSessions = (): Session[] => [
  { id: 1, time: "10:00", hall: "Зал 1", format: "2D", price: 350, seatsAvailable: 45 },
  { id: 2, time: "12:30", hall: "Зал 2", format: "3D", price: 450, seatsAvailable: 32 },
  { id: 3, time: "15:00", hall: "IMAX", format: "IMAX", price: 650, seatsAvailable: 18 },
  { id: 4, time: "17:30", hall: "Зал 1", format: "2D", price: 400, seatsAvailable: 52 },
  { id: 5, time: "20:00", hall: "4DX", format: "4DX", price: 750, seatsAvailable: 24 },
  { id: 6, time: "22:30", hall: "Зал 3", format: "2D", price: 350, seatsAvailable: 67 },
];

const Cinema = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [selectedFormat, setSelectedFormat] = useState("Все форматы");
  const [activeTab, setActiveTab] = useState("now");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  
  const dates = generateDates();
  const sessions = generateSessions();

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const movies = activeTab === "now" ? currentMovies : upcomingMovies;

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "Все жанры" || movie.genre === selectedGenre;
    const matchesFormat = selectedFormat === "Все форматы" || movie.formats.includes(selectedFormat);
    return matchesGenre && matchesFormat;
  });

  const resetFilters = () => {
    setSelectedGenre("Все жанры");
    setSelectedFormat("Все форматы");
  };

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        {selectedMovie ? (
          <MovieDetail 
            movie={selectedMovie} 
            sessions={sessions}
            onBack={() => setSelectedMovie(null)}
            isFavorite={favorites.includes(selectedMovie.id)}
            onToggleFavorite={(e) => toggleFavorite(selectedMovie.id, e)}
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
          />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-16 pb-24 bg-background min-h-screen"
          >
            {/* Header */}
            <div className="mb-1">
              <h1 className="text-2xl font-bold text-foreground">Кинотеатр</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {activeTab === "now" ? "Сегодня в кино" : "Скоро в кино"}
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="now">В кино</TabsTrigger>
                <TabsTrigger value="upcoming">Скоро в кино</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Date Selector - only for "now" tab */}
            {activeTab === "now" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((dateItem) => {
                    const isActive = selectedDate === dateItem.id;
                    return (
                      <button
                        key={dateItem.id}
                        onClick={() => setSelectedDate(dateItem.id)}
                        className={`flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl transition-all border ${
                          isActive
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-muted-foreground border-border"
                        }`}
                      >
                        <span className={`text-xs font-medium ${isActive ? "opacity-70" : "opacity-60"}`}>
                          {dateItem.day}
                        </span>
                        <span className="text-lg font-bold mt-0.5">{dateItem.date}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Filters - only for "now" tab */}
            {activeTab === "now" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 flex gap-2"
              >
                {/* Genre Filter */}
                <div className="relative flex-1">
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full h-10 px-3 bg-card border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary"
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Format Filter */}
                <div className="relative flex-1">
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full h-10 px-3 bg-card border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary"
                  >
                    {formats.map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Movie Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Favorite Button */}
                    <motion.button
                      onClick={(e) => toggleFavorite(movie.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorites.includes(movie.id)
                            ? "fill-red-500 text-red-500"
                            : "text-foreground"
                        }`}
                      />
                    </motion.button>

                    {/* Rating Badge (for current movies) or Premiere Date (for upcoming) */}
                    {activeTab === "now" ? (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-foreground">{movie.rating}</span>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Calendar className="w-3 h-3 text-primary-foreground" />
                        <span className="text-xs font-semibold text-primary-foreground">{movie.premiereDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="mt-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                      <span>{movie.genre}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {movie.formats.map((format) => (
                        <span
                          key={format}
                          className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {filteredMovies.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">Фильмы не найдены</p>
                <button
                  onClick={resetFilters}
                  className="mt-2 text-sm text-primary font-medium"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

// Movie Detail Component
interface MovieDetailProps {
  movie: Movie;
  sessions: Session[];
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  showTrailer: boolean;
  setShowTrailer: (show: boolean) => void;
}

const MovieDetail = ({ 
  movie, 
  sessions, 
  onBack, 
  isFavorite, 
  onToggleFavorite,
  showTrailer,
  setShowTrailer 
}: MovieDetailProps) => {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24 bg-background min-h-screen"
    >
      {/* Hero Image */}
      <div className="relative h-80">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Favorite Button */}
        <motion.button
          onClick={onToggleFavorite}
          className="absolute top-12 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </motion.button>

        {/* Play Trailer Button */}
        {movie.trailer && (
          <button
            onClick={() => setShowTrailer(true)}
            className="absolute bottom-8 right-4 flex items-center gap-2 px-4 py-2 bg-primary rounded-full"
          >
            <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Трейлер</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">{movie.title}</h1>
          {movie.rating > 0 && (
            <div className="flex items-center gap-1 bg-card rounded-full px-3 py-1.5 border border-border">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-foreground">{movie.rating}</span>
            </div>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="px-2 py-1 bg-muted rounded text-sm text-muted-foreground">{movie.genre}</span>
          <span className="px-2 py-1 bg-muted rounded text-sm text-muted-foreground">{movie.duration}</span>
          <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-sm font-medium">{movie.ageRating}</span>
        </div>

        {/* Formats */}
        <div className="flex flex-wrap gap-2 mt-3">
          {movie.formats.map((format) => (
            <span
              key={format}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium"
            >
              {format}
            </span>
          ))}
        </div>

        {/* Premiere Date for upcoming */}
        {movie.premiereDate && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-primary/10 rounded-xl">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Премьера: {movie.premiereDate}</span>
          </div>
        )}

        {/* Synopsis */}
        {movie.synopsis && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">О фильме</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{movie.synopsis}</p>
          </div>
        )}

        {/* Director & Cast */}
        {movie.director && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Создатели</h2>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Режиссёр:</span> {movie.director}
            </p>
            {movie.cast && movie.cast.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-foreground font-medium">В ролях:</span> {movie.cast.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Sessions - only for current movies */}
        {!movie.premiereDate && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Сеансы</h2>
            <div className="space-y-2">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-xl cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-lg font-bold text-foreground">{session.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.hall}</p>
                      <p className="text-xs text-muted-foreground">{session.format} • {session.seatsAvailable} мест</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{session.price} ₽</p>
                    <button className="text-xs text-primary font-medium mt-0.5">Выбрать</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Dialog */}
      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src={movie.trailer}
              title="Трейлер"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Cinema;
