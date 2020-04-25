/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import CountryPickList from "./CountryPickList";
import styles from "./Settings.module.scss";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { resetCountries } from "./coronaSlice";

const Settings: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

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
            showDelay: 300,
            hideDelay: 300,
          }}
          onClick={() => setVisible(true)}
        />

        <Button
          label="Reset"
          icon="pi pi-replay"
          className="p-button-raised p-button-rounded p-button-warning"
          tooltip="Reset country list to defaults"
          onClick={() => dispatch(resetCountries())}
          tooltipOptions={{
            position: "bottom",
            showDelay: 300,
            hideDelay: 300,
          }}
        />
      </Toolbar>
    </>
  );
};

export default Settings;
