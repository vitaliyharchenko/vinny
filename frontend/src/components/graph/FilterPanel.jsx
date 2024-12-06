import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

function FilterPanel({ onFilterChange }) {
    const [subjects, setSubjects] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [filteredConcepts, setFilteredConcepts] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedConcept, setSelectedConcept] = useState("");

    const [subjectSearch, setSubjectSearch] = useState("");
    const [conceptSearch, setConceptSearch] = useState("");

    useEffect(() => {
        // Загрузка subjects
        const fetchSubjects = async () => {
            const res = await fetch("http://localhost:8000/api/subjects/");
            const data = await res.json();
            setSubjects(data);
            setFilteredSubjects(data);
        };

        // Загрузка concepts
        const fetchConcepts = async () => {
            const res = await fetch("http://localhost:8000/api/concepts/");
            const data = await res.json();
            setConcepts(data);
            setFilteredConcepts(data);
        };

        fetchSubjects();
        fetchConcepts();
    }, []);

    useEffect(() => {
        // Фильтрация subjects по subjectSearch
        if (subjectSearch.trim() === "") {
            setFilteredSubjects(subjects);
        } else {
            const query = subjectSearch.toLowerCase();
            const filtered = subjects.filter((subj) =>
                subj.title.toLowerCase().includes(query)
            );
            setFilteredSubjects(filtered);
        }
    }, [subjectSearch, subjects]);

    useEffect(() => {
        // Фильтрация concepts по conceptSearch
        if (conceptSearch.trim() === "") {
            setFilteredConcepts(concepts);
        } else {
            const query = conceptSearch.toLowerCase();
            const filtered = concepts.filter((con) =>
                con.title.toLowerCase().includes(query)
            );
            setFilteredConcepts(filtered);
        }
    }, [conceptSearch, concepts]);

    const handleSubjectChange = (e) => {
        const value = e.target.value;
        setSelectedSubject(value);
        onFilterChange({ subject: value, concept: selectedConcept });
    };

    const handleConceptChange = (e) => {
        const value = e.target.value;
        setSelectedConcept(value);
        onFilterChange({ subject: selectedSubject, concept: value });
    };

    return (
        <Form style={{ marginBottom: "10px" }}>
            <Row className="align-items-end">
                <Col xs={6}>
                    <Form.Group controlId="subjectSearch">
                        <Form.Label>Поиск по предметам</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите для поиска предмета"
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="subjectSelect"
                        style={{ marginTop: "5px" }}
                    >
                        <Form.Label>Фильтр по предмету</Form.Label>
                        <Form.Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="">Все предметы</option>
                            {filteredSubjects.map((subj) => (
                                <option key={subj.pk} value={subj.pk}>
                                    {subj.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group controlId="conceptSearch">
                        <Form.Label>Поиск по концептам</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите для поиска концепта"
                            value={conceptSearch}
                            onChange={(e) => setConceptSearch(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="conceptSelect"
                        style={{ marginTop: "5px" }}
                    >
                        <Form.Label>Фильтр по концепту</Form.Label>
                        <Form.Select
                            value={selectedConcept}
                            onChange={handleConceptChange}
                        >
                            <option value="">Все концепты</option>
                            {filteredConcepts.map((con) => (
                                <option key={con.pk} value={con.pk}>
                                    {con.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterPanel;
