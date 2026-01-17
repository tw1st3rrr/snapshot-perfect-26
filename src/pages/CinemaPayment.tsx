import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Gift, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const paymentMethods = [
  { id: "card", label: "Bank Card", sublabel: "**** 4242", icon: CreditCard },
  { id: "apple", label: "Apple Pay", sublabel: "", icon: Smartphone },
  { id: "google", label: "Google Pay", sublabel: "", icon: Smartphone },
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

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const availablePoints = 5000;
  const maxPointsToUse = Math.min(availablePoints, totalPrice);

  const finalPrice = totalPrice - pointsToUse;

  const handlePay = () => {
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

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-3">Payment Method</h2>
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
                    <Icon className="w-5 h-5 text-muted-foreground" />
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
              <span className="font-semibold text-foreground">Use Loyalty Points</span>
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
                  <span className="text-muted-foreground">Available</span>
                  <span className="text-foreground">{availablePoints} Points</span>
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
                  <span className="text-muted-foreground">Using</span>
                  <span className="text-primary font-medium">{pointsToUse} Points (-{pointsToUse} ₽)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="text-foreground">{availablePoints - pointsToUse} Points</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Final Amount</span>
            <div className="text-right">
              {pointsToUse > 0 && (
                <p className="text-sm text-muted-foreground line-through">{totalPrice} ₽</p>
              )}
              <p className="text-xl font-bold text-foreground">{finalPrice} ₽</p>
            </div>
          </div>
          <button
            onClick={handlePay}
            className="w-full h-14 bg-foreground text-background font-semibold rounded-xl"
          >
            Pay {finalPrice} ₽
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default CinemaPayment;
