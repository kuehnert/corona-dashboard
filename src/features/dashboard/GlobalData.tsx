/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import GlobalCard from "./GlobalCard";
import styles from "./CountryData.module.scss";

const GlobalData: React.FC = () => {
  const data = useSelector((state: RootState) => state.corona.latestGlobalData);

  return (
    <div className="ui container">
      <h2 className={styles.countryHeader}>World-Wide</h2>

      <div className="p-grid">
        <GlobalCard label="Confirmed" name="confirmed" />
        <GlobalCard label="Recovered" name="recovered" />
        <GlobalCard label="Deaths" name="deaths" />
        <GlobalCard
          label="Fatality Rate"
          value={(data && data.deaths / data.confirmed) || null}
          percentage={true}
        />
      </div>
    </div>
  );
};

export default GlobalData;
