import React, { Component } from "react";
import { redo, undo } from "../State/bucketmanager";
import "./chrome.scss";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Frame(props: any) {
  function keyHandler(ev: React.KeyboardEvent) {
    if (ev.metaKey && ev.key === "z") {
      if (ev.shiftKey) {
        redo();
      } else {
        undo();
      }
    }
  }

  return (
    <div
      className="frame"
      onKeyPress={keyHandler}>
      <Header />
      <div className="center">
        <SideBar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
