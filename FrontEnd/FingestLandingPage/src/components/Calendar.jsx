import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import { toast } from "react-toastify"

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND

const Calendar = ({ selectedDate, onDateChange }) => {
    const [availableDates, setAvailableDates] = useState([])
    const [occupiedDates, setOccupiedDates] = useState([])

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/getDatesandTime`)
            .then((response) => {
                console.log("Datos recibidos:", response.data)

                const available = response.data.availableDates ? response.data.availableDates.map(dateObj => ({
                    date: new Date(dateObj.date),
                    slots: dateObj.availableSlots.map(slot => new Date(slot))
                })) : []

                const occupied = response.data.occupiedDates ? response.data.occupiedDates.map(dateObj => new Date(dateObj.date)) : []

                setAvailableDates(available)
                setOccupiedDates(occupied)
            })
            .catch((error) => {
                console.error("Error fetching dates:", error)
            })
    }, [])

    const isDateAvailable = (date) => {
        return availableDates.some(
            (availableDate) =>
                availableDate.date.getFullYear() === date.getFullYear() &&
                availableDate.date.getMonth() === date.getMonth() &&
                availableDate.date.getDate() === date.getDate()
        )
    }

    const isDateOccupied = (date) => {
        return occupiedDates.some(
            (occupiedDate) =>
                occupiedDate.getFullYear() === date.getFullYear() &&
                occupiedDate.getMonth() === date.getMonth() &&
                occupiedDate.getDate() === date.getDate()
        )
    }

    const handleDateChange = (date) => {
        if (isDateOccupied(date)) {
            toast.error("La fecha seleccionada ya está ocupada.")
        } else {
            onDateChange(date)
        }
    }

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                filterDate={isDateAvailable}
                dayClassName={(date) => isDateOccupied(date) ? "occupied-date" : undefined}
                placeholderText="Selecciona una fecha"
                minDate={new Date()} // Evita fechas pasadas
                inline
            />
        </div>
    )
}

export default Calendar