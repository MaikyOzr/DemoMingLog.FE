import { useState } from "react";
import { JournalResponse } from "../types/journal";
import { getJournal, getJournalById } from "./jjournalApi";

export const useJournalFetcher = () => {
  const [entries, setEntries] = useState<JournalResponse[]>([]);
  const [entrie, setEntrie] = useState<JournalResponse>();

  const fetchEntries = async () => {
    try {
      const data = await getJournal();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch journals", err);
    }
  };

  const fetchEntrie = async (id: string) => {
    try {
      const data = await getJournalById(id);
      setEntrie(data);
    } catch (err) {
      console.error("Failed to fetch journal", err);
    }
  };

  return { entries, entrie, fetchEntries, fetchEntrie };
};