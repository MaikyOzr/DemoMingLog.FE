import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { JournalRequest, JournalResponse, MoodEnum } from "../types/journal";
import { createJournal, updateJournal, deleteJournal } from "../api/jjournalApi";
import { useJournalFetcher } from "../api/fetcher";
import { TestChart } from "../components/TestChart";
import { Chart } from "../components/Chart";
import { StatCard } from "../components/StatCard";

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

  // Calculate statistics
  const totalEntries = entries.length;
  const positiveMoods = entries.filter(entry => entry.mood >= 3).length;
  const averageMood = entries.reduce((acc, entry) => acc + entry.mood, 0) / totalEntries || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-secondary-900">Journal Dashboard</h1>
        <button className="btn btn-primary">New Entry</button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Entries"
          value={totalEntries}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Positive Moods"
          value={`${((positiveMoods / totalEntries) * 100).toFixed(1)}%`}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Average Mood"
          value={averageMood.toFixed(1)}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Mood Trends">
          <TestChart />
        </Chart>
        <Chart title="Mood Distribution">
          <TestChart />
        </Chart>
      </div>

      {/* Journal Form */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Note</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Mood</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="input"
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
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Entry
          </button>
        </form>
      </div>

      {/* Journal Entries List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              onClick={() => setSelected(entry)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-secondary-900">{entry.note}</p>
                  <p className="text-sm text-secondary-500">
                    Mood: {MoodEnum[entry.mood]}
                  </p>
                  {entry.tag && (
                    <span className="inline-block bg-primary-100 text-primary-700 rounded-full px-3 py-1 text-sm font-semibold mt-2">
                      {entry.tag}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(entry.id);
                  }}
                  className="text-error hover:text-error/80"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {selected && (
        <div className="fixed inset-0 bg-secondary-900/50 flex items-center justify-center p-4">
          <div className="card max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Entry</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selected?.id) return;
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
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Note</label>
                <input
                  type="text"
                  value={selected.note}
                  onChange={e => setSelected({ ...selected, note: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Tag</label>
                <input
                  type="text"
                  value={selected.tag}
                  onChange={e => setSelected({ ...selected, tag: e.target.value })}
                  className="input"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary flex-1"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
