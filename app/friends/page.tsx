"use client";
import Image from "next/image";
import styles from "./filter.module.css";
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
  };

  const handleClearAllComplete = () => {
    setIsClearAllClicked(false);
  };

  return (
    <div className="pl-56 pt-5">
      <div className="flex items-center mb-4">
        <div className={styles["filter-container"]}>
          <span className="inline-flex items-center">
            <button
              className={`bg-${
                isOpen || selectedFilters.length > 0 ? "default-gray" : "white"
              } pt-2 pb-0.5 pl-6 pr-6 border rounded-3xl`}
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
                  className="w-5 h-6"
                />
                {selectedFilters.length > 0 && (
                  <span className="text-white text-base pl-3">
                    {selectedFilters.length}
                  </span>
                )}
              </span>
            </button>
            <span className="pl-5">
              <Image src={Separator} alt="Logo" className="h-9" />
            </span>
            <span className="pl-5">
              <button
                onClick={() => {
                  console.log("Clear all button clicked");
                  setSelectedFilters([]);
                  setIsClearAllClicked(true);
                }}
                disabled={selectedFilters.length === 0}
                className={`${
                  selectedFilters.length > 0 && isApplyButtonClicked
                    ? "text-clear-all-blue"
                    : "text-black"
                } `}
              >
                Clear all
              </button>
            </span>
          </span>
          {isOpen && (
            <div className={styles["dropdown-content"]}>
              <header className="flex-1 bg-white text-custom-gray font-semibold h-7 w-full flex items-center justify-between shadow-sm">
                <button
                  className="pl-2 text-clear-all-blue text-sm"
                  // clicking on clear all sets to no selected filters
                  onClick={() => {
                    // handleClearAll;
                    setSelectedFilters([]);
                  }}
                >
                  Clear all
                </button>
                <span className="text-center text-base mr-5">Filter</span>
                <button className="pr-3 text-2xs" onClick={toggleDropDown}>
                  <Image src={CrossButton} alt="X" className="w-3 h-3" />
                </button>
              </header>

              <div className={styles["filter-category"]}>Friend Status</div>
              <div className={styles["filter-option"]}>
                {options.map((option, index) => (
                  <div className={styles["filter-option-item"]} key={index}>
                    <span className={styles["option-name"]}>{option}</span>
                    <span className={styles["checkbox-container"]}>
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
              <div className="flex items-center justify-center m-1">
                {/* clicking on apply button applies the filter function to the UI */}
                <button
                  className={styles["apply-button"]}
                  onClick={() => {
                    console.log("Apply button clicked");
                    setIsApplyButtonClicked(true);
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
