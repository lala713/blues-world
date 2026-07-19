import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { btsPictureById, btsPictures, type BtsPicture } from "./data/btsPictures";
import { friends, type FriendProfile } from "./data/friends";
import { letters, type Letter } from "./data/letters";
import { playlistTracks, type PlaylistTrack } from "./data/playlist";
import { reasons } from "./data/reasons";
import { secretMessages } from "./data/secretMessages";
import { siteConfig } from "./data/siteConfig";
import { assetPath } from "./utils/assets";
import { formatAudioTime, getCalendarDuration } from "./utils/time";

const asset = (path?: string) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  if (path.startsWith(import.meta.env.BASE_URL)) return path;
  return assetPath(path);
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
const hasImagePath = (path?: string) => typeof path === "string" && path.trim().length > 0;
const hasText = (value?: string): value is string => typeof value === "string" && value.trim().length > 0;
const navPaths = siteConfig.navigation.map((item) => item.path);

const normalizePath = (pathname: string) => {
  if (pathname.startsWith("/oomfs/")) return "/oomfs";
  if (pathname.startsWith("/friends/") || pathname === "/friends") return "/oomfs";
  if (pathname === "/songs") return "/playlist";
  return pathname;
};

const renderParagraphs = (text: string) =>
  text.split(/\n{2,}/).map((paragraph) => <p className="preserve-lines" key={paragraph}>{paragraph}</p>);

const reasonEntries = (friend: FriendProfile) =>
  [
    ["One thing I admire about you", friend.reasons.admire],
    ["One funny thing you always do", friend.reasons.funnyThing],
    ["One favorite memory with you", friend.reasons.favoriteMemory],
    ["One wish for you this year", friend.reasons.wishForThisYear]
  ].filter((entry): entry is [string, string] => hasText(entry[1]));

const hasVisibleInsideJokes = (friend: FriendProfile) =>
  Boolean(friend.insideJokes?.some((item) => hasText(item.text) || hasImagePath(item.image)));

const hasFavoriteQuotes = (friend: FriendProfile) =>
  Boolean(friend.favoriteQuotes?.some((item) => hasText(item.quote)));

const hasPlaylistSongs = (friend: FriendProfile) => friend.playlistSongs.some((song) => hasText(song.title) && hasText(song.artist));
const hasReasons = (friend: FriendProfile) => reasonEntries(friend).length > 0;
const hasLetterText = (friend: FriendProfile) => Boolean(friend.letter.body.some((paragraph) => hasText(paragraph)));
const hasSecretMessage = (friend: FriendProfile) => hasText(friend.secretMessage);
const submittedDateLabel = (friend: FriendProfile) => {
  if (hasText(friend.friendsSinceLabel)) return friend.friendsSinceLabel;
  if (!hasText(friend.friendsSince)) return "";

  const parsedDate = new Date(friend.friendsSince);
  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
const usesApproximateTimer = (friend: FriendProfile) =>
  hasText(friend.friendsSince) &&
  (friend.friendshipDatePrecision === "year" || friend.friendshipDatePrecision === "month" || friend.friendshipDatePrecision === "approximate");
const possessive = (name: string) => `${name}'s`;
const profileContextEntries = (friend: FriendProfile) =>
  [
    ["When we met", friend.friendship?.whenWeMet],
    ["First impression", friend.friendship?.firstImpression],
    ["Now", friend.friendship?.impressionNow]
  ].filter((entry): entry is [string, string] => hasText(entry[1]));

interface PhotoProps {
  src?: string;
  alt: string;
  label?: string;
  variant?: "avatar" | "wide" | "letter" | "mini";
  className?: string;
}

const CatAvatarFallback = ({ label, variant = "avatar", className, alt }: PhotoProps) => (
  <div className={cx("cat-avatar", `cat-avatar--${variant}`, className)} role="img" aria-label={alt}>
    <span className="cat-avatar__ears" aria-hidden="true" />
    <span className="cat-avatar__face" aria-hidden="true" />
    <strong>{label || "Friend"}</strong>
  </div>
);

const Photo = ({ src, alt, label, variant = "wide", className }: PhotoProps) => {
  const [failed, setFailed] = useState(!hasImagePath(src));

  useEffect(() => {
    setFailed(!hasImagePath(src));
  }, [src]);

  if (failed) return <CatAvatarFallback src={src} alt={alt} label={label} variant={variant} className={className} />;

  return (
    <img
      className={cx("photo", `photo--${variant}`, className)}
      src={asset(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
};

const SafeImage = ({
  src,
  alt,
  className,
  style,
  onFailure
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  onFailure?: () => void;
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        setFailed(true);
        onFailure?.();
      }}
      loading="lazy"
      decoding="async"
    />
  );
};

const BtsPhoto = ({ id, small = false, showCaption = false }: { id: string; small?: boolean; showCaption?: boolean }) => {
  const photo = btsPictureById[id] as BtsPicture | undefined;
  if (!photo) return null;

  return (
    <figure className={cx("bts-photo", small && "bts-photo--small")}>
      <SafeImage src={photo.src} alt={photo.alt} />
      {showCaption && photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
    </figure>
  );
};

const FloatingDecor = () => (
  <div className="decor-layer" aria-hidden="true">
    <span className="decor-cloud decor-cloud--one" />
    <span className="decor-cloud decor-cloud--two" />
    <span className="decor-bow decor-bow--one" />
    <span className="decor-bow decor-bow--two" />
    <span className="decor-cat decor-cat--one" />
    <span className="decor-cat decor-cat--two" />
    <span className="decor-petal decor-petal--one" />
    <span className="decor-petal decor-petal--two" />
    <span className="decor-petal decor-petal--three" />
  </div>
);

const Modal = ({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close">
          x
        </button>
        {children}
      </div>
    </div>
  );
};

const useBirthdayCountdown = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const month = siteConfig.birthdayMonth - 1;
    const isBirthday = now.getMonth() === month && now.getDate() === siteConfig.birthdayDay;
    const thisYear = new Date(now.getFullYear(), month, siteConfig.birthdayDay);
    const nextBirthday =
      now.getTime() < thisYear.getTime() || isBirthday
        ? thisYear
        : new Date(now.getFullYear() + 1, month, siteConfig.birthdayDay);
    const diff = Math.max(0, nextBirthday.getTime() - now.getTime());

    return {
      isBirthday,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
  }, [now]);
};

const Countdown = ({ compact = false }: { compact?: boolean }) => {
  const countdown = useBirthdayCountdown();
  return (
    <section className={cx("countdown", compact && "countdown--compact", countdown.isBirthday && "countdown--birthday")} aria-live="polite">
      <p>{countdown.isBirthday ? "Happy July 20" : "July 20 countdown"}</p>
      <div className="countdown-grid">
        {[
          ["Days", countdown.days],
          ["Hours", countdown.hours],
          ["Minutes", countdown.minutes],
          ["Seconds", countdown.seconds]
        ].map(([label, value]) => (
          <span key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </span>
        ))}
      </div>
    </section>
  );
};

const FriendshipSince = ({ friend, compact = false }: { friend: FriendProfile; compact?: boolean }) => {
  const [now, setNow] = useState(() => new Date());
  const dateLabel = submittedDateLabel(friend);

  useEffect(() => {
    if (!hasText(friend.friendsSince)) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [friend.friendsSince]);

  if (!hasText(friend.friendsSince) || !dateLabel) {
    return <p className={cx("friend-date-pending", compact && "friend-date-pending--compact")}>Friendship date will be added soon.</p>;
  }

  const time = getCalendarDuration(friend.friendsSince, now);
  return (
    <div className={cx("friendship-timer-wrap", compact && "friendship-timer-wrap--compact")}>
      <p className="friend-date-label">Friends since: {dateLabel}</p>
      {usesApproximateTimer(friend) ? <p className="friend-date-note">Approximate timer based on the submitted date.</p> : null}
      <div className={cx("friendship-timer", compact && "friendship-timer--compact")} aria-live="polite">
        {[
          ["Years", time.years],
          ["Months", time.months],
          ["Days", time.days],
          ["Hours", time.hours],
          ["Minutes", time.minutes],
          ["Seconds", time.seconds]
        ].map(([label, value]) => (
          <span key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </span>
        ))}
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = normalizePath(location.pathname);
  const index = Math.max(0, navPaths.indexOf(activePath));
  const previous = navPaths[(index - 1 + navPaths.length) % navPaths.length];
  const next = navPaths[(index + 1) % navPaths.length];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <FloatingDecor />
      <header className="site-header">
        <div className="site-shell site-header__inner">
          <Link className="brand" to="/">Blue's World</Link>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
            Menu
          </button>
          <nav className={cx("nav", menuOpen && "nav--open")} aria-label="Main navigation">
            {siteConfig.navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => cx(isActive && "active")}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <nav className="page-controls site-shell" aria-label="Page controls">
        <Link to="/">Home</Link>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
        <Link to={previous}>Previous</Link>
        <Link to={next}>Next</Link>
      </nav>

      <main id="main" className="site-main">
        {children}
      </main>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {siteConfig.navigation.map((item) => (
          <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
        ))}
      </nav>
    </>
  );
};

const PageIntro = ({ label, title, children, btsId }: { label: string; title: string; children: ReactNode; btsId?: string }) => (
  <section className="page-intro site-shell">
    <div>
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
    {btsId ? <BtsPhoto id={btsId} small /> : null}
  </section>
);

const HomePage = () => (
  <div className="page-stack">
    <section className="home-title-screen site-shell">
      <div className="home-sky" aria-hidden="true">
        <span className="home-cloud home-cloud--one" />
        <span className="home-cloud home-cloud--two" />
        <span className="home-cat home-cat--one" />
        <span className="home-cat home-cat--two" />
        <span className="home-flower home-flower--one" />
        <span className="home-flower home-flower--two" />
      </div>

      <div className="hanging-photos" aria-label="BTS and SUGA photo frames">
        <BtsPhoto id="photo-01" small />
        <BtsPhoto id="photo-03" small />
        <BtsPhoto id="photo-08" small />
      </div>

      <div className="hero-copy">
        <span className="eyebrow">July 20</span>
        <h1>Blue's World</h1>
        <p>A little world made with love for Blue.</p>
        <div className="hero-actions">
          <Link className="primary-button sparkle-button" to="/oomfs">Enter Blue's World</Link>
          <Link className="soft-button" to="/letters">Read the Letters</Link>
        </div>
      </div>

      <Countdown compact />

      <div className="friend-stars" aria-label="Friend stars">
        {friends.map((friend, index) => (
          <span key={friend.id} title={friend.displayName} style={{ animationDelay: `${index * 90}ms` }} />
        ))}
      </div>

      <nav className="home-shortcuts" aria-label="Blue's World shortcuts">
        {siteConfig.giftMenu.map((item, index) => (
          <Link className="shortcut-object" key={item.path} to={item.path} style={{ animationDelay: `${index * 70}ms` }}>
            <span aria-hidden="true" />
            <strong>{item.title}</strong>
            <small>{item.label}</small>
          </Link>
        ))}
      </nav>
    </section>
  </div>
);

const OomfsPage = () => (
  <div className="page-stack">
    <PageIntro label="Friends" title="Meet Blue's Friends" btsId="photo-03">
      Every submitted profile gathers its timer, letter, reasons, playlist songs, memories, and final message in one illustrated place.
    </PageIntro>
    <section className="profile-grid site-shell">
      {friends.map((friend, index) => (
        <article className="profile-card illustrated-card" key={friend.id} style={{ animationDelay: `${index * 35}ms` }}>
          <Photo src={friend.profileImage} alt={`${friend.displayName} profile`} label={friend.displayName} variant="avatar" />
          <div>
            <h2>{friend.displayName}</h2>
            {hasText(friend.username) ? <p>{friend.username}</p> : null}
            {hasText(friend.metAt) ? <small>{friend.metAt}</small> : null}
          </div>
          <FriendshipSince friend={friend} compact />
          <div className="button-row">
            <Link className="soft-button" to={`/oomfs/${friend.id}`}>Open Profile</Link>
            {hasText(friend.twitterUrl) ? (
              <a className="text-button" href={friend.twitterUrl} target="_blank" rel="noopener noreferrer">Twitter/X</a>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  </div>
);

const useVisibleProfilePhotos = (photos?: FriendProfile["photos"]) => {
  const configuredPhotos = useMemo(() => (photos || []).filter((photo) => hasImagePath(photo.image)), [photos]);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    setLoadedIndexes(new Set());
    let cancelled = false;

    configuredPhotos.forEach((photo, index) => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;
        setLoadedIndexes((current) => new Set(current).add(index));
      };
      image.onerror = () => undefined;
      image.src = asset(photo.image);
    });

    return () => {
      cancelled = true;
    };
  }, [configuredPhotos]);

  return useMemo(() => configuredPhotos.filter((_, index) => loadedIndexes.has(index)), [configuredPhotos, loadedIndexes]);
};

const LetterImagePanel = ({ image, alt, sender, onOpen }: { image?: string; alt: string; sender: string; onOpen: () => void }) => {
  const [status, setStatus] = useState<"missing" | "checking" | "ready">(() => (hasImagePath(image) ? "checking" : "missing"));

  useEffect(() => {
    if (!hasImagePath(image)) {
      setStatus("missing");
      return;
    }

    setStatus("checking");
    let cancelled = false;
    const preview = new Image();
    preview.onload = () => {
      if (!cancelled) setStatus("ready");
    };
    preview.onerror = () => {
      if (!cancelled) setStatus("missing");
    };
    preview.src = asset(image);

    return () => {
      cancelled = true;
    };
  }, [image]);

  if (status !== "ready") {
    return (
      <div className="letter-missing" role="note">
        <span aria-hidden="true" />
        <strong>{status === "checking" ? "Loading letter image..." : "The illustrated version of this letter will be added soon."}</strong>
      </div>
    );
  }

  return (
    <button className="letter-art-viewer" type="button" onClick={onOpen} aria-label={`Enlarge ${sender}'s illustrated letter`}>
      <SafeImage className="letter-art letter-art-image" src={asset(image)} alt={alt} />
      <span>Tap to enlarge</span>
    </button>
  );
};

const ProfileReasonSection = ({ friend }: { friend: FriendProfile }) => {
  const entries = reasonEntries(friend);
  if (!entries.length) return null;

  return (
    <article id="reasons" className="profile-note profile-section">
      <h2>Reasons We Love You</h2>
      {entries.map(([label, value]) => (
        <div className="profile-answer" key={label}>
          <h3>{label}</h3>
          {renderParagraphs(value)}
        </div>
      ))}
    </article>
  );
};

const ProfilePlaylistSection = ({ friend }: { friend: FriendProfile }) => {
  const songs = friend.playlistSongs.filter((song) => hasText(song.title) && hasText(song.artist));
  if (!songs.length) return null;

  return (
    <article id="playlist" className="profile-note profile-section">
      <h2>Playlist Songs</h2>
      {songs.map((song) => {
        const link = song.spotifyUrl?.trim() || song.youtubeUrl?.trim();
        return (
          <div className="mini-song" key={`${song.title}-${song.artist}`}>
            <strong>{song.title}</strong>
            <span>{song.artist}</span>
            {hasText(song.reason) ? renderParagraphs(song.reason) : null}
            {link ? <a className="text-button" href={link} target="_blank" rel="noopener noreferrer">Open song</a> : null}
          </div>
        );
      })}
    </article>
  );
};

const ProfileBirthdayEditSection = ({ friend }: { friend: FriendProfile }) => {
  const edit = friend.birthdayEdit;
  if (!edit) return null;

  return (
    <article id="birthday-edit" className="profile-note profile-section profile-note--wide birthday-edit-section">
      <h2>{edit.title}</h2>
      <p className="friend-video-description">{edit.description}</p>
      <div className="friend-video-frame">
        <video className="friend-video" controls playsInline preload="metadata">
          <source src={edit.videoSrc} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
      </div>
    </article>
  );
};

const FavoriteQuotesSection = ({ friend }: { friend: FriendProfile }) => {
  const quotes = (friend.favoriteQuotes || []).filter((quote) => hasText(quote.quote));
  if (!quotes.length) return null;

  return (
    <article id="quotes" className="profile-note profile-section">
      <h2>Favorite Quotes</h2>
      <div className="quote-list">
        {quotes.map((quote) => (
          <blockquote className="quote-note" key={`${friend.id}-${quote.quote}`}>
            <p>{quote.quote}</p>
            {hasText(quote.context) ? <cite>{quote.context}</cite> : null}
          </blockquote>
        ))}
      </div>
    </article>
  );
};

type ProfileMemoryPhoto = NonNullable<FriendProfile["photos"]>[number];
type ProfileInsideJoke = NonNullable<FriendProfile["insideJokes"]>[number];

const ProfileMemoryGallery = ({
  photos,
  friendName,
  title = "Favorite Pictures"
}: {
  photos: ProfileMemoryPhoto[];
  friendName: string;
  title?: string;
}) => {
  const [activePhoto, setActivePhoto] = useState<NonNullable<FriendProfile["photos"]>[number] | null>(null);
  if (!photos.length) return null;

  return (
    <article id="photos" className="profile-note profile-section profile-note--wide">
      <h2>{title}</h2>
      <div className="profile-memory-grid">
        {photos.map((photo, index) => (
          <button
            className="profile-memory-card"
            key={`${photo.image}-${index}`}
            type="button"
            onClick={() => setActivePhoto(photo)}
            aria-label={`Enlarge ${friendName}'s favorite picture ${index + 1}`}
          >
            <SafeImage
              className="profile-memory-image"
              src={asset(photo.image)}
              alt={`${friendName}'s favorite picture ${index + 1}`}
            />
            {hasText(photo.explanation) ? <span className="profile-memory-explanation">{photo.explanation}</span> : null}
          </button>
        ))}
      </div>
      {activePhoto ? (
        <Modal title={`${friendName}'s favorite picture`} onClose={() => setActivePhoto(null)}>
          <figure className="profile-memory-lightbox">
            <SafeImage
              className="profile-memory-modal-image"
              src={asset(activePhoto.image)}
              alt={`${friendName}'s favorite picture`}
            />
            {hasText(activePhoto.explanation) ? <figcaption>{activePhoto.explanation}</figcaption> : null}
          </figure>
        </Modal>
      ) : null}
    </article>
  );
};

const InsideJokeCard = ({ joke, friendName }: { joke: ProfileInsideJoke; friendName: string }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [activeJoke, setActiveJoke] = useState<ProfileInsideJoke | null>(null);
  const showText = hasText(joke.text);
  const showImage = hasImagePath(joke.image) && !imageFailed;

  if (!showText && !showImage) return null;

  return (
    <div className="inside-joke-card">
      {showImage ? (
        <button
          className="inside-joke-image-button"
          type="button"
          onClick={() => setActiveJoke(joke)}
          aria-label={`Enlarge ${friendName}'s inside joke picture`}
        >
          <SafeImage
            className="profile-memory-image"
            src={asset(joke.image)}
            alt={`${friendName}'s inside joke`}
            onFailure={() => setImageFailed(true)}
          />
        </button>
      ) : null}
      {showText ? <p>{joke.text}</p> : null}
      {activeJoke && hasImagePath(activeJoke.image) ? (
        <Modal title={`${friendName}'s inside joke`} onClose={() => setActiveJoke(null)}>
          <figure className="profile-memory-lightbox">
            <SafeImage
              className="profile-memory-modal-image"
              src={asset(activeJoke.image)}
              alt={`${friendName}'s inside joke`}
            />
            {hasText(activeJoke.text) ? <figcaption>{activeJoke.text}</figcaption> : null}
          </figure>
        </Modal>
      ) : null}
    </div>
  );
};

const InsideJokesSection = ({
  jokes,
  friendName,
  title
}: {
  jokes?: FriendProfile["insideJokes"];
  friendName: string;
  title: string;
}) => {
  const visibleJokes = (jokes || []).filter((joke) => hasText(joke.text) || hasImagePath(joke.image));
  if (!visibleJokes.length) return null;

  return (
    <article id="inside-jokes" className="profile-note profile-section">
      <h2>{title}</h2>
      <div className="inside-joke-list">
        {visibleJokes.map((joke, index) => (
          <InsideJokeCard joke={joke} friendName={friendName} key={`${friendName}-joke-${index}`} />
        ))}
      </div>
    </article>
  );
};

const SecretMessageSection = ({ friend }: { friend: FriendProfile }) => {
  if (!hasSecretMessage(friend)) return null;

  return (
    <article id="secret-message" className="profile-note profile-section">
      <h2>Secret Ending Message</h2>
      {renderParagraphs(friend.secretMessage || "")}
    </article>
  );
};

const OomfProfilePage = () => {
  const { friendId } = useParams();
  const friend = friends.find((item) => item.id === friendId);
  const friendIndex = Math.max(0, friends.findIndex((item) => item.id === friendId));
  const [expandedLetter, setExpandedLetter] = useState(false);
  const [letterZoom, setLetterZoom] = useState(1);
  const [profileTextOpen, setProfileTextOpen] = useState(false);
  const visiblePhotos = useVisibleProfilePhotos(friend?.photos);

  if (!friend) return <NotFoundPage />;

  const contextEntries = profileContextEntries(friend);
  const sections = [
    { id: "letter", label: "Letter", show: hasImagePath(friend.letter.image) || hasLetterText(friend) },
    { id: "birthday-edit", label: "Birthday Edit", show: Boolean(friend.birthdayEdit) },
    { id: "reasons", label: "Reasons", show: hasReasons(friend) },
    { id: "playlist", label: "Playlist", show: hasPlaylistSongs(friend) },
    { id: "quotes", label: "Favorite Quotes", show: hasFavoriteQuotes(friend) },
    { id: "photos", label: "Favorite Pictures", show: visiblePhotos.length > 0 },
    { id: "inside-jokes", label: friend.id === "lala" ? "Little Things" : "Inside Jokes", show: hasVisibleInsideJokes(friend) },
    { id: "secret-message", label: "Secret Message", show: hasSecretMessage(friend) }
  ].filter((section) => section.show);

  return (
    <div className="page-stack">
      <section className="profile-detail reading-shell">
        <div className="profile-top">
          <Photo src={friend.profileImage} alt={`${friend.displayName} profile`} label={friend.displayName} variant="avatar" />
          <div>
            <span className="eyebrow">Friend profile</span>
            <h1>{friend.displayName}</h1>
            {hasText(friend.username) ? <p>{friend.username}</p> : null}
            {hasText(friend.metAt) ? <p>{friend.metAt}</p> : null}
            {hasText(friend.twitterUrl) ? (
              <a className="text-button" href={friend.twitterUrl} target="_blank" rel="noopener noreferrer">Visit Twitter/X profile</a>
            ) : null}
          </div>
        </div>
        <FriendshipSince friend={friend} />
        {contextEntries.length ? (
          <div className="profile-context-notes" aria-label={`${friend.displayName} profile notes`}>
            {contextEntries.map(([label, value]) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        ) : null}
        {sections.length ? (
          <nav className="profile-section-nav" aria-label={`${friend.displayName} profile sections`}>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </nav>
        ) : null}
      </section>

      <section className="profile-sections reading-shell">
        <article id="letter" className="profile-note profile-section profile-note--wide">
          <h2>Letter</h2>
          <div className="letter-mode-tabs" role="group" aria-label="Letter view options">
            <button className="active" type="button" onClick={() => setProfileTextOpen(false)}>
              View Illustrated Letter
            </button>
            <button type="button" onClick={() => setProfileTextOpen(true)}>
              Read as text
            </button>
          </div>
          <LetterImagePanel
            image={friend.letter.image}
            alt={friend.letter.imageAlt || `${friend.displayName}'s illustrated birthday letter to Blue`}
            sender={friend.displayName}
            onOpen={() => setExpandedLetter(true)}
          />
        </article>
        <ProfileBirthdayEditSection friend={friend} />
        <ProfileReasonSection friend={friend} />
        <ProfilePlaylistSection friend={friend} />
        <FavoriteQuotesSection friend={friend} />
        <ProfileMemoryGallery photos={visiblePhotos} friendName={friend.displayName} />
        <InsideJokesSection
          jokes={friend.insideJokes}
          friendName={friend.displayName}
          title={friend.id === "lala" ? "Little Things That Make Me Laugh" : "Memories & Inside Jokes"}
        />
        <SecretMessageSection friend={friend} />
      </section>

      <section className="profile-photo-strip reading-shell">
        <BtsPhoto id={`photo-${String((friendIndex % 8) + 1).padStart(2, "0")}`} small />
        <BtsPhoto id={`photo-${String(((friendIndex + 3) % 8) + 1).padStart(2, "0")}`} small />
      </section>

      {expandedLetter && hasImagePath(friend.letter.image) ? (
        <Modal title={friend.letter.imageAlt || `${friend.displayName}'s letter`} onClose={() => setExpandedLetter(false)}>
          <div className="letter-modal-tools">
            <label>
              Zoom
              <input type="range" min="1" max="2.2" step="0.1" value={letterZoom} onChange={(event) => setLetterZoom(Number(event.target.value))} />
            </label>
          </div>
          <div className="letter-modal-scroll">
            <SafeImage
              className="letter-art letter-art--modal"
              src={asset(friend.letter.image)}
              alt={friend.letter.imageAlt || `${friend.displayName}'s illustrated birthday letter to Blue`}
              style={{ transform: `scale(${letterZoom})`, transformOrigin: "top center" }}
            />
          </div>
        </Modal>
      ) : null}
      {profileTextOpen ? (
        <Modal title={`${friend.displayName}'s letter text`} onClose={() => setProfileTextOpen(false)}>
          {hasLetterText(friend) ? (
            <div className="letter-text profile-letter-text">
              <h2>{friend.letter.title || `${possessive(friend.displayName)} letter`}</h2>
              <div className="letter-body">
                {friend.letter.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
              </div>
            </div>
          ) : (
            <div className="letter-missing" role="note">
              <span aria-hidden="true" />
              <strong>The text version of this letter will be added soon.</strong>
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
};

const LetterText = ({ letter }: { letter: Letter }) => {
  if (!letter.body.some((paragraph) => hasText(paragraph))) return null;

  return (
    <div className="letter-text">
      <h2>{letter.title || `${possessive(letter.sender)} letter`}</h2>
      <div className="letter-body">
        {letter.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
      </div>
    </div>
  );
};

const LetterArt = ({ letter, onOpen }: { letter: Letter; onOpen: () => void }) => {
  return (
    <LetterImagePanel
      image={letter.image}
      alt={letter.imageAlt || `${letter.sender} letter image`}
      sender={letter.sender}
      onOpen={onOpen}
    />
  );
};

const LettersPage = () => {
  const lalaIndex = Math.max(0, letters.findIndex((letter) => letter.friendId === "lala"));
  const [selected, setSelected] = useState(lalaIndex);
  const [showText, setShowText] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const active = letters[selected];
  const activeHasText = active.body.some((paragraph) => hasText(paragraph));

  useEffect(() => {
    setShowText(false);
    setExpanded(false);
    setZoom(1);
  }, [active]);

  const move = (direction: number) => {
    setSelected((current) => (current + direction + letters.length) % letters.length);
  };

  return (
    <div className="page-stack">
      <PageIntro label="Letters For Blue" title="Read the Letters" btsId="photo-04">
        Illustrated and accessible text letters, arranged like a soft blue notebook spread.
      </PageIntro>

      <section className="letters-layout reading-shell">
        <div className="letter-list" aria-label="Letter senders">
          {letters.map((letter, index) => (
            <button
              key={letter.id}
              className={cx(selected === index && "active")}
              type="button"
              onClick={() => setSelected(index)}
            >
              <Photo src={letter.friendPhoto} alt={letter.sender} label={letter.sender} variant="avatar" />
              <span>
                <strong>{letter.sender}</strong>
                {hasText(letter.username) ? <small>{letter.username}</small> : null}
              </span>
              {hasImagePath(letter.image) ? <em>art</em> : null}
            </button>
          ))}
        </div>

        <article className="letter-display">
          <header className="letter-display__header">
            <Photo src={active.friendPhoto} alt={active.sender} label={active.sender} variant="avatar" />
            <div>
              <span className="eyebrow">Letter {String(active.number).padStart(2, "0")}</span>
              <h2>{active.sender}</h2>
              {hasText(active.username) ? <p>{active.username}</p> : null}
            </div>
          </header>
          <div className="letter-mode-tabs" role="group" aria-label="Letter view options">
            <button className={cx(!showText && "active")} type="button" onClick={() => setShowText(false)}>
              View Illustrated Letter
            </button>
            <button className={cx(showText && "active")} type="button" onClick={() => setShowText(true)}>
              Read as text
            </button>
          </div>
          <LetterArt letter={active} onOpen={() => setExpanded(true)} />
          <div className="button-row">
            <Link className="soft-button" to={`/oomfs/${active.friendId}`}>Open {possessive(active.sender)} Profile</Link>
            <button className="text-button" type="button" onClick={() => move(-1)}>Previous</button>
            <button className="text-button" type="button" onClick={() => move(1)}>Next</button>
          </div>
        </article>
      </section>

      {expanded && hasImagePath(active.image) ? (
        <Modal title={active.imageAlt || "Illustrated letter"} onClose={() => setExpanded(false)}>
          <div className="letter-modal-tools">
            <label>
              Zoom
              <input type="range" min="1" max="2.2" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
            </label>
          </div>
          <div className="letter-modal-scroll">
            <SafeImage
              className="letter-art letter-art--modal"
              src={asset(active.image)}
              alt={active.imageAlt || `${active.sender} letter image`}
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
            />
          </div>
        </Modal>
      ) : null}
      {showText ? (
        <Modal title={`${active.sender}'s letter text`} onClose={() => setShowText(false)}>
          {activeHasText ? (
            <LetterText letter={active} />
          ) : (
            <div className="letter-missing" role="note">
              <span aria-hidden="true" />
              <strong>The text version of this letter will be added soon.</strong>
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
};

const flowerStyle = (index: number, total: number) => {
  const progress = total <= 1 ? 0.5 : index / (total - 1);
  const x = 8 + progress * 84;
  const y = 16 + ((index * 17) % 36);
  const tilt = -14 + ((index * 11) % 27);
  return {
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--tilt": `${tilt}deg`,
    animationDelay: `${index * 80}ms`
  } as CSSProperties;
};

const ReasonGarden = ({
  items,
  selectedId,
  onSelect,
  compact = false
}: {
  items: typeof reasons;
  selectedId?: string;
  onSelect?: (reasonId: string) => void;
  compact?: boolean;
}) => (
  <div className={cx("reason-garden", compact && "reason-garden--compact")} aria-label="Illustrated garden of reasons">
    <span className="garden-sun" aria-hidden="true" />
    <span className="garden-hill garden-hill--one" aria-hidden="true" />
    <span className="garden-hill garden-hill--two" aria-hidden="true" />
    <span className="garden-cat garden-cat--left" aria-hidden="true" />
    <span className="garden-cat garden-cat--right" aria-hidden="true" />
    <span className="garden-butterfly garden-butterfly--one" aria-hidden="true" />
    <span className="garden-butterfly garden-butterfly--two" aria-hidden="true" />
    <div className="garden-flower-field">
      {items.map((reason, index) => {
        const interactive = Boolean(onSelect);
        const content = (
          <>
            <span className={cx("garden-flower", `garden-flower--${index % 5}`)} aria-hidden="true" />
            <strong>{reason.friendName}</strong>
          </>
        );

        return interactive ? (
          <button
            key={reason.id}
            className={cx("garden-sign", selectedId === reason.id && "active")}
            type="button"
            style={flowerStyle(index, items.length)}
            onClick={() => onSelect?.(reason.id)}
          >
            {content}
          </button>
        ) : (
          <span key={reason.id} className="garden-sign" style={flowerStyle(index, items.length)}>
            {content}
          </span>
        );
      })}
    </div>
    <p className="garden-final-sign">Every flower grew from something kind someone wanted Blue to know.</p>
  </div>
);

const ReasonsPage = () => {
  const [grown, setGrown] = useState(false);
  const [selectedReasonId, setSelectedReasonId] = useState<string | undefined>(reasons[0]?.id);
  const selectedReason = reasons.find((reason) => reason.id === selectedReasonId) || reasons[0];

  return (
    <div className="page-stack">
      <PageIntro label="A Garden of Kindness" title="Reasons We Love You" btsId="photo-05">
        Every flower here represents a kind thought someone wanted to leave for Blue.
      </PageIntro>

      <section className="garden-panel site-shell">
        <div>
          <h2>A Garden of Reasons</h2>
          <p>Every friend left a small piece of kindness here. Open each flower to read what makes Blue so special to the people around her.</p>
        </div>
        <button className="primary-button sparkle-button" type="button" onClick={() => setGrown(true)}>Let the Garden Bloom</button>
        {grown ? <ReasonGarden items={reasons} selectedId={selectedReason?.id} onSelect={setSelectedReasonId} /> : null}
      </section>

      {grown && selectedReason ? (
        <section className="reason-detail-panel reading-shell">
          <article className={cx("reason-card illustrated-card", selectedReason.friendId === "lala" && "reason-card--lala")}>
            <header>
              <Photo src={selectedReason.profileImage} alt={selectedReason.friendName} label={selectedReason.friendName} variant="avatar" />
              <div>
                <span className="drawn-flower" aria-hidden="true" />
                <h2>{selectedReason.friendName}</h2>
                {hasText(selectedReason.username) ? <p>{selectedReason.username}</p> : null}
              </div>
            </header>
            {hasText(selectedReason.admire) ? (
              <>
                <h3>One thing I admire about you</h3>
                {renderParagraphs(selectedReason.admire)}
              </>
            ) : null}
            {hasText(selectedReason.funnyThing) ? (
              <>
                <h3>One funny thing you always do</h3>
                {renderParagraphs(selectedReason.funnyThing)}
              </>
            ) : null}
            {hasText(selectedReason.favoriteMemory) ? (
              <>
                <h3>One favorite memory with you</h3>
                {renderParagraphs(selectedReason.favoriteMemory)}
              </>
            ) : null}
            {hasText(selectedReason.wishForThisYear) ? (
              <>
                <h3>One wish for you this year</h3>
                {renderParagraphs(selectedReason.wishForThisYear)}
              </>
            ) : null}
          </article>
        </section>
      ) : null}
    </div>
  );
};

const CoverArt = ({ track }: { track: PlaylistTrack }) => {
  const [failed, setFailed] = useState(!hasImagePath(track.coverImage));

  useEffect(() => {
    setFailed(!hasImagePath(track.coverImage));
  }, [track.coverImage]);

  if (failed) {
    return (
      <div className="drawn-cd-fallback" aria-label={`Drawn CD fallback for ${track.title}`} role="img">
        <span />
        <strong>{track.title}</strong>
      </div>
    );
  }

  return <img className="album-cover" src={asset(track.coverImage)} alt={`${track.title} cover`} onError={() => setFailed(true)} />;
};

const PlaylistPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const track = playlistTracks[currentIndex] || playlistTracks[0];
  const hasAudio = hasImagePath(track.localAudio);
  const externalLink = track.externalLink || track.spotifyUrl || track.youtubeUrl || "";

  const categories = useMemo(() => ["All", ...Array.from(new Set(playlistTracks.map((item) => item.category).filter(Boolean)))], []);
  const filteredTracks = playlistTracks.filter((item) => {
    const matchesQuery = `${item.title} ${item.artist} ${item.addedBy}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (!audio) return;
    audio.pause();
    audio.src = hasAudio ? asset(track.localAudio) : "";
    if (hasAudio) audio.load();
  }, [hasAudio, track.id, track.localAudio]);

  const play = () => {
    if (!hasAudio || !audioRef.current) return;
    void audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const chooseTrack = (index: number) => {
    setCurrentIndex(index);
  };

  const go = (direction: number) => {
    if (shuffle && playlistTracks.length > 1) {
      randomTrack();
      return;
    }
    setCurrentIndex((current) => (current + direction + playlistTracks.length) % playlistTracks.length);
  };

  const randomTrack = () => {
    setCurrentIndex((current) => {
      if (playlistTracks.length < 2) return current;
      const next = Math.floor(Math.random() * playlistTracks.length);
      return next === current ? (next + 1) % playlistTracks.length : next;
    });
  };

  const onEnded = () => {
    if (repeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      play();
      return;
    }
    go(1);
  };

  return (
    <div className="page-stack">
      <PageIntro label="Playlist" title="Blue's Birthday Playlist" btsId="photo-06">
        Songs Chosen For Blue, with a cozy player, queue, large controls, and graceful disabled audio when a preview has not been added.
      </PageIntro>

      <section className={cx("music-player site-shell", isPlaying && hasAudio && "music-player--playing")}>
        <audio
          ref={audioRef}
          onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onEnded={onEnded}
          onError={() => setIsPlaying(false)}
        />

        <aside className="player-left">
          <span className="eyebrow">Now Playing</span>
          <div className="music-notes" aria-hidden="true">
            <span>♪</span>
            <span>♫</span>
            <span>♪</span>
          </div>
          <div className={cx("spinning-disc", isPlaying && hasAudio && "spinning-disc--playing")}>
            <CoverArt track={track} />
          </div>
          <div className="equalizer" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={cx("music-cat", isPlaying && hasAudio && "music-cat--playing")} aria-hidden="true">
            <span />
          </div>
          <BtsPhoto id="photo-08" small />
        </aside>

        <article className="player-center">
          <h2>{track.title}</h2>
          <p className="artist-line">{track.artist}</p>
          <div className="song-owner">
            <Photo src={track.friendPhoto} alt={track.addedBy} label={track.addedBy} variant="avatar" />
            <span>Added by {track.addedBy} {track.username}</span>
          </div>
          {hasText(track.reason) ? <p className="song-reason">{track.reason}</p> : null}
          {!hasAudio ? <p className="player-note">This track has a Spotify link but no local audio preview, so local playback is disabled.</p> : null}

          <div className="player-progress">
            <span>{formatAudioTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              disabled={!hasAudio}
              onChange={(event) => {
                const next = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = next;
                setCurrentTime(next);
              }}
              aria-label="Seek"
            />
            <span>{formatAudioTime(duration)}</span>
          </div>

          <div className="player-controls" aria-label="Playback controls">
            <button className="icon-button" type="button" onClick={() => go(-1)} aria-label="Previous track">Prev</button>
            <button className="primary-button" type="button" onClick={isPlaying ? pause : play} disabled={!hasAudio}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button className="icon-button" type="button" onClick={() => go(1)} aria-label="Next track">Next</button>
            <button className={cx("icon-button", shuffle && "active")} type="button" onClick={() => setShuffle((value) => !value)}>Shuffle</button>
            <button className={cx("icon-button", repeat && "active")} type="button" onClick={() => setRepeat((value) => !value)}>Repeat</button>
            <button className="icon-button" type="button" onClick={randomTrack}>Random</button>
          </div>

          <div className="volume-row">
            <button className="icon-button" type="button" onClick={() => setMuted((value) => !value)}>{muted ? "Unmute" : "Mute"}</button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume"
            />
          </div>

          {externalLink ? (
            <a className="soft-button cd-link" href={externalLink} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
          ) : (
            <button className="soft-button cd-link" type="button" disabled>Add Spotify or YouTube link</button>
          )}
        </article>

        <aside className="player-queue">
          <div className="queue-tools">
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search queue" aria-label="Search queue" />
            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Category filter">
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="queue-list" aria-label="Song queue">
            {filteredTracks.map((item) => {
              const index = playlistTracks.findIndex((trackItem) => trackItem.id === item.id);
              return (
                <button
                  className={cx("queue-card", index === currentIndex && "active")}
                  key={item.id}
                  type="button"
                  onClick={() => chooseTrack(index)}
                >
                  <Photo src={item.friendPhoto} alt={item.addedBy} label={item.addedBy} variant="mini" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.artist} - {item.addedBy}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
};

const FinalGiftPage = () => {
  const [opened, setOpened] = useState(false);
  const selectedPhotos = btsPictures.slice(0, 6);

  return (
    <div className="page-stack">
      <section className={cx("last-page sky-ending site-shell", opened && "last-page--open")}>
        <button className="book-button" type="button" onClick={() => setOpened(true)} aria-expanded={opened}>
          <span className="closed-book" aria-hidden="true">
            <span className="book-ribbon" />
            {friends.map((friend, index) => <i key={friend.id} style={{ animationDelay: `${index * 35}ms` }} />)}
          </span>
          <span className="eyebrow">Final Gift</span>
          <strong>The Sky We Made for You</strong>
          <em>Open the Last Page</em>
        </button>

        {opened ? (
          <div className="opened-book">
            <header className="final-top">
              <div>
                <span className="eyebrow">The Sky We Made for You</span>
                <h1>Happy Birthday, Blue</h1>
                <p>{siteConfig.finalLine}</p>
              </div>
              <Countdown compact />
            </header>

            <div className="final-photo-strip" aria-label="Selected BTS and SUGA photos">
              {selectedPhotos.map((photo) => (
                <figure key={photo.id}>
                  <SafeImage src={photo.src} alt={photo.alt} />
                </figure>
              ))}
            </div>

            <section className="final-icons" aria-label="Friend profile constellation">
              {friends.map((friend, index) => (
                <Photo key={friend.id} src={friend.profileImage} alt={friend.displayName} label={friend.displayName} variant="mini" className={`final-icon-${index}`} />
              ))}
            </section>

            <section className="final-message-grid">
              {secretMessages.map((message, index) => (
                <article key={message.id} className={cx(message.friendId === "lala" && "final-message--lala")} style={{ animationDelay: `${index * 45}ms` }}>
                  <Photo src={message.profileImage} alt={message.displayName} label={message.displayName} variant="avatar" />
                  <h2>{message.displayName}</h2>
                  {hasText(message.username) ? <p>{message.username}</p> : null}
                  {renderParagraphs(message.message)}
                  {hasText(friends.find((friend) => friend.id === message.friendId)?.twitterUrl) ? (
                    <a className="text-button" href={friends.find((friend) => friend.id === message.friendId)?.twitterUrl} target="_blank" rel="noopener noreferrer">Twitter/X</a>
                  ) : null}
                </article>
              ))}
            </section>

            <ReasonGarden items={reasons} compact />

            <div className="final-playlist-cta">
              <Link className="primary-button cd-link" to="/playlist">Open Blue's Birthday Playlist</Link>
            </div>

            <footer className="bottom-message">
              {renderParagraphs(siteConfig.finalMessage)}
            </footer>
          </div>
        ) : null}
      </section>
    </div>
  );
};

const NotFoundPage = () => (
  <section className="page-intro site-shell">
    <div>
      <span className="eyebrow">Missing page</span>
      <h1>Page Not Found</h1>
      <p>This section is not part of Blue's World.</p>
      <Link className="primary-button" to="/">Go Home</Link>
    </div>
  </section>
);

export const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/oomfs" element={<OomfsPage />} />
      <Route path="/friends" element={<OomfsPage />} />
      <Route path="/friends/:friendId" element={<OomfProfilePage />} />
      <Route path="/oomfs/:friendId" element={<OomfProfilePage />} />
      <Route path="/letters" element={<LettersPage />} />
      <Route path="/reasons" element={<ReasonsPage />} />
      <Route path="/playlist" element={<PlaylistPage />} />
      <Route path="/songs" element={<PlaylistPage />} />
      <Route path="/final-gift" element={<FinalGiftPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);
