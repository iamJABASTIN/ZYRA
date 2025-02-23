import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Profile from "./components/Pages/Profile";
import CollectionPage from "./components/Pages/CollectionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/*User Layout*/}
          <Route index element={<Home />}></Route>
          {/* Login Route */}
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="collections/:collection" element={<CollectionPage />}/>
        </Route>
        <Route>{/*Admin Layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
