import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JournalRequest, JournalResponse, MoodEnum } from "../types/journal";
import { createJournal, updateJournal, deleteJournal } from "../api/jjournalApi";
import { useJournalFetcher } from "../api/fetcher";


export const Journal = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<JournalRequest>({
    note: "",
    mood: MoodEnum.Neutral,
    tag: "",
  });
  const { entries, fetchEntries } = useJournalFetcher();
  const [selected, setSelected] = useState<JournalResponse | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    console.log("Current selected state:", selected);
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'mood' ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJournal(formData);
      setFormData({ note: "", mood: MoodEnum.Neutral, tag: "" });
      fetchEntries();
    } catch (err: any) {
      setError(err.response?.data?.message || "Journal failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      try {
        await deleteJournal(id);
        fetchEntries();
        if (selected?.id === id) {
          setSelected(null);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete journal");
      }
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
        <select
          name="mood"
          value={formData.mood ?? MoodEnum.Neutral}
          onChange={handleChange}
          className="border p-2"
        >
          <option value={MoodEnum.Broken}>Broken</option>
          <option value={MoodEnum.Despair}>Despair</option>
          <option value={MoodEnum.Depressed}>Depressed</option>
          <option value={MoodEnum.Upset}>Upset</option>
          <option value={MoodEnum.Tense}>Tense</option>
          <option value={MoodEnum.Neutral}>Neutral</option>
          <option value={MoodEnum.Focused}>Focused</option>
          <option value={MoodEnum.Satisfied}>Satisfied</option>
          <option value={MoodEnum.Inspired}>Inspired</option>
          <option value={MoodEnum.Happy}>Happy</option>
          <option value={MoodEnum.Euphoric}>Euphoric</option>
        </select>
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
      <ul className="space-y-2">
        {entries.map((entry: JournalResponse) => {
          console.log("Journal entry from map:", entry);
          return (
            <li
              key={entry.id}
              className="border rounded p-2 shadow-sm bg-white flex flex-col cursor-pointer hover:bg-gray-50"
            >
              <div onClick={() => {
                setSelected(entry);
                console.log("Selected journal after click:", entry);
              }}>
                <span><strong>Note:</strong> {entry.note}</span>
                <span><strong>Mood:</strong> {MoodEnum[entry.mood]}</span>
                <span><strong>Tag:</strong> {entry.tag}</span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.id);
                }}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      {/* Деталі вибраного журналу */}
      {selected && selected.id && (
        <div className="mt-8 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Edit Journal</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!selected?.id) {
                alert("Invalid journal id");
                return;
              }
              try {
                await updateJournal(selected.id, {
                  note: selected.note,
                  tag: selected.tag,
                });
                fetchEntries();
                setSelected(null);
              } catch (err) {
                alert("Update failed");
              }
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              value={selected.note}
              onChange={e => setSelected({ ...selected, note: e.target.value })}
              className="border p-2"
            />
            <input
              type="text"
              value={selected.tag}
              onChange={e => setSelected({ ...selected, tag: e.target.value })}
              className="border p-2"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Save
            </button>
            <button type="button" className="bg-gray-400 text-white p-2 rounded" onClick={() => setSelected(null)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
