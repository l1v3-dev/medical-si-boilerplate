import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { IUser } from "./interfaces/admin";
import {GET_ALL_USERS} from "./graphql/User/queries";

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">THIS IS THE FRONT END</header>
      <ul>
        {data.users.map((user: IUser) => (
          <Fragment>
            <li key={user._id}>{user.firstname} ({user.username})</li>
            <span>{user.createdAt}</span>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default App;
