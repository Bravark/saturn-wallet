import { RiHome3Fill } from "react-icons/ri";
import { FaCog } from "react-icons/fa";
import { TbChartCandleFilled } from "react-icons/tb";
import { RiTokenSwapFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Navigation = [
  { id: 1, url: "/", Icon: RiHome3Fill },
  { id: 2, url: "#", Icon: TbChartCandleFilled },
  { id: 3, url: "#", Icon: RiTokenSwapFill },
  { id: 5, url: "/settings", Icon: FaCog },
];
const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="sticky bottom-0 z-10 w-full">
      <div className="flex justify-around items-center h-16 bg-neutral-800">
        {Navigation.map(({ id, url, Icon }) => (
          <Link key={id} to={url}>
            <Icon
              size={35}
              className={pathname === url ? "text-accent" : "text-neutral-500"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
