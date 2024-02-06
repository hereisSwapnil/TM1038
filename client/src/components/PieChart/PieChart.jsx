import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data_1 = {
  labels: ["ReactJs", "NodeJs", "Javascript", "TypeScript", "VueJs", "Angular"],
  datasets: [
    {
      label: "# of Votes",
      data: [20, 10, 40, 5, 15, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

export const data_2 = {
  labels: ["ReactJs", "NodeJs", "Javascript", "TypeScript", "VueJs", "Angular"],
  datasets: [
    {
      label: "# of Votes",
      data: [40, 10, 20, 5, 5, 20],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

export function PieChart() {
  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return (
    <>
      <div className="flex justify-center items-center gap-[100px]">
        <div className="">
          <h1>Previous 7 days</h1>
          <Pie data={data_1} options={options} width="500px" height="auto" />
        </div>
        <div className="">
          <h1>Last Assessment</h1>
          <Pie data={data_2} options={options} width="500px" height="auto" />
        </div>
      </div>
    </>
  );
}
