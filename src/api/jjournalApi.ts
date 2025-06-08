import api from "./axios";
import { JournalRequest, JournalResponse } from "../types/journal";
import { getToken } from "./getToken";

export const getJournal = async (): Promise<JournalResponse[]> => {
    getToken()
  const response = await api.get("/journal");
  return response.data;
};

export const getJournalById = async (id: string): Promise<JournalResponse> => {
    getToken()
    const response = await api.get(`/journal/${id}`);
    return response.data;
};

export const createJournal = async (data: JournalRequest): Promise<JournalResponse> => {
    getToken()
    const response = await api.post("/journal", data);
    return response.data;
};

export const updateJournal = async (id: string, data: Partial<JournalRequest>) => {
    const response = await api.patch(`/journal/${id}`, data);
    return response.data;
  };

export const deleteJournal = async (id: string): Promise<void> => {
    getToken()
    await api.delete(`/journal/${id}`);
};