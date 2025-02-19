import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "react-toastify";
import axios from "axios";
import '../../../css/tableStyling.css';
import { Spinner } from "../../components/Spinner";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useSidebarStore } from "../../stores/sidebarStore";
import { SidebarLayout } from "../../components/layouts/SidebarLayout";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND;

export function CitasView() {
    const sidebarWidthPx = useSidebarStore((state) => state.sidebarWidthPx);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [citasPendientes, setCitasPendientes] = useState([]);
    const errorToastShown = useRef(false);

    const handleUnauthorized = () => {
        toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        navigate("/dashboard/auth/login");
    };

    const fetchCitas = async () => {
        if (!token) {
            if (!errorToastShown.current) {
                toast.error("Error: No se encontró el token de autenticación.");
                errorToastShown.current = true;
            }
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/getAppointments/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setCitasPendientes(response.data);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            if (error.response && error.response.status === 400) {
                handleUnauthorized();
            } else if (!errorToastShown.current) {
                toast.error("Hubo un problema al obtener las citas. Inténtalo más tarde.");
                errorToastShown.current = true;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/deleteAppointment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Cita eliminada:", response.data);
            toast.success("Cita eliminada exitosamente.");
            fetchCitas();
        } catch (error) {
            console.error("Error al eliminar cita:", error);
            if (error.response && error.response.status === 401) {
                handleUnauthorized();
            } else {
                toast.error("No se pudo eliminar la cita. Por favor, intenta más tarde.");
            }
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    return (
        <SidebarLayout sidebarWidthPx={sidebarWidthPx}>
            <h1>Listado de Citas en el Sistema</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered rounded-borders">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Modo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Razón</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasPendientes.length > 0 ? (
                                citasPendientes.map((cita) => (
                                    <tr key={cita.appointment_id}>
                                        <td>{cita.appointment_id}</td>
                                        <td>{cita.customer.name}</td>
                                        <td>{cita.appointment_mode ? "Presencial" : "Virtual"}</td>
                                        <td>
                                            {format(
                                                new Date(cita.appointment_date),
                                                "dd/MM/yyyy",
                                                { locale: es }
                                            )}
                                        </td>
                                        <td>
                                            {format(
                                                new Date(cita.appointment_time),
                                                "HH:mm",
                                                { locale: es }
                                            )}
                                        </td>
                                        <td>{cita.reason_for_appointment}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cita.appointment_id)}>
                                                Rechazar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        No hay citas pendientes
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </SidebarLayout>
    );
}