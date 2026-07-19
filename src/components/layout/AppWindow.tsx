import { ReactNode, useState } from "react";
import { useSiteProgress } from "../../contexts/SiteProgressContext";
import { cx } from "../../utils/classNames";
import { Modal } from "../ui/Modal";
import { PixelButton } from "../ui/PixelButton";
import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";
import { WelcomeSign } from "./WelcomeSign";

interface AppWindowProps {
  children: ReactNode;
}

export const AppWindow = ({ children }: AppWindowProps) => {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const { dayMode } = useSiteProgress();

  return (
    <div className="page-shell">
      <div className={cx("app-window", `app-window--${dayMode}`, maximized && "app-window--maximized", minimized && "app-window--minimized")}>
        <TopBar
          minimized={minimized}
          maximized={maximized}
          onMinimize={() => setMinimized((current) => !current)}
          onMaximize={() => setMaximized((current) => !current)}
          onClose={() => setCloseOpen(true)}
        />
        {minimized ? (
          <main className="resting-state" aria-live="polite">
            <span className="resting-state__cat" aria-hidden="true" />
            <h1>Blue's World is taking a tiny nap.</h1>
            <p>The sleeping cloud is keeping the garden warm. Press the left title-bar button to wake it again.</p>
          </main>
        ) : (
          <>
            <WelcomeSign />
            <main className="app-content">{children}</main>
          </>
        )}
        <BottomBar />
      </div>
      <Modal title="Leaving so soon?" open={closeOpen} onClose={() => setCloseOpen(false)}>
        <p>Are you sure you want to leave? The flowers will miss you.</p>
        <div className="modal-actions">
          <PixelButton icon="heart" variant="primary" onClick={() => setCloseOpen(false)}>
            Stay a little longer
          </PixelButton>
        </div>
      </Modal>
    </div>
  );
};
