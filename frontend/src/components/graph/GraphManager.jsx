import React, { useEffect, useState } from "react";
import GraphView from "./GraphView";
import NodeEdgeEditor from "./NodeEdgeEditor";
import FilterPanel from "./FilterPanel";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function GraphManager() {
    const [data, setData] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const [subjectFilter, setSubjectFilter] = useState("");
    const [conceptFilter, setConceptFilter] = useState("");

    useEffect(() => {
        fetchData();
    }, [subjectFilter, conceptFilter]);

    const fetchData = async () => {
        try {
            let url = "http://localhost:8000/api/graph/";
            const params = [];
            if (subjectFilter)
                params.push(`subject_id=${encodeURIComponent(subjectFilter)}`);
            if (conceptFilter)
                params.push(`concept_id=${encodeURIComponent(conceptFilter)}`);
            if (params.length > 0) {
                url += "?" + params.join("&");
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Ошибка загрузки данных: ${response.statusText}`
                    );
                }
                const graphData = await response.json();
                setData(graphData);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const createNode = async (nodeData) => {
        const response = await fetch("http://localhost:8000/api/nodes/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nodeData),
        });
        const newNode = await response.json();
        setData((prev) => ({
            ...prev,
            nodes: [...prev.nodes, newNode],
        }));
    };

    const updateNode = async (pk, updatedData) => {
        const response = await fetch(`http://localhost:8000/api/nodes/${pk}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        const updatedNode = await response.json();
        setData((prev) => ({
            ...prev,
            nodes: prev.nodes.map((n) => (n.pk === pk ? updatedNode : n)),
        }));
    };

    const deleteNode = async (pk) => {
        await fetch(`http://localhost:8000/api/nodes/${pk}/`, {
            method: "DELETE",
        });
        setData((prev) => ({
            ...prev,
            nodes: prev.nodes.filter((n) => n.pk !== pk),
            edges: prev.edges.filter((e) => e.parent !== pk && e.child !== pk),
        }));
    };

    const createEdge = async (edgeData) => {
        const response = await fetch("http://localhost:8000/api/edges/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(edgeData),
        });
        const newEdge = await response.json();
        setData((prev) => ({
            ...prev,
            edges: [...prev.edges, newEdge],
        }));
    };

    const updateEdge = async (pk, updatedData) => {
        const response = await fetch(`http://localhost:8000/api/edges/${pk}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        const updatedEdge = await response.json();
        setData((prev) => ({
            ...prev,
            edges: prev.edges.map((e) => (e.pk === pk ? updatedEdge : e)),
        }));
    };

    const deleteEdge = async (pk) => {
        await fetch(`http://localhost:8000/api/edges/${pk}/`, {
            method: "DELETE",
        });
        setData((prev) => ({
            ...prev,
            edges: prev.edges.filter((e) => e.pk !== pk),
        }));
    };

    const handleSelectElement = (element) => {
        setSelectedElement(element);
    };

    const handleCreateNodeAtPosition = async (pos) => {
        const newNodeData = {
            title: "Новый узел",
            node_type: "",
            subjects: [],
            concepts: [],
            testability: false,
        };
        await createNode(newNodeData);
    };

    const handleCreateEdge = async (parentPk, childPk) => {
        await createEdge({ parent: parentPk, child: childPk });
    };

    const handleSaveElement = async (editedData) => {
        if (!selectedElement) return;
        const { type, data: elementData } = selectedElement;
        if (type === "node") {
            await updateNode(elementData.pk, editedData);
        } else if (type === "edge") {
            await updateEdge(elementData.pk, editedData);
        }
        setSelectedElement(null);
    };

    const handleDeleteElement = async () => {
        if (!selectedElement) return;
        const { type, data: elementData } = selectedElement;
        if (type === "node") {
            await deleteNode(elementData.pk);
        } else if (type === "edge") {
            await deleteEdge(elementData.pk);
        }
        setSelectedElement(null);
    };

    const handleFilterChange = ({ subject, concept }) => {
        setSubjectFilter(subject || "");
        setConceptFilter(concept || "");
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Мой граф</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* Здесь можно добавить элементы навигации, фильтры */}
                    </Nav>
                    <Button
                        variant="outline-success"
                        onClick={() => fetchData()}
                    >
                        Обновить данные
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            <Container
                fluid
                style={{ position: "relative", marginTop: "10px" }}
            >
                <FilterPanel onFilterChange={handleFilterChange} />
                {data && (
                    <GraphView
                        data={data}
                        onSelectElement={handleSelectElement}
                        onCreateNodeAtPosition={handleCreateNodeAtPosition}
                        onCreateEdge={handleCreateEdge}
                    />
                )}
                {selectedElement && (
                    <NodeEdgeEditor
                        element={selectedElement}
                        onSave={handleSaveElement}
                        onDelete={handleDeleteElement}
                        onCancel={() => setSelectedElement(null)}
                    />
                )}
            </Container>
        </>
    );
}

export default GraphManager;
