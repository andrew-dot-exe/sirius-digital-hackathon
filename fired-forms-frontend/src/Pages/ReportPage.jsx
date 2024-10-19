import React, { useState } from 'react';
import "../styles/ReportPage.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ReportPage() {
    const [selectedFirstDate, setSelectedFirstDate] = useState(null);
    const [selectedSecondDate, setSelectedSecondDate] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Логика для обработки отправки формы
        console.log('Отчет с датами:', selectedFirstDate, selectedSecondDate);
    };

    return (
        <div className="report-page">
            <form className='report-form' onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>Сформировать отчет</h2>
                
                <div className="date-picker-container">
                    <div className="date-picker-item">
                        <label htmlFor="from">От</label>
                        <DatePicker 
                            selected={selectedFirstDate}
                            onChange={date => setSelectedFirstDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Выберите дату'
                            className="date-picker"
                        />
                    </div>
                    <div className="date-picker-item">
                        <label htmlFor="to">До</label>
                        <DatePicker 
                            selected={selectedSecondDate}
                            onChange={date => setSelectedSecondDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Выберите дату'
                            className="date-picker"
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">Сформировать отчет</button>
            </form>
        </div>
    );
}

export default ReportPage;
