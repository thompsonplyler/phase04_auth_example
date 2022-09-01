import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import ProductionForm from "./components/ProductionForm";
import EditProductionForm from "./components/EditProductionForm";
import Navigation from "./components/Navigation";
import ProductionDetail from "./components/ProductionDetail";
import UserPage from "./components/UserPage";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  const [productions, setProductions] = useState([]);
  const [errors, setErrors] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch("/productions").then((res) => {
      if (res.ok) {
        res.json().then(setProductions);
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  }, []);

  // handling logged in user and session
  useEffect(() => {
    setId(user.id);
    getUser();
    allSessions();
  }, [user]);

  async function getUser() {
    let response = await fetch("http://localhost:3000/me");
    response = await response.json();
    console.log("get user: ", { response });
  }

  async function allSessions() {
    let response = await fetch("http://localhost:3000/sessions");
    response = await response.json();
    console.log("Sessions: ", { response }, []);
    setSessionStorage(response);
  }

  async function setSessionStorage(data) {
    console.log("Session data to store:", data);
    window.sessionStorage.setItem("user_id", JSON.stringify(data));
  }

  const addProduction = (production) =>
    setProductions((current) => [...current, production]);

  const updateProduction = (updatedProduction) =>
    setProductions((current) => {
      return current.map((production) => {
        if (production.id === updatedProduction.id) {
          return updatedProduction;
        } else {
          return production;
        }
      });
    });

  const deleteProduction = (id) =>
    setProductions((current) => current.filter((p) => p.id !== id));

  const addToCart = (ticket) => setCart((cart) => [...cart, ticket]);
  if (errors) return <h1>{errors}</h1>;

  return (
    <>
      <GlobalStyle />
      <Navigation id={id} cart={cart} />
      <Switch>
        <Route path="/productions/new">
          <ProductionForm addProduction={addProduction} />
        </Route>
        {/* TODO make edit component */}
        <Route path="/productions/:id/edit">
          <EditProductionForm updateProduction={updateProduction} />
        </Route>

        <Route path="/productions/:id">
          <ProductionDetail
            addToCart={addToCart}
            deleteProduction={deleteProduction}
          />
        </Route>

        <Route path="/users/new">
          <SignUp />
        </Route>

        <Route path="/users/:id">
          <UserPage />
        </Route>

        <Route path="/login">
          <Login setId={setId} setUser={setUser} />
        </Route>

        <Route exact path="/">
          <Home productions={productions} />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `;
