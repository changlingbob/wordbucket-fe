import React from "react";
import "./App.scss";
import Frame from "./Chrome/Frame";
import Content from "./Content/Content";
import { StateProvider } from "./State/state";

function App() {
  return (
    <StateProvider>
      <Frame>
        <Content />
      </Frame>
    </StateProvider>
  );
}

export default App;
