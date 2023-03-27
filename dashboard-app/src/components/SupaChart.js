import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Chart from 'chart.js/auto';
import { Bar,Line, Pie } from "react-chartjs-2";


const supabaseUrl = 'https://avbqnfpxvzrdsoovwufc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YnFuZnB4dnpyZHNvb3Z3dWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NTkwNzMsImV4cCI6MTk5MjMzNTA3M30.MSuJYfRRE6RD2GSwh3PRxYaR_N2Kj34Zso3v9Z9Kxt0'
const supabase = createClient(supabaseUrl, supabaseKey)

const SupaChart = () => {
const [chartData, setChartData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      
    let { data: example_data, error } = await supabase
        .from('example_data')
        .select('projAmnt, expenses, amntSpent')
        .order('date');

  
      if (error) {
        console.log('Error retrieving data from Supabase:', error);
      } else{

        const groupedData = example_data.reduce((acc, curr) => {
          const category = curr.expenses;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += curr.projAmnt;
          return acc;
        }, {});

        const groupedData2 = example_data.reduce((acc, curr) => {
          const category = curr.expenses;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += curr.amntSpent;
          return acc;
        }, {});

        const labels = Object.keys(groupedData);
        const projtotals = Object.values(groupedData);
        const actualTotals = Object.values(groupedData2);
        setChartData({
        labels,
        datasets: [
              {
                label: "Projected Spent",
                data: projtotals,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                tension: 0.1
              },
              {
                label: "Actual Spent",
                data: actualTotals,
                fill: false,
                backgroundColor: 'rgb(53, 162, 235)',
                tension: 0.1
              }
            ]
          });
        }
      };
  
    fetchData();

   
  }, []);

  return (
    <div>
      {chartData ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default SupaChart;