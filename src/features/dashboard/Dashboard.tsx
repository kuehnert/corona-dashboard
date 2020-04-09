/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestData } from "./coronaSlice";
import CountryData from "./CountryData";
import classnames from "classnames";
import styles from './Dashboard.module.scss'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCountries } = useSelector((state: RootState) => state.corona);

  useEffect(() => {
    dispatch(fetchLatestData());
  }, []);

  return (
    <div className={classnames("ui container", styles.rootContainer)}>
      <h1>Corona Dashboard</h1>

      {selectedCountries.map((c) => (
        <CountryData key={c} countryCode={c} />
      ))}
    </div>
  );
};

export default Dashboard;
