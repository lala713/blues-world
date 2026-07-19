import { FormEvent, useState } from "react";
import { siteConfig } from "../../data/siteConfig";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { PixelButton } from "../ui/PixelButton";
import { IllustratedIcon } from "../ui/IllustratedIcon";

interface SecretLockProps {
  canUnlockByVisit: boolean;
  onUnlock: () => void;
}

export const SecretLock = ({ canUnlockByVisit, onUnlock }: SecretLockProps) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { playInterfaceSound } = useAudioPlayer();

  const unlock = () => {
    playInterfaceSound("unlock");
    onUnlock();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (siteConfig.secretUnlockMode !== "progress-only" && code.trim().toLowerCase() === siteConfig.secretCode.toLowerCase()) {
      unlock();
      return;
    }
    setMessage("The gate shimmered, but the code was not quite right yet.");
  };

  return (
    <section className="secret-lock">
      <div className="secret-lock__gate" aria-hidden="true">
        <span className="secret-lock__door" />
        <span className="secret-lock__heart">
          <IllustratedIcon kind="lock" />
        </span>
        <span className="secret-lock__moon" />
      </div>
      <div className="secret-lock__body">
        <h2>The secret ending is locked</h2>
        <p>Visit every main section or enter the editable secret code to open the final garden gate.</p>
        {canUnlockByVisit && siteConfig.secretUnlockMode !== "code-only" ? (
          <PixelButton icon="sparkle" variant="primary" onClick={unlock}>
            Open the final gate
          </PixelButton>
        ) : null}
        {siteConfig.secretUnlockMode !== "progress-only" ? (
          <form onSubmit={submit} className="secret-code-form">
            <label htmlFor="secret-code">Secret code</label>
            <input
              id="secret-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="editable in siteConfig.ts"
            />
            <PixelButton icon="lock" variant="secondary" type="submit">
              Try code
            </PixelButton>
          </form>
        ) : null}
        {message ? <p className="friendly-warning" role="status">{message}</p> : null}
      </div>
    </section>
  );
};
