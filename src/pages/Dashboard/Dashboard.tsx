import { useGetProjects, useGetProjectsByUserId } from "../../hooks/useProjects";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export default function Dashboard() {

  const navigate = useNavigate();

  const { projects, loading: projectLoading, error: projectError } = useGetProjects();
  const { query, setQuery, projects: searchProjects, users, loading, error, } = useSearch();
  const { selectedUserProjects, handleUserClick } = useGetProjectsByUserId()

  const displayProjects =
    query && users.length > 0 && selectedUserProjects
      ? selectedUserProjects
      : query
        ? searchProjects
        : projects;

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

      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
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


      {query && searchProjects.length === 0 && (
        <p className="text-gray-600">No project found.</p>
      )}

      {query && users.length === 0 && (
        <p className="text-gray-600">No user found.</p>
      )}

      {query && users.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Users</h2>
          <div className="space-y-2">
            {users?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user?._id)}
                className="border p-3 rounded shadow bg-gray-100 cursor-pointer hover:bg-gray-200"
              >
                <p className="font-semibold text-blue-700">{user.username}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
                {user?.gitHubLink && (
                  <p className="text-sm text-gray-500">
                    Github: {user.gitHubLink}
                  </p>
                )}
              </div>
            ))}
          </div>
          <hr className="my-4" />
        </div>
      )}

      {displayProjects && users.length > 0 && displayProjects.length === 0 && (
        <p className="text-gray-600">No project found for the selected.</p>
      )}

      <div className="space-y-4 ">
        {displayProjects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            className="border p-4 font-medium cursor-pointer rounded shadow bg-white">
            <Link to={`/projects/${project._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {project.title}
            </Link>
            <p className="text-sm text-gray-700">{project.description}</p>
            <p className="text-xs text-gray-400">by {project.creator.username}</p>
            <p className="text-xs text-gray-400">Live: {project.liveLink}</p>
            <p className="text-xs text-gray-400">Github: {project.liveLink}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
