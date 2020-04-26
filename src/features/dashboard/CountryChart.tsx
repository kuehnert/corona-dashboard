/* eslint-disable react-hooks/exhaustive-deps */
import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Card } from "primereact/card";

export interface Props {
  countrycode: string;
}

const CountryChart: React.FC<Props> = ({ countrycode }) => {
  const [chartData, setChartData] = useState<any>(null);
  const data = useSelector(
    (state: RootState) => state.corona.historicData[countrycode]
  );

  useEffect(() => {
    if (data == null || data.timeseries == null) {
      return;
    }

    const reversed = data.timeseries.slice(0, 60).reverse();
    const newData = {
      labels: reversed.map((ts) => ts.date),
      datasets: [
        {
          label: "Acute",
          borderColor: "#FFCB05",
          backgroundColor: "#FFCB05",
          data: reversed.map((ts) => ts.acute),
          fill: false,
        },
        {
          label: "Confirmed",
          backgroundColor: "#005A9C",
          borderColor: "#005A9C",
          data: reversed.map((ts) => ts.confirmed),
          fill: false,
        },
        {
          label: "Recovered",
          backgroundColor: "#34A835",
          borderColor: "#34A835",
          data: reversed.map((ts) => ts.recovered),
          fill: false,
        },
        {
          label: "Deaths",
          backgroundColor: "#000",
          borderColor: "#000",
          data: reversed.map((ts) => ts.deaths),
          fill: false,
        },
      ],
    };
    setChartData(newData);
  }, [data]);

  if (chartData == null) return null;

  return (
    <Card
      title={`Chart for ${data.countryregion}`}
      style={{ marginBottom: "8px" }}
    >
      <Chart
        type="line"
        data={chartData}
        height={window.innerWidth < 600 ? "300" : ""}
      />
    </Card>
  );
};

export default CountryChart;
