import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Covid-19 Flow Chart',
    },
  },
};

const CovidChart = (props) => {
  let covidData = props.data;
  console.log(covidData);
  const data = {
    labels: [ 'Total Cases', 'Total Recoverd', 'Total Deaths'],
    datasets: [
      {
        // .replaceAll(",","")
        label: 'Stats',
        data: [ +(covidData['Total Cases_text'].replaceAll(",","")), +covidData['Total Recovered_text'].replaceAll(",",""), +covidData['Total Deaths_text'].replaceAll(",","")],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      }
    ],
  };


  return (
    <div style={{ width: '48%',  }} className='bar-chart'>
      {
        console.log("dataaaaaaaa", data)
      }
      <Bar data={data} options={options} />
    </div>)
}
export default CovidChart;