import { useState, useEffect } from "react"; 
import { addProject, getAllProjects, getProjectById } from "../services/projectService";
import { ProjectType } from "../types";
import { useNavigate } from "react-router-dom";

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
    const [form, setForm] = useState({ title: "", description: "", links: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        await addProject({
          ...form,
          links: form.links.split(",").map((link) => link.trim()),
        });
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { form, handleChange, handleSubmit, error, loading };
  };

  
  export const useProjectDetail = (id?: string) => {
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetch = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getProjectById(id);
        setProject(res);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetch();
    }, [id]);
  
    return { project, loading, error, refetch:fetch }; // include refetch
  };