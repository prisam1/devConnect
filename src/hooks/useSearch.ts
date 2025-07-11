import { useEffect, useState } from 'react'; 
import { searchUsersAndProjects } from '../services/searchService';
import { ProjectType, UserType } from '../types'; 

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [query]);

  // Search when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setProjects([]);
      setUsers([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchUsersAndProjects(debouncedQuery);
        setProjects(res.projects);
        setUsers(res.users);
      } catch (err: any) {
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  return { query, setQuery, projects, users, loading, error };
};
