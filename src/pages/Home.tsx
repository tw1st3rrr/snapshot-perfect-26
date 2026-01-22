import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Search, 
  Gift, 
  Car,
  X,
  User,
  Star,
  CalendarDays,
  Tag,
  Check,
  HelpCircle,
  Newspaper,
  Sparkles
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
  if (hour < 12) return "GOOD MORNING";
  if (hour < 18) return "GOOD AFTERNOON";
  return "GOOD EVENING";
};

const getPeakStatus = () => {
  const hour = new Date().getHours();
  if (hour >= 11 && hour <= 14) return { isPeak: true, text: "IT'S PEAK TIME NOW" };
  if (hour >= 17 && hour <= 20) return { isPeak: true, text: "IT'S PEAK TIME NOW" };
  return { isPeak: false, text: "IT'S OFF PEAK TIME NOW" };
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
  { id: 1, icon: Car, label: "Find a carpark", path: "/navigation", action: "parking" },
  { id: 2, icon: Search, label: "Search for a brand", path: "/navigation", filter: "stores" },
  { id: 3, icon: Gift, label: "Gift cards", path: "/loyalty" },
];

// Featured content for "What's On" section
const featuredContent = [
  { 
    id: 1, 
    type: "news",
    category: "Premium Guest Services",
    title: "Premium Guest Services", 
    description: "From seamless Valet Parking to curated Personal Stylist sessions, make every moment memorable with...",
    date: "14 JAN",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop"
  },
];

const mustDoContent = [
  { 
    id: 1, 
    type: "news",
    subtitle: "Moncler | Year of the...",
    title: "The New Year collection", 
    date: "22 JAN",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop"
  },
  { 
    id: 2, 
    type: "news",
    subtitle: "Your Future Wellness...",
    title: "KĀYA Wellness", 
    date: "22 JAN",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop"
  },
  { 
    id: 3, 
    type: "news",
    subtitle: "Sanctuary Premium...",
    title: "Five Senses", 
    date: "22 JAN",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&h=400&fit=crop"
  },
];

const eventsContent = [
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
    date: "Jan 28",
    time: "14:00",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop"
  },
  { 
    id: 3, 
    title: "Live Concert", 
    date: "Jan 31",
    time: "20:00",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
  },
];

const offersContent = [
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
    name: "H&M", 
    category: "Fashion", 
    discount: "50% OFF", 
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop" 
  },
];

type WhatsOnTab = "featured" | "events" | "offers";

const Home = () => {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const peakStatus = getPeakStatus();
  const [selectedMall, setSelectedMall] = useState(malls[0]);
  const [isMallSelectorOpen, setIsMallSelectorOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<WhatsOnTab>("featured");

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
    <PageLayout showMenu={false}>
      {/* Header with Hero Image */}
      <div className="relative h-[38vh] min-h-[280px]">
        <motion.img
          src={heroImage}
          alt="Mall Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Light gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        
        {/* Profile icon in top left - black circle */}
        <button 
          onClick={() => navigate("/profile")}
          className="absolute top-12 left-4 w-11 h-11 rounded-full bg-foreground flex items-center justify-center z-10"
        >
          <User className="w-5 h-5 text-background" />
        </button>

        {/* Help icon in top right - black circle */}
        <button 
          onClick={() => {}}
          className="absolute top-12 right-4 w-11 h-11 rounded-full bg-foreground flex items-center justify-center z-10"
        >
          <HelpCircle className="w-5 h-5 text-background" />
        </button>
      </div>

      {/* Greeting section - centered */}
      <div className="px-5 -mt-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground tracking-wide">
            {greeting}
          </h1>
          
          {/* Peak status indicator */}
          <button 
            onClick={() => setIsMallSelectorOpen(true)}
            className="flex items-center justify-center gap-2 mt-2 mx-auto"
          >
            <div className={`w-3 h-3 rounded-full border-2 ${peakStatus.isPeak ? 'border-destructive bg-destructive/20' : 'border-muted-foreground bg-transparent'}`} />
            <span className="text-sm text-muted-foreground font-medium tracking-wide">
              {peakStatus.text}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </motion.div>
      </div>

      {/* Quick Actions - 3 outlined cards */}
      <div className="px-5 mt-6">
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:border-muted-foreground transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="w-6 h-6 text-foreground" />
                <span className="text-xs font-medium text-foreground text-center leading-tight">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* What's On section */}
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="px-5 mb-4">
            <h2 className="font-display text-xl font-bold text-foreground tracking-wide">
              WHAT'S ON
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-5 mb-5">
            <button
              onClick={() => setActiveTab("featured")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "featured"
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Star className="w-4 h-4" />
              FEATURED
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "events"
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              EVENTS
            </button>
            <button
              onClick={() => setActiveTab("offers")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "offers"
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Tag className="w-4 h-4" />
              OFFERS
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "featured" && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Must Do subsection */}
                <div className="px-5 mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-foreground" />
                    <h3 className="font-display text-base font-bold text-foreground">MUST DO</h3>
                  </div>
                </div>

                {/* Featured main card */}
                <div className="px-5 mb-6">
                  {featuredContent.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-card rounded-2xl overflow-hidden border border-border cursor-pointer"
                      onClick={() => navigate(`/event/${item.id}`)}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                          <Newspaper className="w-3.5 h-3.5" />
                          NEWS
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <h4 className="font-display text-lg font-bold text-foreground mt-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-3 font-medium">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New subsection */}
                <div className="px-5 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-foreground" />
                    <h3 className="font-display text-base font-bold text-foreground">NEW</h3>
                  </div>
                </div>

                {/* New items grid - horizontal scroll */}
                <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
                  {mustDoContent.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onClick={() => navigate(`/event/${item.id}`)}
                      className="min-w-[180px] cursor-pointer"
                    >
                      <div className="relative h-56 rounded-2xl overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                          <Newspaper className="w-3.5 h-3.5" />
                          NEWS
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                        <h4 className="font-display font-bold text-foreground mt-0.5">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
                  {eventsContent.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="min-w-[200px] bg-card rounded-2xl overflow-hidden border border-border cursor-pointer hover:border-muted-foreground transition-colors"
                    >
                      <div className="relative h-28 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="px-5 mt-2">
                  <button 
                    onClick={() => navigate("/events")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    See all events
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "offers" && (
              <motion.div
                key="offers"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
                  {offersContent.map((store, index) => (
                    <motion.div
                      key={store.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      onClick={() => navigate(`/store/${store.id}`)}
                      className="min-w-[160px] bg-card rounded-2xl overflow-hidden border border-border cursor-pointer hover:border-muted-foreground transition-colors"
                    >
                      <div className="relative h-24 overflow-hidden">
                        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                        {store.discount && (
                          <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">
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
                
                <div className="px-5 mt-2">
                  <button 
                    onClick={() => navigate("/stores")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    See all offers
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />

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
