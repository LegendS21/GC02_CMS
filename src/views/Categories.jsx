import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories({ url }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto my-10">
        <h1 className="text-center text-2xl font-semibold mb-6">Categories</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 font-medium border-b">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium border-b">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 border-b">{category.id}</td>
                  <td className="px-6 py-4 border-b">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
