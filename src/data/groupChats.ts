export interface GroupChatPrompt {
  id: string;
  setup: string[];
  options: string[];
  correctIndex: number;
  reaction: string;
  difficulty: number;
}

export const groupChatPrompts: GroupChatPrompt[] = [];
