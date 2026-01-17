import { motion } from "framer-motion";
import { Check, Download, Share2, Wallet, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { movie, session, selectedSeats, finalPrice } = location.state || {
    movie: { title: "Avatar 3" },
    session: { time: "14:30", hall: "Hall 1", format: "3D", date: "December 20, 2024" },
    selectedSeats: ["A5", "A6", "A7"],
    finalPrice: 1050,
  };

  const confirmationNumber = `CNM-2024-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleDownload = () => {
    toast({
      title: "Ticket Downloaded",
      description: "Your ticket has been saved to your device.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Ticket - ${movie.title}`,
        text: `I'm going to see ${movie.title}! Join me at ${session.hall} on ${session.date} at ${session.time}.`,
      });
    } else {
      toast({
        title: "Link Copied",
        description: "Ticket link has been copied to clipboard.",
      });
    }
  };

  const handleAddToWallet = () => {
    toast({
      title: "Added to Wallet",
      description: "Your ticket has been added to your digital wallet.",
    });
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-16 pb-24 bg-background min-h-screen"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-1">Your tickets are ready</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border overflow-hidden mb-6"
        >
          {/* Ticket Header */}
          <div className="bg-foreground text-background p-4">
            <p className="text-xs opacity-70">Confirmation Number</p>
            <p className="text-lg font-bold font-mono">{confirmationNumber}</p>
          </div>

          {/* Ticket Details */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Movie</span>
              <span className="text-foreground font-medium">{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Date & Time</span>
              <span className="text-foreground">{session.date} at {session.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Cinema</span>
              <span className="text-foreground">{session.hall}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Format</span>
              <span className="text-foreground">{session.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Seats</span>
              <span className="text-foreground font-medium">{selectedSeats.join(", ")}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">Total Paid</span>
                <span className="text-foreground font-bold text-lg">{finalPrice} ₽</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-4 border-t border-dashed border-border flex flex-col items-center">
            <div className="w-40 h-40 bg-white rounded-xl p-2 flex items-center justify-center">
              {/* Simple QR code representation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                {/* QR pattern simulation */}
                {Array.from({ length: 10 }).map((_, row) =>
                  Array.from({ length: 10 }).map((_, col) => (
                    Math.random() > 0.5 && (
                      <rect
                        key={`${row}-${col}`}
                        x={col * 10}
                        y={row * 10}
                        width="10"
                        height="10"
                        fill="black"
                      />
                    )
                  ))
                )}
                {/* Corner squares */}
                <rect x="0" y="0" width="30" height="30" fill="black" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" fill="black" />
                
                <rect x="70" y="0" width="30" height="30" fill="black" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" fill="black" />
                
                <rect x="0" y="70" width="30" height="30" fill="black" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" fill="black" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Scan at cinema entrance</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <button
            onClick={handleDownload}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl"
          >
            <Download className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl"
          >
            <Share2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Share</span>
          </button>
          <button
            onClick={handleAddToWallet}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl"
          >
            <Wallet className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Add to Wallet</span>
          </button>
        </motion.div>

        {/* Return to Home */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 h-14 bg-foreground text-background rounded-xl font-semibold"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </motion.button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          A confirmation email has been sent to your email address.
        </p>
      </motion.div>
    </PageLayout>
  );
};

export default BookingConfirmation;
