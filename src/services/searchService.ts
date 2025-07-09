import api from "../api/axios"; 


export const searchUsersAndProjects = async (query: string): Promise<{ users: any[]; projects: any[] }> => {
  const response = await api.get(`/projects/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

