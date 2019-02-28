import React, { Component } from "react";
import "./chrome.scss";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Frame(props: any) {
  return (
    <div className="frame">
      <Header />
      <div className="center">
        <SideBar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
