import { useState, useEffect } from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg"

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", data => {
      setNotifications((prev) => [...prev, data])

    })
  }, [socket])

  const displayNotification = ({ senderName, type}, key) => {
    let action;

    if (type === 1) {
      action = "liked"
    } else if (type === 2) {
      action = "commented"
    } else { 
      action = "shared"
    }
    return (
      <span className="notification" key={key}>{`${senderName} ${action} your post`}</span>
    )
  }

  const handleRead = () => {
    setNotifications([]);
    setOpen(!open);
  }

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} alt="" className="iconImg" />
          <div className="counter">{notifications.length > 0 && notifications.length}</div>
        </div>
        <div className="message" onClick={() => setOpen(!open)}>
          <img src={Message} alt="" className="iconImg" />
        </div>
        <div className="settings" onClick={() => setOpen(!open)}>
          <img src={Settings} alt="" className="iconImg" />
        </div>
      </div>
      {open && (
        notifications.length > 0 ? (
          <div className="notifications">
            {notifications.map((n, key) => 
              displayNotification(n, key)
            )}
            <button className="nButton" onClick={handleRead}>Mark as read</button>
          </div>
        ) : (
          <div className="notifications">
            <span className="notification">No new notification</span>
            <button className="nButton" onClick={() => setOpen(!open)}>Close</button>
          </div>
        ) 
      )}
    </div>
  )
}

export default Navbar