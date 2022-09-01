import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Session from "react-session-api";

function UserPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const history = useHistory();

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    Session.onSet(() => {
      console.log("test");
    });
    fetch(`/users/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  }, []);

  const handleClick = async () => {
    let response = await fetch(`/logout`, { method: "delete" });
    response = await response.json();
    history.push(`/`);
  };

  if (loading) return <h1>Loading</h1>;
  if (errors) return <h1>{errors}</h1>;
  return (
    <div>
      <h1>{user.username}</h1>
      <h3>Tickets</h3>
      <ul>
        {user.tickets.map((ticket) => (
          <li>
            <h2>{ticket.production.title}</h2>
            <p>Price: {ticket.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default UserPage;
