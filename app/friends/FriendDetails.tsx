"use client";
import { useState, useEffect, useRef } from "react";
import friendsData from "./data.json";
import Image from "next/image";
import Ellipse from "@/public/ellipse.png";
import LoadingSkeleton from "./LoadingSkeleton";
import Loading from "@/public/loading.png";
import Link from "next/link";

interface FriendDetailsProps {
  selectedFilters: string[];
  isApplyButtonClicked: boolean;
  isClearAllClicked: boolean;
  onApplyComplete: () => void;
  onClearAllComplete: () => void;
}

interface Friend {
  id: number;
  name: string;
  email: string;
  phone: string;
  tag?: string; // optional in JSON
}

const FriendDetails: React.FC<FriendDetailsProps> = ({
  isApplyButtonClicked,
  isClearAllClicked,
  selectedFilters,
  onApplyComplete,
  onClearAllComplete,
}) => {
  const [page, setPage] = useState(0);
  const elementRef = useRef<null | HTMLDivElement>(null);
  const [data, setData] = useState<Friend[] | null>(null);
  const [shouldLoadMoreData, setShouldLoadMoreData] = useState<boolean>(true);

  // When component first mounts, fetch the first set of data first
  useEffect(() => {
    setData(null);
    setPage(0);
    fetchInitialData(friendsData);
  }, []);

  // Fetch first X number of friends from data
  const fetchInitialData = async (dataToFetch: Friend[]) => {
    const filteredData =
      selectedFilters.length > 0
        ? dataToFetch.filter((friend) => {
            return (
              friend.tag !== undefined && selectedFilters.includes(friend.tag)
            );
          })
        : dataToFetch;

    const dataFetched = await new Promise((resolve) => {
      const delay = 1000;
      setTimeout(() => {
        resolve(filteredData);
      }, delay);
    });

    const itemsPerPage = 5;
    const limitedData = (dataFetched as Friend[]).slice(0, itemsPerPage);
    setData(limitedData);
    setPage(1);
    setShouldLoadMoreData(true);
  };

  // Intersection observer for API for infinite scrolling
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && shouldLoadMoreData) {
      if (page > 0) {
        console.log(page);
        fetchMoreData(friendsData);
      }
    }
  };

  // Intersection observer for API for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data]);

  // Fetch next X number of friends from data
  const fetchMoreData = async (dataToFetch: Friend[]) => {
    const filteredData =
      selectedFilters.length > 0
        ? dataToFetch.filter((friend) => {
            return (
              friend.tag !== undefined && selectedFilters.includes(friend.tag)
            );
          })
        : dataToFetch;

    const dataFetched = await new Promise((resolve) => {
      const delay = page === 0 ? 0 : 1000;
      setTimeout(() => {
        resolve(filteredData);
      }, delay);
    });

    const itemsPerPage = 5;
    const skip = page * itemsPerPage;
    const limitedData = (dataFetched as Friend[]).slice(
      skip,
      skip + itemsPerPage
    );

    if (limitedData.length < itemsPerPage) {
      setShouldLoadMoreData(false);
    }

    if (limitedData.length === 0) {
      setShouldLoadMoreData(false);
    } else {
      setData((prevFriends) => {
        if (prevFriends) {
          return [...prevFriends, ...limitedData];
        } else {
          return limitedData;
        }
      });
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle applying of filters
  useEffect(() => {
    if (isApplyButtonClicked) {
      setData(null);
      setPage(0);
      fetchInitialData(friendsData);
      onApplyComplete();
    }
  }, [isApplyButtonClicked]);

  // Handle clearing of filters
  useEffect(() => {
    if (isClearAllClicked) {
      setData(null);
      setPage(0);
      fetchInitialData(friendsData);
      onClearAllComplete();
    }
  }, [isClearAllClicked]);

  return (
    <div>
      {data === null ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <ul>
            {data.map((friend) => (
              <Link href={`/friends/${friend.id}`} key={friend.id}>
                <li key={friend.id} className="mb-4 w-9/12">
                  <div className="border border-opacity-25 p-6 rounded-md">
                    <div className="flex items-center">
                      <span className="font-bold mr-3 text-sm">
                        {friend.name}
                      </span>
                      <span
                        className={`border border-gray-200 border-opacity-0 rounded-3xl px-1.5 text-xs font-semibold ${
                          friend.tag === "Close Friends"
                            ? "text-close-friends-tag bg-close-friends-bg"
                            : "text-super-close-friends-tag bg-super-close-friends-bg"
                        }`}
                      >
                        {friend.tag}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-mail-phone-color pr-2">
                        {friend.email}
                      </span>
                      <span>
                        <Image src={Ellipse} alt="ellipse" />
                      </span>
                      <span className="text-sm text-mail-phone-color pl-2">
                        {friend.phone}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          {shouldLoadMoreData && data !== null && (
            <div
              ref={elementRef}
              className="flex justify-center items-center w-4/5"
            >
              <Image src={Loading} alt="Loading..." className="h-8 w-8" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendDetails;
