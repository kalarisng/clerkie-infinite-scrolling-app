"use client";
import Image from "next/image";
import WhiteFilterToggle from "@/public/whitefilter.png";
import BlackFilterToggle from "@/public/blackfilter.png";
import CrossButton from "@/public/crossbutton.png";
import FriendDetails from "./FriendDetails";
import Separator from "@/public/separator.png";
import { useState } from "react";

const FriendsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isApplyButtonClicked, setIsApplyButtonClicked] = useState(false);
  const [isClearAllClicked, setIsClearAllClicked] = useState(false);
  const options = ["Close Friends", "Super Close Friends"];
  const [isConfirmedFilters, setIsConfirmedFilters] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClearAll = () => {
    setSelectedFilters([]);
  };

  const handleFilterOptions = (option: string) => {
    const updatedFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((item) => item !== option)
      : [...selectedFilters, option];
    setSelectedFilters(updatedFilters);
  };

  const handleApplyComplete = () => {
    setIsApplyButtonClicked(false);
    setIsOpen(false);
  };

  const handleClearAllComplete = () => {
    setIsClearAllClicked(false);
  };

  return (
    <div className="pl-56 pt-1 mt-7">
      <div className="flex items-center">
        <div className="relative mb-5">
          <span className="inline-flex items-center">
            <button
              className={`${
                isOpen || selectedFilters.length > 0
                  ? "bg-gray-700"
                  : "bg-white"
              } pt-1.5 pb-0.5 pl-4 pr-4 border rounded-3xl`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="inline-flex items-center">
                <Image
                  src={
                    isOpen || selectedFilters.length > 0
                      ? WhiteFilterToggle
                      : BlackFilterToggle
                  }
                  alt="Logo"
                  className="w-4 h-4"
                />
                {selectedFilters.length > 0 && isConfirmedFilters && (
                  <span className="text-white text-xs pl-3">
                    {selectedFilters.length}
                  </span>
                )}
              </span>
            </button>
            <span className="pl-5">
              <Image src={Separator} alt="Logo" className="h-7" />
            </span>
            <span className="pl-5 text-xs">
              <button
                onClick={() => {
                  setSelectedFilters([]);
                  setIsClearAllClicked(true);
                  setIsConfirmedFilters(false);
                }}
                disabled={selectedFilters.length === 0}
                className={`${
                  selectedFilters.length > 0 && isConfirmedFilters
                    ? "text-clear-all-blue"
                    : "text-gray-300"
                } font-semibold`}
              >
                Clear all
              </button>
            </span>
          </span>
          {isOpen && (
            <div className="flex flex-col absolute mt-3 left-0 bg-white border border-white shadow-xl rounded-md text-base w-60">
              <header className="flex-1 bg-white text-custom-gray font-semibold h-7 w-full flex items-center justify-between shadow-sm p-3">
                <button
                  className={`${
                    selectedFilters.length > 0
                      ? "text-clear-all-blue"
                      : "text-gray-300"
                  } text-center text-xs`}
                  // clicking on clear all sets to no selected filters
                  onClick={handleClearAll}
                >
                  Clear all
                </button>
                <span className="text-center text-sm mr-8">Filter</span>
                <button className="text-xs" onClick={toggleDropDown}>
                  <Image src={CrossButton} alt="X" className="w-3 h-3" />
                </button>
              </header>

              <div className="pt-5 pl-3 text-xs text-gray-600">
                Friend Status
              </div>
              <div className="flex flex-col px-3 justify-between text-gray-700 text-xs font-semibold">
                {options.map((option, index) => (
                  <div className="flex justify-between pt-4" key={index}>
                    <span>{option}</span>
                    <span>
                      <input
                        type="checkbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={() => handleFilterOptions(option)}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center m-1 pb-1 pt-5">
                {/* clicking on apply button applies the filter function to the UI */}
                <button
                  className="flex justify-center items-center w-60 h-8 rounded-md text-white bg-custom-gray text-xs font-semibold"
                  onClick={() => {
                    setIsApplyButtonClicked(true);
                    setIsConfirmedFilters(true);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <FriendDetails
          selectedFilters={selectedFilters}
          isApplyButtonClicked={isApplyButtonClicked}
          isClearAllClicked={isClearAllClicked}
          onApplyComplete={handleApplyComplete}
          onClearAllComplete={handleClearAllComplete}
        />
      </div>
    </div>
  );
};

export default FriendsPage;
