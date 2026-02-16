import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {

 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState("");
 const [selectedTag, setSelectedTag] = useState("");

 useEffect(() => {
  const fetchBlogs = async () => {
   try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/blog`);
    console.log("API:", import.meta.env.VITE_API_URL);


    const data = await res.json();
    setBlogs(data);
    setLoading(false);
   } catch (error) {
    console.log("Error fetching blogs:", error);
    setLoading(false);
   }
  };

  fetchBlogs();
 }, []);

 const allTags = blogs.flatMap((blog) => blog.tags || []);
 const uniqueTags = [...new Set(allTags)];

 const filteredBlogs = blogs.filter((blog) => {
  const matchesSearch =
   blog.title.toLowerCase().includes(search.toLowerCase()) ||
   blog.content.toLowerCase().includes(search.toLowerCase());

  const matchesTag =
   selectedTag === "" || blog.tags?.includes(selectedTag);

  return matchesSearch && matchesTag;
 });

 return (
  <div className="min-h-screen">

   <div className="flex justify-center items-center flex-col mt-20">
    <div className="text-center text-blue-400 font-medium">
     <p className="text-4xl">Discover insightful blogs across various categories.</p>
     <p className="text-4xl">Share your ideas and get them published after review.</p>
    </div>

    <div className="mt-20 flex justify-center relative w-full max-w-sm md:max-w-md">
     <input
      type="text"
      placeholder="Search blogs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border-2 border-blue-400 rounded-lg pl-12 pr-4 py-3 focus:outline-none"
     />

     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
      <FaSearch />
     </span>
    </div>
   </div>

   <h1 className="ml-20 mt-10 text-3xl font-medium text-blue-400">
    Trending Tags
   </h1>

   <div className="flex gap-3 flex-wrap mt-6 justify-center mb-7">
    {uniqueTags.map((tag, index) => (
     <span
      key={index}
      onClick={() => setSelectedTag(tag)}
      className={`px-3 py-1 text-sm rounded-full cursor-pointer transition
              ${selectedTag === tag
        ? "bg-blue-600 text-white"
        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
       }`}
     >
      #{tag}
     </span>
    ))}

    {selectedTag && (
     <button
      onClick={() => setSelectedTag("")}
      className="text-sm text-red-500 underline ml-4"
     >
      Clear Filter
     </button>
    )}
   </div>

   <div className="flex justify-center items-center flex-col">

    {loading ? (
     <p className="text-blue-500 text-lg">Loading blogs...</p>
    ) : filteredBlogs.length === 0 ? (
     <p className="text-gray-500">No blogs found</p>
    ) : (
     filteredBlogs.map((item) => (
      <div
       key={item._id}
       className="bg-white p-6 rounded-xl shadow-2xl mb-6 w-full py-10 max-w-4xl"
      >

       <p className="text-sm text-gray-500">
        {item.author?.name} • {new Date(item.createdAt).toDateString()}
       </p>

       <Link to={`/blog/${item.slug}`}>
        <h2 className="text-xl font-bold mt-2 hover:text-blue-600 transition">
         {item.title}
        </h2>
       </Link>

       <p className="text-gray-600 mt-2">
        {item.content.slice(0, 120)}...
       </p>

       <div className="flex gap-2 mt-3 flex-wrap">
        {item.tags?.map((tag, index) => (
         <span
          key={index}
          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
         >
          #{tag}
         </span>
        ))}
       </div>
      </div>
     ))
    )}

   </div>
  </div>
 );
};

export default Home;

