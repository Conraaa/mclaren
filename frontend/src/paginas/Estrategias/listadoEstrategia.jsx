import { useState, useEffect } from 'react';
import ListaDeEstrategias from "./Card.jsx";
import './listadoEstrategia.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'antd';
import {useAuth} from "../../Context/AuthProvider";
import Bar from "../Bar/Bar.jsx";
import Fondo from '../Imagenes/estrategiafondo.jpg';

function Estrategia() {
    const { fetchWithAuth } = useAuth();
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
        const fetchData = async () => {
            try {
                const [pistasResponse, piezasResponse, estrategiasResponse] = await Promise.all([
                    fetch("https://mclaren-production.up.railway.app/api/pistas/"),
                    fetch("https://mclaren-production.up.railway.app/api/piezas/"),
                    fetch("https://mclaren-production.up.railway.app/api/estrategias/")
                ]);

                const pistasData = await pistasResponse.json();
                const piezasData = await piezasResponse.json();
                const estrategiasData = await estrategiasResponse.json();

                setPistas(pistasData);
                setPiezasDisponibles(piezasData);
                setEstrategias(estrategiasData);
            } catch (error) {
                console.error("Error cargando datos:", error);
                message.warning("Error al cargar las pistas, piezas o estrategias.");
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

    const handleSave = async () => {
        if (!estrategia.tipo || !estrategia.pista || !estrategia.aleronDelantero || !estrategia.aleronTrasero ||
            !estrategia.pontones || !estrategia.fondoPlano || !estrategia.difusor || !estrategia.motor || !estrategia.cajaCambios) {
            
            message.error("Todos los campos son obligatorios");
            return;
        }
    
        try {
            const selectedPista = pistas.find(p => p.nombre === estrategia.pista);    
            const existingEstrategia = estrategias.find(e => e.pista === selectedPista.id && e.nombre === estrategia.tipo);
            if (existingEstrategia && !isEditMode) {
                message.error("Ya existe una estrategia para esta pista con el mismo tipo.");
                return;
            }
    
            let estrategiaResponse;
            let estrategiaId;
    
            if (isEditMode) {
                if (!estrategia.id) {
                    message.error("ID de la estrategia no encontrado para la edición");
                    return;
                }
                const piezasExistentes = await fetch(`https://mclaren-production.up.railway.app/api/estrategiapiezas/?estrategia=${estrategia.id}`).then(res => res.json());
                for (const pieza of piezasExistentes) {
                    await fetchWithAuth(`https://mclaren-production.up.railway.app/api/estrategiapiezas/${pieza.id}/`, {
                        method: "DELETE"
                    });
                }
                const updateData = {
                    nombre: estrategia.tipo,
                    pista: selectedPista ? selectedPista.id : null
                };
    
                estrategiaResponse = await fetchWithAuth(`https://mclaren-production.up.railway.app/api/estrategias/${estrategia.id}/`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData)
                });
    
                if (!estrategiaResponse.ok) {
                    const errorData = await estrategiaResponse.json();
                    message.error("Error al actualizar la estrategia:", errorData);
                    return;
                }
    
                estrategiaId = estrategia.id; 
    
            } else {
                estrategiaResponse = await fetchWithAuth("https://mclaren-production.up.railway.app/api/estrategias/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: estrategia.tipo,
                        pista: selectedPista ? selectedPista.id : null
                    })
                });
    
                if (!estrategiaResponse.ok) {
                    const errorData = await estrategiaResponse.json();
                    message.error("Error al guardar la estrategia:", errorData);
                    return;
                }
    
                const estrategiaData = await estrategiaResponse.json();
                estrategiaId = estrategiaData.id;
            }
    
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
                    await fetchWithAuth("https://mclaren-production.up.railway.app/api/estrategiapiezas/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            estrategia: estrategiaId,
                            pieza: pieza
                        })
                    });
                }
            }
    
            setShow(false);
            window.location.reload(); 
        } catch (error) {
            console.error("Error al guardar la estrategia:", error);
        }
    };
    

    const handleDelete = async (estrategiaId) => {
        try {
            const response = await fetchWithAuth(`https://mclaren-production.up.railway.app/api/estrategias/${estrategiaId}/`, {
                method: "DELETE"
            });
    
            if (!response.ok) {
                console.error("Error al eliminar la estrategia");
                return;
            }
    
            setEstrategias(prevEstrategias => prevEstrategias.filter(e => e.id !== estrategiaId));
            console.log("Estrategia eliminada");
        } catch (error) {
            console.error("Error al eliminar la estrategia:", error);
        }
    };
    

    const handleEdit = async (estrategia) => {
        console.log("Iniciando edición de estrategia:", estrategia);
    
        try {
            const estrategiaData = await fetch(`https://mclaren-production.up.railway.app/api/estrategias/${estrategia.id}/`)
                .then(res => res.json());
            console.log("Datos de la estrategia obtenidos:", estrategiaData);
    
            const piezasData = await fetch(`https://mclaren-production.up.railway.app/api/estrategiapiezas/?estrategia=${estrategia.id}`)
                .then(res => res.json());
            console.log("Piezas asociadas a la estrategia:", piezasData);
    
            const piezasDetalles = await fetch(`https://mclaren-production.up.railway.app/api/piezas/`)
                .then(res => res.json());
            console.log("Detalles de piezas obtenidos:", piezasDetalles);
    
            const piezasCategoriaMap = {};
            piezasDetalles.forEach(pieza => {
                piezasCategoriaMap[pieza.id] = pieza.categoria; 
            });
    
            console.log("Mapa de piezas (ID -> Categoría):", piezasCategoriaMap);
    
            const categoriasData = await fetch(`https://mclaren-production.up.railway.app/api/categorias/`)
                .then(res => res.json());
            console.log("Categorías obtenidas:", categoriasData);
    
            const categoriasMapeadas = {};
            categoriasData.forEach(categoria => {
                categoriasMapeadas[categoria.id] = categoria.nombre;
            });
    
            console.log("Mapa de categorías:", categoriasMapeadas);
    
            const piezasMapeadas = {
                'Aleron Delantero': 'aleronDelantero',
                'Aleron Trasero': 'aleronTrasero',
                'Pontones': 'pontones',
                'Fondo Plano': 'fondoPlano',
                'Difusor': 'difusor',
                'Motor': 'motor',
                'Caja De Cambios': 'cajaCambios'
            };
    
            const piezas = {
                aleronDelantero: '',
                aleronTrasero: '',
                pontones: '',
                fondoPlano: '',
                difusor: '',
                motor: '',
                cajaCambios: ''
            };
    
            piezasData.forEach(pieza => {
                const categoriaId = piezasCategoriaMap[pieza.pieza];
                const categoriaNombre = categoriasMapeadas[categoriaId]; 
                const piezaCategoria = piezasMapeadas[categoriaNombre];  
    
                if (piezaCategoria) {
                    piezas[piezaCategoria] = pieza.pieza; 
                    console.log(`Asignando pieza ${pieza.pieza} a categoría: ${piezaCategoria}`);
                }
            });
    
            console.log("Piezas asignadas a la estrategia:", piezas);
    
            setEstrategia({
                id: estrategiaData.id,
                tipo: estrategiaData.nombre,
                pista: estrategiaData.pista_nombre,
                aleronDelantero: piezas.aleronDelantero,
                aleronTrasero: piezas.aleronTrasero,
                pontones: piezas.pontones,
                fondoPlano: piezas.fondoPlano,
                difusor: piezas.difusor,
                motor: piezas.motor,
                cajaCambios: piezas.cajaCambios
            });
    
            setIsEditMode(true);
            setShow(true);
        } catch (error) {
            console.error("Error al editar la estrategia:", error);
            message.error("Error al recuperar la estrategia para editar");
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
        setIsEditMode(false);
        setShow(true);
    };

    return (
        <div className="todo">
            <Bar />
            <img className="pagePista" src={Fondo} alt="Fondo de Pista" /> 

            <div className="botonAnadir">
                <Button className="Añadir" variant="primary" size="lg" onClick={handleAdd}>Añadir +</Button> 
            </div>

            <ListaDeEstrategias estrategias={estrategias} onEdit={handleEdit} onDelete={handleDelete} />

            <Modal className="listadoEstrategiaModal" show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Modificar Estrategia" : "Añadir Estrategia"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Modelito'>
                    <Form>
                        <Form.Group controlId="formPista" className="mt-3">
                            <Form.Label>Pista</Form.Label>
                            <Form.Select className="inputCarrera" name="pista" value={estrategia.pista} onChange={handleChange} disabled={isEditMode}>
                                <option value="">Seleccione una pista</option>
                                {pistas.map(pista => (
                                    <option key={pista.id} value={pista.nombre}>{pista.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                            <Form.Group controlId="formTipo">
                            <Form.Label>Tipo de Estrategia</Form.Label>
                            <Form.Select name="tipo" className="inputCarrera" value={estrategia.tipo} onChange={handleChange} disabled={isEditMode}>
                                <option value="" disabled>Seleccione el tipo</option>
                                <option value="Seco">Seco</option>
                                <option value="Lluvia">Lluvia</option>
                                <option value="Viento">Viento</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="input-container">
                            <div className="aerodinamica">
                                <h5>Aerodinámica</h5>
                                <Form.Group>
                                    <Form.Label>Alerón Delantero</Form.Label>
                                    <Form.Select className="inputCarrera" name="aleronDelantero" value={estrategia.aleronDelantero} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Aleron Delantero").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Alerón Trasero</Form.Label>
                                    <Form.Select className="inputCarrera" name="aleronTrasero" value={estrategia.aleronTrasero} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Aleron Trasero").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Pontones</Form.Label>
                                    <Form.Select className="inputCarrera" name="pontones" value={estrategia.pontones} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Pontones").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Fondo Plano</Form.Label>
                                    <Form.Select className="inputCarrera" name="fondoPlano" value={estrategia.fondoPlano} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Fondo Plano").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Difusor</Form.Label>
                                    <Form.Select className="inputCarrera" name="difusor" value={estrategia.difusor} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Difusor").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="grupo-motor">
                                <h5>Grupo Motor</h5>
                                <Form.Group>
                                    <Form.Label>Motor</Form.Label>
                                    <Form.Select className="inputCarrera" name="motor" value={estrategia.motor} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
                                        {piezasDisponibles.filter(pieza => pieza.categoria_nombre === "Motor").map(pieza => (
                                            <option key={pieza.id} value={pieza.id}>{pieza.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Caja de Cambios</Form.Label>
                                    <Form.Select className="inputCarrera" name="cajaCambios" value={estrategia.cajaCambios} onChange={handleChange}>
                                        <option value="" disabled>Selecciona</option>
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
                    <Button className="Cerrar" variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button className='Guardar' variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Estrategia;