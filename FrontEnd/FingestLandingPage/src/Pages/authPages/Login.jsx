import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import "../../../css/authStyles.css"
import { Spinner } from "../../components/Spinner"
import { useAuthStore } from "../../stores/authStore"
import { PasswordField } from "../../components/PasswordField"
import { AuthLayout } from "../../components/layouts/authLayout"

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND

export function Login() {
    const authStore = useAuthStore((state) => state)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios
            .post(`${BASE_URL}/api/login`, { email, password })
            .then((response) => {
                if (response.status === 200) {
                    authStore.login(response.data)
                    toast.success("¡Inicio de sesión exitoso!")
                    // TODO: Redirigir a la página de inicio
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response?.status === 400) {
                    toast.error("Credenciales inválidas. Por favor, intenta nuevamente.")
                } else {
                    console.error("Login failed:", error)
                    toast.error("No se pudo iniciar sesión. Por favor, intenta más tarde.")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <AuthLayout
            authContent={
                <div style={{ textAlign: "center" }}>
                    {/* TODO: Change if you need to */}
                    <h1>Dashboard Fingest</h1> 
                    <p style={{ marginBottom: "30px" }}>
                        Inicia sesión utilizando tus credenciales
                    </p>
                    <form
                        className="auth-login-form"
                        style={{ textAlign: "left", lineHeight: "2" }}
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            style={{ marginBottom: "15px" }}
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Escribe tu email aquí..."
                            required
                        />
                        <PasswordField value={password} onChange={handlePasswordChange} />
                        <button
                            style={{
                                width: "100%",
                                height: "45px",
                                marginTop: "2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                            }}
                            type="submit"
                            className="btn btn-primary"
                        >
                            {loading ? <Spinner /> : "Iniciar Sesión"}
                        </button>
                    </form>
                    <div className="auth-actions" style={{ lineHeight: "0.5" }}>
                        <p>¿Olvidaste tu contraseña?</p>
                        <Link to="/auth/reset-password" style={{ textDecoration: "none" }}>
                            Restablécela aquí
                        </Link>
                    </div>
                </div>
            }
        />
    )
}