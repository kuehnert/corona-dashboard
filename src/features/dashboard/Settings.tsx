/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from "primereact/togglebutton";
import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  fetchCountryHistoricData,
  resetCountries,
  setShowCharts,
} from "./coronaSlice";
import CountryPickList from "./CountryPickList";
import styles from "./Settings.module.scss";

const Settings: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { selectedCountries, showCharts } = useSelector(
    (state: RootState) => state.corona
  );
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
        <ToggleButton
          onLabel="Show Charts"
          offLabel="No Charts"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          checked={showCharts}
          onChange={() => dispatch(setShowCharts(!showCharts))}
          className={classNames(
            styles.toggleButton,
            "p-button-raised p-button-rounded"
          )}
        />

        <Button
          label="Reload Data"
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
          label="Reset"
          icon="pi pi-times"
          className={classNames(
            styles.button,
            "p-button-raised p-button-rounded p-button-warning"
          )}
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
