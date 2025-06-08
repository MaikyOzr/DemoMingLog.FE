import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { JournalRequest, JournalResponse, MoodEnum } from "../types/journal";
import { createJournal, updateJournal, deleteJournal } from "../api/jjournalApi";
import { useJournalFetcher } from "../api/fetcher";
// import { MoodChart } from "../components/MoodChart";
import { TestChart } from "../components/TestChart";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journal</h1>
      
      {/* Mood Chart */}
      {entries.length > 0 && (
        <div className="mb-8">
          {/* <MoodChart entries={entries} /> */}
          <TestChart />
        </div>
      )}

      {/* Journal Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mood</label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {Object.entries(MoodEnum)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Add Entry
        </button>
      </form>

      {/* Journal Entries List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelected(entry)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{entry.note}</p>
                <p className="text-sm text-gray-500">
                  Mood: {MoodEnum[entry.mood]}
                </p>
                {entry.tag && (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {entry.tag}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
