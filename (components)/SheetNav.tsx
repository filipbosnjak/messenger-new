import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaBarsStaggered } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export type SheetNavProps = {};

const SheetNav = (props: SheetNavProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleSheet = () => {
    setOpen(!open);
  };
  return (
    <>
      <Sheet open={open} onOpenChange={toggleSheet}>
        <SheetTrigger asChild onClick={toggleSheet}>
          <div className={"p-4 cursor-pointer"}>
            <FaBarsStaggered />
          </div>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[200px]">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>
              Select where you want to go next.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium"
              onClick={toggleSheet}
            >
              Home
            </Link>
            <Link
              href="/messages"
              className="text-sm font-medium"
              onClick={toggleSheet}
            >
              Messages
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium dark:text-gray-300"
              onClick={toggleSheet}
            >
              Overview
            </Link>
            <Link
              href="/ablyauth"
              className="text-sm font-medium"
              onClick={toggleSheet}
            >
              AblyAuth
            </Link>
            <Link
              href="/pubsub"
              className="text-sm font-medium"
              onClick={toggleSheet}
            >
              PubSub
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium"
              onClick={toggleSheet}
            >
              Settings
            </Link>
          </div>
          {/*          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>*/}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetNav;
