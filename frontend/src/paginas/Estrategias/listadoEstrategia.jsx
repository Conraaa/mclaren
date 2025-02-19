import { useState, useEffect } from 'react';
import ListaDeEstrategias from "./Card.jsx";
import './listadoEstrategia.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from "../Bar/Bar.jsx";
import Fondo from '../Imagenes/estrategiafondo.jpg';

function Estrategia() {
    const [show, setShow] = useState(false);
    const [editando, setEditando] = useState(false);
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
        const fetchData = async () => {
            try {
                const [pistasRes, piezasRes, estrategiasRes] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/pistas/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/api/piezas/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/api/estrategias/").then(res => res.json())
                ]);

                setPistas(pistasRes);
                setPiezasDisponibles(piezasRes);
                setEstrategias(estrategiasRes);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setEstrategia({
            ...estrategia,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = (estrategiaExistente) => {
        setEstrategia({
            id: estrategiaExistente.id,
            tipo: estrategiaExistente.nombre,
            pista: estrategiaExistente.pista,
            aleronDelantero: estrategiaExistente.aleronDelantero || '',
            aleronTrasero: estrategiaExistente.aleronTrasero || '',
            pontones: estrategiaExistente.pontones || '',
            fondoPlano: estrategiaExistente.fondoPlano || '',
            difusor: estrategiaExistente.difusor || '',
            motor: estrategiaExistente.motor || '',
            cajaCambios: estrategiaExistente.cajaCambios || ''
        });
        setEditando(true);
        setShow(true);
    };

    const handleSave = async () => {
        try {
            const selectedPista = pistas.find(p => p.nombre === estrategia.pista);
            let estrategiaId = estrategia.id;

            if (!editando) {
                // Verificar si ya existe una estrategia con el mismo tipo en la misma pista
                const existingEstrategia = estrategias.find(e => e.pista === selectedPista.id && e.nombre === estrategia.tipo);
                if (existingEstrategia) {
                    alert("Ya existe una estrategia para esta pista con el mismo tipo.");
                    return;
                }
            }

            if (editando) {
                // Actualizar estrategia (PUT)
                const updateResponse = await fetch(`http://127.0.0.1:8000/api/estrategias/${estrategiaId}/`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: estrategia.tipo,
                        pista: selectedPista ? selectedPista.id : null
                    })
                });

                if (!updateResponse.ok) throw new Error("Error al actualizar la estrategia");

            } else {
                // Crear nueva estrategia (POST)
                const estrategiaResponse = await fetch("http://127.0.0.1:8000/api/estrategias/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: estrategia.tipo,
                        pista: selectedPista ? selectedPista.id : null
                    })
                });

                if (!estrategiaResponse.ok) throw new Error("Error al crear la estrategia");

                const estrategiaData = await estrategiaResponse.json();
                estrategiaId = estrategiaData.id;
            }

            // Asociar piezas a la estrategia
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

            console.log(editando ? "Estrategia actualizada" : "Estrategia creada");
            setShow(false);
            setEditando(false);
            window.location.reload();
        } catch (error) {
            console.error("Error al guardar la estrategia:", error);
        }
    };

    const handleDelete = async (estrategiaId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/estrategias/${estrategiaId}/`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Error al eliminar la estrategia");

            setEstrategias(estrategias.filter(e => e.id !== estrategiaId));
            console.log("Estrategia eliminada");
        } catch (error) {
            console.error("Error al eliminar la estrategia:", error);
        }
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
        setEditando(false);
        setShow(true);
    };

    return (
        <div className="todo">
            <Bar />
            <img className="pagePista" src={Fondo} alt="Fondo de Pista" />

            <div className="botonAnadir">
                <Button className="Añadir" variant="primary" size="lg" onClick={handleAdd}>Añadir</Button>
            </div>

            <ListaDeEstrategias estrategias={estrategias} onEdit={handleEditClick} onDelete={handleDelete} />

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? "Modificar Estrategia" : "Añadir Estrategia"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario aquí */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Estrategia;
