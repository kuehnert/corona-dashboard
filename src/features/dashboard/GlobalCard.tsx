/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { fetchCountryHistoricData, GlobalData } from "./coronaSlice";
import styles from "./NumberCard.module.scss";
import { Card } from "primereact/card";
import NumberValue from "./NumberValue";

interface Props {
  label: string;
  name?: string;
  value?: number | null;
  percentage?: boolean;
}

const NumberCard: React.FC<Props> = ({ label, name, value, percentage }) => {
  const data = useSelector((state: RootState) => state.corona.latestGlobalData);
  const valueStr =
    value || (data != null && name != null && (data[name] as number)) || null;

  return (
    <div className="p-col">
      <Card>
        <div className={styles.label}>{label}</div>
        <div className={styles.number}>
          <NumberValue value={valueStr} percentage={percentage} />
        </div>
      </Card>
    </div>
  );
};

export default NumberCard;
