import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function PostsForm({ url, nameProp, handleSubmit, posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();
  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    if (posts) {
      setTitle(posts.title);
      setContent(posts.content);
      setImageUrl(posts.imgUrl);
      setCategoryId(posts.categoryId);
    }
  }, [posts]);
  return (
    <>
      <form
        className="flex justify-center m-10"
        onSubmit={(e) => handleSubmit(e, title, content, imgUrl, categoryId)}
      >
        <div className="max-w-sm shadow-lg p-4 rounded-lg">
          <div>
            <label>Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="m-2"
              placeholder="Title"
              type="text"
              value={title}
            />
          </div>
          <div>
            <label>Content</label>
            <input
              onChange={(e) => setContent(e.target.value)}
              className="m-2"
              placeholder="Content"
              type="text"
              value={content}
            />
          </div>
          <div>
            <label>Image Url</label>
            <input
              className="m-2"
              placeholder="Image Url"
              type="text"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imgUrl}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              name="categoryId"
              value={categoryId}
            >
              {category.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-black text-white rounded-lg w-full btn btn-accent mt-10"
            >
              {nameProp}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
