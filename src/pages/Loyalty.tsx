import { motion } from "framer-motion";
import { Star, Camera, QrCode, Mail, ChevronRight, Trophy, Gift, Plane, Ticket, HelpCircle, Info } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tiers = [
  { id: "bronze", name: "Bronze", color: "bg-amber-700", cashback: 5, threshold: 0 },
  { id: "silver", name: "Silver", color: "bg-gray-400", cashback: 7, threshold: 10000 },
  { id: "gold", name: "Gold", color: "bg-amber-400", cashback: 10, threshold: 50000 },
  { id: "platinum", name: "Platinum", color: "bg-gray-300", cashback: 15, threshold: 150000 },
];

const recentTransactions = [
  { id: 1, store: "Zara", amount: 250, date: "Today, 14:32" },
  { id: 2, store: "Starbucks", amount: 45, date: "Yesterday, 10:15" },
  { id: 3, store: "Nike", amount: 380, date: "Dec 23" },
];

const spendCategories = [
  { icon: Ticket, label: "Parking" },
  { icon: Gift, label: "Merch" },
  { icon: Plane, label: "Air Miles" },
  { icon: Star, label: "Treats" },
];

const rewards = [
  { id: 1, name: "Free Coffee", points: 500, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop" },
  { id: 2, name: "20% Discount", points: 1000, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=150&fit=crop" },
  { id: 3, name: "Free Parking", points: 750, image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=150&h=150&fit=crop" },
  { id: 4, name: "Gift Card", points: 2000, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop" },
  { id: 5, name: "Cinema Ticket", points: 1500, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&h=150&fit=crop" },
  { id: 6, name: "Mall Merch", points: 3000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop" },
];

const currentTier = tiers[2];
const userPoints = 12450;
const progressToNext = 75;

const Loyalty = () => {
  const [rewardsHelpOpen, setRewardsHelpOpen] = useState(false);

  return (
    <PageLayout>
      <div className="px-4 pt-16 pb-6 bg-background min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Loyalty Program</h1>
        </div>

        {/* Points Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-foreground rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Your Balance</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold text-background tabular-nums">{userPoints.toLocaleString()}</span>
                    <span className="text-muted">Points</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-400/20 rounded-full px-3 py-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">{currentTier.name}</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">To Platinum</span>
                  <span className="text-background font-medium">{progressToNext}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-amber-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${progressToNext}%` }} transition={{ delay: 0.5, duration: 0.8 }} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted">Cashback:</span>
                <span className="text-lg font-bold text-amber-400">{currentTier.cashback}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scan Receipt Button */}
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full mt-5 bg-amber-400 text-foreground rounded-xl h-14 flex items-center justify-center gap-3 shadow-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Camera className="w-6 h-6" />
          <span className="font-semibold text-base">Scan Receipt</span>
        </motion.button>

        {/* Scan Methods */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 grid grid-cols-3 gap-3">
          {[{ icon: Camera, label: "Photo Receipt" }, { icon: QrCode, label: "QR Code" }, { icon: Mail, label: "Online Receipt" }].map((method) => {
            const Icon = method.icon;
            return (
              <button key={method.label} className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-muted-foreground transition-colors">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">{method.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Rewards Showcase */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Rewards Showcase</h2>
              <Dialog open={rewardsHelpOpen} onOpenChange={setRewardsHelpOpen}>
                <DialogTrigger asChild>
                  <button className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader><DialogTitle>About Rewards</DialogTitle></DialogHeader>
                  <p className="text-sm text-muted-foreground">Exchange your points for exclusive rewards, discounts, and experiences. New rewards are added regularly!</p>
                </DialogContent>
              </Dialog>
            </div>
            <button className="flex items-center gap-1 text-sm text-muted-foreground">See All<ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {rewards.map((reward) => (
              <button key={reward.id} className="flex-shrink-0 w-36 bg-card rounded-xl border border-border overflow-hidden hover:border-muted-foreground transition-colors text-left">
                <img src={reward.image} alt={reward.name} className="w-full h-20 object-cover" />
                <div className="p-2.5">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{reward.name}</p>
                  <p className="text-xs text-amber-600 font-semibold mt-0.5">{reward.points.toLocaleString()} pts</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Earning History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Earning History</h2>
            <button className="flex items-center gap-1 text-sm text-muted-foreground">See All<ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Star className="w-5 h-5 text-muted-foreground" /></div>
                  <div><p className="font-medium text-foreground">{tx.store}</p><p className="text-sm text-muted-foreground">{tx.date}</p></div>
                </div>
                <span className="font-semibold text-amber-500">+{tx.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Program Levels */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Program Levels</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tiers.map((tier) => {
              const isActive = tier.id === currentTier.id;
              return (
                <div key={tier.id} className={`flex-shrink-0 w-24 p-3 rounded-xl text-center transition-all ${isActive ? "bg-foreground text-background" : "bg-card border border-border"}`}>
                  <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${tier.color}`} />
                  <p className={`text-xs font-semibold ${isActive ? "text-background" : "text-foreground"}`}>{tier.name}</p>
                  <p className={`text-sm font-bold mt-1 ${isActive ? "text-amber-400" : "text-muted-foreground"}`}>{tier.cashback}%</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Program Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-6 mb-4">
          <Accordion type="single" collapsible className="bg-card rounded-xl border border-border">
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2"><Info className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium text-foreground">Program Details</span></div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div><p className="font-semibold text-foreground mb-2">Earning Points:</p><ul className="space-y-1 list-disc list-inside"><li>Points are earned on every purchase over 100 ₽</li><li>1 point = 1 ₽ when redeeming rewards</li><li>Points are valid for 12 months</li></ul></div>
                  <div><p className="font-semibold text-foreground mb-2">Tier Benefits:</p><ul className="space-y-2"><li><span className="text-amber-700 font-medium">Bronze:</span> 5% cashback, basic offers</li><li><span className="text-gray-500 font-medium">Silver:</span> 7% cashback, early sale access</li><li><span className="text-amber-500 font-medium">Gold:</span> 10% cashback, priority service</li><li><span className="text-gray-400 font-medium">Platinum:</span> 15% cashback, VIP events</li></ul></div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Loyalty;
