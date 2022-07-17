import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MONTH = "06"
const YEAR = "2020"

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

// const dateArr = ['2020-06-01', '2020-06-01', '2020-06-02', '2020-06-03', '2020-06-04', '2020-06-05', '2020-06-06', '2020-06-07', '2020-06-08', '2020-06-09', '2020-06-10', '2020-06-11', '2020-06-12', '2020-06-13', '2020-06-14', '2020-06-15', '2020-06-16', '2020-06-17', '2020-06-18', '2020-06-19', '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30']
const confirmed = []
const recovered = []
const deceased = []
const tested = []
const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  headers: {
      'content-type': 'application/json',
  }
})

function convertTime(date) {

  if(date < 10) {
    return `${YEAR}-${MONTH}-0${date}`
  } 
  return `${YEAR}-${MONTH}-${date}`
  
}

async function getData() {
  for(let i=1; i<=30; i++) {
    const timeStr = convertTime(i.toString());
    const res = await axiosClient.get(`data/${timeStr}`)

    confirmed.push(res.data.confirmed)
    recovered.push(res.data.recovered)
    deceased.push(res.data.deceased)
    tested.push(res.data.tested)
  }
}

export default function LineChart() {
  getData()
  console.log(confirmed)
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "confirmed",
          data: confirmed,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "recovered",
          tension: 0.3,
          data: recovered,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
        {
          label: "deceased",
          tension: 0.3,
          data: deceased,
          borderColor: "red",
          backgroundColor: "rgba(0, 234, 0, 0.3)",
          pointRadius: 6,
        },
        {
          label: "tested",
          tension: 0.3,
          data: tested,
          borderColor: "blue",
          backgroundColor: "rgba(0, 255, 4, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}
