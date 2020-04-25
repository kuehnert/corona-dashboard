import { PickList } from "primereact/picklist";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Country, setCountries } from "./coronaSlice";

const CountryPickList: React.FC = () => {
  const { selectedCountries, sourceCountries } = useSelector(
    (state: RootState) => state.corona
  );
  const dispatch = useDispatch();

  const itemTemplate = (country: Country) => (
    <div key={country.code}>{country.name}</div>
  );

  const handleChange = (event: any) => {
    dispatch(setCountries(event.source, event.target));
  };

  return (
    <PickList
      source={sourceCountries}
      target={selectedCountries}
      itemTemplate={itemTemplate}
      sourceHeader="Available"
      targetHeader="Seleced"
      responsive={true}
      onChange={handleChange}
      className={"countryPickList"}
      sourceStyle={{ height: "100%" }}
      targetStyle={{ height: "100%" }}
    />
  );
};

export default CountryPickList;
