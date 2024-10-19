import React from 'react'
import { useState } from 'react'
import "../styles/ReportPage.css"
import DatePicker from 'react-datepicker';

function ReportPage() {
    const [selectedFirstDate, setSelectedFirstDate] = useState(null);
    const [selectedSecondDate, setSelectedSecondDate] = useState(null);
    
	return (
		<div >
            <form className='report-form'>
				<p>Сформировать отчет</p>
				<label htmlFor="ot">От</label>
                <DatePicker 
                    selected={selectedFirstDate}
                    onChange={(date) => setSelectedFirstDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText='Выберите дату'
                />
                <label htmlFor="to">До</label>
                <DatePicker 
                    selected={selectedSecondDate}
                    onChange={(date) => setSelectedSecondDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText='Выберите дату'
                />
                <button type = "enter"></button>
			</form>
		</div>
	)
}
export default ReportPage;

