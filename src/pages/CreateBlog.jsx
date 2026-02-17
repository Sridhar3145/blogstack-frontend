import React from 'react'
import { useState } from 'react';

const CreateBlog = () => {
  const categoryTags = {
    Technology: ["React", "Node", "AI", "Cloud", "JavaScript"],
    Education: ["Exams", "Study Tips", "Career", "College"],
    Sports: ["Cricket", "Football", "Tennis", "Olympics"],
    Health: ["Fitness", "Diet", "Mental Health"],
    Business: ["Startup", "Finance", "Marketing"]
  };

  const [blogInput, setBlogInput] = useState(
    {
      title: "",
      category: "",
      coverImage: "",
      tags: [],
      content: ""
    }
  )

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCategoryChange = (e) => {
    setBlogInput({
      ...blogInput,
      category: e.target.value,
      tags: []
    });
  };

  const handleChange = (e) => {
    setBlogInput({ ...blogInput, [e.target.name]: e.target.value })
  }

  const toggleTag = (tag) => {
    if (blogInput.tags.includes(tag)) {
      setBlogInput({
        ...blogInput,
        tags: blogInput.tags.filter((t) => t !== tag)
      });
    } else {
      setBlogInput({
        ...blogInput,
        tags: [...blogInput.tags, tag]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/blog/createBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogInput),
      });

      const blogData = await res.json();

      if (!res.ok) {
        throw new Error(blogData.msg || "Blog create failed");
      }

      setError("");
      setSuccess("Blog Created And Waiting For Approval");
      setTimeout(() => {

        setSuccess("");
      }, 3000)

      setBlogInput({
        title: "",
        category: "",
        coverImage: "",
        tags: [],
        content: ""
      });

    } catch (error) {
      setError(error.message);
      setTimeout(() => {

        setError("");
      }, 3000)

    }
  };


  return (
    <div className='bg-blue-400 w-full max-w-4xl rounded-2xl mx-auto min-h-[50vh]  mt-20 py-7 text-white '>

      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center flex-col gap-8'>
          <div className='text-center'>
            <h1 className=' text-2xl text-white font-extrabold'>Create Your Blog</h1>
            <p>Turn your thoughts into stories and let the world read them.</p>
          </div>
          <div className='md:flex w-full space-y-6'>

            <div className='flex flex-col space-y-2 w-full px-4'>

              <label>Blog Title</label>
              <input type="text" value={blogInput.title} name='title' placeholder='title' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' onChange={handleChange} />
            </div>
            <div className='flex flex-col space-y-2 w-full px-4'>
              <label>Category</label>
              <select
                value={blogInput.category}
                name='category'
                onChange={handleCategoryChange}
                className={`w-full border border-white outline-none px-4 py-2 rounded-lg text-black 
                  ${blogInput.category === "" ? "text-gray-500" : "text-white"}`}
              >
                <option value="" disabled className='text-blue-600'>
                  -- Select Category --
                </option>
                {Object.keys(categoryTags).map((cat) => (
                  <option key={cat} value={cat} className='text-blue-600'>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div className='md:flex w-full space-y-6'>

            <div className='flex flex-col space-y-2 w-full px-4'>

              <label>CoverImage</label>
              <input type="text" name="coverImage" value={blogInput.coverImage} placeholder='Image Link' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' onChange={handleChange} />
            </div>
            <div className='flex flex-col space-y-2 w-full px-4'>
              <label>Tags</label>

              <div className="flex flex-wrap gap-2">
                {!blogInput.category
                  ? (
                    <p className="text-md text-white/70">
                      Please select a category to see related tags.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {categoryTags[blogInput.category].map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full border transition-all
            ${blogInput.tags.includes(tag)

                              ? "bg-white text-blue-600 border-white"
                              : "bg-blue-300 text-white border-white"}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2 w-full px-4'>

            <label>Content</label>
            <textarea rows={5} name='content' value={blogInput.content} onChange={handleChange} placeholder='Enter Blog Content' className='w-full min-h-37.5 border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' />
          </div>
          {error && <p className='text-red-400 font-medium'>{error}</p>}
          {success && <p className='text-green-200 font-medium'>{success}</p>}
          <div className='w-full px-4'>
            <button type='submit' className='border  border-white py-3 w-full  rounded-lg hover:bg-gray-200 bg-white text-blue-600 transition-all font-medium'>Get Approval</button>
          </div>


        </div>
      </form>

      <div className='ml-4 mt-2 text-gray-200'>
        <p>Note : Your blog will be reviewed by our admin team before publishing.</p>
      </div>

    </div>
  )
}

export default CreateBlog


