/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchLatestData, fetchLatestGlobalData } from "./coronaSlice";
import CountryData from "./CountryData";
import styles from "./Dashboard.module.scss";
import GlobalData from "./GlobalData";
import {Card} from 'primereact/card';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCountries } = useSelector((state: RootState) => state.corona);

  useEffect(() => {
    dispatch(fetchLatestData());
    dispatch(fetchLatestGlobalData());
  }, []);

  return (
    <div className={styles.rootContainer}>
      <h1>Mr K.'s Corona Dashboard</h1>

      <GlobalData />

      {selectedCountries.map((c) => (
        <CountryData key={c} countrycode={c} />
      ))}

      <Card className="footer">
        Thanks to Ainize for providing the data API:{" "}
        <a href="https://ainize.ai/laeyoung/wuhan-coronavirus-api">
          https://ainize.ai/laeyoung/wuhan-coronavirus-api
        </a>
      </Card>
    </div>
  );
};

export default Dashboard;
