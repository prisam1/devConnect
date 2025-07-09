import { useParams } from "react-router-dom";
import { useProjectDetail } from "../../hooks/useProjects";
import { useAddComment } from "../../hooks/useAddComment";

export default function ProjectDetail() {
  const { id } = useParams();

  const { project, loading, error, refetch } = useProjectDetail(id);
  const { comment, handleChange, handleSubmit, loading: commentLoading, error: commentError } = useAddComment(id, refetch);

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (error || !project) return <p className="text-center mt-10 text-red-500">{error || "Project not found."}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl text-black font-bold mb-2">{project?.project?.title}</h1>
      <p className="text-gray-600 mb-2">by {project?.project?.creator?.username}</p>
      <p className="mb-4">{project?.project?.description}</p>
      {project?.project?.links}
      <a href={project?.project?.links.join(", ")} target="_blank" rel="noreferrer" className="text-sm text-blue-600 ">{project?.project?.links.join(", ")}</a>
      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <ul className="mb-4 space-y-2">
        {(project?.comments ?? []).map((c: any) => (
          <li key={c._id} className="bg-gray-100 p-2 rounded">
            <p className="text-sm text-gray-800">{c.comments}</p>
            {/* <p className="text-xs text-gray-500">– {c.author.username}</p> */}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          name="message"
          value={comment.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-20 mb-2"
          placeholder="Leave a comment..."
          required />

        {commentError && <p className="text-red-500 text-sm mb-2">{commentError}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={commentLoading}>
          {commentLoading ? "Commenting..." : "Comment"}
        </button>
      </form>
    </div>
  );
}
