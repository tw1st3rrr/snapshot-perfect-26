import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Star, Phone, Globe, Heart, Navigation as NavIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const storesData = [
  { id: 1, name: "Zara", category: "Women's Fashion", floor: 2, section: "A", hours: "10:00-22:00", rating: 4.5, reviews: 234, phone: "+7 (495) 123-45-67", website: "https://zara.com", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop", description: "Zara is a Spanish fast-fashion retailer known for its trendy clothing, accessories, and footwear for men, women, and children. The store offers the latest fashion trends at affordable prices.", gallery: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop"] },
  { id: 2, name: "Nike", category: "Sports", floor: 1, section: "C", hours: "10:00-22:00", rating: 4.7, reviews: 456, phone: "+7 (495) 234-56-78", website: "https://nike.com", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop", description: "Nike is a global leader in athletic footwear, apparel, and equipment. Discover the latest innovations in sports technology and fashion.", gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop"] },
  { id: 3, name: "Apple Store", category: "Electronics", floor: 1, section: "A", hours: "10:00-22:00", rating: 4.8, reviews: 892, phone: "+7 (495) 345-67-89", website: "https://apple.com", image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&h=400&fit=crop", description: "Experience the latest Apple products and accessories. Get expert advice, hands-on demos, and personalized support.", gallery: ["https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&h=300&fit=crop"] },
  { id: 4, name: "H&M", category: "Fashion", floor: 2, section: "B", hours: "10:00-22:00", rating: 4.3, reviews: 312, phone: "+7 (495) 456-78-90", website: "https://hm.com", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop", description: "H&M offers fashion and quality at the best price in a sustainable way. Find everything from everyday basics to special occasion outfits.", gallery: ["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop"] },
  { id: 5, name: "Sephora", category: "Beauty", floor: 2, section: "C", hours: "10:00-22:00", rating: 4.6, reviews: 567, phone: "+7 (495) 567-89-01", website: "https://sephora.com", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop", description: "Sephora is a leading beauty retailer offering cosmetics, skincare, fragrance, and hair care products from top brands.", gallery: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"] },
  { id: 6, name: "Starbucks", category: "Food & Drink", floor: 1, section: "A", hours: "08:00-23:00", rating: 4.4, reviews: 723, phone: "+7 (495) 678-90-12", website: "https://starbucks.com", image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=400&fit=crop", description: "Starbucks serves the finest coffee, espresso-based drinks, and a variety of food items in a welcoming atmosphere.", gallery: ["https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop"] },
];

const StoreDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const store = storesData.find((s) => s.id === Number(id)) || storesData[0];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-24 bg-background min-h-screen"
      >
        {/* Header Image */}
        <div className="relative h-56">
          <img src={store.image} alt={store.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <motion.button 
            onClick={() => setIsFavorite(!isFavorite)} 
            className="absolute top-12 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <h1 className="text-2xl font-bold text-foreground">{store.name}</h1>
            <p className="text-muted-foreground mt-1">{store.category}</p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-foreground">{store.rating}</span>
                <span className="text-sm text-muted-foreground">({store.reviews} reviews)</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Floor {store.floor}, Section {store.section}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{store.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${store.phone}`} className="text-primary">{store.phone}</a>
              </div>
              {store.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-primary">{store.website}</a>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{store.description}</p>
          </div>

          {/* Gallery */}
          {store.gallery && store.gallery.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Photos</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {store.gallery.map((img, idx) => (
                  <img key={idx} src={img} alt={`${store.name} photo ${idx + 1}`} className="w-32 h-24 rounded-xl object-cover flex-shrink-0" />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate("/navigation")}
              className="flex items-center justify-center gap-2 h-12 bg-foreground text-background rounded-xl font-medium"
            >
              <NavIcon className="w-5 h-5" />
              Navigate
            </button>
            <a 
              href={`tel:${store.phone}`}
              className="flex items-center justify-center gap-2 h-12 bg-card border border-border text-foreground rounded-xl font-medium"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default StoreDetail;
