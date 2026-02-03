import { motion } from "framer-motion";
import { ArrowLeft, Gift, Check, Banknote } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Payment method icons as simple SVG components
const SBPIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const SberPayIcon = () => (
  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
    <span className="text-white text-xs font-bold">S</span>
  </div>
);

const TPayIcon = () => (
  <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
    <span className="text-black text-xs font-bold">T</span>
  </div>
);

const paymentMethods = [
  { id: "sbp", label: "СБП", sublabel: "Система быстрых платежей", icon: SBPIcon },
  { id: "sber", label: "Sber Pay", sublabel: "", icon: SberPayIcon },
  { id: "tpay", label: "T-Pay", sublabel: "", icon: TPayIcon },
];

const CinemaPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, session, selectedSeats, totalPrice } = location.state || {
    movie: { title: "Avatar 3" },
    session: { time: "14:30", hall: "Hall 1", format: "3D", date: "December 20, 2024" },
    selectedSeats: ["A5", "A6"],
    totalPrice: 1000,
  };

  // Mock user profile email (in real app would come from auth/profile context)
  const userProfileEmail = ""; // Empty means user hasn't set email in profile

  const [selectedMethod, setSelectedMethod] = useState("sbp");
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [email, setEmail] = useState(userProfileEmail);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const availablePoints = 5000;
  const maxPointsToUse = Math.min(availablePoints, totalPrice);

  const finalPrice = totalPrice - pointsToUse;
  const canPay = agreedToTerms && email.trim().length > 0 && email.includes("@");

  const handlePay = () => {
    if (!canPay) return;
    navigate("/cinema/confirmation", {
      state: {
        movie,
        session,
        selectedSeats,
        totalPrice,
        pointsUsed: pointsToUse,
        finalPrice,
      },
    });
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-16 pb-32 bg-background min-h-screen"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-6">
          <h2 className="font-semibold text-foreground mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Movie</span>
              <span className="text-foreground font-medium">{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="text-foreground">{session.date} at {session.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cinema</span>
              <span className="text-foreground">{session.hall}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format</span>
              <span className="text-foreground">{session.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span className="text-foreground">{selectedSeats.join(", ")}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-bold text-foreground text-lg">{totalPrice} ₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-3">Email для билета</h2>
          <Input
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            На этот email будет отправлен электронный билет
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-3">Способ оплаты</h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{method.label}</p>
                      {method.sublabel && <p className="text-xs text-muted-foreground">{method.sublabel}</p>}
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-foreground">Использовать баллы</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => {
                  setUsePoints(e.target.checked);
                  if (!e.target.checked) setPointsToUse(0);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {usePoints && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доступно</span>
                  <span className="text-foreground">{availablePoints} баллов</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPointsToUse}
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Используется</span>
                  <span className="text-primary font-medium">{pointsToUse} баллов (-{pointsToUse} ₽)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Останется</span>
                  <span className="text-foreground">{availablePoints - pointsToUse} баллов</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              Я согласен с условиями договора оферты, принимаю условия пользовательского соглашения и даю согласие на обработку персональных данных
            </Label>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Итого к оплате</span>
            <div className="text-right">
              {pointsToUse > 0 && (
                <p className="text-sm text-muted-foreground line-through">{totalPrice} ₽</p>
              )}
              <p className="text-xl font-bold text-foreground">{finalPrice} ₽</p>
            </div>
          </div>
          <button
            onClick={handlePay}
            disabled={!canPay}
            className="w-full h-14 bg-foreground text-background font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Оплатить {finalPrice} ₽
          </button>
          {!agreedToTerms && (
            <p className="text-xs text-destructive text-center mt-2">
              Необходимо принять условия договора
            </p>
          )}
          <button
            onClick={() => navigate(-1)}
            className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Отмена
          </button>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default CinemaPayment;
