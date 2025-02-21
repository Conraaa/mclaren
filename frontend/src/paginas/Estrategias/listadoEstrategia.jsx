import { useState, useEffect } from 'react';
import ListaDeEstrategias from "./Card.jsx";
import './listadoEstrategia.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from "../Bar/Bar.jsx";
import Fondo from '../Imagenes/estrategiafondo.jpg';
import { message } from 'antd';

function Estrategia() {
    const [show, setShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [pistas, setPistas] = useState([]);
    const [piezasDisponibles, setPiezasDisponibles] = useState([]);
    const [estrategias, setEstrategias] = useState([]);
    const [estrategia, setEstrategia] = useState({
        tipo: '',
        pista: '',
        aleronDelantero: '',
        aleronTrasero: '',
        pontones: '',
        fondoPlano: '',
        difusor: '',
        motor: '',
        cajaCambios: ''
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/pistas/")
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    message.warning("No hay pistas disponibles.");
                }
                setPistas(data);
            })
            .catch(error => {
                console.error("Error cargando pistas:", error);
                message.warning("Error al cargar las pistas.");
            });
    
        fetch("http://127.0.0.1:8000/api/piezas/")
            .then(response => response.json())
            .then(piezas => {
                if (piezas.length === 0) {
                    message.warning("No hay piezas disponibles.");
                } else {
                    const categorias = [
                        "Aleron Delantero", 
                        "Aleron Trasero", 
                        "Pontones", 
                        "Fondo Plano", 
                        "Difusor", 
                        "Motor", 
                        "Caja De Cambios"
                    ];

                    categorias.forEach(categoria => {
                        const piezasCategoria = piezas.filter(pieza => pieza.categoria_nombre === categoria);
                        if (piezasCategoria.length === 0) {
                            message.warning(`No hay piezas disponibles de: ${categoria}`);
                        }
                    });
                }

                setPiezasDisponibles(piezas);
            })
            .catch(error => {
                console.error("Error cargando piezas:", error);
                message.warning("Error al cargar las piezas.");
            });
    }, []);

    const handleChange = (e) => {
        setEstrategia({
            ...estrategia,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        // Validar que todos los campos requeridos están completos
        if (!estrategia.tipo || !estrategia.pista || !estrategia.aleronDelantero || !estrategia.aleronTrasero || 
            !estrategia.pontones || !estrategia.fondoPlano || !estrategia.difusor || !estrategia.motor || !estrategia.cajaCambios) {
            
              message.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const selectedPista = pistas.find(p => p.nombre === estrategia.pista);

            if (isEditMode) {
                // Edición de estrategia
                const deleteResponse = await fetch(`http://127.0.0.1:8000/api/estrategias/${estrategia.id}/`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });
                
                if (!deleteResponse.ok) {
                    message.error("Error eliminando la estrategia");
                    return;
                }

                setEstrategias(estrategias.filter(e => e.id !== estrategiaId));
                message.success("Estrategia eliminada correctamente.");
        

                // Crear nueva estrategia
                const estrategiaResponse = await fetch(`http://127.0.0.1:8000/api/estrategias/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: estrategia.tipo,
                        pista: selectedPista ? selectedPista.id : null
                    })
                });

                if (!estrategiaResponse.ok) {
                    message.error("Error al crear la estrategia");
                    return;
                }

                const nuevaEstrategia = await estrategiaResponse.json();
                const estrategiaId = nuevaEstrategia.id;

                const piezas = [
                    estrategia.aleronDelantero,
                    estrategia.aleronTrasero,
                    estrategia.pontones,
                    estrategia.fondoPlano,
                    estrategia.difusor,
                    estrategia.motor,
                    estrategia.cajaCambios
                ];

                await fetch(`http://127.0.0.1:8000/api/estrategiapiezas/${estrategiaId}/`, {
                    method: "DELETE"
                });

                for (const pieza of piezas) {
                    if (pieza) {
                        await fetch("http://127.0.0.1:8000/api/estrategiapiezas/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                estrategia: estrategiaId,
                                pieza: pieza
                            })
                        });
                    }
                }

            } else {
                // Creación de estrategia
                const estrategiaResponse = await fetch("http://127.0.0.1:8000/api/estrategias/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: estrategia.tipo,
                        pista: selectedPista ? selectedPista.id : null
                    })
                });

                if (!estrategiaResponse.ok) {
                    const errorData = await estrategiaResponse.json();
                    console.error("Error al crear la estrategia:", errorData);
                    return;
                }

                const estrategiaData = await estrategiaResponse.json();
                const estrategiaId = estrategiaData.id;

                const piezas = [
                    estrategia.aleronDelantero,
                    estrategia.aleronTrasero,
                    estrategia.pontones,
                    estrategia.fondoPlano,
                    estrategia.difusor,
                    estrategia.motor,
                    estrategia.cajaCambios
                ];

                for (const pieza of piezas) {
                    if (pieza) {
                        await fetch("http://127.0.0.1:8000/api/estrategiapiezas/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                estrategia: estrategiaId,
                                pieza: pieza
                            })
                        });
                    }
                }
            }
            setShow(false);
            window.location.reload(); // Recargar la página después de guardar
        } catch (error) {
            console.error("Error al guardar la estrategia:", error);
        }
    };

    const handleDelete = async (estrategiaId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/estrategias/${estrategiaId}/`, {
                method: "DELETE"
            });

            if (!response.ok) {
                message.error("Error al eliminar la estrategia");
                return;
            }

            setEstrategias(estrategias.filter(e => e.id !== estrategiaId));
            console.log("Estrategia eliminada");
        } catch (error) {
            console.error("Error al eliminar la estrategia:", error);
        }
    };

    const handleEdit = (estrategia) => {
        const piezas = estrategia.piezas || [];
        setEstrategia({
            id: estrategia.id,
            tipo: estrategia.nombre,
            pista: estrategia.pista_nombre,
            aleronDelantero: piezas.find(p => p.categoria_nombre === "Aleron Delantero")?.id || '',
            aleronTrasero: piezas.find(p => p.categoria_nombre === "Aleron Trasero")?.id || '',
            pontones: piezas.find(p => p.categoria_nombre === "Pontones")?.id || '',
            fondoPlano: piezas.find(p => p.categoria_nombre === "Fondo Plano")?.id || '',
            difusor: piezas.find(p => p.categoria_nombre === "Difusor")?.id || '',
            motor: piezas.find(p => p.categoria_nombre === "Motor")?.id || '',
            cajaCambios: piezas.find(p => p.categoria_nombre === "Caja De Cambios")?.id || ''
        });
        setIsEditMode(true);
        setShow(true);
    };

    const handleAdd = () => {
        setEstrategia({
            tipo: '',
            pista: '',
            aleronDelantero: '',
            aleronTrasero: '',
            pontones: '',
            fondoPlano: '',
            difusor: '',
            motor: '',
            cajaCambios: ''
        });
        setIsEditMode(false);
        setShow(true);
    };

    return (
        <div className="todo">
            <Bar />
            <img className="pagePista" src={Fondo} alt="Fondo de Pista" /> 

            {/* Botón para abrir el modal */}
            <div className="botonAnadir">
                <Button className="Añadir" variant="primary" size="lg" onClick={handleAdd}>Añadir </Button> 
            </div>

            {/* Mostrar estrategias en cartas */}
            <ListaDeEstrategias estrategias={estrategias} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal para agregar estrategia */}
            <Modal className="listadoEstrategiaModal" show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Modificar Estrategia" : "Añadir Estrategia"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Modelito'>
                    <Form>
                        {/* Selector de Pista */}
                        <Form.Group controlId="formPista" className="mt-3">
                            <Form.Label>Pista</Form.Label>
                            <Form.Select className="inputCarrera" name="pista" value={estrategia.pista} onChange={handleChange} disabled={isEditMode}>
                                <option value="">Seleccionar una pista</option>
                                {pistas.map(pista => (
                                    <option key={pista.id} value={pista.nombre}>{pista.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {/* Selector de Tipo de Estrategia */}
                        <Form.Group controlId="formTipo">
                            <Form.Label>Tipo de Estrategia</Form.Label>
                            <Form.Select name="tipo" className="inputCarrera" value={estrategia.tipo} onChange={handleChange} disabled={isEditMode}>
                                <option value="" disabled>Seleccionar el tipo de estrategia</option>
                                <option value="Seco">Seco</option>
                                <option value="Lluvia">Lluvia</option>
                                <option value="Viento">Viento</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Contenedor con las dos columnas */}
                        <div className="input-container">
                            {/* Columna Aerodinámica */}
                            <div className="aerodinamica">
                                <h5>Aerodinámica</h5>
                                <Form.Group>
                                    <Form.Label>Alerón Delantero</Form.Label>
                                    <Form.Select className="inputCarrera" name="aleronDelantero" value={estrategia.aleronDelantero} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Aleron Delantero").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Alerón Trasero</Form.Label>
                                    <Form.Select className="inputCarrera" name="aleronTrasero" value={estrategia.aleronTrasero} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Aleron Trasero").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Pontones</Form.Label>
                                    <Form.Select className="inputCarrera" name="pontones" value={estrategia.pontones} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Pontones").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Fondo Plano</Form.Label>
                                    <Form.Select className="inputCarrera" name="fondoPlano" value={estrategia.fondoPlano} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Fondo Plano").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Difusor</Form.Label>
                                    <Form.Select className="inputCarrera" name="difusor" value={estrategia.difusor} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Difusor").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            {/* Columna Grupo Motor */}
                            <div className="grupo-motor">
                                <h5>Grupo Motor</h5>
                                <Form.Group>
                                    <Form.Label>Motor</Form.Label>
                                    <Form.Select className="inputCarrera" name="motor" value={estrategia.motor} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Motor").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Caja de Cambios</Form.Label>
                                    <Form.Select className="inputCarrera" name="cajaCambios" value={estrategia.cajaCambios} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Caja De Cambios").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="Cerrar" variant="secondary" onClick={() => setShow(false)}>Cerrar</Button>
                    <Button className='Guardar' variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Estrategia;
