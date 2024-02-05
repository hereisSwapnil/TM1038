// BarChart.js

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
const { Option } = Select;
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

const LineGraph = () => {
  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  );

  const [MainData, setMainData] = useState([]);
  const [Selected, setSelected] = useState("Energy");

  setMainData([
    {
      topic: "Energy",
      accuracy: "90",
      attempts: "10",
    },
    {
      topic: "Energy",
      accuracy: "90",
      attempts: "10",
    },
    {
      topic: "Energy",
      accuracy: "90",
      attempts: "10",
    },
    {
      topic: "Energy",
      accuracy: "90",
      attempts: "10",
    },
    {
      topic: "Energy",
      accuracy: "90",
      attempts: "10",
    },
  ]);

  const groupedData =
    MainData &&
    MainData.reduce((accumulator, currentItem) => {
      const { topic, accuracy, attempts } = currentItem;
      if (!accumulator[topic]) {
        accumulator[topic] = {
          accuracySum: Number(accuracy),
          attemptsSum: Number(attempts),
          count: 1,
        };
      } else {
        accumulator[topic].accuracySum += Number(accuracy);
        accumulator[topic].attemptsSum += Number(attempts);
        accumulator[topic].count += 1;
      }
      return accumulator;
    }, {});

  const topics = Object.keys(groupedData);
  const averageAccuracyValues = topics.map(
    (topic) => groupedData[topic].accuracySum / groupedData[topic].count
  );
  const averageAttemptsValues = topics.map(
    (topic) => groupedData[topic].attemptsSum / groupedData[topic].count
  );

  const data = {
    labels: topics,
    datasets: [
      {
        label: "Accuracy",
        data: averageAccuracyValues,
        borderColor: "aqua",
        tension: 0.4,
      },
      {
        label: "Number of Attempts",
        data: averageAttemptsValues,
        borderColor: "orange",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleSectorChange = (value) => {
    setSelected(value);
  };
  return (
    <>
      <div className="flex flex-col gap-4 border border-gray-200 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-xl text-gray-500">Intensity</h1>
            </div>
            <div className="flex gap-2">
              <h1 className="font-bold text-gray-800">Sector</h1> -{" "}
              <Select
                className="w-[200px]"
                onChange={handleSectorChange}
                value={Selected}
              >
                <Option value="Environment">Environment</Option>
                <Option value="Government">Government</Option>
                <Option value="Aerospace & defence">Aerospace & defence</Option>
                <Option value="Manufacturing">Manufacturing</Option>
                <Option value="Financial services">Financial services</Option>
                <Option value="Support services">Support services</Option>
                <Option value="Information Technology">
                  Information Technology
                </Option>
                <Option value="Healthcare">Healthcare</Option>
                <Option value="Food & agriculture">Food & agriculture</Option>
                <Option value="Automotive">Automotive</Option>
                <Option value="Energy">Energy</Option>
                <Option value="Tourism & hospitality">
                  Tourism & hospitality
                </Option>
                <Option value="Construction">Construction</Option>
                <Option value="Transport">Transport</Option>
                <Option value="Water">Water</Option>
                <Option value="Security">Security</Option>
                <Option value="Media & entertainment">
                  Media & entertainment
                </Option>
              </Select>
            </div>
          </div>

          <div className="w-[90%]">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default LineGraph;
