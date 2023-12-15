"use client";

import { UserNav } from "@/(components)/navbar/components/user-nav";
import { MainNav } from "@/(components)/navbar/components/main-nav";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function NavBar() {
  const [status, setStatus] = useState("unauthenticated");

  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      setStatus("authenticated");
    }
  }, [session]);
  return <div>{status === "authenticated" ? <NAV /> : <> </>}</div>;
}

const NAV = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { setTheme } = useTheme();

  return (
    <div>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6 " />
            <div className="ml-auto flex items-center space-x-4 text-black">
              Dark Mode
              <Switch
                checked={darkMode}
                onCheckedChange={() => {
                  setTheme(darkMode ? "light" : "dark");
                  setDarkMode(!darkMode);
                  console.log("switched");
                }}
              />
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
