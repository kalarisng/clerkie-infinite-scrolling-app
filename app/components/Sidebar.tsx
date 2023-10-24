"use client";
import Image from "next/image";
import ClerkieLogo from "@/public/clerkie.png";
import HomeLogo from "@/public/home.png";
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
      icon: HomeLogo,
      current: `${segment}` === "friends",
    },
  ];

  console.log(segment);

  return (
    <div className="h-screen w-[15.625rem] bg-sidebar-blue text-white sidebar font-semibold sticky top-0">
      <div className="p-5 flex items-center">
        <Image src={ClerkieLogo} alt="Logo" style={{ maxWidth: "100%" }} />
        <p className="p-3">Clerkie Challenge</p>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarOptions.map((option) => (
                <li key={option.name}>
                  <Link
                    href={option.href}
                    className={`${
                      option.current
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                  >
                    <Image
                      src={option.icon}
                      alt="Icon"
                      className="text-gray-300 group-hover:text-white h-6 w-6 shrink-0"
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
