import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { siteConfig } from "../data/siteConfig";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SiteProgressContextValue {
  visitedPages: string[];
  markVisited: (path: string) => void;
  hasVisitedAllMainSections: boolean;
  secretUnlocked: boolean;
  unlockSecret: () => void;
  starCount: number;
  collectStar: () => void;
  flowerCount: number;
  discoveredFlowers: string[];
  discoverFlower: (flower: string) => void;
  flowerCoins: number;
  earnCoins: (amount: number) => void;
  badges: string[];
  unlockBadge: (badge: string) => void;
  visitedFriendProfiles: string[];
  markFriendProfileVisited: (friendId: string) => void;
  dayMode: "day" | "night";
  toggleDayMode: () => void;
  hiddenNoteFound: boolean;
}

const SiteProgressContext = createContext<SiteProgressContextValue | null>(null);

export const SiteProgressProvider = ({ children }: PropsWithChildren) => {
  const [visitedPages, setVisitedPages] = useLocalStorage<string[]>("blues-world-visited-pages", []);
  const [secretUnlocked, setSecretUnlocked] = useLocalStorage("blues-world-secret-unlocked", false);
  const [starCount, setStarCount] = useLocalStorage("blues-world-star-count", 0);
  const [discoveredFlowers, setDiscoveredFlowers] = useLocalStorage<string[]>("blues-world-discovered-flowers", []);
  const [flowerCoins, setFlowerCoins] = useLocalStorage("blues-world-flower-coins", 0);
  const [badges, setBadges] = useLocalStorage<string[]>("blues-world-badges", []);
  const [visitedFriendProfiles, setVisitedFriendProfiles] = useLocalStorage<string[]>(
    "blues-world-visited-friend-profiles",
    []
  );
  const [dayMode, setDayMode] = useLocalStorage<"day" | "night">("blues-world-day-mode", "day");

  const markVisited = useCallback((path: string) => {
    if (!siteConfig.mainSections.includes(path)) return;
    setVisitedPages((current) => (current.includes(path) ? current : [...current, path]));
  }, [setVisitedPages]);

  const unlockSecret = useCallback(() => setSecretUnlocked(true), [setSecretUnlocked]);

  const collectStar = useCallback(() => {
    setStarCount((current) => Math.min(7, current + 1));
    setFlowerCoins((current) => current + 2);
  }, [setFlowerCoins, setStarCount]);

  const discoverFlower = useCallback((flower: string) => {
    setDiscoveredFlowers((current) => (current.includes(flower) ? current : [...current, flower]));
    setFlowerCoins((current) => current + 3);
  }, [setDiscoveredFlowers, setFlowerCoins]);

  const earnCoins = useCallback(
    (amount: number) => setFlowerCoins((current) => Math.max(0, current + amount)),
    [setFlowerCoins]
  );

  const unlockBadge = useCallback(
    (badge: string) => setBadges((current) => (current.includes(badge) ? current : [...current, badge])),
    [setBadges]
  );

  const markFriendProfileVisited = useCallback(
    (friendId: string) =>
      setVisitedFriendProfiles((current) => (current.includes(friendId) ? current : [...current, friendId])),
    [setVisitedFriendProfiles]
  );

  const toggleDayMode = useCallback(
    () => setDayMode((current) => (current === "day" ? "night" : "day")),
    [setDayMode]
  );

  const hasVisitedAllMainSections = useMemo(
    () => siteConfig.mainSections.every((path) => visitedPages.includes(path)),
    [visitedPages]
  );

  const value = useMemo<SiteProgressContextValue>(
    () => ({
      visitedPages,
      markVisited,
      hasVisitedAllMainSections,
      secretUnlocked,
      unlockSecret,
      starCount,
      collectStar,
      flowerCount: discoveredFlowers.length,
      discoveredFlowers,
      discoverFlower,
      flowerCoins,
      earnCoins,
      badges,
      unlockBadge,
      visitedFriendProfiles,
      markFriendProfileVisited,
      dayMode,
      toggleDayMode,
      hiddenNoteFound: starCount >= 7
    }),
    [
      badges,
      collectStar,
      dayMode,
      discoverFlower,
      discoveredFlowers,
      earnCoins,
      flowerCoins,
      hasVisitedAllMainSections,
      markFriendProfileVisited,
      markVisited,
      secretUnlocked,
      starCount,
      toggleDayMode,
      unlockBadge,
      unlockSecret,
      visitedFriendProfiles,
      visitedPages
    ]
  );

  return <SiteProgressContext.Provider value={value}>{children}</SiteProgressContext.Provider>;
};

export const useSiteProgress = () => {
  const context = useContext(SiteProgressContext);
  if (!context) throw new Error("useSiteProgress must be used inside SiteProgressProvider");
  return context;
};
