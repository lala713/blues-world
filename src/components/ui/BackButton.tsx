import { useNavigate } from "react-router-dom";
import { PixelButton } from "./PixelButton";

interface BackButtonProps {
  label?: string;
}

export const BackButton = ({ label = "Back to home" }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <PixelButton icon="arrow-left" variant="quiet" className="back-button" onClick={() => navigate("/")}>
      {label}
    </PixelButton>
  );
};
