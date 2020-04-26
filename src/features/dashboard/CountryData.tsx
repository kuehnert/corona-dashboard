/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCountryHistoricData } from "./coronaSlice";
import NumberCard from "./NumberCard";
import SingleNumberCard from "./SingleNumberCard";

export interface Props {
  countrycode: string;
}

const CountryData: React.FC<Props> = ({ countrycode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryHistoricData(countrycode));
  }, []);

  return (
    <div className="">
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
