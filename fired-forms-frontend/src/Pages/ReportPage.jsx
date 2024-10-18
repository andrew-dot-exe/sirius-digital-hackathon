import React from 'react'
import { useState } from 'react'
import "../styles/ReportPage.css"

function ReportPage() {
    const [ot, setOt] = useState('');
    const [to, setTo] = useState('');
	return (
		<div >
            <form className='report-form'>
				<p>Сформировать отчет</p>
				<label htmlFor="ot">От</label>
                <input
                    type="text"
                    id="ot"
                    value={ot}
                    onChange={(e) => setOt(e.target.value)}
                    required
                />
                <label htmlFor="to">До</label>
                <input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                />
                <button type = "enter"></button>
			</form>
		</div>
	)
}
export default ReportPage;

