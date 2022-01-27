import React from "react";
import { useQuery } from "@apollo/client";
import { IUser } from "./interfaces/admin";
// import queries from "./graphql/queries";

function App() {
  // const { loading, error, data } = useQuery(queries.user.GET_ALL_USERS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">THIS IS THE FRONT END</header>
      {/* <ul>
        {data.users.map((user: IUser) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
