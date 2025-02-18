import TopBar from "../Layout/TopBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/*Topbar*/}
      <TopBar />
      <Navbar />
      {/*navbar*/}
      {/*Cart drawer*/}
    </header>
  );
};

export default Header;
