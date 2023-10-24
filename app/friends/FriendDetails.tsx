"use client";
import { useState, useEffect, useRef, use } from "react";
import friendsData from "./data.json";
import Image from "next/image";
import Ellipse from "@/public/ellipse.png";
import LoadingSkeleton from "./LoadingSkeleton";

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
  const [friendData, setFriendData] = useState<Friend[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [firstPageLoaded, setFirstPageLoaded] = useState(false);
  const elementRef = useRef<null | HTMLDivElement>(null);
  //use for initial/filter load
  const [data, setData] = useState<Friend[] | null>(null);
  const [shouldLoadMoreData, setShouldLoadMoreData] = useState<boolean>(true);

  // when component first mounts
  // fetch the first page of data first
  useEffect(() => {
    console.log("component mounted");
    setData(null);
    setPage(0);
    fetchInitialData(friendsData);
  }, []);

  const fetchInitialData = async (dataToFetch: Friend[]) => {
    const filteredData =
      selectedFilters.length > 0
        ? dataToFetch.filter((friend) => {
            return (
              friend.tag !== undefined && selectedFilters.includes(friend.tag)
            );
          })
        : dataToFetch;
    const rawData = await new Promise((resolve) => {
      const delay = 1000;
      setTimeout(() => {
        resolve(filteredData);
      }, delay);
    });

    const itemsPerPage = 5; // assume data > 5
    const limitedData = (rawData as Friend[]).slice(0, itemsPerPage);
    setData(limitedData);
    setFriendData(limitedData);
    setPage(1);
    setShouldLoadMoreData(true);
    setHasMore(true);
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      if (page > 0) {
        console.log(page);
        fetchMoreData(friendsData);
      }
    }
  };

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

  const fetchMoreData = async (dataToFetch: Friend[]) => {
    console.log("Fetching data for page", page);
    console.log("selected filters: ", selectedFilters);
    const filteredData =
      selectedFilters.length > 0
        ? dataToFetch.filter((friend) => {
            return (
              friend.tag !== undefined && selectedFilters.includes(friend.tag)
            );
          })
        : dataToFetch;
    const rawData = await new Promise((resolve) => {
      const delay = page === 0 ? 0 : 1000;
      setTimeout(() => {
        resolve(filteredData);
      }, delay);
    });

    const itemsPerPage = 5;
    const skip = page * itemsPerPage;
    const limitedData = (rawData as Friend[]).slice(skip, skip + itemsPerPage);
    setData(limitedData);

    // reached end of all data fetched
    if (limitedData.length < itemsPerPage) {
      setShouldLoadMoreData(false);
      setHasMore(false);
    }

    if (limitedData.length === 0) {
      setHasMore(false);
    } else {
      setFriendData((prevFriends) => [...prevFriends, ...limitedData]);
      setPage((prevPage) => prevPage + 1);
      if (!firstPageLoaded) {
        console.log("first page is loaded");
        setFirstPageLoaded(true);
      }
    }
  };

  useEffect(() => {
    if (isApplyButtonClicked) {
      console.log("filter applied");
      setData(null);
      setPage(0);
      fetchInitialData(friendsData);
      onApplyComplete();
    }
  }, [isApplyButtonClicked]);

  useEffect(() => {
    if (isClearAllClicked) {
      console.log("filter cleared");
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
            {friendData.map((friend) => (
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
            ))}
          </ul>
          {shouldLoadMoreData && data !== null && <div ref={elementRef}></div>}
        </div>
      )}
    </div>
  );
};

export default FriendDetails;
