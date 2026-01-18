import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Trophy, 
  ChevronRight, 
  Heart, 
  CreditCard, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Plus, 
  Edit2, 
  MapPin,
  Store,
  Star,
  X,
  Check,
  Trash2,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

interface PaymentMethod {
  id: number;
  type: "visa" | "mastercard" | "mir";
  lastFour: string;
  expiry: string;
  isDefault: boolean;
}

interface FavoriteShop {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: number;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  category: string;
}

const brands: Brand[] = [
  { id: 1, name: "Zara", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop", category: "Fashion" },
  { id: 2, name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", category: "Sports" },
  { id: 3, name: "Apple", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=100&h=100&fit=crop", category: "Electronics" },
  { id: 4, name: "H&M", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&h=100&fit=crop", category: "Fashion" },
  { id: 5, name: "Sephora", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop", category: "Beauty" },
  { id: 6, name: "Starbucks", logo: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=100&h=100&fit=crop", category: "Food & Drink" },
  { id: 7, name: "Adidas", logo: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=100&h=100&fit=crop", category: "Sports" },
  { id: 8, name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop", category: "Electronics" },
];

const initialPaymentMethods: PaymentMethod[] = [
  { id: 1, type: "visa", lastFour: "4242", expiry: "12/25", isDefault: true },
  { id: 2, type: "mastercard", lastFour: "8888", expiry: "06/26", isDefault: false },
];

const initialFavoriteShops: FavoriteShop[] = [
  { id: 1, name: "Zara", category: "Fashion", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop", rating: 4.5 },
  { id: 2, name: "Nike", category: "Sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop", rating: 4.7 },
  { id: 3, name: "Starbucks", category: "Food & Drink", image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=150&h=150&fit=crop", rating: 4.4 },
];

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditBrands, setShowEditBrands] = useState(false);
  const [showAllShops, setShowAllShops] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  
  const [selectedBrands, setSelectedBrands] = useState<number[]>([1, 2, 5]);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [favoriteShops, setFavoriteShops] = useState(initialFavoriteShops);
  
  const [notifications, setNotifications] = useState({
    promotions: true,
    events: true,
    loyalty: true,
    parking: false,
    cinema: true,
  });

  // User data
  const user = {
    name: "Alexander Petrov",
    email: "alexander@email.com",
    phone: "+7 999 123 45 67",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    tier: "Gold",
    points: 12450,
    cashback: 10,
    progressToNext: 75,
  };

  const toggleBrand = (brandId: number) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId) 
        : [...prev, brandId]
    );
  };

  const setDefaultPayment = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
  };

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
  };

  const removeFavoriteShop = (id: number) => {
    setFavoriteShops(prev => prev.filter(shop => shop.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <PageLayout>
        <div className="px-4 pt-16 pb-24 bg-background min-h-screen">
          <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Welcome to Tashir</h2>
            <p className="text-muted-foreground mt-2 mb-6">Sign in to access your profile and earn rewards</p>
            
            <button 
              onClick={() => setShowLoginModal(true)}
              className="w-full h-12 bg-foreground text-background font-semibold rounded-xl mb-3"
            >
              Sign In
            </button>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="w-full h-12 bg-card border border-border text-foreground font-semibold rounded-xl"
            >
              Create Account
            </button>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground"
            >
              Continue as Guest
            </button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showMenu={false}>
      <div className="px-4 pt-16 pb-24 bg-background min-h-screen">
        <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

        {/* User Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-amber-400/20 rounded-full px-2.5 py-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-600">{user.tier}</span>
                </div>
                <span className="text-xs text-muted-foreground">{user.cashback}% Cashback</span>
              </div>
            </div>
            <button 
              onClick={() => setShowEditProfile(true)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Favorite Brands */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Your Favorite Brands</h2>
              <p className="text-sm text-muted-foreground">Personalize your experience</p>
            </div>
            <button 
              onClick={() => setShowEditBrands(true)}
              className="text-sm text-primary font-medium"
            >
              Edit
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {brands.filter(b => selectedBrands.includes(b.id)).map((brand) => (
              <button 
                key={brand.id} 
                onClick={() => navigate(`/store/${brand.id}`)}
                className="flex-shrink-0 w-20 text-center"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-16 h-16 rounded-xl object-cover mx-auto border border-border hover:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1.5 truncate">{brand.name}</p>
              </button>
            ))}
          </div>
          {selectedBrands.length > 0 && (
            <p className="text-xs text-green-600 mt-2">✓ You've earned +50 Points for selecting favorite brands</p>
          )}
        </motion.div>

        {/* Loyalty Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <div className="bg-foreground rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm">Your Balance</p>
                <p className="text-2xl font-bold text-background">{user.points.toLocaleString()} Points</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-400/20 rounded-full px-3 py-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400">{user.tier}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted">To Platinum</span>
                <span className="text-background font-medium">{user.progressToNext}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${user.progressToNext}%` }} />
              </div>
            </div>
            <button 
              onClick={() => navigate("/loyalty")}
              className="w-full mt-4 h-10 bg-background/10 text-background font-medium rounded-xl flex items-center justify-center gap-2"
            >
              View Full Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Favorite Shops */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Favorite Shops</h2>
            <button 
              onClick={() => setShowAllShops(true)}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {favoriteShops.map((shop) => (
              <button 
                key={shop.id} 
                onClick={() => navigate(`/store/${shop.id}`)}
                className="flex-shrink-0 w-28 bg-card rounded-xl border border-border overflow-hidden hover:border-primary transition-colors text-left"
              >
                <img src={shop.image} alt={shop.name} className="w-full h-20 object-cover" />
                <div className="p-2">
                  <p className="font-medium text-foreground text-sm truncate">{shop.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-muted-foreground">{shop.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Payment Methods</h2>
            <button 
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-1 text-sm text-primary font-medium"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.lastFour}
                    </p>
                    <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault ? (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                  ) : (
                    <button 
                      onClick={() => setDefaultPayment(method.id)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={() => deletePaymentMethod(method.id)}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">Notification Preferences</h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {[
              { key: "promotions", label: "Promotions & Offers", icon: Bell },
              { key: "events", label: "Event Announcements", icon: Bell },
              { key: "loyalty", label: "Loyalty Updates", icon: Star },
              { key: "parking", label: "Parking Reminders", icon: MapPin },
              { key: "cinema", label: "Cinema Reminders", icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <Switch 
                    checked={notifications[item.key as keyof typeof notifications]} 
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">Settings</h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {[
              { label: "Account Security", icon: Shield, action: () => {} },
              { label: "Language", icon: Globe, value: "English", action: () => {} },
              { label: "Help & Support", icon: HelpCircle, action: () => {} },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button key={idx} onClick={item.action} className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsLoggedIn(false)}
          className="w-full mt-6 h-12 bg-destructive/10 text-destructive font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>

        <div className="h-6" />
      </div>

      {/* Edit Brands Sheet */}
      <Sheet open={showEditBrands} onOpenChange={setShowEditBrands}>
        <SheetContent side="bottom" className="rounded-t-3xl h-[80vh]">
          <SheetHeader className="pb-4">
            <SheetTitle>Edit Favorite Brands</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-6">
            {brands.map((brand) => {
              const isSelected = selectedBrands.includes(brand.id);
              return (
                <button 
                  key={brand.id} 
                  onClick={() => toggleBrand(brand.id)}
                  className={`relative p-3 rounded-xl border transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-lg object-cover mx-auto" />
                  <p className="text-sm font-medium text-foreground mt-2 text-center truncate">{brand.name}</p>
                  <p className="text-xs text-muted-foreground text-center">{brand.category}</p>
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setShowEditBrands(false)}
            className="w-full h-12 bg-foreground text-background font-semibold rounded-xl"
          >
            Save Changes
          </button>
        </SheetContent>
      </Sheet>

      {/* All Shops Sheet */}
      <Sheet open={showAllShops} onOpenChange={setShowAllShops}>
        <SheetContent side="bottom" className="rounded-t-3xl h-[80vh]">
          <SheetHeader className="pb-4">
            <SheetTitle>Favorite Shops</SheetTitle>
          </SheetHeader>
          <div className="space-y-3 overflow-y-auto pb-6">
            {favoriteShops.map((shop) => (
              <div key={shop.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={shop.image} alt={shop.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <p className="font-medium text-foreground">{shop.name}</p>
                    <p className="text-sm text-muted-foreground">{shop.category}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-muted-foreground">{shop.rating}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFavoriteShop(shop.id)}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-2 border-border" />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <input type="text" defaultValue={user.name} className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <input type="email" defaultValue={user.email} className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone</label>
              <input type="tel" defaultValue={user.phone} className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
            </div>
            <button onClick={() => setShowEditProfile(false)} className="w-full h-12 bg-foreground text-background font-semibold rounded-xl">
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Payment Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Cardholder Name</label>
              <input type="text" placeholder="John Doe" className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">CVV</label>
                <input type="text" placeholder="123" className="w-full h-11 px-3 bg-muted border border-border rounded-xl text-foreground mt-1" />
              </div>
            </div>
            <button onClick={() => setShowAddCard(false)} className="w-full h-12 bg-foreground text-background font-semibold rounded-xl">
              Add Card
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Profile;
