import Image from "next/image";
import LoadingName from "@/public/loadingname.png";
import LoadingTag from "@/public/loadingtag.png";
import LoadingEmail from "@/public/loadingemail.png";
import LoadingPhone from "@/public/loadingnumber.png";

const LoadingSkeleton = () => {
  const size = 6;
  const sizeArray = new Array(size).fill(null);
  return (
    <div>
      <ul>
        {sizeArray.map((index) => (
          <li key={index} className="mb-4 w-9/12">
            <div className="border border-opacity-25 p-6 rounded-md">
              <div className="flex items-center">
                <span className="font-bold mr-3">
                  <Image src={LoadingName} alt="Loading name..." />
                </span>
                <span className="border border-gray-200 border-opacity-0 rounded-3xl px-1.5">
                  <Image src={LoadingTag} alt="Loading tag..." />
                </span>
              </div>
              <div className="flex items-center mt-5">
                <span className="pr-2">
                  <Image src={LoadingEmail} alt="Loading email..." />
                </span>
                <span className="pl-2">
                  <Image src={LoadingPhone} alt="Loading phone..." />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadingSkeleton;
