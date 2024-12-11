import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

const GraphVisualization = () => {
    const containerRef1 = useRef(null);
    const [graphData, setGraphData] = useState(null);

    // Fetch graph data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/graph/concepts/"
                );
                const data = await response.json();
                setGraphData(data);
            } catch (error) {
                console.error("Error fetching graph data:", error);
            }
        };
        fetchData();
    }, []);

    // Initialize Cytoscape when data is loaded
    useEffect(() => {
        if (graphData && containerRef1.current) {
            const elements = [
                ...graphData.nodes.map((node) => ({
                    data: {
                        id: node.pk.toString(),
                        label: node.title,
                        isActive: node.is_active,
                    },
                })),
                ...graphData.edges.map((edge) => ({
                    data: {
                        source: edge.parent.toString(),
                        target: edge.child.toString(),
                    },
                })),
            ];

            const cy = cytoscape({
                container: containerRef1.current,
                elements,
                style: [
                    {
                        selector: "node",
                        style: {
                            shape: "round-rectangle",
                            width: "label",
                            height: "label",
                            padding: "10px",
                            "background-color":
                                "data(isActive) ? '#0074D9' : '#CCCCCC'",
                            color: "#fff",
                            "text-wrap": "wrap",
                            "text-max-width": "200px",
                            "text-valign": "center",
                            "text-halign": "center",
                            content: "data(label)",
                            "font-size": "12px",
                        },
                    },
                    {
                        selector: "edge",
                        style: {
                            "line-color": "#000",
                            width: 2,
                            "target-arrow-color": "#000",
                            "target-arrow-shape": "triangle",
                            "curve-style": "bezier",
                        },
                    },
                ],
                layout: {
                    name: "dagre",
                    rankDir: "LR", // Layout direction: Left-to-Right
                },
                wheelSensitivity: 0.2,
                minZoom: 0.1,
                maxZoom: 4,
            });

            // Add event listener for clicks on nodes
            cy.on("tap", "node", (event) => {
                const nodeData = event.target.data();
                alert(`Node clicked: ${nodeData.label}`);
            });

            // Add event listener for clicks on edges
            cy.on("tap", "edge", (event) => {
                const edgeData = event.target.data();
                alert(`Edge clicked: ${edgeData.source} -> ${edgeData.target}`);
            });
        }
    }, [graphData]);

    return (
        <div
            style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
            ref={containerRef1}
        >
            {!graphData && <p>Loading graph data...</p>}
        </div>
    );
};

export default GraphVisualization;
