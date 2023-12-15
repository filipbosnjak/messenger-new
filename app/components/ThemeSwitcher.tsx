"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export type ThemeSwithcerProps = {};

const ThemeSwitcher = (props: ThemeSwithcerProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const { setTheme } = useTheme();

  return (
    <>
      <Switch
        checked={darkMode}
        onCheckedChange={() => {
          setTheme(darkMode ? "light" : "dark");
          setDarkMode(!darkMode);
          console.log("switched");
        }}
      />
    </>
  );
};

export default ThemeSwitcher;
