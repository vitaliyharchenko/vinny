// src/App.jsx
import React from "react";
import GraphManager from "./components/graph/GraphManager";
import CytoscapeGraph from "./components/GraphComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <GraphManager />
            {/* <CytoscapeGraph /> */}
        </div>
    );
}

export default App;
