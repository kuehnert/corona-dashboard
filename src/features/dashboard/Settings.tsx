/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import CountryPickList from "./CountryPickList";
import styles from "./Settings.module.scss";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { resetCountries, fetchCountryHistoricData } from "./coronaSlice";
import { RootState } from "../../app/store";

const Settings: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { selectedCountries } = useSelector((state: RootState) => state.corona);
  const reloadCountries = () => {
    selectedCountries.forEach((country) => {
      dispatch(fetchCountryHistoricData(country.code));
    });
  };

  return (
    <>
      <Dialog
        header="Choose the countries to display"
        visible={visible}
        modal={true}
        onHide={() => setVisible(false)}
        className={styles.dialog}
        contentStyle={{ height: "80vh" }}
      >
        <CountryPickList />
      </Dialog>

      <Toolbar className={styles.toolbar}>
        <Button
          label="Countries"
          icon="pi pi-globe"
          className={classNames(
            styles.button,
            "p-button-raised p-button-rounded"
          )}
          tooltip="Select Countries"
          tooltipOptions={{
            position: "bottom",
          }}
          onClick={() => setVisible(true)}
        />

        <Button
          label="Reload"
          icon="pi pi-replay"
          className={classNames(
            styles.button,
            "p-button-raised p-button-rounded p-button-success"
          )}
          tooltip="Reload current data from server"
          onClick={reloadCountries}
          tooltipOptions={{
            position: "bottom",
          }}
        />

        <Button
          label="Reset"
          icon="pi pi-times"
          className="p-button-raised p-button-rounded p-button-warning"
          tooltip="Reset country list to defaults"
          onClick={() => dispatch(resetCountries())}
          tooltipOptions={{
            position: "bottom",
          }}
        />
      </Toolbar>
    </>
  );
};

export default Settings;
