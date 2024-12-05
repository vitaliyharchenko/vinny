import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function NodeEdgeEditor({ element, onSave, onDelete, onCancel }) {
    const { type, data } = element;
    const [title, setTitle] = useState(data.title || data.label || "");

    const handleSave = () => {
        onSave({ ...data, title });
    };

    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {type === "node"
                        ? "Редактирование узла"
                        : "Редактирование ребра"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{JSON.stringify(data)}</p>
                {type === "node" ? (
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        {/* Можно добавить дополнительные поля для subjects, concepts, testability */}
                    </Form>
                ) : null}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Удалить
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NodeEdgeEditor;
