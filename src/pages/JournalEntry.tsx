import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJournalFetcher } from "../api/fetcher";

export const JournalEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { entrie, fetchEntrie } = useJournalFetcher();

  useEffect(() => {
    if (id) {
      fetchEntrie(id);
    }
  }, [id]);

  if (!entrie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back to Journals
      </button>
      
      <div className="border rounded p-4 shadow-sm bg-white">
        <h1 className="text-xl font-bold mb-4">Journal Entry</h1>
        
        <div className="space-y-2">
          <p><strong>Note:</strong> {entrie.note}</p>
          <p><strong>Mood:</strong> {entrie.mood}</p>
          <p><strong>Tag:</strong> {entrie.tag}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(entrie.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}; 