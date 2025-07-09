import { useAddProject } from "../../hooks/useProjects";

export default function NewProject() {
  const { form, handleChange, handleSubmit, error, loading } = useAddProject();

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
     
      <input
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded h-24"
        required />
      <input
        name="links"
        placeholder="Links (comma separated)"
        value={form.links}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>

    </form>
  );
}
