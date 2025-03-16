
import { Bell, User } from "lucide-react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="hidden md:block">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <Bell size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <User size={18} />
          </button>
        </div>
      </div>
      <div className="md:hidden container py-2">
        <SearchBar />
      </div>
    </header>
  );
}
