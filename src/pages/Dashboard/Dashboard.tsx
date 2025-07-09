import { useGetProjects } from "../../hooks/useProjects";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export default function Dashboard() {

  const navigate = useNavigate();

  const { projects, loading: projectLoading, error: projectError } = useGetProjects();
  const { query, setQuery, projects: searchProjects, users, loading, error, handleSearch } = useSearch();

  const displayProjects = query ? searchProjects : projects;


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => navigate("/project/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by user or project name"
          className="w-full p-2 border rounded"
        />
      </form>

      {(loading || projectLoading) && <p>Loading projects...</p>}
      {(error || projectError) && <p className="text-red-500">{error || projectError}</p>}


      {query && users.length === 0 && searchProjects.length === 0 && (
        <p className="text-gray-600">No matching user or project found.</p>
      )}


      <div className="space-y-4 ">
        {displayProjects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            className="border p-4 font-medium rounded shadow bg-white">
            <Link to={`/projects/${project._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
            {project.title}
            </Link>
            <p className="text-sm text-gray-700">{project.description}</p>
            <p className="text-xs text-gray-400">by {project.creator.username}</p>
            <p className="text-xs text-gray-400">Links: {project.links.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
