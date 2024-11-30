import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
    graphStratify,
    layeringLongestPath,
    sugiyama,
    decrossOpt,
    coordCenter,
} from "d3-dag";

function GraphComponent() {
    // Указатель на элемент, где живет граф
    const svgRef = useRef();

    useEffect(() => {
        // Очистка SVG
        d3.select(svgRef.current).selectAll("*").remove();

        // Определение размеров
        const width = 600;
        const height = 400;

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Данные
        const data = [
            { id: "1" },
            { id: "2", parentIds: ["1"] },
            { id: "3", parentIds: ["2"] },
            { id: "4", parentIds: ["3", "1"] }, // Узел 4 имеет двух родителей: 1 и 3
        ];

        // Создание DAG
        const dag = graphStratify()(data);

        // Настройка раскладки
        const layout = sugiyama()
            .size([width, height])
            .layering(layeringLongestPath())
            .decross(decrossOpt())
            .coord(coordCenter());

        layout(dag);

        // Создание линии
        const line = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x((d) => d.x)
            .y((d) => d.y);

        // Определение маркера стрелки
        svg.append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15) // Настройте это значение для позиционирования стрелки
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");

        // Отрисовка ребер
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

        // Отрисовка узлов
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

        // Добавление интерактивности
        nodes.on("click", (event, d) => {
            console.log("Клик по узлу:", d.data.id);
        });
    }, []);

    return <svg ref={svgRef}></svg>;
}

export default GraphComponent;
