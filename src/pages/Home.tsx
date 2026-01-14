import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Store, 
  Utensils, 
  Camera,
  Gift, 
  Car,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/hero-mall.jpg";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Stories/Updates data
const stories = [
  { id: 1, title: "New Opening", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop", isNew: true },
  { id: 2, title: "Sale", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=100&h=100&fit=crop", isNew: true },
  { id: 3, title: "Extended Hours", image: "https://images.unsplash.com/photo-1519567241046-7f570f0e8e52?w=100&h=100&fit=crop", isNew: false },
  { id: 4, title: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop", isNew: true },
  { id: 5, title: "Rewards", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop", isNew: false },
];

const quickActions = [
  { id: 1, icon: Store, label: "Stores" },
  { id: 2, icon: Utensils, label: "Restaurants" },
  { id: 3, icon: Camera, label: "Scan Receipt", isMain: true },
  { id: 4, icon: Gift, label: "Rewards" },
  { id: 5, icon: Car, label: "Parking" },
];

const trendingStores = [
  { 
    id: 1, 
    name: "Zara", 
    category: "Fashion", 
    discount: "30% OFF", 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" 
  },
  { 
    id: 2, 
    name: "Nike", 
    category: "Sports", 
    discount: "20% OFF", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" 
  },
  { 
    id: 3, 
    name: "Apple Store", 
    category: "Electronics", 
    discount: null, 
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=300&h=200&fit=crop" 
  },
  { 
    id: 4, 
    name: "H&M", 
    category: "Fashion", 
    discount: "50% OFF", 
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop" 
  },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: "New Year Sale", 
    date: "Until Jan 15",
    time: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop"
  },
  { 
    id: 2, 
    title: "Kids Workshop", 
    date: "Dec 28",
    time: "14:00",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop"
  },
  { 
    id: 3, 
    title: "Live Concert", 
    date: "Dec 31",
    time: "20:00",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
  },
];

const Home = () => {
  const greeting = getGreeting();

  return (
    <PageLayout showMenu={true}>
      {/* Header with Hero Image */}
      <div className="relative h-[35vh] min-h-[240px]">
        <motion.img
          src={heroImage}
          alt="Tashir Avenue SouthWest SM Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Gradient overlay - fades to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        
        {/* Mall name centered on hero */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-xl font-bold text-white text-center px-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tashir - Avenue SouthWest SM
          </motion.h1>
        </div>
      </div>

      {/* Stories / Latest Updates */}
      <div className="px-5 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Latest Updates
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story) => (
              <motion.button
                key={story.id}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-16 h-16 rounded-full p-0.5 ${story.isNew ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-muted'}`}>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover border-2 border-background"
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium text-center w-16 truncate">
                  {story.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Greeting */}
      <div className="px-5 mt-5">
        <motion.p
          className="text-lg font-semibold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {greeting}
        </motion.p>
      </div>

      {/* Quick Actions - 5 items with centered Scan button */}
      <div className="px-5 mt-4">
        <motion.div
          className="flex items-end justify-between gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isMain = action.isMain;
            
            return (
              <motion.button
                key={action.id}
                className={`flex flex-col items-center gap-2 ${isMain ? 'relative -top-1' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`flex items-center justify-center rounded-2xl shadow-sm transition-all ${
                  isMain 
                    ? 'w-16 h-16 bg-foreground text-background shadow-md' 
                    : 'w-14 h-14 bg-card border border-border'
                }`}>
                  <Icon className={`${isMain ? 'w-7 h-7' : 'w-5 h-5 text-muted-foreground'}`} />
                </div>
                <span className={`text-xs font-medium text-center leading-tight ${
                  isMain ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Trending Now */}
      <div className="mt-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Trending Now
            </h2>
            <button className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              See All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {trendingStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="min-w-[160px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
              >
                <div className="relative h-24">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  {store.discount && (
                    <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-800 text-white">
                      {store.discount}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-display font-semibold text-foreground">{store.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{store.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Upcoming Events
            </h2>
            <button className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              See All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="min-w-[200px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
              >
                <div className="relative h-24">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                  <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{event.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom spacing */}
      <div className="h-6" />
    </PageLayout>
  );
};

export default Home;
