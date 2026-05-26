import SearchBar from "./SearchBar";
import AvatarDropdown from "./AvatarDropdown";
import { Button } from "../ui/button";
import { Icons } from "./Icons";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header>
      <div className="flex items-center justify-between py-3 sm:py-4 px-4 bg-sidebar sm:px-8 gap-2.5 border-sidebar-border border-b">
        <div className="flex items-center gap-2.5 sm:gap-4 w-full">
          <Button
            className="lg:hidden sm:size-11"
            size="icon-lg"
            variant="outlineMenu"
            onClick={onMenuClick}
          >
            {Icons.menu}
          </Button>
          <SearchBar />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <Button size="icon-lg" className="md:hidden">
            {Icons.plus}
          </Button>

          <Button className="hidden md:flex" size="xxl">
            {Icons.plus}
            <span>Add Bookmark</span>
          </Button>
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
