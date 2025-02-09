import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import '../../../css/dashboardStyles.css';
import { Spinner } from "../../components/Spinner";
import { useAuthStore } from "../../stores/authStore";
import { useSidebarStore } from "../../stores/sidebarStore";
import { SidebarLayout } from "../../components/layouts/SidebarLayout";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND;

export function DashboardView() {
    const sidebarWidthPx = useSidebarStore((state) => state.sidebarWidthPx);
    const token = useAuthStore((state) => state.token);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [appointmentStats, setAppointmentStats] = useState({
        total: 0,
        today: 0,
        upcoming: 0,
        presencial: 0,
        virtual: 0,
    });

    const fetchAppointments = async () => {
        if (!token) {
            toast.error("Error: No se encontró el token de autenticación.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/getAppointments/`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                processAppointmentData(response.data);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Hubo un problema al obtener los datos.");
        } finally {
            setLoading(false);
        }
    };

    const processAppointmentData = (data) => {
        const todayDate = new Date().toISOString().split("T")[0];

        const totalAppointments = data.length;
        const todayAppointments = data.filter(cita =>
            cita.appointment_date.startsWith(todayDate)
        ).length;
        const upcomingAppointments = data.filter(cita =>
            new Date(cita.appointment_date) > new Date()
        ).length;

        const presencialAppointments = data.filter(cita => !cita.appointment_mode).length;
        const virtualAppointments = data.filter(cita => cita.appointment_mode).length;

        setAppointments(data);
        setAppointmentStats({
            total: totalAppointments,
            today: todayAppointments,
            upcoming: upcomingAppointments,
            presencial: presencialAppointments,
            virtual: virtualAppointments
        });
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const pieData = {
        labels: ["Presencial", "Virtual"],
        datasets: [
            {
                data: [appointmentStats.presencial, appointmentStats.virtual],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF4D6A", "#2F90D8"]
            }
        ]
    };

    const lineData = {
        labels: appointments.map(cita => format(new Date(cita.appointment_date), "dd/MM/yyyy", { locale: es })),
        datasets: [
            {
                label: "Citas por Fecha",
                data: appointments.map((_, index) => index + 1),
                fill: false,
                borderColor: "#4CAF50",
                tension: 0.3
            }
        ]
    };

    return (
        <SidebarLayout sidebarWidthPx={sidebarWidthPx}>
            <h1 className="dashboard-title">Dashboard de Citas</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="dashboard-container">
                    <div className="dashboard-stats">
                        <div className="stat-card shadow">
                            <h3>Total Citas</h3>
                            <p>{appointmentStats.total}+</p>
                        </div>
                        <div className="stat-card shadow">
                            <h3>Citas Hoy</h3>
                            <p>{appointmentStats.today}</p>
                        </div>
                        <div className="stat-card shadow">
                            <h3>Próximas Citas</h3>
                            <p>{appointmentStats.upcoming}</p>
                        </div>
                    </div>

                    <div className="dashboard-charts">
                        <div className="chart-card shadow">
                            <h3>Distribución de Citas</h3>
                            <Pie data={pieData} />
                        </div>
                        <div className="chart-card shadow">
                            <h3>Citas en el Tiempo</h3>
                            <Line data={lineData} />

                            <h3 style={{ marginTop: '30px' }}>Últimas Citas</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Modo</th>
                                        <th>Razón</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.slice(0, 5).map((cita) => (
                                        <tr key={cita.appointment_id}>
                                            <td>{cita.appointment_id}</td>
                                            <td>{format(new Date(cita.appointment_date), "dd/MM/yyyy", { locale: es })}</td>
                                            <td>{format(new Date(cita.appointment_time), "HH:mm", { locale: es })}</td>
                                            <td>{cita.appointment_mode ? "Virtual" : "Presencial"}</td>
                                            <td>{cita.reason_for_appointment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
