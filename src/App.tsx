import React from "react";
import "./App.scss";
import Frame from "./Chrome/Frame";
import LoadText from "./File/LoadText";
import { NavigationProvider } from "./State/navigation";

function App() {
  return (
    <NavigationProvider>
      <Frame>
        <LoadText />
      </Frame>
    </NavigationProvider>
  );
}

export default App;
