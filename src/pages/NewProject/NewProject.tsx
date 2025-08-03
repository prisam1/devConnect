import { useForm, Controller } from "react-hook-form";
import { useAddProject } from "../../hooks/useProjects";

type NewProjectForm = {
  title: string;
  description: string;
  liveLink?: string;
  gitHubLink: string;
};

export default function NewProject() {
  const { handleSubmit: submitProject } = useAddProject();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewProjectForm>({
    defaultValues: {
      title: "",
      description: "",
      liveLink: "",
      gitHubLink: "",
    },
  });

  const onSubmit = async (data: NewProjectForm) => {
    try {
      await submitProject(data);
      reset();
    } catch (err) {
      // errors already handled in toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>

      {/* Title */}
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Title is required",
          minLength: { value: 5, message: "Minimum 5 characters" },
        }}
        render={({ field }) => (
          <>
            <input
              {...field}
              placeholder="Project Title"
              className="w-full mb-1 p-2 border rounded"
            />
            {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}
          </>
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          minLength: { value: 5, message: "Minimum 10 characters" },
        }}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              placeholder="Description"
              className="w-full mb-1 p-2 border rounded h-24"
            />
            {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>}
          </>
        )}
      />

      {/* Live Link (optional) */}
      <Controller
        name="liveLink"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Live Link"
            className="w-full mb-3 p-2 border rounded"
          />
        )}
      />

      {/* GitHub Link */}
      <Controller
        name="gitHubLink"
        control={control}
        rules={{
          required: "GitHub link is required",
        }}
        render={({ field }) => (
          <>
            <input
              {...field}
              placeholder="GitHub"
              className="w-full mb-1 p-2 border rounded"
            />
            {errors.gitHubLink && <p className="text-red-500 text-sm mb-2">{errors.gitHubLink.message}</p>}
          </>
        )}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
