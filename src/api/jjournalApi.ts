import { JournalResponse } from "../types/journal";
import api from "./axios";
import { getToken } from "./getToken";

export const getJournal = async(): Promise<JournalResponse[]> =>
{
    getToken()
    const res = await api.get("journal")
    return res.data;
}