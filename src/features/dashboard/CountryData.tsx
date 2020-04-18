/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchCountryHistoricData } from "./coronaSlice";
import styles from "./CountryData.module.scss";
import NumberCard from "./NumberCard";
import SingleNumberCard from "./SingleNumberCard";

export interface Props {
  countrycode: string;
}

const CountryData: React.FC<Props> = ({ countrycode }) => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.corona.historicData[countrycode]
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
        <NumberCard countrycode={countrycode} name="acute" label="Acute" />

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

        <SingleNumberCard
          countrycode={countrycode}
          label="Doubling Time"
          name="doublingtime"
        />
      </div>
    </div>
  );
};

export default CountryData;
