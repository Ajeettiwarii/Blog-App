import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .then((res) => {
        setBlogs(res.data.blogs);
        setUser(res.data.user);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // const data = await res.data;
    // return data;
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <div>
      {" "}
      {blogs &&
        blogs.map((blog, index) => (
          <Blog  
          id={blog._id}
            key={index} 
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}{" "}
    </div>
  );
};

export default UserBlogs;
