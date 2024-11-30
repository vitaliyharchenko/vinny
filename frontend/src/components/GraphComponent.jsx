import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { graphStratify, sugiyama, tweakShape, shapeEllipse } from "d3-dag";

function GraphComponent() {
    // Указатель на элемент, где живет граф
    const svgRef = useRef();

    // Состояние для хранения данных графа
    const [data, setData] = useState(null);

    // const data = {
    //     nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    //     links: [
    //         { source: "1", target: "2" },
    //         { source: "2", target: "3" },
    //         { source: "3", target: "4" },
    //         { source: "1", target: "4" },
    //     ],
    // };

    useEffect(() => {
        // Функция для получения данных с сервера
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/graph/");
                if (!response.ok) {
                    throw new Error(
                        `Ошибка при получении данных: ${response.statusText}`
                    );
                }
                const graphData = await response.json();
                setData(graphData);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!data) return; // Если данные еще не загружены, ничего не делаем

        // Очистка SVG
        d3.select(svgRef.current).selectAll("*").remove();

        // Определение рабочей области
        const width = 1000;
        const height = 1000;
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "lightblue");

        // Создание направленного графа в формате d3dag
        const builder = graphStratify()
            .id((d) => d.pk.toString())
            .parentIds((d) =>
                data.edges
                    .filter((l) => l.child === d.pk)
                    .map((l) => l.parent.toString())
            );
        const graph = builder(data.nodes);

        // Определяем настройки для выкладки
        const nodeRadius = 20;
        const nodeSize = [nodeRadius * 15, nodeRadius * 3];
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

        layout(graph);

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

        // Добавление прямоугольника к узлу
        node.append("rect")
            .attr("width", 300)
            .attr("height", 40)
            .attr("x", -150)
            .attr("y", -20)
            .attr("stroke", "black")
            .attr("fill", "#69a3b2");

        // Добавление текста к узлу
        node.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 5) // Смещение по вертикали для центрирования текста
            .text((d) => d.data.title.substring(0, 30))
            .attr("fill", "white"); // Цвет текста

        node.append("title").text((d) => d.data.title);
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default GraphComponent;
