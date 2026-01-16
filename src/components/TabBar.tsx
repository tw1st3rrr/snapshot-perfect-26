import { motion } from "framer-motion";
import { Home, Briefcase, MapPin, Star, Film } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { id: "home", icon: Home, label: "Home", path: "/" },
  { id: "services", icon: Briefcase, label: "Services", path: "/services" },
  { id: "navigation", icon: MapPin, label: "Navigation", path: "/navigation" },
  { id: "loyalty", icon: Star, label: "Loyalty", path: "/loyalty" },
  { id: "cinema", icon: Film, label: "Cinema", path: "/cinema" },
];

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-card border-t border-border shadow-lg">
        <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center justify-center px-3 py-2 min-w-[4rem]"
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span
                  className={`mt-1 text-xs transition-colors duration-200 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
