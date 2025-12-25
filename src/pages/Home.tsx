import { motion } from "framer-motion";
import { Newspaper, Calendar, Gift, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import QuickActionCard from "@/components/QuickActionCard";
import heroImage from "@/assets/hero-mall.jpg";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Доброе утро";
  if (hour < 18) return "Добрый день";
  return "Добрый вечер";
};

const featuredEvents = [
  {
    id: 1,
    title: "Новогодняя распродажа",
    date: "До 15 января",
    category: "Shop",
  },
  {
    id: 2,
    title: "Детский мастер-класс",
    date: "28 декабря, 14:00",
    category: "Entertain",
  },
];

const Home = () => {
  const greeting = getGreeting();

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Tango Vision Mall Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Logo & Greeting */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              {greeting}
            </h1>
            <p className="text-muted-foreground font-medium">
              Добро пожаловать в Tango Vision
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-2">
        <motion.div
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <QuickActionCard
            icon={Newspaper}
            label="Новости"
            variant="default"
          />
          <QuickActionCard
            icon={Calendar}
            label="Мероприятия"
            variant="default"
          />
          <QuickActionCard
            icon={Gift}
            label="Подарочные карты"
            variant="gold"
          />
        </motion.div>
      </div>

      {/* Featured Events Section */}
      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Ближайшие события
            </h2>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Все
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-accent bg-accent/20 px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                    <h3 className="font-display font-semibold text-foreground mt-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.date}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Loyalty Teaser */}
      <motion.div
        className="mx-4 mt-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="bg-gradient-premium rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <span className="text-xs font-medium text-accent">Программа лояльности</span>
            <h3 className="font-display text-xl font-bold text-primary-foreground mt-1">
              Копите баллы и получайте привилегии
            </h3>
            <p className="text-sm text-primary-foreground/70 mt-2">
              Сканируйте чеки и получайте до 10% кешбэка
            </p>
            <button className="mt-4 bg-accent text-accent-foreground font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Подробнее
            </button>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Home;
