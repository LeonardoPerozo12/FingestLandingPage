import React, { forwardRef } from 'react';
import 'aos/dist/aos.css';
import '../../css/agendarCita.css';

function AgendarCita() {
    return (
        <div className='container'>
            <div className='formContainer'>
                <form action="" className='form'>
                    <div className='inputsContainer'>
                        <input type="text" name="Nombre" className="input" />
                    </div>
                    <div  className='CalendarContainer'>
                    
                    <input type="text" name="" className='input' />

                    </div>

                </form>
            </div>
        </div>
    );
}

export default AgendarCita;