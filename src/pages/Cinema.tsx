import { motion } from "framer-motion";
import { Heart, Clock, Star } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const movies = [
  {
    id: 1,
    title: "Аватар 3",
    genre: "Фантастика",
    duration: "192 мин",
    rating: 8.5,
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    times: ["10:00", "14:30", "18:00", "21:30"],
  },
  {
    id: 2,
    title: "Дюна: Часть 3",
    genre: "Фантастика",
    duration: "166 мин",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    times: ["11:00", "15:00", "19:00", "22:30"],
  },
  {
    id: 3,
    title: "Оппенгеймер 2",
    genre: "Драма",
    duration: "180 мин",
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    times: ["12:00", "16:00", "20:00"],
  },
  {
    id: 4,
    title: "Миссия невыполнима 9",
    genre: "Боевик",
    duration: "163 мин",
    rating: 7.8,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    times: ["10:30", "14:00", "17:30", "21:00"],
  },
  {
    id: 5,
    title: "Интерстеллар 2",
    genre: "Фантастика",
    duration: "185 мин",
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    times: ["11:30", "15:30", "19:30"],
  },
  {
    id: 6,
    title: "Джокер 3",
    genre: "Драма",
    duration: "138 мин",
    rating: 8.2,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    times: ["13:00", "17:00", "21:00"],
  },
];

const Cinema = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <PageLayout>
      <div className="px-4 pt-16 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Кинотеатр
          </h1>
          <p className="text-muted-foreground mt-1">
            Сегодня в кино
          </p>
        </motion.div>

        {/* Movie Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Favorite Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(movie.id)
                        ? "fill-destructive text-destructive"
                        : "text-foreground"
                    }`}
                  />
                </motion.button>

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs font-semibold text-foreground">{movie.rating}</span>
                </div>

                {/* Times on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-wrap gap-1">
                    {movie.times.slice(0, 3).map((time) => (
                      <span
                        key={time}
                        className="text-xs bg-primary-foreground/90 text-primary px-2 py-1 rounded-md font-medium"
                      >
                        {time}
                      </span>
                    ))}
                    {movie.times.length > 3 && (
                      <span className="text-xs text-primary-foreground">
                        +{movie.times.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="mt-2">
                <h3 className="font-display font-semibold text-foreground line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{movie.genre}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {movie.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Buy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-4"
        >
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Оплата баллами</p>
                <p className="font-display font-semibold text-foreground mt-1">
                  Используйте баллы для покупки билетов
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Cinema;
