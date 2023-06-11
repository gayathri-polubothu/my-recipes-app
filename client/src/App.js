import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home} from "./pages/home";
import {CreateRecipe} from "./pages/createRecipe";
import {Login} from "./pages/login";
import {SavedRecipes} from "./pages/savedRecipes";
import {Navbar} from "./components/navbar"
import {Register} from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"create-recipe"} element={<CreateRecipe />} />
          <Route path={"/saved-recipes"} element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
