import React from 'react'
import { Bar , Line } from 'react-chartjs-2';
function Record(props) {
    const weeklyChart = {
        chartData:{
          labels:[
              "","","","","","","","","",""
          ],
          datasets:[
            {
              fill: false,
              borderColor:"white",
              data:[
                props.record[0],
                props.record[1],
                props.record[2],
                props.record[3],
                props.record[4],
                props.record[5],
                props.record[6],
                props.record[7],
                props.record[8],
                props.record[9],
              ]
            }
        ]
        }
    }
    return (
        <div>
            <Line
            data={weeklyChart.chartData}
            height={20}
            width={20}
            options={{
              // legend location
              legend:{
                display:false,
              }
            }}
          />

        </div>
    )
}

export default Record
