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
  { id: 1, title: "Avatar 3", genre: "Sci-Fi", duration: "192 min", rating: 8.5, ageRating: "12+", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", formats: ["2D", "3D", "IMAX"], synopsis: "Jake Sully and Neytiri must leave their home to explore uncharted regions of Pandora to protect their family from new threats.", director: "James Cameron", cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Kate Winslet"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Dune: Part Three", genre: "Sci-Fi", duration: "166 min", rating: 8.8, ageRating: "16+", poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop", formats: ["2D", "IMAX", "4DX"], synopsis: "Paul Atreides unites with Chani and the Fremen to avenge his family. He faces a choice between love and the fate of the universe.", director: "Denis Villeneuve", cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 3, title: "Oppenheimer 2", genre: "Drama", duration: "180 min", rating: 8.9, ageRating: "18+", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", formats: ["2D", "IMAX"], synopsis: "The continuing story of the atomic bomb creator. New discoveries and moral dilemmas in the Cold War era.", director: "Christopher Nolan", cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 4, title: "Mission Impossible 9", genre: "Action", duration: "163 min", rating: 7.8, ageRating: "12+", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", formats: ["2D", "3D", "4DX"], synopsis: "Ethan Hunt returns with a new impossible mission. A race against time to prevent a global catastrophe.", director: "Christopher McQuarrie", cast: ["Tom Cruise", "Hayley Atwell", "Vanessa Kirby"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 5, title: "Interstellar 2", genre: "Sci-Fi", duration: "185 min", rating: 9.0, ageRating: "12+", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop", formats: ["2D", "IMAX"], synopsis: "A new journey through space and time. Humanity once again seeks answers among the stars.", director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 6, title: "Joker 3", genre: "Drama", duration: "138 min", rating: 8.2, ageRating: "18+", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", formats: ["2D", "3D"], synopsis: "The third chapter of Arthur Fleck's story. Chaos in Gotham reaches its peak.", director: "Todd Phillips", cast: ["Joaquin Phoenix", "Lady Gaga", "Brendan Gleeson"], trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

const upcomingMovies: Movie[] = [
  { id: 101, title: "The Matrix 5", genre: "Sci-Fi", duration: "150 min", rating: 0, ageRating: "16+", poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop", formats: ["2D", "3D", "IMAX", "4DX"], premiereDate: "February 15, 2025", synopsis: "Return to the Matrix world. A new chosen one must uncover the truth about the simulation.", director: "Lana Wachowski", cast: ["Keanu Reeves", "Carrie-Anne Moss"] },
  { id: 102, title: "Gladiator 2", genre: "Drama", duration: "165 min", rating: 0, ageRating: "18+", poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop", formats: ["2D", "IMAX"], premiereDate: "March 1, 2025", synopsis: "The continuation of the legendary gladiator story. A new hero enters the Colosseum arena.", director: "Ridley Scott", cast: ["Paul Mescal", "Denzel Washington", "Pedro Pascal"] },
  { id: 103, title: "Lord of the Rings: New Era", genre: "Fantasy", duration: "180 min", rating: 0, ageRating: "12+", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop", formats: ["2D", "3D", "IMAX"], premiereDate: "March 20, 2025", synopsis: "A new chapter in Middle-earth history. Ancient evil awakens once more.", director: "Peter Jackson", cast: ["New cast"] },
  { id: 104, title: "The Dark Knight: Rebirth", genre: "Action", duration: "155 min", rating: 0, ageRating: "16+", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", formats: ["2D", "IMAX", "4DX"], premiereDate: "April 5, 2025", synopsis: "Gotham needs its protector again. A new Batman takes to the streets.", director: "Matt Reeves", cast: ["Robert Pattinson", "Zoë Kravitz"] },
];

const genres = ["All Genres", "Sci-Fi", "Drama", "Action", "Comedy", "Fantasy"];
const formats = ["All Formats", "2D", "3D", "IMAX", "4DX"];

const generateDates = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    result.push({ id: i, day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[date.getDay()], date: date.getDate(), month: date.toLocaleDateString("en-US", { month: "short" }) });
  }
  return result;
};

const generateSessions = (): Session[] => [
  { id: 1, time: "10:00", hall: "Hall 1", format: "2D", price: 350, seatsAvailable: 45 },
  { id: 2, time: "12:30", hall: "Hall 2", format: "3D", price: 450, seatsAvailable: 32 },
  { id: 3, time: "15:00", hall: "IMAX", format: "IMAX", price: 650, seatsAvailable: 18 },
  { id: 4, time: "17:30", hall: "Hall 1", format: "2D", price: 400, seatsAvailable: 52 },
  { id: 5, time: "20:00", hall: "4DX", format: "4DX", price: 750, seatsAvailable: 24 },
  { id: 6, time: "22:30", hall: "Hall 3", format: "2D", price: 350, seatsAvailable: 67 },
];

const Cinema = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [activeTab, setActiveTab] = useState("now");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  
  const dates = generateDates();
  const sessions = generateSessions();

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
  };

  const movies = activeTab === "now" ? currentMovies : upcomingMovies;
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "All Genres" || movie.genre === selectedGenre;
    const matchesFormat = selectedFormat === "All Formats" || movie.formats.includes(selectedFormat);
    return matchesGenre && matchesFormat;
  });

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        {selectedMovie ? (
          <MovieDetail movie={selectedMovie} sessions={sessions} onBack={() => setSelectedMovie(null)} isFavorite={favorites.includes(selectedMovie.id)} onToggleFavorite={(e) => toggleFavorite(selectedMovie.id, e)} showTrailer={showTrailer} setShowTrailer={setShowTrailer} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pt-16 pb-24 bg-background min-h-screen">
            <div className="mb-1">
              <h1 className="text-2xl font-bold text-foreground">Cinema</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{activeTab === "now" ? "Now Showing" : "Coming Soon"}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="now">Now Showing</TabsTrigger>
                <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
              </TabsList>
            </Tabs>

            {activeTab === "now" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((dateItem) => {
                    const isActive = selectedDate === dateItem.id;
                    return (
                      <button key={dateItem.id} onClick={() => setSelectedDate(dateItem.id)} className={`flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl transition-all border ${isActive ? "bg-foreground text-background border-foreground" : "bg-card text-muted-foreground border-border"}`}>
                        <span className={`text-xs font-medium ${isActive ? "opacity-70" : "opacity-60"}`}>{dateItem.day}</span>
                        <span className="text-lg font-bold mt-0.5">{dateItem.date}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "now" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="w-full h-10 px-3 bg-card border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary">
                    {genres.map((genre) => (<option key={genre} value={genre}>{genre}</option>))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
                <div className="relative flex-1">
                  <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} className="w-full h-10 px-3 bg-card border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary">
                    {formats.map((format) => (<option key={format} value={format}>{format}</option>))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
              </motion.div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              {filteredMovies.map((movie, index) => (
                <motion.div key={movie.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.05 }} className="group cursor-pointer" onClick={() => setSelectedMovie(movie)}>
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-muted">
                    <img src={movie.poster} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
                    <motion.button onClick={(e) => toggleFavorite(movie.id, e)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                      <Heart className={`w-4 h-4 transition-colors ${favorites.includes(movie.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                    </motion.button>
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
                  <div className="mt-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">{movie.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground"><span>{movie.genre}</span></div>
                    <div className="flex items-center gap-1 mt-0.5 text-sm text-muted-foreground"><Clock className="w-3.5 h-3.5" /><span>{movie.duration}</span></div>
                    <div className="flex flex-wrap gap-1 mt-1.5">{movie.formats.map((format) => (<span key={format} className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">{format}</span>))}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">No movies found</p>
                <button onClick={() => { setSelectedGenre("All Genres"); setSelectedFormat("All Formats"); }} className="mt-2 text-sm text-primary font-medium">Reset Filters</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

const MovieDetail = ({ movie, sessions, onBack, isFavorite, onToggleFavorite, showTrailer, setShowTrailer }: { movie: Movie; sessions: Session[]; onBack: () => void; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void; showTrailer: boolean; setShowTrailer: (show: boolean) => void }) => {
  return (
    <motion.div key="detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="pb-24 bg-background min-h-screen">
      <div className="relative h-80">
        <img src={movie.poster} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <button onClick={onBack} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <motion.button onClick={onToggleFavorite} className="absolute top-12 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10" whileTap={{ scale: 0.9 }}>
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
        </motion.button>
        {movie.trailer && (
          <button onClick={() => setShowTrailer(true)} className="absolute bottom-8 right-4 flex items-center gap-2 px-4 py-2 bg-primary rounded-full">
            <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Trailer</span>
          </button>
        )}
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">{movie.title}</h1>
          {movie.rating > 0 && (
            <div className="flex items-center gap-1 bg-card rounded-full px-3 py-1.5 border border-border">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-foreground">{movie.rating}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="px-2 py-1 bg-muted rounded text-sm text-muted-foreground">{movie.genre}</span>
          <span className="px-2 py-1 bg-muted rounded text-sm text-muted-foreground">{movie.duration}</span>
          <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-sm font-medium">{movie.ageRating}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {movie.formats.map((format) => (<span key={format} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium">{format}</span>))}
        </div>

        {movie.premiereDate && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-primary/10 rounded-xl">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Premiere: {movie.premiereDate}</span>
          </div>
        )}

        {movie.synopsis && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{movie.synopsis}</p>
          </div>
        )}

        {movie.director && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Cast & Crew</h2>
            <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">Director:</span> {movie.director}</p>
            {movie.cast && movie.cast.length > 0 && (<p className="text-sm text-muted-foreground mt-1"><span className="text-foreground font-medium">Starring:</span> {movie.cast.join(", ")}</p>)}
          </div>
        )}

        {!movie.premiereDate && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Showtimes</h2>
            <div className="space-y-2">
              {sessions.map((session) => (
                <motion.div key={session.id} whileTap={{ scale: 0.98 }} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">{session.time}</span>
                    <div><p className="text-sm font-medium text-foreground">{session.hall}</p><p className="text-xs text-muted-foreground">{session.format} • {session.seatsAvailable} seats</p></div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{session.price} ₽</p>
                    <button className="text-xs text-primary font-medium mt-0.5">Select</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe width="100%" height="100%" src={movie.trailer} title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Cinema;
