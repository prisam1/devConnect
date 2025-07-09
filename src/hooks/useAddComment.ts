import { useState } from "react"; 
import { addComment } from "../services/projectService";


export const useAddComment = (projectId?: string, refetch?: () => Promise<void>) => {
  const [comment, setComment] = useState({ message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ message: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await addComment(projectId!, comment);
      setComment({ message: "" });

      if (refetch) await refetch(); //refetch project API
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { comment, handleChange, handleSubmit, loading, error };
};