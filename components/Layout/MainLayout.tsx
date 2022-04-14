import { LayoutProps } from "models";
import React from "react";
import Header from "./components/Header";

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};
