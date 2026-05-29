import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./Icons";
import EditBookmark from "./EditBookmark";
import ArchiveBookmark from "./ArchiveBookmark";
import UnarchiveBookmark from "./UnarchiveBookmark";
import DeleteBookmark from "./DeleteBookmark";

export default function ActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground hover:bg-accent size-8 shrink-0 rounded-md bg-transparent"
        >
          {Icons.dots}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="mt-1 w-full p-1 md:min-w-50">
        <DropdownMenuItem className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold">
          {Icons.visit}
          Visit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold">
          {Icons.copy}
          Copy URL
        </DropdownMenuItem>

        <DropdownMenuItem className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold">
          {Icons.pin}
          Pin
        </DropdownMenuItem>

        <EditBookmark />

        <ArchiveBookmark />

        <UnarchiveBookmark />

        <DeleteBookmark />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
