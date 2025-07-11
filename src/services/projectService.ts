import api from "../api/axios";
import { ProjectType, CommentType, AddCommentPayload } from "../types";

export const getAllProjects = async (): Promise<ProjectType[]> => {
  const response = await api.get<ProjectType[]>("/projects");
  return response.data;
};

export const getProjectById = async (id: string): Promise<{ project: ProjectType; comments: CommentType[] }> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const addProject = async (data: { title: string; description: string; liveLink: string; gitHubLink: string }): Promise<ProjectType> => {
  const response = await api.post<ProjectType>("/projects", data);
  return response.data;
};

export const getProjectsByUserId = async (userId: string): Promise<ProjectType[]> => {
  const response = await api.get(`/projects/${userId}`);
  return response.data;
};

export const addComment = async (
  projectId: string,
  data: AddCommentPayload
): Promise<void> => {
   await api.post(`/projects/${projectId}/comments`, data); 
};

