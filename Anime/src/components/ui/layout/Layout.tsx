import { useNavigate } from "react-router-dom";
import Navbar from "./StickyNav/Navbar";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="z-50 md:hidden lg:block" onClick={handleNavigate}>
        <Navbar />
      </header>
      <main className="grow">
        {/* <Outlet /> */}
        {children}
      </main>
      <footer>
        <div className="bg-black text-white">hi</div>
      </footer>
    </div>
  );
};

export default Layout;
