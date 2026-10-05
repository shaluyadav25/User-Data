import { useState } from "react";
import {
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "./api/userApi";

function GetUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data: users = [] } = useGetUserQuery();
  const [addUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  async function handleSubmit(event) {
    event.preventDefault();
    await addUser({ name, email });
    setName("");
    setEmail("");
  }

  return (
    <div className="container">
      <h2>User Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button>Add User</button>
      </form>

      <h3>Users List</h3>
      {users.map((user) => (
        <div className="user" key={user.id}>
          <div>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
          <button className="delete" onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default GetUser;
