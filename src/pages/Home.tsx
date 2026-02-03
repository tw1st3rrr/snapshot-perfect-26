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
  User,
  ChevronDown,
  Tag,
  Newspaper
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/hero-mall.jpg";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

// Mall options
const malls = [
  { id: 1, name: "Tashir - Avenue SouthWest SM", address: "Moscow, Vernadsky Ave" },
  { id: 2, name: "Tashir - Galleria", address: "Moscow, Leninsky Prospect" },
  { id: 3, name: "Tashir - Europa City", address: "St. Petersburg, Nevsky Ave" },
];

// News/Features data (moved from stories)
const featuresNews = [
  { id: 1, title: "New Store Opening", subtitle: "Zara flagship store now open!", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop", date: "Today" },
  { id: 2, title: "Holiday Sale", subtitle: "Up to 50% off at selected stores", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop", date: "Dec 26" },
  { id: 3, title: "Extended Hours", subtitle: "Open until 23:00 on weekends", image: "https://images.unsplash.com/photo-1519567241046-7f570f0e8e52?w=800&h=400&fit=crop", date: "Dec 25" },
  { id: 4, title: "New Year Concert", subtitle: "Live music on December 31st", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop", date: "Dec 24" },
];

const quickActions = [
  { id: 1, icon: Store, label: "Stores", path: "/navigation", filter: "stores" },
  { id: 2, icon: Utensils, label: "Restaurants", path: "/navigation", filter: "food" },
  { id: 3, icon: Camera, label: "Scan", isMain: true, path: "/loyalty" },
  { id: 4, icon: Gift, label: "Rewards", path: "/loyalty" },
  { id: 5, icon: Car, label: "Parking", path: "/navigation", action: "parking" },
];

const trendingStores = [
  { id: 1, name: "Zara", category: "Fashion", discount: "30% OFF", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" },
  { id: 2, name: "Nike", category: "Sports", discount: "20% OFF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
  { id: 3, name: "Apple Store", category: "Electronics", discount: null, image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=300&h=200&fit=crop" },
  { id: 4, name: "H&M", category: "Fashion", discount: "50% OFF", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop" },
  { id: 5, name: "Sephora", category: "Beauty", discount: "25% OFF", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop" },
  { id: 6, name: "Starbucks", category: "Food & Drink", discount: null, image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop" },
];

const upcomingEvents = [
  { id: 1, title: "New Year Sale", date: "Until Jan 15", time: "10:00 - 22:00", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop" },
  { id: 2, title: "Kids Workshop", date: "Dec 28", time: "14:00", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop" },
  { id: 3, title: "Live Concert", date: "Dec 31", time: "20:00", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop" },
  { id: 4, title: "Fashion Show", date: "Jan 5", time: "18:00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
  { id: 5, title: "Art Exhibition", date: "Jan 10", time: "11:00", image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=300&h=200&fit=crop" },
];

type WhatsOnTab = "features" | "events" | "offers";

const Home = () => {
  const navigate = useNavigate();
  const [selectedMall, setSelectedMall] = useState(malls[0]);
  const [isMallSelectorOpen, setIsMallSelectorOpen] = useState(false);
  const [activeWhatsOnTab, setActiveWhatsOnTab] = useState<WhatsOnTab>("features");

  const handleQuickAction = (action: typeof quickActions[0]) => {
    navigate(action.path);
  };

  return (
    <PageLayout showMenu={false}>
      {/* Header with Hero Image */}
      <div className="relative h-[32vh] min-h-[200px]">
        <motion.img
          src={heroImage}
          alt="Mall Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        
        {/* Mall selector at top center */}
        <button 
          onClick={() => setIsMallSelectorOpen(true)}
          className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full border border-border z-10"
        >
          <span className="text-sm font-medium text-foreground truncate max-w-[180px]">{selectedMall.name}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>

        {/* Profile icon in top right */}
        <button 
          onClick={() => navigate("/profile")}
          className="absolute top-12 right-4 w-11 h-11 rounded-full bg-foreground flex items-center justify-center z-10"
        >
          <User className="w-5 h-5 text-background" />
        </button>
      </div>

      {/* Quick Actions - 5 items with centered Scan button */}
      <div className="px-5 -mt-8 relative z-10">
        <motion.div
          className="flex items-end justify-between gap-1 bg-card rounded-2xl p-3 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                <div className={`flex items-center justify-center rounded-2xl transition-all ${
                  isMain 
                    ? 'w-14 h-14 bg-foreground text-background shadow-md' 
                    : 'w-12 h-12 bg-muted'
                }`}>
                  <Icon className={`${isMain ? 'w-6 h-6' : 'w-5 h-5 text-muted-foreground'}`} />
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

      {/* What's On Section */}
      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="px-5 mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">
              What's On
            </h2>
            
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveWhatsOnTab("features")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeWhatsOnTab === "features" 
                    ? "bg-foreground text-background" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveWhatsOnTab("events")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeWhatsOnTab === "events" 
                    ? "bg-foreground text-background" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveWhatsOnTab("offers")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeWhatsOnTab === "offers" 
                    ? "bg-foreground text-background" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Offers
              </button>
            </div>
          </div>

          {/* Features Tab Content */}
          {activeWhatsOnTab === "features" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-5"
            >
              <div className="space-y-3">
                {featuresNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden border border-border"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Newspaper className="w-3.5 h-3.5 text-white/80" />
                          <span className="text-xs text-white/80">{news.date}</span>
                        </div>
                        <h3 className="font-semibold text-white">{news.title}</h3>
                        <p className="text-sm text-white/80">{news.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Events Tab Content */}
          {activeWhatsOnTab === "events" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between px-5 mb-3">
                <span className="text-sm text-muted-foreground">Upcoming Events</span>
                <button onClick={() => navigate("/events")} className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="min-w-[200px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm cursor-pointer hover:border-muted-foreground transition-colors"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
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
          )}

          {/* Offers Tab Content (Trending Now content) */}
          {activeWhatsOnTab === "offers" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between px-5 mb-3">
                <span className="text-sm text-muted-foreground">Special Offers</span>
                <button onClick={() => navigate("/stores")} className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/store/${store.id}`)}
                    className="min-w-[160px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm cursor-pointer hover:border-muted-foreground transition-colors"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                      {store.discount && (
                        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">{store.discount}</span>
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
          )}
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
    </PageLayout>
  );
};

export default Home;
