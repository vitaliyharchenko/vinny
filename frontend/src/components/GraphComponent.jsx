import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import cytoscapeDagre from "cytoscape-dagre";
cytoscape.use(cytoscapeDagre);

function GraphComponent() {
    const cyRef = useRef(null);
    const containerRef = useRef(null);

    const [data, setData] = useState(null);

    // Загрузка данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/graph/");
                if (!response.ok) {
                    throw new Error(
                        `Ошибка загрузки данных: ${response.statusText}`
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

    // Инициализация Cytoscape после того, как данные загружены
    useEffect(() => {
        if (!data) return; // Ждем, пока данные не загрузятся

        if (cyRef.current) {
            // Если экземпляр уже существует, уничтожаем и пересоздаем
            cyRef.current.destroy();
        }

        // Преобразование данных в формат Cytoscape
        // Предполагается, что data.nodes - массив объектов с 'pk' и 'title'
        // data.edges - массив объектов с 'parent', 'child'
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

        // Инициализация Cytoscape
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
                name: "dagre", // Если хотите иерархический макет, можно использовать dagre
                rankDir: "LR", // Направление (LR, TB, RL, BT)
                align: "UR",
            },
            wheelSensitivity: 0.2, // чувствительность масштабирования колесиком
            minZoom: 0.1,
            maxZoom: 4,
        });

        cyRef.current = cy;

        // Включить панорамирование/масштабирование из коробки уже работает
        // по умолчанию, достаточно крутить колесико и перетаскивать фон

        // Обработка клика по узлу
        cy.on("tap", "node", (event) => {
            const nodeData = event.target.data();
            console.log("Клик по узлу:", nodeData);
        });

        // Обработка клика по ребру
        cy.on("tap", "edge", (event) => {
            const edgeData = event.target.data();
            console.log("Клик по ребру:", edgeData);
        });

        // Возможность добавления узлов по клику на пустую область
        // Например, при двойном клике на фон можно добавить новый узел
        cy.on("tap", (event) => {
            if (event.target === cy) {
                // Клик по пустому месту
                console.log(
                    "Клик по пустой области: можно создать новый узел."
                );
                // Пример добавления нового узла:
                // const pos = event.position;
                // cy.add({
                //   group: 'nodes',
                //   data: { id: 'newNode', label: 'Новый узел' },
                //   position: { x: pos.x, y: pos.y }
                // });
            }
        });

        // Пример редактирования узла:
        // node.data('label', 'Новое имя');
        // cy.layout({ name: 'dagre' }).run(); // Перерасчет макета при необходимости
    }, [data]);

    return (
        <div
            style={{
                width: "800px",
                height: "600px",
                border: "1px solid #ccc",
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                {/* Здесь можно разместить UI для фильтров, редактирования, кнопки создания узлов */}
            </div>
            <div
                ref={containerRef}
                style={{ width: "100%", height: "100%" }}
            ></div>
        </div>
    );
}

export default GraphComponent;
