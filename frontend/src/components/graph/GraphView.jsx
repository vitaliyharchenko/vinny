import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
// import Card or Container if you want
import { Card } from "react-bootstrap";

cytoscape.use(dagre);

function GraphView({
    data,
    onSelectElement,
    onCreateNodeAtPosition,
    onCreateEdge,
}) {
    const containerRef = useRef(null);
    const cyRef = useRef(null);

    const [edgeCreationMode, setEdgeCreationMode] = useState(null); // null или { sourcePk }

    useEffect(() => {
        if (cyRef.current) {
            cyRef.current.destroy();
        }

        const elements = [
            ...data.nodes.map((node) => ({
                data: {
                    id: node.pk.toString(),
                    label: node.title,
                    fullData: node,
                },
            })),
            ...data.edges.map((edge) => ({
                data: {
                    source: edge.parent.toString(),
                    target: edge.child.toString(),
                    fullData: edge,
                },
            })),
        ];

        const cy = cytoscape({
            container: containerRef.current,
            elements,
            style: [
                {
                    selector: "node",
                    style: {
                        shape: "round-rectangle",
                        width: "label",
                        height: "label",
                        padding: "10px",
                        "background-color": "#0074D9",
                        color: "#fff",
                        "text-wrap": "wrap",
                        "text-max-width": "180px",
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
                rankDir: "UD",
            },
            wheelSensitivity: 0.2,
            minZoom: 0.1,
            maxZoom: 4,
        });

        cyRef.current = cy;

        cy.on("tap", "node", (event) => {
            const node = event.target;
            const nodeData = node.data("fullData");
            const isShiftPressed = event.originalEvent.shiftKey;

            if (edgeCreationMode) {
                // Мы в режиме создания ребра
                if (edgeCreationMode.sourcePk !== nodeData.pk) {
                    onCreateEdge(edgeCreationMode.sourcePk, nodeData.pk);
                }
                setEdgeCreationMode(null);
            } else {
                // Если shift зажат, начинаем режим создания ребра
                if (isShiftPressed) {
                    setEdgeCreationMode({ sourcePk: nodeData.pk });
                } else {
                    // Просто клик по узлу
                    onSelectElement({
                        type: "node",
                        data: nodeData,
                        cytoscapeElement: node,
                    });
                }
            }
        });

        cy.on("tap", "edge", (event) => {
            const edge = event.target;
            const edgeData = edge.data("fullData");
            setEdgeCreationMode(null);
            onSelectElement({
                type: "edge",
                data: edgeData,
                cytoscapeElement: edge,
            });
        });

        cy.on("tap", (event) => {
            if (event.target === cy) {
                const isShiftPressed = event.originalEvent.shiftKey;
                if (edgeCreationMode) {
                    setEdgeCreationMode(null);
                } else if (!isShiftPressed) {
                    const pos = event.position;
                    onCreateNodeAtPosition(pos);
                }
            }
        });

        cy.on("cxttap", (event) => {
            if (event.target !== cy) {
                const elem = event.target;
                const isNode = elem.isNode();
                const elementData = elem.data("fullData");
                onSelectElement({
                    type: isNode ? "node" : "edge",
                    data: elementData,
                    cytoscapeElement: elem,
                });
            } else {
                // Можно добавить контекстное меню для пустой области
            }
        });
    }, [
        data,
        onSelectElement,
        onCreateNodeAtPosition,
        onCreateEdge,
        edgeCreationMode,
    ]);

    return (
        <Card>
            <Card.Body
                style={{ position: "relative", width: "100%", height: "600px" }}
            >
                <div
                    style={{ width: "100%", height: "100%" }}
                    ref={containerRef}
                ></div>
            </Card.Body>
        </Card>
    );
}

export default GraphView;
