import React, { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";

function GraphComponent() {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        // Загрузка данных графа с бэкенда
        axios
            .get("/graph/")
            .then((response) => {
                setGraphData(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке графа:", error);
            });
    }, []);

    // Конфигурация графа
    const myConfig = {
        directed: true,
        nodeHighlightBehavior: true,
        panAndZoom: true,
        automaticRearrangeAfterDropNode: false,
        node: {
            color: "lightgreen",
            size: 400,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
        d3: {
            alphaTarget: 0.05,
            gravity: -250,
            linkLength: 200,
        },
    };

    const data = {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
    };

    // Callback to handle click on the graph.
    // @param {Object} event click dom event
    const onClickGraph = function (event) {
        window.alert("Clicked the graph background");
    };

    const onClickNode = function (nodeId, node) {
        window.alert(
            "Clicked node ${nodeId} in position (${node.x}, ${node.y})"
        );
    };

    const onDoubleClickNode = function (nodeId, node) {
        window.alert(
            "Double clicked node ${nodeId} in position (${node.x}, ${node.y})"
        );
    };

    const onRightClickNode = function (event, nodeId, node) {
        window.alert(
            "Right clicked node ${nodeId} in position (${node.x}, ${node.y})"
        );
    };

    const onMouseOverNode = function (nodeId, node) {
        window.alert(
            `Mouse over node ${nodeId} in position (${node.x}, ${node.y})`
        );
    };

    const onMouseOutNode = function (nodeId, node) {
        window.alert(
            `Mouse out node ${nodeId} in position (${node.x}, ${node.y})`
        );
    };

    const onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    const onRightClickLink = function (event, source, target) {
        window.alert("Right clicked link between ${source} and ${target}");
    };

    const onMouseOverLink = function (source, target) {
        window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    const onMouseOutLink = function (source, target) {
        window.alert(`Mouse out link between ${source} and ${target}`);
    };

    const onNodePositionChange = function (nodeId, x, y) {
        window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
    };

    // Callback that's called whenever the graph is zoomed in/out
    // @param {number} previousZoom the previous graph zoom
    // @param {number} newZoom the new graph zoom
    const onZoomChange = function (previousZoom, newZoom) {
        window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
    };

    return (
        <div>
            <p dangerouslySetInnerHTML={{ __html: graphData }} />
            {/* Добавим фильтры и другие компоненты позже */}
            <Graph
                id="graph-id"
                data={data}
                config={myConfig}
                onClickGraph={onClickGraph}
                onClickNode={onClickNode}
                onDoubleClickNode={onDoubleClickNode}
                onRightClickNode={onRightClickNode}
                onClickLink={onClickLink}
                onRightClickLink={onRightClickLink}
                onMouseOverNode={onMouseOverNode}
                onMouseOutNode={onMouseOutNode}
                onMouseOverLink={onMouseOverLink}
                onMouseOutLink={onMouseOutLink}
                onNodePositionChange={onNodePositionChange}
                onZoomChange={onZoomChange}
            />
        </div>
    );
}

export default GraphComponent;
