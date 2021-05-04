import React from "react";
import Auth from "./utils/auth";

// provide data to other components
import { ApolloProvider } from "@apollo/react-hooks";
// get data when we're ready to use it
import ApolloClient from "apollo-boost";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// establish connection to the GraphQL server using Apollo.
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />

          <Switch>
            <Route exact path="/" component={SearchBooks} />
            {Auth.loggedIn() ? (
              <Route exact path="/saved" component={SavedBooks} />
            ) : (
              <Redirect exact path="/saved" to="/" />
            )}
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
