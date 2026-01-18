import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Star, Phone, Globe, Heart, Navigation as NavIcon, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";

const storesData = [
  { id: 1, name: "Zara", category: "Women's Clothing", floor: 2, section: "A", hours: "10:00-22:00", rating: 4.5, reviews: 234, phone: "+7 (495) 123-45-67", website: "https://zara.com", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop", description: "Zara is a Spanish fast-fashion retailer known for its trendy clothing, accessories, and footwear for men, women, and children. The store offers the latest fashion trends at affordable prices with new collections arriving weekly.", gallery: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop"] },
  { id: 2, name: "Nike", category: "Sports", floor: 1, section: "C", hours: "10:00-22:00", rating: 4.7, reviews: 456, phone: "+7 (495) 234-56-78", website: "https://nike.com", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop", description: "Nike is a global leader in athletic footwear, apparel, and equipment. Discover the latest innovations in sports technology and fashion. Our store features exclusive releases and personalized fitting services.", gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop"] },
  { id: 3, name: "Apple Store", category: "Electronics", floor: 1, section: "A", hours: "10:00-22:00", rating: 4.8, reviews: 892, phone: "+7 (495) 345-67-89", website: "https://apple.com", image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&h=400&fit=crop", description: "Experience the latest Apple products and accessories. Get expert advice, hands-on demos, and personalized support from our team of specialists.", gallery: ["https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&h=300&fit=crop"] },
  { id: 4, name: "H&M", category: "Fashion", floor: 2, section: "B", hours: "10:00-22:00", rating: 4.3, reviews: 312, phone: "+7 (495) 456-78-90", website: "https://hm.com", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop", description: "H&M offers fashion and quality at the best price in a sustainable way. Find everything from everyday basics to special occasion outfits.", gallery: ["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop"] },
  { id: 5, name: "Sephora", category: "Beauty", floor: 2, section: "C", hours: "10:00-22:00", rating: 4.6, reviews: 567, phone: "+7 (495) 567-89-01", website: "https://sephora.com", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop", description: "Sephora is a leading beauty retailer offering cosmetics, skincare, fragrance, and hair care products from top brands. Try before you buy with our in-store testers.", gallery: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop"] },
  { id: 6, name: "Starbucks", category: "Food & Drink", floor: 1, section: "A", hours: "08:00-23:00", rating: 4.4, reviews: 723, phone: "+7 (495) 678-90-12", website: "https://starbucks.com", image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=400&fit=crop", description: "Starbucks serves the finest coffee, espresso-based drinks, and a variety of food items in a welcoming atmosphere. Free Wi-Fi available.", gallery: ["https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop"] },
];

const reviewsData = [
  { id: 1, author: "Maria K.", rating: 5, date: "2 days ago", text: "Excellent selection and friendly staff! Found exactly what I was looking for.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
  { id: 2, author: "Alex P.", rating: 4, date: "1 week ago", text: "Good quality products. Prices are reasonable for the mall.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" },
  { id: 3, author: "Elena S.", rating: 5, date: "2 weeks ago", text: "Love this store! Always find something new every visit.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" },
];

// Simulated global favorites store (would be in context/state management in real app)
const getFavoriteShops = (): number[] => {
  const stored = localStorage.getItem('favoriteShops');
  return stored ? JSON.parse(stored) : [1, 2, 4];
};

const setFavoriteShops = (ids: number[]) => {
  localStorage.setItem('favoriteShops', JSON.stringify(ids));
};

const StoreDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBonusMessage, setShowBonusMessage] = useState(false);

  const store = storesData.find((s) => s.id === Number(id)) || storesData[0];

  useEffect(() => {
    const favorites = getFavoriteShops();
    setIsFavorite(favorites.includes(store.id));
  }, [store.id]);

  const toggleFavorite = () => {
    const favorites = getFavoriteShops();
    let newFavorites: number[];
    
    if (favorites.includes(store.id)) {
      newFavorites = favorites.filter(id => id !== store.id);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, store.id];
      setIsFavorite(true);
      setShowBonusMessage(true);
      setTimeout(() => setShowBonusMessage(false), 3000);
    }
    
    setFavoriteShops(newFavorites);
  };

  const handleNavigate = () => {
    navigate("/navigation", { state: { highlightedStore: store.id, storeName: store.name, storeFloor: store.floor } });
  };

  return (
    <PageLayout showMenu={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-24 bg-background min-h-screen"
      >
        {/* Header with back button, title, and profile */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-14 px-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-semibold text-foreground truncate max-w-[200px]">{store.name}</h1>
            <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Header Image */}
        <div className="relative h-64 mt-14">
          <img src={store.image} alt={store.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-4 -mt-12 relative z-10">
          {/* Main Info Card */}
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">{store.name}</h1>
                <p className="text-muted-foreground mt-1">{store.category}</p>
              </div>
              <motion.button 
                onClick={toggleFavorite} 
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </motion.button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-foreground text-lg">{store.rating}</span>
                <span className="text-sm text-muted-foreground">({store.reviews} reviews)</span>
              </div>
            </div>

            {/* Store Details */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">Floor {store.floor}, Section {store.section}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">{store.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <a href={`tel:${store.phone}`} className="text-primary">{store.phone}</a>
              </div>
              {store.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-primary truncate">{store.website.replace('https://', '')}</a>
                </div>
              )}
            </div>
          </div>

          {/* Bonus Message */}
          {showBonusMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-3 text-center"
            >
              <span className="text-green-700 dark:text-green-400 font-medium">✓ Added to Favorites!</span>
            </motion.div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{store.description}</p>
          </div>

          {/* Photo Gallery */}
          {store.gallery && store.gallery.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Photos</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {store.gallery.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${store.name} photo ${idx + 1}`} 
                    className="w-36 h-28 rounded-xl object-cover flex-shrink-0 border border-border" 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
              <button className="flex items-center gap-1 text-sm text-muted-foreground">
                See All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {reviewsData.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{review.author}</p>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mall Map Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Location in Mall</h2>
            <div className="bg-muted rounded-xl h-40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
              <div className="text-center z-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">Floor {store.floor}</p>
                <p className="text-sm text-muted-foreground">Section {store.section}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button 
              onClick={handleNavigate}
              className="w-full flex items-center justify-center gap-2 h-14 bg-foreground text-background rounded-xl font-semibold"
            >
              <NavIcon className="w-5 h-5" />
              Navigate to Shop
            </button>
            
            <div className="grid grid-cols-3 gap-3">
              <a 
                href={`tel:${store.phone}`}
                className="flex flex-col items-center justify-center gap-1.5 h-20 bg-card border border-border rounded-xl"
              >
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Call</span>
              </a>
              
              {store.website && (
                <a 
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 h-20 bg-card border border-border rounded-xl"
                >
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">Website</span>
                </a>
              )}
              
              <button 
                onClick={toggleFavorite}
                className={`flex flex-col items-center justify-center gap-1.5 h-20 rounded-xl border transition-colors ${
                  isFavorite 
                    ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900" 
                    : "bg-card border-border"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${isFavorite ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default StoreDetail;
