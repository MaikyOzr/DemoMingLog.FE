import { useEffect, useState } from "react";
import { JournalRequest, JournalResponse } from "../types/journal";
import api from "../api/axios";
import { getToken } from "../api/getToken";
import { getJournal } from "../api/jjournalApi";

export const Journal = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<JournalRequest>({
    note: "",
    mood: 0,
    tag: "",
  });
  const [entries, setEntries] = useState<JournalResponse[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await getJournal();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch journals", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      getToken();
      const dataToSend = { ...formData, mood: Number(formData.mood) };
      await api.post("/journal", dataToSend);
      setFormData({ note: "", mood: 0, tag: "" });
      fetchEntries();
    } catch (err: any) {
      setError(err.response?.data?.message || "Journal failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Journal</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Note"
          className="border p-2"
        />
        <input
          type="number"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          placeholder="Mood"
          className="border p-2"
        />
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Tag"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <h2 className="mt-6 text-lg font-semibold">Journals</h2>
      <ul className="mt-2 space-y-2">
        {entries.map((entry, idx) => (
          <li
            key={idx}
            className="border rounded p-2 shadow-sm bg-white flex flex-col"
          >
            <span><strong>Note:</strong> {entry.note} </span>

            <span><strong>Mood:</strong> {entry.mood} </span>

            <span><strong>Tag:</strong> {entry.tag} </span>

            <span className="text-sm text-gray-500">
              {new Date(entry.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
