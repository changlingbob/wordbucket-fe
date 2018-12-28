import React, { Component } from "react";
import Footer from "./Footer";
import "./frame.scss";
import Header from "./Header";

export default function Frame(props: any) {
  return (
    <div className="frame">
      <Header />
      <div className="content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
