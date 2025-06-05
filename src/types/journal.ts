export interface JournalRequest {
    note: string;
    mood: number;
    tag: string;
}

export interface JournalResponse {
    note: string;
    mood: number;
    tag: string;
    createdAt: string;
    updatedAt: string | "";
} 

