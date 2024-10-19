import React, { useState } from 'react';
import "../styles/ReportPage.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function ReportPage() {
    const [selectedFirstDate, setSelectedFirstDate] = useState(null);
    const [selectedSecondDate, setSelectedSecondDate] = useState(null);
    const [reportData, setReportData] = useState([]);

    const questions = [
        "Какие причины сформировали ваше решение уйти из компании?",
        "Есть ли еще дополнительные причины, которые повлияли на решение уйти из компании?",
        "Рассматриваете ли вы возможность остаться в компании или перевестись внутри отрасли?",
        "Готовы ли вы рекомендовать компанию как работодателя?",
        "Рассматриваете ли вы возможность возвращения в компанию?",
    ];

    const reasons = [
        { name: "Низкая зарплата", value: 0 },
        { name: "Отсутствие карьерного роста", value: 0 },
        { name: "Плохие отношения с руководством", value: 0 },
        { name: "Неудовлетворительная рабочая среда", value: 0 },
        { name: "Нереалистичные ожидания", value: 0 },
    ];

    const generateRandomData = () => {
        const updatedReasons = reasons.map(reason => ({
            ...reason,
            value: Math.floor(Math.random() * 100) + 1, // Случайное значение от 1 до 100
        }));
        return updatedReasons;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const generatedData = generateRandomData();
        setReportData([generatedData, generateRandomData(), generateRandomData()]); // Генерация трех наборов данных для графиков
        console.log('Отчет с датами:', selectedFirstDate, selectedSecondDate);
    };

    return (
        <div className="report-page">
            <form className='report-form' onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>Сформировать отчет по увольнениям</h2>
                
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

            {reportData.length > 0 && (
                <div className="report-results" style={{ overflowY: 'scroll', maxHeight: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Отчет</h3>
                    <p>Период: {selectedFirstDate?.toLocaleDateString()} - {selectedSecondDate?.toLocaleDateString()}</p>
                    <h4>Вопросы:</h4>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>

                    {/* Отображение нескольких графиков */}
                    <h4>Причины увольнения:</h4>
                    {reportData.map((data, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h5>График {index + 1}</h5>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    labelLine={false}
                                    label={entry => entry.name}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReportPage;
