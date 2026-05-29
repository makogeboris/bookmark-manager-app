import SearchBar from "./SearchBar";
import AvatarDropdown from "./AvatarDropdown";
import { Button } from "../ui/button";
import { Icons } from "./Icons";
import AddBookmark from "./AddBookmark";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header>
      <div className="bg-sidebar border-sidebar-border flex items-center justify-between gap-2.5 border-b px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex w-full items-center gap-2.5 sm:gap-4">
          <Button
            className="sm:size-11 lg:hidden"
            size="icon-lg"
            variant="outlineMenu"
            onClick={onMenuClick}
          >
            {Icons.menu}
          </Button>
          <SearchBar />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <AddBookmark />
          {/* <Button size="icon-lg" className="md:hidden">
            {Icons.plus}
          </Button>

          <Button className="hidden md:flex" size="xxl">
            {Icons.plus}
            <span>Add Bookmark</span>
          </Button> */}
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
