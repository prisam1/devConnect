import api from "../api/axios";
import { SearchResult } from "../types";

export const searchUsersAndProjects = async (query: string): Promise<{ users: any[]; projects: any[] }> => {
  const response = await api.get(`/projects/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

// export const search = async (query: string): Promise<SearchResult> => {
//     const res = await api.get<SearchResult>(`/search?q=${encodeURIComponent(query)}`);
//     return res.data;
//   };