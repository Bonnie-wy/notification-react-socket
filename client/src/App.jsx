import { useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import "./app.css";
import { useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"))
  }, [])

  useEffect(() => {
    if (user) {
      socket?.emit("newUser", user);
    }
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} user={user} socket={socket} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
      <div className="login">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setUser(username)}>Login</button>
      </div>
      )}
    </div>
  );
};

export default App;
