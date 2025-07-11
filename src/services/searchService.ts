import api from "../api/axios"; 
import { ProjectType, UserType } from "../types";


export const searchUsersAndProjects = async (query: string): Promise<{ projects: ProjectType[]; users: UserType[]}> => {
  const response = await api.get(`/projects/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

