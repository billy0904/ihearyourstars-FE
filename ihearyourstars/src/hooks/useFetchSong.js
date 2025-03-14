import { useState, useEffect } from "react";
import { fetchSongById } from "../services/SupabaseService";

export default function useFetchSong(songId) {
  const [melody, setMelody] = useState(null);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMelody = async () => {
      try {
        setLoading(true);
        const songData = await fetchSongById(songId);
        if (songData) {
          setMelody(songData.notes);
          setNickname(songData.nickname);
          setTitle(songData.title);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (songId) {
      fetchMelody();
    }
  }, [songId]);

  return { melody, nickname, title, loading, error };
}
