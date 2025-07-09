import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileServices";
import { UpdateProfilePayload, UserType } from "../types";

export const useProfile = () => {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const updated = await updateProfile(payload);
      setProfile(updated);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, handleUpdate };
};