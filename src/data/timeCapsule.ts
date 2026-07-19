export interface TimeCapsuleItem {
  id: string;
  title: string;
  type: "future-letter" | "wish" | "prediction" | "photo" | "voice-note" | "playlist";
  unlockDate: string;
  submittedBy: string;
  content: string;
}

export const timeCapsuleItems: TimeCapsuleItem[] = [];

// Public repositories expose all content, even locked items. Add only real submitted content here.
