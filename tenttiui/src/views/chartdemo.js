import ChartComponent, {Pie} from 'react-chartjs-2';
import {defaults} from 'react-chartjs-2'
import alustusdata from './../testi/testidata'
import {useState} from 'react'
import { colors } from '@material-ui/core';

function ChartDemo(){
  const [chartdata, setChartData] = useState(
    {
      labels: ["Neuvottelu", "Sopimukset", "Laadun varmistus", "Toimittajan validointi" ],
      datasets: [{
        label: "Hyvä",
        data: [15, 15, 15, 15],
        labels: [ "a", "b", "c1", "c2"],
        backgroundColor: [
          'rgba(0, 165, 0, 0.8)',
          'rgba(225, 225, 0, 0.8)',
          'rgba(175, 0, 0, 0.8)',
          'rgba(175, 0, 0, 0.8)',
          ]
      }
    ]
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