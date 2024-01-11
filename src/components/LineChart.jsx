import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Chart } from "react-google-charts";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log("coinHistory", coinHistory);
  const chartData = [["Price", "Timestamp"]];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    const date = new Date(
      coinHistory.data.history[i].timestamp
    ).toLocaleDateString();
    chartData.push([
      coinHistory?.data?.history[i].price,
      coinHistory.data.history[i].timestamp,
    ]);
  }

  //console.log({ coinTimestamp, coinPrice });

  //   const data = {
  //     labels: coinTimestamp,
  //     datasets: [
  //       {
  //         label: "Price In USD",
  //         data: coinPrice,
  //         fill: false,
  //         backgroundColor: "#0071bd",
  //         borderColor: "#0071bd",
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       title: {
  //         display: true,
  //         text: "Chart.js Line Chart",
  //       },
  //     },
  //   };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      {/* <Line data={data} options={options} /> */}
      <Chart
        chartType="ScatterChart"
        data={chartData}
        width="100%"
        height="400px"
        legendToggle
      />
    </>
  );
};

export default LineChart;
