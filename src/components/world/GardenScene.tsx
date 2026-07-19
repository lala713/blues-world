import { useState } from "react";
import { AnimatedBee } from "./AnimatedBee";
import { AnimatedButterfly } from "./AnimatedButterfly";
import { CloudLayer } from "./CloudLayer";
import { FallingPetals } from "./FallingPetals";
import { FlowerCluster } from "./FlowerCluster";
import { SleepingCat } from "./SleepingCat";
import { SparkleLayer } from "./SparkleLayer";

export const GardenScene = () => {
  const [birdNote, setBirdNote] = useState(false);

  return (
    <section className="garden-scene" aria-label="Animated birthday garden with flowers and sleeping cat">
      <CloudLayer />
      <SparkleLayer />
      <FallingPetals />
      <div className="garden-scene__skyline" aria-hidden="true">
        <span className="soft-sun" />
        <span className="moon-note" />
      </div>

      <AnimatedButterfly className="butterfly--one" />
      <AnimatedButterfly className="butterfly--two" delay={2.3} />
      <AnimatedBee className="bee--one" delay={0.5} />
      <AnimatedBee className="bee--two" delay={1.5} />

      <button className="garden-bird garden-bird--one" type="button" aria-label="Read the tiny bird note" onClick={() => setBirdNote((open) => !open)}>
        <span className="garden-bird__body" />
        <span className="garden-bird__wing" />
        <span className="garden-bird__note" />
      </button>
      <span className="garden-bird garden-bird--two" aria-hidden="true">
        <span className="garden-bird__body" />
        <span className="garden-bird__wing" />
      </span>
      {birdNote ? <p className="garden-secret-note">Blue, someone hid one more birthday wish in the sky.</p> : null}

      <div className="garden-scene__flowers">
        <FlowerCluster type="sunflower" size="lg" className="flower-pos flower-pos--one" />
        <FlowerCluster type="lily" size="lg" className="flower-pos flower-pos--two" />
        <FlowerCluster type="daisy" size="md" className="flower-pos flower-pos--three" />
        <FlowerCluster type="sunflower" size="md" className="flower-pos flower-pos--four" />
        <FlowerCluster type="lily" size="md" className="flower-pos flower-pos--five" />
      </div>

      <div className="wood-fence" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <SleepingCat className="garden-scene__cat" />
      <span className="garden-bunny" aria-hidden="true">
        <span className="garden-bunny__ear garden-bunny__ear--left" />
        <span className="garden-bunny__ear garden-bunny__ear--right" />
        <span className="garden-bunny__body" />
        <span className="garden-bunny__tail" />
      </span>
      <div className="grass-bed" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.13}s` }} />
        ))}
      </div>
    </section>
  );
};
