import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "gold";
}

const QuickActionCard = ({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: QuickActionCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl min-w-[100px] transition-all duration-200 ${
        variant === "gold"
          ? "bg-gradient-gold text-accent-foreground shadow-gold"
          : "bg-card border border-border shadow-md hover:shadow-lg"
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
          variant === "gold" ? "bg-accent-foreground/10" : "bg-muted"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            variant === "gold" ? "text-accent-foreground" : "text-foreground"
          }`}
        />
      </div>
      <span
        className={`text-sm font-medium text-center ${
          variant === "gold" ? "text-accent-foreground" : "text-foreground"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
};

export default QuickActionCard;
