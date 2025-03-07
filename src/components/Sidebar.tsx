import { Link, useLocation } from "react-router-dom";
import store from "../assets/store.svg"
import plan from "../assets/plan.svg"
import chart from "../assets/chart.svg"
import stock from "../assets/stock.svg"

const Sidebar = () => {
  const location = useLocation();

  interface NavItem {
    name: string;
    path: string;
    icon: string;
  }

  const navItems: NavItem[] = [
    { name: "Store", path: "/store", icon: store },
    { name: "SKU", path: "/sku", icon: stock},
    { name: "Planning", path: "/planning", icon: plan },
    { name: "Charts", path: "/charts", icon: chart },
  ];
  return (
    <div className="w-1/8 z-0 bg-white">
      <nav className="">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-4 text-sm transition-colors ${location.pathname === item.path
                ? "bg-gray-200 text-white"
                : "text-gray-300 hover:bg-gray-200"
              }`}
          >
            <img className="w-5" alt={`${item.name}`} src={item.icon} />
            <p className="text-black">
            {item.name}

            </p>
          </Link>
        ))}
      </nav>
    </div>
  )
}


export default Sidebar
