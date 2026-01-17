import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const trendingStores = [
  { id: 1, name: "Zara", category: "Fashion", discount: "30% OFF", rating: 4.5, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" },
  { id: 2, name: "Nike", category: "Sports", discount: "20% OFF", rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
  { id: 3, name: "Apple Store", category: "Electronics", discount: null, rating: 4.8, image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=300&h=200&fit=crop" },
  { id: 4, name: "H&M", category: "Fashion", discount: "50% OFF", rating: 4.3, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop" },
  { id: 5, name: "Sephora", category: "Beauty", discount: "25% OFF", rating: 4.6, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop" },
  { id: 6, name: "Starbucks", category: "Food & Drink", discount: null, rating: 4.4, image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop" },
  { id: 7, name: "Adidas", category: "Sports", discount: "35% OFF", rating: 4.5, image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=300&h=200&fit=crop" },
  { id: 8, name: "Uniqlo", category: "Fashion", discount: "15% OFF", rating: 4.4, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=200&fit=crop" },
];

const AllStores = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-16 pb-24 bg-background min-h-screen"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trending Stores</h1>
            <p className="text-sm text-muted-foreground">Most popular shops right now</p>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-2 gap-3">
          {trendingStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/store/${store.id}`)}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm cursor-pointer hover:border-muted-foreground transition-colors"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                {store.discount && (
                  <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-800 text-white">
                    {store.discount}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-foreground">{store.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{store.category}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-foreground font-medium">{store.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default AllStores;
