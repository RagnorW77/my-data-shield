import { Link } from "react-router-dom";
import shieldLogo from "@/assets/shield-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

const Logo = ({ size = "md", clickable = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  };

  const logoImage = (
    <img 
      src={shieldLogo} 
      alt="Shield Logo" 
      className={`${sizeClasses[size]} object-contain dark:brightness-110 dark:contrast-110`}
    />
  );

  if (clickable) {
    return (
      <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
};

export default Logo;
