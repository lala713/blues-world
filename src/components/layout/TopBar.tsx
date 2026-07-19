import { siteConfig } from "../../data/siteConfig";
import { PixelButton } from "../ui/PixelButton";
import { Tooltip } from "../ui/Tooltip";
import { IllustratedIcon } from "../ui/IllustratedIcon";

interface TopBarProps {
  minimized: boolean;
  maximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const TopBar = ({ minimized, maximized, onMinimize, onMaximize, onClose }: TopBarProps) => (
  <header className="top-bar">
    <div className="top-bar__title">
      <IllustratedIcon kind="sunflower" label="Sunflower" />
      <IllustratedIcon kind="lily" label="White lily" />
      <IllustratedIcon kind="star" label="Purple star" />
      <span>For our favorite {siteConfig.recipientName} ♡</span>
    </div>
    <div className="top-bar__center">
      <IllustratedIcon kind="music" />
      <span>Blue's tiny universe</span>
    </div>
    <div className="top-bar__controls" aria-label="Decorative Blue's World controls">
      <Tooltip label={minimized ? "Wake Blue's World" : "Let Blue's World nap"}>
        <PixelButton
          icon="minimize"
          variant="quiet"
          aria-label={minimized ? "Wake Blue's World" : "Minimize Blue's World"}
          onClick={onMinimize}
        />
      </Tooltip>
      <Tooltip label={maximized ? "Cozy size" : "Roomier size"}>
        <PixelButton
          icon="maximize"
          variant="quiet"
          aria-label={maximized ? "Return to cozy size" : "Make Blue's World roomier"}
          onClick={onMaximize}
        />
      </Tooltip>
      <Tooltip label="A soft goodbye check">
        <PixelButton icon="close" variant="quiet" aria-label="Open leave confirmation" onClick={onClose} />
      </Tooltip>
    </div>
  </header>
);
