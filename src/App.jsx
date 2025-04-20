import React from "react";
import Weather from "./components/Weather";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      {" "}
      <div className="app">
        <Weather />
      </div>
      <Footer />
    </>
  );
};

export default App;
