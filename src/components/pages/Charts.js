import React from 'react';
import '../Section.css';
import { Line } from 'react-chartjs-2';

export default function Charts() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'North Region',
                data: [96, 101, 76, 63, 0, 0, 0, 0, 0, 0, 0, 24],
                borderColor: ['rgba(255, 206, 86, 0.2)'],
                backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                pointBackgroundColor: ['rgba(255, 206, 86, 0.2)'],
                pointBorderColor: ['rgba(255, 206, 86, 0.2)']
            },
            {
                label: 'South Region',
                data: [1, 0, 0, 137, 100, 100, 28, 0, 0, 0, 0, 0],
                borderColor: ['rgba(54, 162, 235, 0.2)'],
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                pointBackgroundColor: ['rgba(54, 162, 235, 0.2)'],
                pointBorderColor: ['rgba(54, 162, 235, 0.2)']
            },
            {
                label: 'East Region',
                data: [1, 0, 0, 0, 0, 0, 72, 100, 126, 7, 0, 0],
                borderColor: ['rgba(224, 130, 131, 0.2)'],
                backgroundColor: ['rgba(224, 130, 131, 0.2)'],
                pointBackgroundColor: ['rgba(224, 130, 131, 0.2)'],
                pointBorderColor: ['rgba(224, 130, 131, 0.2)']
            },
            {
                label: 'West Region',
                data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 88, 79, 0],
                borderColor: ['rgba(63, 195, 128, 0.2)'],
                backgroundColor: ['rgba(63, 195, 128, 0.2)'],
                pointBackgroundColor: ['rgba(63, 195, 128, 0.2)'],
                pointBorderColor: ['rgba(63, 195, 128, 0.2)']
            },
        ]
    };
    return (
        <>
            <div
                className={'container'}
            >
                <Line data={data} />
            </div>
        </>
    );
}