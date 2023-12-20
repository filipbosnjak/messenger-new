"use client";

import { UserNav } from "@/(components)/navbar/components/user-nav";
import { MainNav } from "@/(components)/navbar/components/main-nav";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import SheetNav from "@/(components)/SheetNav";
import { ablyClient } from "@/app/messages/components/Messages";
import { AblyProvider } from "ably/react";

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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="flex-col md:flex">
        <div className="border-b">
          {screenWidth < 640 ? (
            <div className={"flex justify-end"}>
              <SheetNav />
            </div>
          ) : (
            <div className="flex items-center px-4 ">
              <AblyProvider client={ablyClient}>
                <MainNav className="mx-6 " />
              </AblyProvider>
              <div className="ml-auto flex items-center space-x-4 gap-1 text-sm">
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
          )}
        </div>
      </div>
    </div>
  );
};
