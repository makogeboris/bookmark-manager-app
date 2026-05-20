import SearchBar from "./SearchBar";
import { Button } from "../ui/button";
import DropdownMenuAvatar from "./DropdownMenuAvatar";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between py-3 sm:py-4 px-4 bg-sidebar sm:px-8 gap-2.5">
        <div className="flex items-center gap-2.5 sm:gap-4 w-full">
          <Button
            className="md:hidden sm:size-11"
            size="icon-lg"
            variant="outlineMenu"
          >
            <svg
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 5.75H15.75M0.75 0.75H15.75M0.75 10.75H15.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <SearchBar />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <Button size="icon-lg" className="md:hidden">
            <svg
              className="size-3"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.58333 0.75V12.4167M0.75 6.58333H12.4167"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Button className="hidden md:flex" size="xl">
            <svg
              className="size-3"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.58333 0.75V12.4167M0.75 6.58333H12.4167"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Add Bookmark</span>
          </Button>
          <DropdownMenuAvatar />
        </div>
      </div>
    </header>
  );
}
