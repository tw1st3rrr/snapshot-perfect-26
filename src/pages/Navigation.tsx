import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronUp, Car, Store, Utensils, ShoppingBag, Sparkles, X, QrCode, CreditCard, Navigation as NavIcon, Clock, Info, ChevronRight } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const categories = [
  { id: "all", label: "Все", icon: Store },
  { id: "fashion", label: "Мода", icon: ShoppingBag },
  { id: "food", label: "Еда", icon: Utensils },
  { id: "beauty", label: "Красота", icon: Sparkles },
];

const stores = [
  { id: 1, name: "Zara", category: "fashion", floor: 2, section: "A", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop" },
  { id: 2, name: "H&M", category: "fashion", floor: 2, section: "B", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&h=80&fit=crop" },
  { id: 3, name: "Nike", category: "fashion", floor: 1, section: "C", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
  { id: 4, name: "Starbucks", category: "food", floor: 1, section: "A", image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=80&h=80&fit=crop" },
  { id: 5, name: "McDonald's", category: "food", floor: 3, section: "D", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop" },
  { id: 6, name: "Sephora", category: "beauty", floor: 2, section: "C", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop" },
  { id: 7, name: "L'Occitane", category: "beauty", floor: 2, section: "D", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80&h=80&fit=crop" },
  { id: 8, name: "Apple Store", category: "fashion", floor: 1, section: "A", image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&h=80&fit=crop" },
];

const parkingActions = [
  { id: "link", label: "Привязать авто", icon: Car },
  { id: "pay", label: "Оплатить", icon: CreditCard },
  { id: "find", label: "Найти машину", icon: NavIcon },
];

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFloor, setActiveFloor] = useState(1);
  const [isParkingOpen, setIsParkingOpen] = useState(false);
  const [carNumber, setCarNumber] = useState("");
  const [isCarLinked, setIsCarLinked] = useState(false);

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const floors = [3, 2, 1, "P"];

  return (
    <PageLayout showMenu={false}>
      {/* Map Area - 60-70% height */}
      <div className="relative h-[65vh] bg-gray-100 overflow-hidden">
        {/* 3D Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-800 font-semibold text-lg">3D Карта ТРЦ</p>
            <p className="text-sm text-gray-500 mt-1">
              Интерактивная навигация
            </p>
          </div>
        </div>

        {/* Floor Selector - Right side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-1.5 flex flex-col gap-1">
          {floors.map((floor) => {
            const isActive = activeFloor === floor;
            return (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor as number)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                  isActive
                    ? "border-2 border-gray-800 text-gray-900 bg-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {floor}
              </button>
            );
          })}
        </div>

        {/* Parking FAB */}
        <motion.button
          onClick={() => setIsParkingOpen(true)}
          className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-amber-400 shadow-lg flex items-center justify-center z-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Car className="w-6 h-6 text-gray-900" />
          {isCarLinked && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30"
        style={{ maxHeight: "calc(100vh - 180px)" }}
        initial={{ y: "calc(100% - 180px)" }}
        animate={{ y: isExpanded ? 0 : "calc(100% - 180px)" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) setIsExpanded(true);
          if (info.offset.y > 50) setIsExpanded(false);
        }}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex justify-center"
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </button>

        <div className="px-4 pb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Найти магазин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-10 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Store List */}
          <AnimatePresence mode="popLayout">
            <div className="mt-4 space-y-0 max-h-[40vh] overflow-y-auto">
              {filteredStores.map((store, index) => (
                <motion.button
                  key={store.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-12 h-12 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{store.name}</p>
                      <p className="text-sm text-gray-500">
                        Этаж {store.floor}, секция {store.section}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Parking Sheet */}
      <Sheet open={isParkingOpen} onOpenChange={setIsParkingOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-xl font-bold text-gray-900">
              Управление парковкой
            </SheetTitle>
          </SheetHeader>

          {!isCarLinked ? (
            <>
              {/* Car Number Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Введите номер машины или билета"
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                  className="w-full h-14 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-base"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <QrCode className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {parkingActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.id === "link" && carNumber) {
                          setIsCarLinked(true);
                        }
                      }}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors h-24"
                    >
                      <Icon className="w-6 h-6 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tariff Info */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Тарифы и правила парковки</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Первые 3 часа — бесплатно</li>
                      <li>• 4-й час: 100 ₽</li>
                      <li>• 5-й час и далее: 150 ₽/час</li>
                      <li>• Суточный максимум: 800 ₽</li>
                      <li>• Оплата в приложении без комиссии</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Parking Status */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Место</span>
                  <span className="font-bold text-gray-900 text-lg">B2-145</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Время</span>
                    </div>
                    <p className="font-bold text-gray-900 text-xl">2 ч 34 мин</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">К оплате</span>
                    </div>
                    <p className="font-bold text-gray-900 text-xl">350 ₽</p>
                  </div>
                </div>
                <div className="mt-3 bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2">
                  <span className="text-green-600">⚡</span>
                  <span className="text-sm text-green-700 font-medium">Бесплатно осталось: 26 мин</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {parkingActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors h-24"
                    >
                      <Icon className="w-6 h-6 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pay Button */}
              <button className="w-full h-14 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                Оплатить парковку
              </button>

              {/* Unlink */}
              <button
                onClick={() => {
                  setIsCarLinked(false);
                  setCarNumber("");
                }}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700"
              >
                Отвязать автомобиль
              </button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageLayout>
  );
};

export default Navigation;
