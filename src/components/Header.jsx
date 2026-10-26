import { Globe, House } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-6">
      <div className="flex items-center gap-2 text-sm">
        <House size={16} />
        <span>Menu Item</span>
      </div>

      <div className="flex items-center gap-5">
        <Globe size={18} />

        <button className="border border-indigo-500 text-indigo-500 rounded-full px-5 py-2 text-sm">
          Button Text
        </button>
      </div>
    </header>
  );
}