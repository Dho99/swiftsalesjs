import React, { useEffect } from "react";
import Admin from "./Pages/Admin/Admin";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="poppins-medium">
        <BrowserRouter>
          <Admin />
        </BrowserRouter>

    </div>
  );
}

export default App;
