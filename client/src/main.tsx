import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { Provider } from "react-redux";
import store from "./redux/store.ts";
import withLoading from "./utils/withLoading.tsx";
import { Skeleton } from "antd";
import { getCookie } from "./utils/getCookie.ts";

const App = withLoading(() => import("./App.tsx"), <Skeleton />);
const SignUp = withLoading(() => import("./pages/SignUp.tsx"), <Skeleton />);
const Login = withLoading(() => import("./pages/Login.tsx"), <Skeleton />);


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie("user_token");
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" index element={<App />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
