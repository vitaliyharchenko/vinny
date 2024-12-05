import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

function FilterPanel({ onFilterChange }) {
    const [subjects, setSubjects] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedConcept, setSelectedConcept] = useState("");

    useEffect(() => {
        // Загрузка subjects
        const fetchSubjects = async () => {
            const res = await fetch("http://localhost:8000/api/subjects/");
            const data = await res.json();
            setSubjects(data);
        };

        // Загрузка concepts
        const fetchConcepts = async () => {
            const res = await fetch("http://localhost:8000/api/concepts/");
            const data = await res.json();
            setConcepts(data);
        };

        fetchSubjects();
        fetchConcepts();
    }, []);

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
        <Form>
            <Row className="align-items-end">
                <Col xs={6}>
                    <Form.Group controlId="subjectSelect">
                        <Form.Label>Фильтр по предмету</Form.Label>
                        <Form.Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="">Все предметы</option>
                            {subjects.map((subj) => (
                                <option key={subj.pk} value={subj.pk}>
                                    {subj.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group controlId="conceptSelect">
                        <Form.Label>Фильтр по концепту</Form.Label>
                        <Form.Select
                            value={selectedConcept}
                            onChange={handleConceptChange}
                        >
                            <option value="">Все концепты</option>
                            {concepts.map((con) => (
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
