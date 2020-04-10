/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchLatestData, fetchLatestGlobalData } from "./coronaSlice";
import CountryData from "./CountryData";
import styles from "./Dashboard.module.scss";
import GlobalData from "./GlobalData";

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
    </div>
  );
};

export default Dashboard;
