import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function GraphComponent() {
    // Указатель на элемент, где живет граф
    const svgRef = useRef();

    const data = {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
    };

    useEffect(() => {
        // Очистка SVG перед отрисовкой
        d3.select(svgRef.current).selectAll("*").remove();

        // Установка размеров SVG
        const svg = d3
            .select(svgRef.current)
            .attr("width", "100%")
            .attr("height", 600);

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // Определение стрелок для направленности
        svg.append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 23) // Смещение стрелки
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");

        // Создание групп для узлов и ребер
        const svgGroup = svg.append("g").attr("class", "everything");

        // Добавление масштабирования и перемещения
        const zoom = d3
            .zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", (event) => {
                svgGroup.attr("transform", event.transform);
            });

        svg.call(zoom);

        // Создание симуляции
        const simulation = d3
            .forceSimulation(data.nodes)
            .force(
                "link",
                d3
                    .forceLink(data.links)
                    .id((d) => d.id)
                    .distance(200)
            )
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Ребра
        const link = svgGroup
            .append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(data.links)
            .enter()
            .append("path")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("marker-end", "url(#arrowhead)"); // Добавление стрелки на конец ребра

        // Узлы
        const node = svgGroup
            .append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")
            .call(
                d3
                    .drag()
                    .on("start", dragStarted)
                    .on("drag", dragged)
                    .on("end", dragEnded)
            );

        node.append("circle").attr("r", 20).attr("fill", "lightblue");

        node.append("text")
            .attr("dx", -10)
            .attr("dy", 5)
            .text((d) => d.id);

        // Обновление позиций узлов и ребер при каждой итерации симуляции
        simulation.on("tick", () => {
            // Обновление позиций ребер
            link.attr("d", (d) => {
                const sourceX = d.source.x;
                const sourceY = d.source.y;
                const targetX = d.target.x;
                const targetY = d.target.y;

                const dx = targetX - sourceX;
                const dy = targetY - sourceY;
                const dr = 0; // Кривизна ребра (0 для прямой линии)

                return `M${sourceX},${sourceY}L${targetX},${targetY}`;
            });

            // Обновление позиций узлов
            node.attr("transform", (d) => `translate(${d.x},${d.y})`);
        });

        // Функции для обработки перетаскивания узлов
        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }, []);

    return <svg ref={svgRef}></svg>;
}

export default GraphComponent;
