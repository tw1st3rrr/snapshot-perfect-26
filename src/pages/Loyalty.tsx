import { motion } from "framer-motion";
import { Star, Camera, QrCode, Mail, ChevronRight, Trophy, Gift, Plane, Ticket } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const tiers = [
  { id: "blue", name: "Синий", color: "bg-blue-500", cashback: 5, threshold: 0 },
  { id: "silver", name: "Серебро", color: "bg-silver", cashback: 7, threshold: 10000 },
  { id: "gold", name: "Золото", color: "bg-gradient-gold", cashback: 10, threshold: 50000 },
  { id: "platinum", name: "Платина", color: "bg-platinum", cashback: 15, threshold: 150000 },
];

const recentTransactions = [
  { id: 1, store: "Zara", amount: 250, date: "Сегодня, 14:32" },
  { id: 2, store: "Starbucks", amount: 45, date: "Вчера, 10:15" },
  { id: 3, store: "Nike", amount: 380, date: "23 декабря" },
];

const currentTier = tiers[2]; // Gold for demo
const userPoints = 12450;
const progressToNext = 75;

const Loyalty = () => {
  return (
    <PageLayout>
      <div className="px-4 pt-16 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Программа лояльности
          </h1>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <div className="bg-gradient-premium rounded-3xl p-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-sm">Ваш баланс</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-4xl font-bold text-primary-foreground">
                      {userPoints.toLocaleString()}
                    </span>
                    <span className="text-primary-foreground/70">баллов</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-background/10 rounded-full px-3 py-1.5">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-primary-foreground">
                    {currentTier.name}
                  </span>
                </div>
              </div>

              {/* Progress to next tier */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-foreground/70">До Платины</span>
                  <span className="text-primary-foreground font-medium">{progressToNext}%</span>
                </div>
                <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Cashback info */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-primary-foreground/70">Кешбэк:</span>
                <span className="text-lg font-bold text-accent">{currentTier.cashback}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scan Receipt Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-6 bg-gradient-gold text-accent-foreground rounded-2xl p-4 flex items-center justify-center gap-3 shadow-gold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Camera className="w-6 h-6" />
          <span className="font-display font-semibold text-lg">Сканировать чек</span>
        </motion.button>

        {/* Scan Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 grid grid-cols-3 gap-3"
        >
          {[
            { icon: Camera, label: "Фото чека" },
            { icon: QrCode, label: "QR-код" },
            { icon: Mail, label: "Онлайн-чек" },
          ].map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={method.label}
                className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{method.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Rewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Потратить баллы
            </h2>
            <button className="text-sm text-muted-foreground">
              Каталог
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { icon: Ticket, label: "Парковка" },
              { icon: Gift, label: "Мерч" },
              { icon: Plane, label: "Авиамили" },
              { icon: Star, label: "Комплименты" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex-shrink-0 w-20 flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border cursor-pointer hover:border-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-xs text-center text-muted-foreground">{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              История начислений
            </h2>
            <button className="flex items-center gap-1 text-sm text-muted-foreground">
              Все
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.store}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-accent">+{transaction.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 mb-4"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Уровни программы
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-3 rounded-xl text-center ${
                  tier.id === currentTier.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-2 ${tier.color}`}
                />
                <p className="text-xs font-medium">{tier.name}</p>
                <p className={`text-xs mt-1 ${
                  tier.id === currentTier.id ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {tier.cashback}%
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Loyalty;
