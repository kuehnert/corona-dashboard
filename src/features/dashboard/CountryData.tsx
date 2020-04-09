/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NumberCard from "./NumberCard";
import styles from './CountryData.module.scss'

export interface Props {
  countryCode: string;
}

function formatPercs(n: number) {
  return `${Math.round(n * 1000) / 10} %`;
}

const CountryData: React.FC<Props> = ({ countryCode }) => {
  const data = useSelector((state: RootState) =>
    state.corona.latestData?.find((cd) => cd.countrycode.iso2 === countryCode)
  );

  return (
    <div className="ui container">
      <h2 className={styles.countryHeader}>{data?.countryregion || countryCode}</h2>

      <div className="ui grid">
        <div className="doubling four column row">
          <NumberCard small="Confirmed" large={data?.confirmed} />
          <NumberCard small="Recovered" large={data?.recovered} />
          <NumberCard small="Deaths" large={data?.deaths} />
          <NumberCard
            small="Fatality Rate"
            large={data ? formatPercs(data.deaths / data.confirmed) : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryData;
