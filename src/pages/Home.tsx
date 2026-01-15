import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Store, 
  Utensils, 
  Camera,
  Gift, 
  Car,
  Calendar,
  Clock,
  ChevronDown,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/hero-mall.jpg";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Mall options
const malls = [
  { id: 1, name: "Tashir - Avenue SouthWest SM", address: "Moscow, Vernadsky Ave" },
  { id: 2, name: "Tashir - Galleria", address: "Moscow, Leninsky Prospect" },
  { id: 3, name: "Tashir - Europa City", address: "St. Petersburg, Nevsky Ave" },
];

// Stories/Updates data - single consolidated story
const latestStory = {
  id: 1,
  title: "Latest Updates",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
  isNew: true,
  slides: [
    { id: 1, title: "New Store Opening", subtitle: "Zara flagship store now open!", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop", duration: 5000 },
    { id: 2, title: "Holiday Sale", subtitle: "Up to 50% off at selected stores", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=1200&fit=crop", duration: 5000 },
    { id: 3, title: "Extended Hours", subtitle: "Open until 23:00 on weekends", image: "https://images.unsplash.com/photo-1519567241046-7f570f0e8e52?w=800&h=1200&fit=crop", duration: 5000 },
    { id: 4, title: "New Year Concert", subtitle: "Live music on December 31st", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop", duration: 5000 },
  ],
};

const quickActions = [
  { id: 1, icon: Store, label: "Stores", path: "/navigation", filter: "stores" },
  { id: 2, icon: Utensils, label: "Restaurants", path: "/navigation", filter: "food" },
  { id: 3, icon: Camera, label: "Scan", isMain: true, path: "/loyalty" },
  { id: 4, icon: Gift, label: "Rewards", path: "/loyalty" },
  { id: 5, icon: Car, label: "Parking", path: "/navigation", action: "parking" },
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
  { 
    id: 5, 
    name: "Sephora", 
    category: "Beauty", 
    discount: "25% OFF", 
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop" 
  },
  { 
    id: 6, 
    name: "Starbucks", 
    category: "Food & Drink", 
    discount: null, 
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop" 
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
  { 
    id: 4, 
    title: "Fashion Show", 
    date: "Jan 5",
    time: "18:00",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
  },
  { 
    id: 5, 
    title: "Art Exhibition", 
    date: "Jan 10",
    time: "11:00",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=300&h=200&fit=crop"
  },
];

const Home = () => {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const [selectedMall, setSelectedMall] = useState(malls[0]);
  const [isMallSelectorOpen, setIsMallSelectorOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleQuickAction = (action: typeof quickActions[0]) => {
    navigate(action.path);
  };

  const openStory = () => {
    setCurrentSlide(0);
    setIsStoryOpen(true);
  };

  const nextSlide = () => {
    if (currentSlide < latestStory.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setIsStoryOpen(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <PageLayout showMenu={true}>
      {/* Header with Hero Image */}
      <div className="relative h-[35vh] min-h-[240px]">
        <motion.img
          src={heroImage}
          alt="Mall Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Gradient overlay - fades to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        
        {/* Mall name centered on hero - clickable */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button 
            onClick={() => setIsMallSelectorOpen(true)}
            className="flex items-center gap-2 text-xl font-bold text-white text-center px-6 drop-shadow-lg hover:opacity-90 transition-opacity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selectedMall.name}
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Stories / Latest Updates - Single large circle */}
      <div className="px-5 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Latest Updates
          </h2>
          <motion.button
            onClick={openStory}
            className="flex flex-col items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-20 h-20 rounded-full p-0.5 ${latestStory.isNew ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-muted'} relative`}>
              <img
                src={latestStory.image}
                alt={latestStory.title}
                className="w-full h-full rounded-full object-cover border-2 border-background"
              />
              {latestStory.isNew && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium text-center">
              {latestStory.title}
            </span>
          </motion.button>
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
                onClick={() => handleQuickAction(action)}
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
                <div className="relative h-24 overflow-hidden">
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
                <div className="relative h-24 overflow-hidden">
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

      {/* Mall Selector Modal */}
      <Dialog open={isMallSelectorOpen} onOpenChange={setIsMallSelectorOpen}>
        <DialogContent className="rounded-2xl">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Shopping Center</h2>
            <div className="space-y-2">
              {malls.map((mall) => (
                <button
                  key={mall.id}
                  onClick={() => {
                    setSelectedMall(mall);
                    setIsMallSelectorOpen(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedMall.id === mall.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <p className="font-medium text-foreground">{mall.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{mall.address}</p>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Story Viewer */}
      <AnimatePresence>
        {isStoryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Progress bars */}
            <div className="absolute top-12 left-4 right-4 flex gap-1 z-10">
              {latestStory.slides.map((_, idx) => (
                <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: idx < currentSlide ? "100%" : "0%" }}
                    animate={{ 
                      width: idx < currentSlide ? "100%" : idx === currentSlide ? "100%" : "0%" 
                    }}
                    transition={{ 
                      duration: idx === currentSlide ? latestStory.slides[idx].duration / 1000 : 0,
                      ease: "linear"
                    }}
                    onAnimationComplete={() => {
                      if (idx === currentSlide) {
                        nextSlide();
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsStoryOpen(false)}
              className="absolute top-16 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Story content */}
            <div className="flex-1 relative">
              <img
                src={latestStory.slides[currentSlide].image}
                alt={latestStory.slides[currentSlide].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              
              {/* Navigation zones */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-0 bottom-0 w-1/3"
              />
              <button
                onClick={nextSlide}
                className="absolute right-0 top-0 bottom-0 w-2/3"
              />

              {/* Text content */}
              <div className="absolute bottom-24 left-6 right-6">
                <motion.h3
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white"
                >
                  {latestStory.slides[currentSlide].title}
                </motion.h3>
                <motion.p
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 mt-2"
                >
                  {latestStory.slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Home;
