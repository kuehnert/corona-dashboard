/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import NumberCard from "./NumberCard";
import styles from "./CountryData.module.scss";
import { fetchCountryHistoricData, GlobalData } from "./coronaSlice";

export interface Props {
  countrycode: string;
}

function formatPercs(n: number) {
  return `${Math.round(n * 1000) / 10} %`;
}

const CountryData: React.FC<Props> = ({ countrycode }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) =>
    state.corona.latestData?.find((cd) => cd.countrycode.iso2 === countrycode)
  );

  useEffect(() => {
    dispatch(fetchCountryHistoricData(countrycode));
  }, []);

  return (
    <div className="ui container">
      <h2 className={styles.countryHeader}>
        {data?.countryregion || countrycode}
      </h2>

      <div className="p-grid">
        <NumberCard
          countrycode={countrycode}
          name="confirmed"
          label="Confirmed"
        />
        <NumberCard
          countrycode={countrycode}
          name="recovered"
          label="Recovered"
        />
        <NumberCard countrycode={countrycode} name="deaths" label="Deaths" />
        {/* <NumberCard
            small="Fatality Rate"
            large={data ? formatPercs(data.deaths / data.confirmed) : ""}
          /> */}
      </div>
    </div>
  );
};

export default CountryData;
