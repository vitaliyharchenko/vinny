// src/App.jsx
import React from "react";
import GraphManager from "./components/graph/GraphManager";
import ConceptGraph from "./components/ConceptGraph";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <GraphManager />
            <ConceptGraph />
        </div>
    );
}

export default App;
