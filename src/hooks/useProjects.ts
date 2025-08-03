import { useState, useEffect, useCallback } from "react"; 
import { addProject, getAllProjects, getProjectById, getProjectsByUserId } from "../services/projectService";
import { CommentType, ProjectType } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

export const useGetProjects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getAllProjects();
          setProjects(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }, []);
  
    return { projects, loading, error };
  };

  export const useAddProject = () => {
    const navigate = useNavigate();
  
    const handleSubmit = async (form: {
      title: string;
      description: string;
      liveLink?: string;
      gitHubLink: string;
    }) => {
      try {
        await addProject(form);
        toast.success("Project added successfully!");
        navigate("/dashboard");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to add project!");
        throw new Error(err.response?.data?.message || err.message);
      }
    };
  
    return { handleSubmit };
  };

  // export const useAddProject = () => {
  //   const [form, setForm] = useState({ title: "", description: "", liveLink: "", gitHubLink:"" });
  //   const [error, setError] = useState<string | null>(null);
  //   const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   };
  
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError(null);
  //     setLoading(true);
  //     try {
  //       await addProject(form);
  //       navigate("/dashboard");
  //       toast.success("Project added successfully!")
  //     } catch (err: any) {
  //       setError(err.response?.data?.message || err.message);
  //     } finally {
  //       setLoading(false);
  //       toast.error("Failed to add project!")
  //     }
  //   };
  
  //   return { form, handleChange, handleSubmit, error, loading };
  // };

  
  export const useProjectDetail = (id?: string) => {
    const [project, setProject] = useState<{ project: ProjectType; comments: CommentType[];} |null >(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetch = useCallback(async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getProjectById(id); 
        setProject(res);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }, [id]);
  
    useEffect(() => {
      fetch();
    }, [fetch]);
  
    return { project, loading, error, refetch: fetch, setProject };
  };

  export const useGetProjectsByUserId = () => {
    const [selectedUserProjects, setSelectedUserProjects] = useState<ProjectType[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
   
    const handleUserClick = async (userId?: string) => {
      setLoading(true);
      setError(null);
      try {
        if(userId)
       { 
        const res = await getProjectsByUserId(userId);
        setSelectedUserProjects(res);
      }
      } catch (err: any) {
        console.error("Failed to load user projects", err);
        setError("Could not load user projects");
      } finally {
        setLoading(false);
      }
    };

    const clearSelectedUserProjects = () => {
      setSelectedUserProjects(null);
    };
  
    return {  
      selectedUserProjects,
      handleUserClick,
      clearSelectedUserProjects,
      loading,
      error
    };
  };

  