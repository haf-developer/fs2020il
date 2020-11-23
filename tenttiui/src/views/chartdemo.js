import ChartComponent, {Pie} from 'react-chartjs-2';
import {defaults} from 'react-chartjs-2'
import alustusdata from './../testi/testidata'
import {useState} from 'react'
import { colors } from '@material-ui/core';

function ChartDemo(){
  const [chartdata, setChartData] = useState(
    {
      labels: ["Heikko", "Kohtalainen", "Hyvä" ],
      datasets: [{
        label: "Suoritustaso aihealueittain",
        data: [15, 15, 30],
        backgroundColor: [
        'rgba(175, 0, 0, 0.8)',
        'rgba(255, 255, 35, 0.8)',
        'rgba(0, 165, 0, 0.8)',
        ]
      }]
    })

  return(
    <div>
      Chartdemo
      <Pie data={chartdata} options={
        defaults.Pie
      }
      ></Pie>
    </div>
  )
}

export default ChartDemo