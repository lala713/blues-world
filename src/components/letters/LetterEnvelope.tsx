import { Letter } from "../../data/letters";
import { cx } from "../../utils/classNames";
import { IllustratedIcon } from "../ui/IllustratedIcon";

interface LetterEnvelopeProps {
  letter: Letter;
  selected: boolean;
  opened: boolean;
  onSelect: () => void;
}

export const LetterEnvelope = ({ letter, selected, opened, onSelect }: LetterEnvelopeProps) => (
  <button
    className={cx("letter-envelope", selected && "letter-envelope--selected", opened && "letter-envelope--opened")}
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
  >
    <span className="letter-envelope__flap" />
    <span className="letter-envelope__number">Letter {String(letter.number).padStart(2, "0")}</span>
    <span className="letter-envelope__sender">{letter.sender}</span>
    {letter.decoration ? <IllustratedIcon kind={letter.decoration} /> : null}
    <span className="letter-envelope__state">{opened ? "opened" : "unread"}</span>
  </button>
);
