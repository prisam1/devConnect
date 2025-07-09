import { useState } from 'react'; 
import { searchUsersAndProjects } from '../services/searchService';
import { ProjectType, UserType } from '../types';

export interface SearchResult {
  _id: string;
  username: string;
  bio?: string;
  projects?: {
    _id: string;
    title: string;
    description?: string;
  }[];
}

 
export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const res = await searchUsersAndProjects(query);
        setProjects(res.projects);
        setUsers(res.users);
      } catch (err: any) {
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    };
  
    return { query, setQuery, projects, users, loading, error, handleSearch };
  };