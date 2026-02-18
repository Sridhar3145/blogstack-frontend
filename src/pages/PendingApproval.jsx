import React, { useEffect, useState } from "react";

const PendingApproval = () => {
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [selectedBlog, setSelectedBlog] = useState(null);
 const [rejectReason, setRejectReason] = useState("");
 const [showRejectBox, setShowRejectBox] = useState(false);

 const token = localStorage.getItem("token");

 const fetchPendingBlogs = async () => {
  try {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/blog/pending`, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   if (!res.ok) {
    throw new Error(data.message || "Failed to fetch blogs");
   }

   setBlogs(data);
   setLoading(false);
  } catch (err) {
   setError(err.message);
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchPendingBlogs();
 }, []);

 const handleApprove = async (id) => {
  if (!token) {
   alert("Unauthorized");
   return;
  }

  try {
   const res = await fetch(
    `${import.meta.env.VITE_API_URL}/blog/approve/${id}`,
    {
     method: "PUT",
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (!res.ok) {
    throw new Error("Approval failed");
   }

   setBlogs((prev) => prev.filter((blog) => blog._id !== id));
   setSelectedBlog(null);
   setShowRejectBox(false);
   setRejectReason("");
  } catch (err) {
   alert(err.message);
  }
 };

 const handleReject = async (id) => {
  if (!rejectReason.trim()) {
   alert("Please enter rejection reason");
   return;
  }

  if (!token) {
   alert("Unauthorized");
   return;
  }

  try {
   const res = await fetch(
    `${import.meta.env.VITE_API_URL}/blog/reject/${id}`,
    {
     method: "PUT",
     headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify({ reason: rejectReason.trim() }),
    }
   );

   if (!res.ok) {
    throw new Error("Reject failed");
   }

   setBlogs((prev) => prev.filter((blog) => blog._id !== id));
   setSelectedBlog(null);
   setRejectReason("");
   setShowRejectBox(false);
  } catch (err) {
   alert(err.message);
  }
 };

 if (loading) return <p className="text-blue-400 text-3xl text-center mt-40">Loading...</p>;
 if (error) return <p className="text-red-500 text-center mt-40 text-2xl">{error}</p>;

 return (
  <div className="max-w-6xl mx-auto mt-10 px-4">
   <h1 className="text-2xl mb-6 text-blue-400 font-medium">
    Pending Blog Approvals
   </h1>

   {blogs.length === 0 ? (
    <p className="text-blue-400">No pending blogs.</p>
   ) : (
    blogs.map((blog) => (
     <div
      key={blog._id}
      onClick={() => setSelectedBlog(blog)}
      className="cursor-pointer transition bg-white p-6 rounded-xl shadow-2xl mb-6 w-full py-10 hover:scale-105"
     >
      <h2 className="text-xl font-bold hover:text-blue-400">
       {blog.title}
      </h2>

      <p className="text-sm text-gray-600 mb-2">
       Category: {blog.category}
      </p>

      <p>
       {blog.content.slice(0, 150)}...
      </p>
     </div>
    ))
   )}

   {selectedBlog && (
    <div
     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
     onClick={() => {
      setSelectedBlog(null);
      setShowRejectBox(false);
      setRejectReason("");
     }}
    >
     <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative"
     >
      <button
       onClick={() => {
        setSelectedBlog(null);
        setShowRejectBox(false);
        setRejectReason("");
       }}
       className="absolute top-3 right-4 text-xl font-bold"
      >
       ✕
      </button>

      <h2 className="text-2xl font-bold mb-2">
       {selectedBlog.title}
      </h2>

      <p className="text-gray-500 mb-4">
       Author: {selectedBlog.author?.name}
      </p>

      <img
       src={selectedBlog.coverImage}
       alt="blog"
       className="rounded-lg mb-4"
      />

      <p className="whitespace-pre-line leading-7 text-gray-700">
       {selectedBlog.content}
      </p>

      <div className="flex gap-4 mt-6">
       <button
        onClick={() => handleApprove(selectedBlog._id)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
       >
        Approve
       </button>

       <button
        onClick={() => setShowRejectBox(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
       >
        Reject
       </button>
      </div>

      {showRejectBox && (
       <div className="mt-4">
        <textarea
         rows={4}
         placeholder="Enter rejection reason..."
         value={rejectReason}
         onChange={(e) => setRejectReason(e.target.value)}
         className="w-full border rounded-lg p-3 mb-3"
        />

        <button
         onClick={() => handleReject(selectedBlog._id)}
         className="bg-red-700 text-white px-4 py-2 rounded"
        >
         Confirm Reject
        </button>
       </div>
      )}
     </div>
    </div>
   )}
  </div>
 );
};

export default PendingApproval;

