import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronUp, Car, Store, Utensils, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const categories = [
  { id: "all", label: "Все", icon: Store },
  { id: "fashion", label: "Мода", icon: ShoppingBag },
  { id: "food", label: "Еда", icon: Utensils },
  { id: "beauty", label: "Красота", icon: Sparkles },
];

const stores = [
  { id: 1, name: "Zara", category: "fashion", floor: 2, section: "A" },
  { id: 2, name: "H&M", category: "fashion", floor: 2, section: "B" },
  { id: 3, name: "Nike", category: "fashion", floor: 1, section: "C" },
  { id: 4, name: "Starbucks", category: "food", floor: 1, section: "A" },
  { id: 5, name: "McDonald's", category: "food", floor: 3, section: "D" },
  { id: 6, name: "Sephora", category: "beauty", floor: 2, section: "C" },
  { id: 7, name: "L'Occitane", category: "beauty", floor: 2, section: "D" },
  { id: 8, name: "Apple Store", category: "fashion", floor: 1, section: "A" },
];

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout showMenu={false}>
      {/* Map Area */}
      <div className="relative h-[60vh] bg-muted overflow-hidden">
        {/* Placeholder for 3D map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-primary" />
            </div>
            <p className="text-muted-foreground font-medium">3D Карта ТРЦ</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Интерактивная навигация
            </p>
          </div>
        </div>

        {/* Floor Selector */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-card rounded-2xl shadow-lg border border-border p-2">
          {[3, 2, 1, "P"].map((floor) => (
            <button
              key={floor}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      {/* Parking FAB */}
      <motion.button
        className="fixed bottom-28 right-4 w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: isExpanded ? -200 : 0 }}
      >
        <Car className="w-6 h-6 text-accent-foreground" />
      </motion.button>

      {/* Bottom Sheet */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 bg-card rounded-t-3xl shadow-xl border-t border-border z-30"
        initial={{ y: "calc(100% - 140px)" }}
        animate={{ y: isExpanded ? 0 : "calc(100% - 140px)" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) setIsExpanded(true);
          if (info.offset.y > 50) setIsExpanded(false);
        }}
      >
        {/* Handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex justify-center"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </button>

        <div className="px-4 pb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Найти магазин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Store List */}
          <AnimatePresence mode="popLayout">
            <div className="mt-4 space-y-2 max-h-[40vh] overflow-y-auto">
              {filteredStores.map((store, index) => (
                <motion.button
                  key={store.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                      <Store className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{store.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Этаж {store.floor}, секция {store.section}
                      </p>
                    </div>
                  </div>
                  <MapPin className="w-5 h-5 text-accent" />
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Navigation;
