import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogExtendView = () => {
 const { slug } = useParams();
 const [blog, setBlog] = useState(null);

 useEffect(() => {
  const fetchBlog = async () => {
   try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/blog/${slug}`);

    if (!res.ok) {
     throw new Error("Blog not found");
    }

    const data = await res.json();
    console.log(data);

    setBlog(data);

   } catch (error) {
    console.error(error.message);
    setBlog(null);
   }
  };

  fetchBlog();
 }, [slug]);


 if (!blog) return <p className=" text-blue-400 text-3xl text-center mt-40">Loading...</p>;

 return (
  <div className="max-w-4xl mx-auto mt-10 px-4">

   <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

   <p className="text-gray-500 mb-6">
    Author: {blog.author?.name}
   </p>

   <img
    src={blog.coverImage}
    alt={blog.title}
    className="w-full h-100 object-cover rounded-xl mb-8"
   />

   <div className="text-gray-700 leading-8">
    {blog.content.split("\n").map((line, index) => {
     if (line.trim() === "") return <br key={index} />;

     if (line.length < 60) {
      return (
       <h3 key={index} className="font-bold text-xl mt-6 text-black">
        {line}
       </h3>
      );
     }

     return (
      <p key={index} className="mt-3">
       {line}
      </p>
     );
    })}
   </div>

  </div>
 );

};

export default BlogExtendView;
