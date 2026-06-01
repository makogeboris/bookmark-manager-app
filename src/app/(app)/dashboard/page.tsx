import { Metadata } from "next";
import BookmarkCard from "@/components/dashboard/BookmarkCard";
import SortDropdown from "@/components/dashboard/SortDropdown";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function page() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="xs:text-2xl text-foreground text-xl font-bold">
          All bookmarks
        </h1>

        <SortDropdown />
      </div>

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(338px,1fr))] gap-8">
        <BookmarkCard
          title="Frontend Mentor"
          url="https://frontendmentor.io"
          favicon="/favicons/frontendmentor.png"
          description="Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs."
          tags={["Practice", "Learning", "Community"]}
          views={47}
          dateAdded="23 Sep"
          dateVisited="15 Jan"
          pinned={false}
        />

        <BookmarkCard
          title="Frontend Mentor"
          url="https://frontendmentor.io"
          favicon="/favicons/frontendmentor.png"
          description="Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs."
          tags={["Practice", "Learning", "Community"]}
          views={47}
          dateAdded="23 Sep"
          dateVisited="15 Jan"
          pinned={false}
        />

        <BookmarkCard
          title="Frontend Mentor"
          url="https://frontendmentor.io"
          favicon="/favicons/frontendmentor.png"
          description="Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs."
          tags={["Practice", "Learning", "Community"]}
          views={47}
          dateAdded="23 Sep"
          dateVisited="15 Jan"
          pinned={false}
        />
      </div>
    </div>
  );
}
