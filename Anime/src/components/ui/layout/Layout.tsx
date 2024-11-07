import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="flex justify-center">
        <div className="flex justify-center w-full bg-slate-700">
          <button onClick={handleNavigate} className="text-white py-6">
            SKY.Com
          </button>
          {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={handleNavigate}
                  className=" sm:my-1 md:my-3 flex items-center justify-center bg-slate-700 text-white  w-full"
                >
                  <div> SKY </div>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
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
