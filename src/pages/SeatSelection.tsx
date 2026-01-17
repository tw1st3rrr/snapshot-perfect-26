import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "occupied" | "selected";
  price: number;
}

const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;
  const seats: Seat[] = [];
  
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const isOccupied = Math.random() < 0.3;
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: isOccupied ? "occupied" : "available",
        price: row <= "B" ? 500 : row <= "E" ? 400 : 350,
      });
    }
  });
  
  return seats;
};

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, session } = location.state || { movie: { title: "Avatar 3" }, session: { time: "14:30", hall: "Hall 1", format: "3D", date: "December 20, 2024" } };
  
  const [seats, setSeats] = useState<Seat[]>(generateSeats);
  
  const selectedSeats = seats.filter((s) => s.status === "selected");
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const toggleSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id === seatId && seat.status !== "occupied") {
          return { ...seat, status: seat.status === "selected" ? "available" : "selected" };
        }
        return seat;
      })
    );
  };

  const handleProceed = () => {
    navigate("/cinema/payment", {
      state: {
        movie,
        session,
        selectedSeats: selectedSeats.map((s) => s.id),
        totalPrice,
      },
    });
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-16 pb-32 bg-background min-h-screen"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{movie.title}</h1>
            <p className="text-xs text-muted-foreground">{session.date} • {session.time} • {session.hall} • {session.format}</p>
          </div>
        </div>

        {/* Screen */}
        <div className="mt-6 mb-8">
          <div className="w-4/5 mx-auto h-2 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
          <p className="text-center text-xs text-muted-foreground mt-2">SCREEN</p>
        </div>

        {/* Seats Grid */}
        <div className="space-y-2 overflow-x-auto pb-4">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-1 justify-center">
              <span className="w-6 text-xs font-medium text-muted-foreground">{row}</span>
              <div className="flex gap-1">
                {seats
                  .filter((s) => s.row === row)
                  .map((seat) => (
                    <motion.button
                      key={seat.id}
                      onClick={() => toggleSeat(seat.id)}
                      disabled={seat.status === "occupied"}
                      className={`w-7 h-7 rounded-t-lg text-xs font-medium transition-colors ${
                        seat.status === "occupied"
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : seat.status === "selected"
                          ? "bg-primary text-primary-foreground"
                          : "bg-green-500/80 text-white hover:bg-green-600"
                      }`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {seat.number}
                    </motion.button>
                  ))}
              </div>
              <span className="w-6 text-xs font-medium text-muted-foreground">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-green-500/80" />
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-muted" />
            <span className="text-xs text-muted-foreground">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-primary" />
            <span className="text-xs text-muted-foreground">Selected</span>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mt-6 p-4 bg-card rounded-xl border border-border">
          <p className="text-sm font-medium text-foreground mb-2">Pricing</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>Rows A-B: <span className="text-foreground font-medium">500 ₽</span></div>
            <div>Rows C-E: <span className="text-foreground font-medium">400 ₽</span></div>
            <div>Rows F-H: <span className="text-foreground font-medium">350 ₽</span></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"} selected
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedSeats.map((s) => s.id).join(", ") || "None"}
              </p>
            </div>
            <p className="text-xl font-bold text-foreground">{totalPrice} ₽</p>
          </div>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="w-full h-14 bg-foreground text-background font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default SeatSelection;
