import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
    dagStratify,
    layeringLongestPath,
    sugiyama,
    decrossOpt,
    coordCenter,
} from "d3-dag";

function GraphComponent() {
    // Указатель на элемент, где живет граф
    const svgRef = useRef();

    const data = {
        nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
        links: [
            { source: "1", target: "2" },
            { source: "2", target: "3" },
            { source: "3", target: "4" },
            { source: "1", target: "4" },
        ],
    };

    useEffect(() => {
        // Clear SVG
        d3.select(svgRef.current).selectAll("*").remove();

        // Define dimensions
        const width = 600;
        const height = 400;

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create DAG
        const stratify = dagStratify();
        const dag = stratify(data);

        // Configure layout
        const layout = sugiyama()
            .size([width, height])
            .layering(layeringLongestPath())
            .decross(decrossOpt())
            .coord(coordCenter());

        layout(dag);

        // Create scales
        const line = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x((d) => d.x)
            .y((d) => d.y);

        // Draw edges
        svg.append("g")
            .selectAll("path")
            .data(dag.links())
            .enter()
            .append("path")
            .attr("d", ({ points }) => line(points))
            .attr("fill", "none")
            .attr("stroke", "#999")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)");

        // Define arrowhead marker
        svg.append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");

        // Draw nodes
        const nodes = svg
            .append("g")
            .selectAll("g")
            .data(dag.descendants())
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

        nodes.append("circle").attr("r", 15).attr("fill", "lightblue");

        nodes
            .append("text")
            .text((d) => d.data.id)
            .attr("text-anchor", "middle")
            .attr("dy", 5);
    }, []);

    return <svg ref={svgRef}></svg>;
}

export default GraphComponent;
