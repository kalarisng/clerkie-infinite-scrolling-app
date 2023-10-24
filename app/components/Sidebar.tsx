"use client";
import Image from "next/image";
import ClerkieLogo from "@/public/clerkie.png";
import HomeLogo from "@/public/home.png";
import FriendsLogo from "@/public/friends.png";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = [
    {
      name: "Home",
      href: "/",
      icon: HomeLogo,
      current: segment === null,
    },
    {
      name: "Friends",
      href: "/friends",
      icon: FriendsLogo,
      current: `${segment}` === "friends",
    },
  ];

  return (
    <div className="h-screen w-[15.625rem] bg-sidebar-blue text-white sidebar sticky top-0">
      <div className="px-5 pt-4 flex items-center font-semibold">
        <Image src={ClerkieLogo} alt="Logo" />
        <p className="p-3">Clerkie Challenge</p>
      </div>
      <nav className="flex flex-1 flex-col mt-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarOptions.map((option) => (
                <li key={option.name}>
                  <Link
                    href={option.href}
                    className={`${
                      option.current
                        ? "bg-gray-700 text-white w-56 ml-6"
                        : "text-white hover:bg-gray-700 w-56 ml-6"
                    } group flex gap-x-3 rounded-md p-2 text-sm leading-6`}
                  >
                    <Image
                      src={option.icon}
                      alt="Icon"
                      className="h-6 w-6 shrink-0"
                    />
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
