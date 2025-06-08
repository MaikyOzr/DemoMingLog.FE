export enum MoodEnum {
    Broken = 0,
    Despair = 1,
    Depressed = 2,
    Upset = 3,
    Tense = 4,
    Neutral = 5,
    Focused = 6,
    Satisfied = 7,
    Inspired = 8,
    Happy = 9,
    Euphoric = 10
}

export interface JournalRequest {
    note: string;
    mood: MoodEnum;
    tag: string;
}

export interface UpdateJournalRequest {
    note: string;
    tag: string;
}

export interface JournalResponse {
    id: string;
    note: string;
    mood: MoodEnum;
    tag: string;
    createdAt: string;
    updatedAt: string | null;
} 

