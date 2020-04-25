/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchLatestGlobalData, getCountries } from "./coronaSlice";
import CountryData from "./CountryData";
import styles from "./Dashboard.module.scss";
import GlobalData from "./GlobalData";
import { Card } from "primereact/card";
import Settings from "./Settings";
import CountryChart from "./CountryChart";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCountries, showCharts } = useSelector(
    (state: RootState) => state.corona
  );

  useEffect(() => {
    dispatch(getCountries());
    dispatch(fetchLatestGlobalData());
  }, []);

  return (
    <div className={styles.rootContainer}>
      <h1>Mr K.'s Corona Dashboard</h1>
      <Settings />

      <GlobalData />

      {selectedCountries.map((c) => (
        <div key={c.code}>
          <CountryData countrycode={c.code} />
          {showCharts && <CountryChart countrycode={c.code} />}
        </div>
      ))}

      <Card className="footer">
        <p>
          Data is from John-Hopkins-University, updated once per day:{" "}
          <a href="https://github.com/CSSEGISandData/COVID-19">
            https://github.com/CSSEGISandData/COVID-19
          </a>
        </p>

        <p>
          Inspired by Inje Lee's article.{" "}
          <a href="https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33">
            https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33
          </a>
        </p>

        <p>
          Thanks to Ainize for providing the data API:{" "}
          <a href="https://ainize.ai/laeyoung/wuhan-coronavirus-api">
            https://ainize.ai/laeyoung/wuhan-coronavirus-api
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
