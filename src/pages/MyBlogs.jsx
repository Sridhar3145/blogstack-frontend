import { useEffect, useState } from "react";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/blog/myblogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);


        if (!res.ok) {
          throw new Error(data.msg || "Failed to fetch blogs");
        }

        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-2xl rounded-xl p-6 mb-6 "
          >

            <h2 className="text-xl font-bold mb-2">
              {blog.title}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              Created on{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="mb-3">
              {blog.status === "pending" && (
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                  Pending Approval
                </span>
              )}

              {blog.status === "published" && (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  Published
                </span>
              )}

              {blog.status === "rejected" && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Rejected
                </span>
              )}

            </div>

            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt="cover"
                className="w-full max-h-64 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-700 mb-4">
              {blog.content.slice(0, 200)}...
            </p>

            {blog.status === "rejected" && blog.rejectionReason && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-600 text-sm">
                <strong>Reason:</strong> {blog.rejectionReason}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
