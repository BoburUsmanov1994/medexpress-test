import React, {PureComponent} from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const data = [
    {
        age: '00-12',
        male: 4000,
        female: 2400,
    },
    {
        age: '01-04',
        male: 3000,
        female: 1398,
    },
    {
        age: '05-09',
        male: 2000,
        female: 9800,
    },
    {
        age: '10-14',
        male: 2780,
        female: 3908,
    },
    {
        age: '15-19',
        male: 1890,
        female: 4800,
    },
    {
        age: '20-24',
        male: 2390,
        female: 3800,
    },
    {
        age: '25-29',
        male: 3490,
        female: 4300,
    },
    {
        age: '30-34',
        male: 2544,
        female: 8888,
    },
    {
        age: '35-39',
        male: 2544,
        female: 8888,
    },
    {
        age: '40-44',
        male: 5555,
        female: 8888,
    },
    {
        age: '45-49',
        male: 3333,
        female: 7777,
    },
    {
        age: '50-54',
        male: 2544,
        female: 8888,
    },
    {
        age: '55-59',
        male: 888,
        female: 8888,
    },
    {
        age: '60-64',
        male: 879,
        female: 999,
    },
    {
        age: '65-69',
        male: 2544,
        female: 4881,
    },
    {
        age: '70-74',
        male: 888,
        female: 9877,
    },
    {
        age: '75-79',
        male: 2500,
        female: 3200,
    },
    {
        age: '80-84',
        male: 1800,
        female: 666,
    },
    {
        age: '85-00',
        male: 255,
        female: 88,
    }
];

const CustomBarChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={800}
                data={data}
                margin={{
                    top: 40,
                    right: 30,
                    left: 20,
                    bottom: 15,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="age"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="male" stackId="a" fill="#F28E2B"/>
                <Bar dataKey="female" stackId="a" fill="#4E79A7"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;