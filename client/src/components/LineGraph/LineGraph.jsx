// BarChart.js

import React from "react";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
const { Option } = Select;
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

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
      _id: {
        $oid: "659afeca3caf8293ae6c0ba7",
      },
      end_year: "",
      intensity: 6,
      sector: "Energy",
      topic: "oil",
      insight: "NM oil patch outlook",
      url: "https://www.abqjournal.com/928238/nm-oil-patch-outlook.html",
      region: "Asia",
      start_year: "",
      impact: "",
      added: "January, 17 2017 01:51:10",
      published: "January, 16 2017 00:00:00",
      country: "Saudi Arabia",
      relevance: 3,
      pestle: "Industries",
      source: "Abq",
      title: "Oil prices could climb above $60 quite rapidly.",
      likelihood: 2,
      DocNumber: 346,
    },
  ]);

  //   const getdata = async () => {
  //     try {
  //       await axios
  //         .get("/main", {
  //           params: {
  //             main: Selected,
  //             property: "sector",
  //           },
  //         })
  //         .then((res) => {
  //           if (res.data.valid) {
  //             setMainData(res.data.data);
  //             console.log(res.data.data.length);
  //           }
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getdata();
  //   }, [Selected]);

  const groupedData =
    MainData &&
    MainData.reduce((accumulator, currentItem) => {
      const { topic, intensity } = currentItem;
      if (!accumulator[topic]) {
        accumulator[topic] = { intensitySum: Number(intensity), count: 1 };
      } else {
        accumulator[topic].intensitySum += Number(intensity);
        accumulator[topic].count += 1;
      }
      return accumulator;
    }, {});

  console.log(groupedData);
  const topics = Object.keys(groupedData);
  const averageIntensityValues = topics.map((topic) =>
    parseInt(groupedData[topic].intensitySum / groupedData[topic].count)
  );
  console.log(averageIntensityValues);
  console.log(topics);
  const data = {
    labels: topics,
    datasets: [
      {
        label: "Intensity",
        data: averageIntensityValues,
        borderColor: "aqua",
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

  const handleSectorChange = (name, value) => {
    setSelected(value.value);
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

export default Graphs;
