import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="w-full max-w-65 md:max-w-[320px]">
      <Field>
        <Label className="sr-only" htmlFor="search">
          Search by title
        </Label>
        <div className="relative w-full">
          <Input
            className="pl-10"
            type="search"
            placeholder="Search by title..."
          />
          <Search
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
        </div>
      </Field>
    </form>
  );
}
