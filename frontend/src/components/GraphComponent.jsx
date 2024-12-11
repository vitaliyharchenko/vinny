import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const concepts = [
    { pk: 0, title: "Счёт до 10" },
    { pk: 1, title: "Понимание количества" },
    { pk: 5, title: "Счёт до 100" },
    { pk: 6, title: "Сложение и вычитание до 20" },
    { pk: 10, title: "Сложение и вычитание до 100" },
    { pk: 11, title: "Умножение и деление" },
    { pk: 16, title: "Дроби" },
    { pk: 17, title: "Десятичные дроби" },
    { pk: 20, title: "Операции с дробями" },
    { pk: 22, title: "Пропорции и отношения" },
    { pk: 24, title: "Простые алгебраические выражения" },
    { pk: 25, title: "Линейные уравнения" },
    { pk: 29, title: "Теорема Пифагора" },
    { pk: 30, title: "Квадратные корни" },
    { pk: 32, title: "Факторизация многочленов" },
    { pk: 33, title: "Функции" },
    { pk: 36, title: "Квадратные уравнения" },
    { pk: 37, title: "Формула решения квадратного уравнения" },
    { pk: 38, title: "Тригонометрические отношения" },
    { pk: 42, title: "Показательные функции" },
    { pk: 44, title: "Логарифмы" },
    { pk: 46, title: "Прогрессии" },
    { pk: 48, title: "Логарифмические уравнения" },
    { pk: 45, title: "Тригонометрические тождества" },
    { pk: 49, title: "Тригонометрические уравнения" },
    { pk: 50, title: "Производная" },
];

const edges = [
    { parent: 0, child: 1 },
    { parent: 1, child: 5 },
    { parent: 5, child: 6 },
    { parent: 6, child: 10 },
    { parent: 10, child: 11 },
    { parent: 11, child: 16 },
    { parent: 16, child: 17 },
    { parent: 17, child: 20 },
    { parent: 20, child: 22 },
    { parent: 22, child: 24 },
    { parent: 24, child: 25 },
    { parent: 25, child: 29 },
    { parent: 25, child: 30 },
    { parent: 30, child: 32 },
    { parent: 32, child: 33 },
    { parent: 33, child: 36 },
    { parent: 36, child: 37 },
    { parent: 37, child: 38 },
    { parent: 38, child: 42 },
    { parent: 42, child: 44 },
    { parent: 44, child: 46 },
    { parent: 44, child: 48 },
    { parent: 38, child: 45 },
    { parent: 45, child: 49 },
    { parent: 37, child: 50 },
];

const CytoscapeGraph = () => {
    const cryRef = useRef(null);

    useEffect(() => {
        if (cryRef.current) {
            // Инициализация графа
            const cy = cytoscape({
                container: cryRef.current,
                elements: [
                    ...concepts.map((concept) => ({
                        data: { id: `n${concept.pk}`, label: concept.title },
                    })),
                    ...edges.map((edge) => ({
                        data: {
                            source: `n${edge.parent}`,
                            target: `n${edge.child}`,
                        },
                    })),
                ],
                style: [
                    {
                        selector: "node",
                        style: {
                            "background-color": "#007acc",
                            label: "data(label)",
                            color: "#fff",
                            "text-halign": "center",
                            "text-valign": "center",
                            "font-size": "10px",
                            width: "label",
                            height: "label",
                            padding: "5px",
                            shape: "roundrectangle",
                        },
                    },
                    {
                        selector: "edge",
                        style: {
                            width: 2,
                            "line-color": "#ccc",
                            "target-arrow-color": "#ccc",
                            "target-arrow-shape": "triangle",
                            "arrow-scale": 1,
                        },
                    },
                ],
                layout: {
                    name: "dagre", // Можно использовать 'dagre', 'breadthfirst', 'cose' и др.
                    rankDir: "LR", // направление (лево-направо)
                    nodeSep: 50,
                    rankSep: 100,
                },
            });

            // Можно добавить реакцию на события, зум, панораму:
            cy.on("tap", "node", (evt) => {
                const node = evt.target;
                console.log(`Clicked node: ${node.data("label")}`);
            });
        }
    }, []);

    return (
        <div
            style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
            ref={cryRef}
        ></div>
    );
};

export default CytoscapeGraph;
