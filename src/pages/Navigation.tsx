import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Car, Store, Utensils, ShoppingBag, Sparkles, X, QrCode, CreditCard, Navigation as NavIcon, Clock, Info, ChevronRight, MapPinned, History, Plus, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "all", label: "All", icon: Store },
  { id: "fashion", label: "Fashion", icon: ShoppingBag },
  { id: "food", label: "Food", icon: Utensils },
  { id: "beauty", label: "Beauty", icon: Sparkles },
];

const stores = [
  { id: 1, name: "Zara", category: "fashion", floor: 2, section: "A", hours: "10:00-22:00", rating: 4.5, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop" },
  { id: 2, name: "H&M", category: "fashion", floor: 2, section: "B", hours: "10:00-22:00", rating: 4.3, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=80&h=80&fit=crop" },
  { id: 3, name: "Nike", category: "fashion", floor: 1, section: "C", hours: "10:00-22:00", rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
  { id: 4, name: "Starbucks", category: "food", floor: 1, section: "A", hours: "08:00-23:00", rating: 4.4, image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=80&h=80&fit=crop" },
  { id: 5, name: "McDonald's", category: "food", floor: 3, section: "D", hours: "09:00-23:00", rating: 4.0, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop" },
  { id: 6, name: "Sephora", category: "beauty", floor: 2, section: "C", hours: "10:00-22:00", rating: 4.6, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop" },
  { id: 7, name: "L'Occitane", category: "beauty", floor: 2, section: "D", hours: "10:00-21:00", rating: 4.5, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80&h=80&fit=crop" },
  { id: 8, name: "Apple Store", category: "fashion", floor: 1, section: "A", hours: "10:00-22:00", rating: 4.8, image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=80&h=80&fit=crop" },
];

const parkingQuickActions = [
  { id: "find", label: "Find Vehicle", icon: MapPinned },
  { id: "map", label: "Parking Map", icon: NavIcon },
  { id: "history", label: "History", icon: History },
];

interface Vehicle {
  id: number;
  number: string;
  isDefault: boolean;
}

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFloor, setActiveFloor] = useState(1);
  const [isParkingOpen, setIsParkingOpen] = useState(false);
  const [parkingTab, setParkingTab] = useState("status");
  const [carNumber, setCarNumber] = useState("");
  const [isCarLinked, setIsCarLinked] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(180);
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>([
    { id: 1, number: "A123BC77", isDefault: true },
  ]);
  const [newVehicleNumber, setNewVehicleNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const floors = [3, 2, 1, "P"];

  const addVehicle = () => {
    if (newVehicleNumber.trim()) {
      setSavedVehicles([...savedVehicles, { id: Date.now(), number: newVehicleNumber.toUpperCase(), isDefault: false }]);
      setNewVehicleNumber("");
    }
  };

  const setDefaultVehicle = (id: number) => {
    setSavedVehicles(savedVehicles.map(v => ({ ...v, isDefault: v.id === id })));
  };

  return (
    <PageLayout>
      {/* Map Area */}
      <div className="relative h-[calc(100vh-80px)] bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-muted/50 to-muted">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-card shadow-md flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold text-lg">3D Mall Map</p>
            <p className="text-sm text-muted-foreground mt-1">Interactive Navigation</p>
          </div>
        </div>

        {/* Floor Selector */}
        <motion.div 
          className="absolute right-4 bg-card rounded-2xl shadow-lg p-1.5 flex flex-col gap-1 z-20"
          animate={{ bottom: isExpanded ? "calc(100vh - 280px)" : `${bottomSheetHeight + 80}px` }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {floors.map((floor) => {
            const isActive = activeFloor === floor;
            return (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor as number)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${isActive ? "border-2 border-foreground text-foreground bg-card" : "text-muted-foreground hover:bg-muted"}`}
              >
                {floor}
              </button>
            );
          })}
        </motion.div>

        {/* Parking FAB */}
        <motion.button
          onClick={() => setIsParkingOpen(true)}
          className="absolute right-4 w-14 h-14 rounded-full bg-amber-400 shadow-lg flex items-center justify-center z-30"
          animate={{ bottom: isExpanded ? "calc(100vh - 180px)" : `${bottomSheetHeight + 20}px` }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Car className="w-6 h-6 text-foreground" />
          {isCarLinked && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 bg-card rounded-t-3xl shadow-xl z-20 border-t border-border"
        style={{ maxHeight: "calc(100vh - 180px)" }}
        initial={{ y: "calc(100% - 180px)" }}
        animate={{ y: isExpanded ? 0 : "calc(100% - 180px)" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) { setIsExpanded(true); setBottomSheetHeight(window.innerHeight - 260); }
          if (info.offset.y > 50) { setIsExpanded(false); setBottomSheetHeight(180); }
        }}
      >
        <button onClick={() => { setIsExpanded(!isExpanded); setBottomSheetHeight(isExpanded ? 180 : window.innerHeight - 260); }} className="w-full py-3 flex justify-center">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </button>

        <div className="px-4 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Find Store..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-10 bg-muted border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-5 h-5 text-muted-foreground" /></button>}
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all border ${isActive ? "bg-foreground text-background border-foreground" : "bg-card text-muted-foreground border-border hover:border-muted-foreground"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="popLayout">
            <div className="mt-4 space-y-0 max-h-[40vh] overflow-y-auto">
              {filteredStores.map((store, index) => (
                <motion.button key={store.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: index * 0.03 }} className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <img src={store.image} alt={store.name} className="w-14 h-14 rounded-xl object-cover bg-muted" />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{store.name}</p>
                      <p className="text-sm text-muted-foreground">Floor {store.floor}, Section {store.section}</p>
                      <p className="text-xs text-muted-foreground">{store.category.charAt(0).toUpperCase() + store.category.slice(1)} • {store.hours} • ⭐ {store.rating}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Parking Sheet with Tabs */}
      <Sheet open={isParkingOpen} onOpenChange={setIsParkingOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-8 h-[85vh]">
          <SheetHeader className="px-4 pb-4">
            <SheetTitle className="text-xl font-bold text-foreground">Parking</SheetTitle>
          </SheetHeader>

          <Tabs value={parkingTab} onValueChange={setParkingTab} className="flex-1">
            <TabsList className="w-full grid grid-cols-3 mx-4" style={{ width: 'calc(100% - 32px)' }}>
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {/* Status Tab */}
            <TabsContent value="status" className="px-4 mt-4">
              {!isCarLinked ? (
                <>
                  <div className="relative mb-4">
                    <input type="text" placeholder="Enter parking number (e.g., B2-145)" value={carNumber} onChange={(e) => setCarNumber(e.target.value.toUpperCase())} className="w-full h-14 px-4 pr-12 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted/80 rounded-lg transition-colors">
                      <QrCode className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  <button onClick={() => carNumber && setIsCarLinked(true)} disabled={!carNumber} className="w-full h-14 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Bind Vehicle</button>
                  <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground mb-2">Parking Tariffs</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• First 3 hours — free</li>
                          <li>• 4th hour: 100 ₽</li>
                          <li>• 5th hour+: 150 ₽/hour</li>
                          <li>• Daily max: 800 ₽</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-muted rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Space</span>
                      <span className="font-bold text-foreground text-lg">B2-145</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Time</span></div>
                        <p className="font-bold text-foreground text-xl">2 h 34 min</p>
                      </div>
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <div className="flex items-center gap-2 mb-1"><CreditCard className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">To Pay</span></div>
                        <p className="font-bold text-foreground text-xl">350 ₽</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-lg p-3 flex items-center gap-2">
                      <span className="text-green-600">⚡</span>
                      <span className="text-sm text-green-700 dark:text-green-400 font-medium">Free Time Left: 26 min</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {parkingQuickActions.map((action) => {
                      const Icon = action.icon;
                      return (<button key={action.id} className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-muted-foreground transition-colors h-24"><Icon className="w-6 h-6 text-muted-foreground" /><span className="text-xs font-medium text-foreground text-center">{action.label}</span></button>);
                    })}
                  </div>
                  <button onClick={() => setParkingTab("payment")} className="w-full h-14 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors">Pay for Parking</button>
                  <button onClick={() => { setIsCarLinked(false); setCarNumber(""); }} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground">Unlink Vehicle</button>
                </>
              )}
            </TabsContent>

            {/* My Vehicles Tab */}
            <TabsContent value="vehicles" className="px-4 mt-4">
              <div className="space-y-3 mb-6">
                {savedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{vehicle.number}</span>
                      {vehicle.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
                    </div>
                    {!vehicle.isDefault && (
                      <button onClick={() => setDefaultVehicle(vehicle.id)} className="text-sm text-muted-foreground hover:text-foreground">Set Default</button>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Add New Vehicle</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter plate number" value={newVehicleNumber} onChange={(e) => setNewVehicleNumber(e.target.value.toUpperCase())} className="flex-1 h-12 px-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
                  <button onClick={addVehicle} disabled={!newVehicleNumber.trim()} className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center disabled:opacity-50"><Plus className="w-5 h-5" /></button>
                </div>
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="px-4 mt-4">
              <div className="bg-muted rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Amount Due</p>
                <p className="text-3xl font-bold text-foreground">350 ₽</p>
                <p className="text-sm text-muted-foreground mt-2">Parking time: 2 h 34 min</p>
              </div>
              
              <p className="text-sm font-medium text-foreground mb-3">Payment Method</p>
              <div className="space-y-2 mb-6">
                {[
                  { id: "card", label: "Bank Card", sublabel: "**** 4242" },
                  { id: "apple", label: "Apple Pay", sublabel: "" },
                  { id: "google", label: "Google Pay", sublabel: "" },
                  { id: "points", label: "Loyalty Points", sublabel: "12,450 pts available" },
                ].map((method) => (
                  <button key={method.id} onClick={() => setSelectedPaymentMethod(method.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                    <div>
                      <p className="font-medium text-foreground">{method.label}</p>
                      {method.sublabel && <p className="text-sm text-muted-foreground">{method.sublabel}</p>}
                    </div>
                    {selectedPaymentMethod === method.id && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
              
              <button className="w-full h-14 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors">Pay 350 ₽</button>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </PageLayout>
  );
};

export default Navigation;
