import { motion } from "framer-motion";
import { 
  Newspaper, 
  Calendar, 
  Gift, 
  ChevronRight, 
  MapPin, 
  Car, 
  Utensils, 
  ShoppingBag,
  Percent,
  Clock,
  Star,
  Menu,
  Map
} from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/hero-mall.jpg";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Доброе утро";
  if (hour < 18) return "Добрый день";
  return "Добрый вечер";
};

const quickActions = [
  { id: 1, icon: ShoppingBag, label: "Магазины" },
  { id: 2, icon: Utensils, label: "Рестораны" },
  { id: 3, icon: Calendar, label: "События" },
  { id: 4, icon: Gift, label: "Акции" },
  { id: 5, icon: Car, label: "Парковка" },
  { id: 6, icon: MapPin, label: "Карта" },
];

const featuredStores = [
  { id: 1, name: "Zara", category: "Одежда", discount: "30% OFF", image: "Z" },
  { id: 2, name: "Nike", category: "Спорт", discount: "20% OFF", image: "N" },
  { id: 3, name: "Apple", category: "Электроника", discount: null, image: "A" },
  { id: 4, name: "H&M", category: "Одежда", discount: "50% OFF", image: "H" },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: "Новогодняя распродажа", 
    date: "До 15 января",
    time: "10:00 - 22:00",
    image: "🎄"
  },
  { 
    id: 2, 
    title: "Детский мастер-класс", 
    date: "28 декабря",
    time: "14:00",
    image: "🎨"
  },
  { 
    id: 3, 
    title: "Концерт живой музыки", 
    date: "31 декабря",
    time: "20:00",
    image: "🎵"
  },
];

const newsItems = [
  {
    id: 1,
    title: "Открытие нового фуд-корта",
    description: "15 новых ресторанов на 3 этаже",
    date: "Сегодня",
  },
  {
    id: 2,
    title: "Обновление программы лояльности",
    description: "Теперь ещё больше бонусов",
    date: "Вчера",
  },
  {
    id: 3,
    title: "Новые бренды в Tango Vision",
    description: "Встречайте премиальные марки",
    date: "2 дня назад",
  },
];

const Home = () => {
  const greeting = getGreeting();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <PageLayout showMenu={false}>
      {/* Header with Hero Image */}
      <div className="relative h-[40vh] min-h-[280px]">
        <motion.img
          src={heroImage}
          alt="Tango Vision Mall Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Gradient overlay - fades to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        
        {/* Top Bar - overlaid on image */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <motion.button
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Map className="w-5 h-5 text-white" />
          </motion.button>
          
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Greeting Block */}
      <div className="px-5 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            {greeting}
          </h1>
          <p className="text-muted-foreground font-medium mt-0.5">
            Tango Vision
          </p>
        </motion.div>
      </div>

      {/* Quick Actions - 6 items */}
      <div className="px-5 mt-6">
        <motion.div
          className="grid grid-cols-6 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                className="flex flex-col items-center gap-2 py-3"
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground font-medium text-center leading-tight">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Featured Stores */}
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Избранные магазины
            </h2>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {featuredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="min-w-[140px] bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-muted-foreground">{store.image}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{store.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{store.category}</p>
                {store.discount && (
                  <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {store.discount}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Ближайшие события
            </h2>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="min-w-[200px] bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <span className="text-xl">{event.image}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* News & Updates */}
      <div className="px-5 mt-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Новости и обновления
            </h2>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              See All
            </button>
          </div>

          <div className="space-y-3">
            {newsItems.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground text-sm">{news.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{news.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">{news.date}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Home;
