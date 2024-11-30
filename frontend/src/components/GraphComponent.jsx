import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { graphStratify, sugiyama, tweakShape, shapeEllipse } from "d3-dag";

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
        // Очистка SVG
        d3.select(svgRef.current).selectAll("*").remove();

        // Определение рабочей области
        const width = 800;
        const height = 600;
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "lightblue");

        // Добавление группы для масштабирования и перемещения
        const container = svg.append("g");

        // Создание направленного графа в формате d3dag
        const builder = graphStratify()
            .id((d) => d.id)
            .parentIds((d) =>
                data.links.filter((l) => l.target === d.id).map((l) => l.source)
            );
        const graph = builder(data.nodes);

        // Определяем настройки для выкладки
        const nodeRadius = 20;
        const nodeSize = [nodeRadius * 5, nodeRadius * 3];
        // this truncates the edges so we can render arrows nicely
        const shape = tweakShape(nodeSize, shapeEllipse);

        // Настройка раскладки
        const layout = sugiyama()
            //.layering(d3dag.layeringLongestPath())
            //.decross(d3dag.decrossOpt())
            //.coord(d3dag.coordGreedy())
            //.coord(d3dag.coordQuad())
            .nodeSize(nodeSize)
            .gap([nodeRadius, nodeRadius])
            .tweaks([shape]);

        const { layout_width, layout_height } = layout(graph);

        // Создание групп для добавления ребер и узлов
        const linkGroup = svg.append("g");
        const nodeGroup = svg.append("g");

        // Отрисовка ребер
        linkGroup
            .selectAll("path")
            .data(graph.links())
            .join("path")
            .attr(
                "d",
                (d) =>
                    `M${d.source.x},${d.source.y}C${d.source.x},${
                        (d.source.y + d.target.y) / 2
                    } ${d.target.x},${(d.source.y + d.target.y) / 2} ${
                        d.target.x
                    },${d.target.y}`
            )
            .attr("fill", "none")
            .attr("stroke", "black");

        // Отрисовка узлов
        const node = nodeGroup
            .selectAll("g")
            .data(graph.nodes())
            .join("g")
            .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
            .on("click", (event, d) => {
                // Обработка клика по узлу
                console.log("Клик по узлу:", d.data);
                // Здесь вы можете обновить состояние или вызвать функцию для отображения информации об узле
            });

        // Добавление круга к узлу
        node.append("circle")
            .attr("r", 20) // Увеличиваем радиус для размещения текста
            .attr("fill", "steelblue");

        // Добавление текста к узлу
        node.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 5) // Смещение по вертикали для центрирования текста
            .text((d) => d.data.id)
            .attr("fill", "white"); // Цвет текста
    }, []);

    return <svg ref={svgRef}></svg>;
}

export default GraphComponent;
