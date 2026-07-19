import { Letter } from "../../data/letters";
import { PixelButton } from "../ui/PixelButton";
import { IllustratedIcon } from "../ui/IllustratedIcon";

interface LetterPaperProps {
  letter: Letter;
  onPrevious: () => void;
  onNext: () => void;
  favorite: boolean;
  sealed: boolean;
  onToggleFavorite: () => void;
  onSeal: () => void;
}

export const LetterPaper = ({ letter, onPrevious, onNext, favorite, sealed, onToggleFavorite, onSeal }: LetterPaperProps) => (
  <article className="letter-paper">
    <div className="letter-paper__decor" aria-hidden="true">
      <IllustratedIcon kind={letter.decoration || "sunflower"} />
      <span className="letter-paper__tape" />
      <span className="letter-paper__moon" />
    </div>
    <header>
      <p className="eyebrow">Opened envelope {String(letter.number).padStart(2, "0")}</p>
      <h2>{letter.title}</h2>
      <dl>
        <div>
          <dt>Date</dt>
          <dd>{letter.date || "Add a date"}</dd>
        </div>
        <div>
          <dt>Sender</dt>
          <dd>{letter.sender}</dd>
        </div>
      </dl>
    </header>
    <div className="letter-paper__body">
      {letter.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    <footer className="letter-paper__footer">
      <span>{letter.signature || `signed with love, ${letter.sender}`}</span>
      <div>
        <PixelButton icon="heart" variant={favorite ? "primary" : "quiet"} onClick={onToggleFavorite}>
          {favorite ? "Favorited" : "Favorite"}
        </PixelButton>
        <PixelButton icon="music" variant="quiet" onClick={() => window.alert("A voice note has not been added for this letter yet.")}>
          Read to me
        </PixelButton>
        <PixelButton icon="sparkle" variant={sealed ? "primary" : "quiet"} onClick={onSeal}>
          {sealed ? "Sealed" : "Seal with love"}
        </PixelButton>
        <PixelButton icon="previous" variant="quiet" onClick={onPrevious}>
          Previous
        </PixelButton>
        <PixelButton icon="next" variant="quiet" onClick={onNext}>
          Next
        </PixelButton>
      </div>
    </footer>
  </article>
);
