import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/profile")}
      className="w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
      aria-label="Profile"
    >
      <User className="w-5 h-5 text-foreground" />
    </button>
  );
};

export default MenuButton;
