import { siteConfig } from "../../data/siteConfig";
import { useSiteProgress } from "../../contexts/SiteProgressContext";
import { IllustratedIcon } from "../ui/IllustratedIcon";
import { SparkleLayer } from "../world/SparkleLayer";

export const WelcomeSign = () => {
  const { hiddenNoteFound, starCount } = useSiteProgress();

  return (
    <section className="welcome-sign" aria-labelledby="welcome-title">
      <SparkleLayer interactive className="welcome-sign__stars" />
      <div className="welcome-sign__tape welcome-sign__tape--left" aria-hidden="true" />
      <div className="welcome-sign__tape welcome-sign__tape--right" aria-hidden="true" />
      <div className="welcome-sign__vines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="welcome-sign__flowers" aria-hidden="true">
        <IllustratedIcon kind="sunflower" />
        <IllustratedIcon kind="lily" />
      </div>
      <div className="welcome-sign__text">
        <p className="welcome-sign__tiny">Collected stars: {starCount}/7</p>
        <h1 id="welcome-title">WELCOME TO BLUE'S WORLD</h1>
        <p>flowers • music • memories • friendship • love</p>
        <small>A little world created by the people who love you.</small>
      </div>
      <div className="welcome-sign__music-detail" aria-label="A tiny piano, moon, and black cat detail">
        <IllustratedIcon kind="piano" />
        <IllustratedIcon kind="moon" />
        <IllustratedIcon kind="cat" />
      </div>
      {hiddenNoteFound ? (
        <p className="welcome-sign__hidden-note">
          A hidden note appears: keep moving gently toward the future. It can still meet you kindly.
        </p>
      ) : null}
      <p className="sr-only">{siteConfig.mainWelcomeMessage}</p>
    </section>
  );
};
