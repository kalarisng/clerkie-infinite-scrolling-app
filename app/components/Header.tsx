"use client";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();

  // determine the current page based on path name
  const isHomePage = pathname === "/";
  const isFriendsPage =
    pathname === "/friends" || pathname.startsWith("/friends/");

  return (
    <header className="flex-1 bg-white text-black font-bold h-20 w-full flex items-center justify-center pl-8 shadow-sm">
      <div className="container">
        <div>
          {isHomePage && "Home"}
          {isFriendsPage && "Friends"}
        </div>
      </div>
    </header>
  );
};

export default Header;
