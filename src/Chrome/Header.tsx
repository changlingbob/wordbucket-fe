import React from "react";

function importClick() {
  return;
}

function exportClick() {
  return;
}

export default function Footer() {
  return (
    <div className="header">
      <div className="logo"/>
      <div className="spacer"/>
      <a onClick={importClick}>
        Import
      </a>
      <a onClick={exportClick}>
        Export
      </a>
    </div>
  );
}
