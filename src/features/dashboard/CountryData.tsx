/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchCountryHistoricData } from "./coronaSlice";
import styles from "./CountryData.module.scss";
import NumberCard from "./NumberCard";
import SingleNumberCard from "./SingleNumberCard";
import { formatDate } from "../../utils/formatHelpers";
import classNames from "classnames";

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
      <div className="p-grid">
        <h2 className={classNames("p-col", styles.countryHeader)}>
          {data?.countryregion || countrycode}
        </h2>
        <h3 className={classNames("p-col", styles.countryHeader, "right")}>
          {formatDate(data?.lastupdate)}
        </h3>
      </div>

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
          name="fatality"
          label="Fatality Rate"
          percentage
        />

        <SingleNumberCard
          countrycode={countrycode}
          label="Doubling Time"
          name="doublingtime"
          suffix="d"
        />
      </div>
    </div>
  );
};

export default CountryData;
