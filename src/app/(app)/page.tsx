import BookmarkCard from "@/components/app/BookmarkCard";
import SortDropdown from "@/components/app/SortDropdown";

export default function HomePage() {
  return (
    <div className="px-4 py-6 sm:p-8 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl xs:text-2xl font-bold text-foreground">
          All bookmarks
        </h1>

        <SortDropdown />
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(338px,1fr))] gap-8">
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
