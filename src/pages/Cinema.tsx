import { motion } from "framer-motion";
import { Heart, Clock, Star, Menu } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const movies = [
  {
    id: 1,
    title: "Аватар 3",
    genre: "Фантастика",
    duration: "192 мин",
    rating: 8.5,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Дюна: Часть 3",
    genre: "Фантастика",
    duration: "166 мин",
    rating: 8.8,
    ageRating: "16+",
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Оппенгеймер 2",
    genre: "Драма",
    duration: "180 мин",
    rating: 8.9,
    ageRating: "18+",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Миссия невыполнима 9",
    genre: "Боевик",
    duration: "163 мин",
    rating: 7.8,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Интерстеллар 2",
    genre: "Фантастика",
    duration: "185 мин",
    rating: 9.0,
    ageRating: "12+",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Джокер 3",
    genre: "Драма",
    duration: "138 мин",
    rating: 8.2,
    ageRating: "18+",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
  },
];

const genres = ["Все жанры", "Фантастика", "Драма", "Боевик", "Комедия"];
const ageRatings = ["Все", "6+", "12+", "16+", "18+"];

// Generate next 7 days
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

const Cinema = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [selectedAge, setSelectedAge] = useState("Все");
  
  const dates = generateDates();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "Все жанры" || movie.genre === selectedGenre;
    const matchesAge = selectedAge === "Все" || movie.ageRating === selectedAge;
    return matchesGenre && matchesAge;
  });

  return (
    <PageLayout showMenu={false}>
      <div className="px-4 pt-4 pb-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Кинотеатр
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Сегодня в кино
            </p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Date Selector */}
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
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  <span className={`text-xs font-medium ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                    {dateItem.day}
                  </span>
                  <span className="text-lg font-bold mt-0.5">{dateItem.date}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters */}
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
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none cursor-pointer focus:outline-none focus:border-gray-400"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Age Filter */}
          <div className="relative w-24">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none cursor-pointer focus:outline-none focus:border-gray-400"
            >
              {ageRatings.map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Movie Grid - 2 columns */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Favorite Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(movie.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </motion.button>

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-900">{movie.rating}</span>
                </div>
              </div>

              {/* Movie Info */}
              <div className="mt-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                  <span>{movie.genre}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-sm text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{movie.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredMovies.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">Фильмы не найдены</p>
            <button
              onClick={() => {
                setSelectedGenre("Все жанры");
                setSelectedAge("Все");
              }}
              className="mt-2 text-sm text-amber-600 font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Cinema;