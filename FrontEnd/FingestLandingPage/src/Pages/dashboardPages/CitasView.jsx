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

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND;

export function CitasView() {
    const sidebarWidthPx = useSidebarStore((state) => state.sidebarWidthPx);
    const token = useAuthStore((state) => state.token);

    const [loading, setLoading] = useState(true);
    const [citasPendientes, setCitasPendientes] = useState([]);
    const errorToastShown = useRef(false);

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
            if (!errorToastShown.current) {
                toast.error("Hubo un problema al obtener las citas. Inténtalo más tarde.");
                errorToastShown.current = true;
            }
        } finally {
            setLoading(false);
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
                                        <td>Cliente #{cita.customer_id}</td>
                                        <td>{cita.appointment_mode ? "Virtual" : "Presencial"}</td>
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
                                            <button className="btn btn-success btn-sm me-2">
                                                Aprobar
                                            </button>
                                            <button className="btn btn-danger btn-sm">
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
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => console.log("Previous page")}
                >
                    ← Anterior
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => console.log("Next page")}
                >
                    Siguiente →
                </button>
            </div>
        </SidebarLayout>
    );
}
