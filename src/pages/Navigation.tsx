import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Car, Store, Utensils, ShoppingBag, Sparkles, X, QrCode, CreditCard, Navigation as NavIcon, Clock, Info, ChevronRight, MapPinned, History, Plus, Check, ArrowLeft, Gift, Trash2, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  type: "Car" | "SUV" | "Truck" | "Motorcycle";
  isDefault: boolean;
  addedDate: string;
}

interface ParkingHistory {
  id: number;
  date: string;
  duration: string;
  space: string;
  amount: number;
}

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "mir" | "apple" | "google";
  lastFour?: string;
  expiry?: string;
  label: string;
}

const Navigation = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFloor, setActiveFloor] = useState(1);
  const [isParkingOpen, setIsParkingOpen] = useState(false);
  const [parkingTab, setParkingTab] = useState("status");
  const [licensePlate, setLicensePlate] = useState("");
  const [isVehicleBound, setIsVehicleBound] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(180);
  const [showBindSuccess, setShowBindSuccess] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [highlightedStoreId, setHighlightedStoreId] = useState<number | null>(null);
  
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>([
    { id: 1, number: "A123BC77", type: "Car", isDefault: true, addedDate: "Dec 15, 2024" },
  ]);
  const [newVehicleNumber, setNewVehicleNumber] = useState("");
  const [newVehicleType, setNewVehicleType] = useState<Vehicle["type"]>("Car");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [loyaltyPointsToUse, setLoyaltyPointsToUse] = useState(0);
  const [userLoyaltyPoints] = useState(12450);
  
  const [parkingHistory] = useState<ParkingHistory[]>([
    { id: 1, date: "Dec 18, 2024", duration: "3h 15min", space: "B2-120", amount: 250 },
    { id: 2, date: "Dec 15, 2024", duration: "1h 45min", space: "B1-055", amount: 0 },
    { id: 3, date: "Dec 10, 2024", duration: "4h 30min", space: "B2-089", amount: 400 },
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    { id: "card1", type: "visa", lastFour: "4242", expiry: "12/25", label: "Visa" },
    { id: "card2", type: "mastercard", lastFour: "8888", expiry: "06/26", label: "Mastercard" },
    { id: "apple", type: "apple", label: "Apple Pay" },
    { id: "google", type: "google", label: "Google Pay" },
  ]);

  // Handle navigation from store detail page
  useEffect(() => {
    if (location.state?.highlightedStore) {
      setHighlightedStoreId(location.state.highlightedStore);
      setActiveFloor(location.state.storeFloor || 1);
      // Clear the state after processing
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const parkingAmount = 350;
  const pointsNeeded = parkingAmount;
  const maxPointsToUse = Math.min(userLoyaltyPoints, pointsNeeded);
  const remainingAmount = parkingAmount - loyaltyPointsToUse;

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const floors = [3, 2, 1, "P"];

  const bindVehicle = () => {
    if (licensePlate.trim()) {
      const newVehicle: Vehicle = {
        id: Date.now(),
        number: licensePlate.toUpperCase(),
        type: "Car",
        isDefault: savedVehicles.length === 0,
        addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setSavedVehicles([...savedVehicles, newVehicle]);
      setIsVehicleBound(true);
      setShowBindSuccess(true);
      setTimeout(() => setShowBindSuccess(false), 4000);
    }
  };

  const addVehicle = () => {
    if (newVehicleNumber.trim()) {
      const newVehicle: Vehicle = {
        id: Date.now(),
        number: newVehicleNumber.toUpperCase(),
        type: newVehicleType,
        isDefault: false,
        addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setSavedVehicles([...savedVehicles, newVehicle]);
      setNewVehicleNumber("");
    }
  };

  const setDefaultVehicle = (id: number) => {
    setSavedVehicles(savedVehicles.map(v => ({ ...v, isDefault: v.id === id })));
  };

  const deleteVehicle = (id: number) => {
    setSavedVehicles(savedVehicles.filter(v => v.id !== id));
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
            {highlightedStoreId && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2"
              >
                <p className="text-primary font-medium">
                  Navigating to: {stores.find(s => s.id === highlightedStoreId)?.name}
                </p>
              </motion.div>
            )}
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
          {isVehicleBound && (
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
                <motion.button 
                  key={store.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ delay: index * 0.03 }} 
                  className={`w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${highlightedStoreId === store.id ? "bg-primary/10 border-primary/30" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={store.image} alt={store.name} className="w-14 h-14 rounded-xl object-cover bg-muted" />
                    <div className="text-left">
                      <p className={`font-semibold ${highlightedStoreId === store.id ? "text-primary" : "text-foreground"}`}>{store.name}</p>
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

      {/* Parking Management Sheet */}
      <Sheet open={isParkingOpen} onOpenChange={setIsParkingOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-8 h-[85vh] overflow-y-auto">
          <SheetHeader className="px-4 pb-4">
            <SheetTitle className="text-xl font-bold text-foreground">Parking Management</SheetTitle>
            {!isVehicleBound && (
              <p className="text-sm text-muted-foreground">Bind your vehicle to start</p>
            )}
          </SheetHeader>

          {/* Success Message */}
          <AnimatePresence>
            {showBindSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-4 mb-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">Vehicle bound successfully!</p>
                    <p className="text-sm text-green-600 dark:text-green-500">+200 Points added to your account</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isVehicleBound ? (
            /* State 1: No Vehicle Bound */
            <div className="px-4 space-y-4">
              {/* Bind Vehicle Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Car className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="relative mb-3">
                  <input 
                    type="text" 
                    placeholder="Enter your license plate" 
                    value={licensePlate} 
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())} 
                    className="w-full h-14 px-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base text-center font-semibold tracking-wider" 
                  />
                </div>
                
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Bind your first vehicle and get <span className="text-primary font-semibold">+200 Loyalty Points</span> as a bonus
                </p>
                
                <button 
                  onClick={bindVehicle} 
                  disabled={!licensePlate.trim()} 
                  className="w-full h-14 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bind Vehicle
                </button>
              </div>

              {/* Scan Parking Ticket */}
              <button 
                onClick={() => setShowScanModal(true)}
                className="w-full flex items-center justify-center gap-3 h-14 bg-card border border-border rounded-xl hover:border-muted-foreground transition-colors"
              >
                <QrCode className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Scan Parking Ticket</span>
              </button>

              {/* Parking Rules */}
              <Collapsible open={isRulesExpanded} onOpenChange={setIsRulesExpanded}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-foreground">Parking Rules & Pricing</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isRulesExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 border-t-0 rounded-b-xl px-4 pb-4 -mt-2">
                    <ul className="text-sm text-muted-foreground space-y-2 pt-2">
                      <li className="flex justify-between"><span>First 3 hours</span><span className="text-green-600 font-medium">Free</span></li>
                      <li className="flex justify-between"><span>4th hour</span><span className="font-medium text-foreground">100 ₽</span></li>
                      <li className="flex justify-between"><span>5th hour and beyond</span><span className="font-medium text-foreground">150 ₽/hour</span></li>
                      <li className="flex justify-between"><span>Daily maximum</span><span className="font-medium text-foreground">800 ₽</span></li>
                      <li className="flex justify-between text-red-600"><span>Overstay penalty</span><span className="font-medium">500 ₽/hour</span></li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Additional Options */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setParkingTab("vehicles")}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-muted-foreground transition-colors h-20"
                >
                  <Car className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">My Vehicles</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-muted-foreground transition-colors h-20"
                >
                  <Plus className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Add Vehicle</span>
                </button>
              </div>
            </div>
          ) : (
            /* State 2: Vehicle Bound and Active */
            <Tabs value={parkingTab} onValueChange={setParkingTab} className="flex-1">
              <TabsList className="w-full grid grid-cols-3 mx-4" style={{ width: 'calc(100% - 32px)' }}>
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Status Tab */}
              <TabsContent value="status" className="px-4 mt-4">
                {/* Active Parking Info */}
                <div className="bg-muted rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center relative">
                      <Car className="w-6 h-6 text-foreground" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-muted" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parking Space</p>
                      <p className="font-bold text-foreground text-xl">B2-145</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">Vehicle</p>
                      <p className="font-semibold text-foreground">{savedVehicles.find(v => v.isDefault)?.number}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Parking Time</span>
                      </div>
                      <p className="font-bold text-foreground text-xl">2h 34min</p>
                    </div>
                    <div className="bg-card rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">To Pay</span>
                      </div>
                      <p className="font-bold text-foreground text-xl">350 ₽</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-green-600">⚡</span>
                    <span className="text-sm text-green-700 dark:text-green-400 font-medium">Free Time Left: 26 min</span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    onClick={() => setParkingTab("vehicles")}
                    className="h-12 bg-card border border-border rounded-xl font-medium text-foreground flex items-center justify-center gap-2 hover:border-muted-foreground transition-colors"
                  >
                    <Car className="w-4 h-4" />
                    My Vehicles
                  </button>
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="h-12 bg-foreground text-background rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay for Parking
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {parkingQuickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button 
                        key={action.id} 
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-muted-foreground transition-colors h-24"
                      >
                        <Icon className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Unbind Button */}
                <button 
                  onClick={() => { setIsVehicleBound(false); setLicensePlate(""); }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Unbind Vehicle
                </button>
              </TabsContent>

              {/* My Vehicles Tab */}
              <TabsContent value="vehicles" className="px-4 mt-4">
                <div className="space-y-3 mb-6">
                  {savedVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{vehicle.number}</span>
                            {vehicle.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
                          </div>
                          <p className="text-sm text-muted-foreground">{vehicle.type} • Added {vehicle.addedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!vehicle.isDefault && (
                          <button 
                            onClick={() => setDefaultVehicle(vehicle.id)} 
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            Set Default
                          </button>
                        )}
                        <button 
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Vehicle */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground mb-3">Add New Vehicle</p>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Enter plate number" 
                      value={newVehicleNumber} 
                      onChange={(e) => setNewVehicleNumber(e.target.value.toUpperCase())} 
                      className="w-full h-12 px-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" 
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {(["Car", "SUV", "Truck", "Motorcycle"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewVehicleType(type)}
                          className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                            newVehicleType === type 
                              ? "bg-foreground text-background" 
                              : "bg-card border border-border text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={addVehicle} 
                      disabled={!newVehicleNumber.trim()} 
                      className="w-full h-12 bg-foreground text-background rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      Add Vehicle
                    </button>
                  </div>
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="px-4 mt-4">
                <div className="space-y-3">
                  {parkingHistory.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{entry.date}</p>
                          <p className="text-sm text-muted-foreground">Space {entry.space} • {entry.duration}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${entry.amount === 0 ? "text-green-600" : "text-foreground"}`}>
                        {entry.amount === 0 ? "Free" : `${entry.amount} ₽`}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>

      {/* Scan Ticket Modal */}
      <Dialog open={showScanModal} onOpenChange={setShowScanModal}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Scan Parking Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-xl flex flex-col items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">Point camera at QR code on your parking ticket</p>
            </div>
            <button 
              onClick={() => {
                setShowScanModal(false);
                setShowPaymentModal(true);
              }}
              className="w-full h-12 bg-foreground text-background font-semibold rounded-xl"
            >
              Simulate Scan
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="rounded-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pay for Parking</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Parking Summary */}
            <div className="bg-muted rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Space</p>
                  <p className="font-semibold text-foreground">B2-145</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">2h 34min</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount Due</span>
                  <span className="text-2xl font-bold text-foreground">{parkingAmount} ₽</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Payment Method</p>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button 
                    key={method.id} 
                    onClick={() => setSelectedPaymentMethod(method.id)} 
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedPaymentMethod === method.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">{method.label}</p>
                        {method.lastFour && (
                          <p className="text-sm text-muted-foreground">•••• {method.lastFour} • Exp {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    {selectedPaymentMethod === method.id && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-foreground">Use Loyalty Points</span>
                </div>
                <span className="text-sm text-muted-foreground">Available: {userLoyaltyPoints.toLocaleString()} pts</span>
              </div>
              
              <input
                type="range"
                min="0"
                max={maxPointsToUse}
                value={loyaltyPointsToUse}
                onChange={(e) => setLoyaltyPointsToUse(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-muted-foreground">Using: {loyaltyPointsToUse} pts</span>
                <span className="text-muted-foreground">Remaining: {userLoyaltyPoints - loyaltyPointsToUse} pts</span>
              </div>
              
              {loyaltyPointsToUse > 0 && (
                <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">New Amount</span>
                    <span className="font-semibold text-foreground">{remainingAmount} ₽</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full h-14 bg-foreground text-background font-semibold rounded-xl"
            >
              Pay {remainingAmount} ₽
            </button>
            
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Navigation;
