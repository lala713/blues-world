import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";
import { SiteProgressProvider } from "./contexts/SiteProgressContext";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SiteProgressProvider>
        <AudioPlayerProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </AudioPlayerProvider>
      </SiteProgressProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
