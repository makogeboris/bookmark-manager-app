import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./Icons";

export default function ActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="shrink-0 size-8 rounded-md border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          {Icons.dots}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-full md:min-w-50 p-1 mt-1">
        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.visit}
          Visit
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.copy}
          Copy URL
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.pin}
          Pin
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.edit}
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.archive}
          Archive
        </DropdownMenuItem>

        {/* <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.unarchive}
          Unarchive
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2.5 font-semibold text-muted-foreground px-2!">
          {Icons.delete}
          Delete
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
