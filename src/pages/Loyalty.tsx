import { motion } from "framer-motion";
import { Star, Camera, QrCode, Mail, ChevronRight, Trophy, Gift, Plane, Ticket, HelpCircle, Info, Menu } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
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
  { id: "blue", name: "Синий", color: "bg-blue-500", cashback: 5, threshold: 0 },
  { id: "silver", name: "Серебро", color: "bg-gray-400", cashback: 7, threshold: 10000 },
  { id: "gold", name: "Золото", color: "bg-amber-400", cashback: 10, threshold: 50000 },
  { id: "platinum", name: "Платина", color: "bg-gray-300", cashback: 15, threshold: 150000 },
];

const recentTransactions = [
  { id: 1, store: "Zara", amount: 250, date: "Сегодня, 14:32" },
  { id: 2, store: "Starbucks", amount: 45, date: "Вчера, 10:15" },
  { id: 3, store: "Nike", amount: 380, date: "23 декабря" },
];

const spendCategories = [
  { icon: Ticket, label: "Парковка" },
  { icon: Gift, label: "Мерч" },
  { icon: Plane, label: "Авиамили" },
  { icon: Star, label: "Комплименты" },
];

const currentTier = tiers[2]; // Gold for demo
const userPoints = 12450;
const progressToNext = 75;

const Loyalty = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <PageLayout showMenu={false}>
      <div className="px-4 pt-4 pb-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Программа лояльности
          </h1>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-gray-900 rounded-2xl p-5 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Ваш баланс</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold text-white tabular-nums">
                      {userPoints.toLocaleString()}
                    </span>
                    <span className="text-gray-400">баллов</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-400/20 rounded-full px-3 py-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">
                    {currentTier.name}
                  </span>
                </div>
              </div>

              {/* Progress to next tier */}
              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">До Платины</span>
                  <span className="text-white font-medium">{progressToNext}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Cashback info */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-400">Кешбэк:</span>
                <span className="text-lg font-bold text-amber-400">{currentTier.cashback}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scan Receipt Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-5 bg-amber-400 text-gray-900 rounded-xl h-14 flex items-center justify-center gap-3 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Camera className="w-6 h-6" />
          <span className="font-semibold text-base">Сканировать чек</span>
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
          ].map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.label}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">{method.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Spend Points Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Потратить баллы
              </h2>
              <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
                <DialogTrigger asChild>
                  <button className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Как потратить баллы?</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Накопленные баллы можно обменять на:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Ticket className="w-4 h-4 mt-0.5 text-gray-400" />
                        <span><strong>Парковку</strong> — оплатите часы парковки баллами</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="w-4 h-4 mt-0.5 text-gray-400" />
                        <span><strong>Мерч</strong> — эксклюзивные товары ТЦ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Plane className="w-4 h-4 mt-0.5 text-gray-400" />
                        <span><strong>Авиамили</strong> — конвертируйте в мили партнёров</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-0.5 text-gray-400" />
                        <span><strong>Комплименты</strong> — бесплатный кофе, десерт и др.</span>
                      </li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {spendCategories.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex-shrink-0 w-20 flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-center text-gray-600 font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Program Details Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6"
        >
          <Accordion type="single" collapsible className="bg-white rounded-xl border border-gray-200">
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Детальное описание программы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Условия начисления баллов:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Баллы начисляются за каждую покупку от 100 ₽</li>
                      <li>1 балл = 1 ₽ при обмене на вознаграждения</li>
                      <li>Баллы действительны 12 месяцев с момента начисления</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Преимущества уровней:</p>
                    <ul className="space-y-2">
                      <li><span className="text-blue-500 font-medium">Синий:</span> 5% кешбэк, доступ к базовым акциям</li>
                      <li><span className="text-gray-500 font-medium">Серебро:</span> 7% кешбэк, ранний доступ к распродажам</li>
                      <li><span className="text-amber-500 font-medium">Золото:</span> 10% кешбэк, приоритетное обслуживание, эксклюзивные предложения</li>
                      <li><span className="text-gray-400 font-medium">Платина:</span> 15% кешбэк, персональный менеджер, VIP-мероприятия</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              История начислений
            </h2>
            <button className="flex items-center gap-1 text-sm text-gray-500">
              Все
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.store}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-amber-500">+{transaction.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier Levels - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 mb-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Уровни программы
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tiers.map((tier) => {
              const isActive = tier.id === currentTier.id;
              return (
                <div
                  key={tier.id}
                  className={`flex-shrink-0 w-24 p-3 rounded-xl text-center transition-all ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full mx-auto mb-2 ${tier.color}`}
                  />
                  <p className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-900"}`}>
                    {tier.name}
                  </p>
                  <p className={`text-sm font-bold mt-1 ${
                    isActive ? "text-amber-400" : "text-gray-500"
                  }`}>
                    {tier.cashback}%
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Loyalty;
