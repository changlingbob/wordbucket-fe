import React from "react";
import "./App.scss";
import Frame from "./Chrome/Frame";
import Content from "./Content/Content";
import { NavigationProvider } from "./State/navigation";

function App() {
  return (
    <NavigationProvider>
      <Frame>
        <Content />
      </Frame>
    </NavigationProvider>
  );
}

export default App;
