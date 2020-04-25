/* eslint-disable react-hooks/exhaustive-deps */
import classnames from "classnames";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./NumberCard.module.scss";
import NumberValue from "./NumberValue";

interface Props {
  countrycode: string;
  label: string;
  name?: string;
  value?: string | number;
}

interface DayPoint {
  date: string;
  value: number;
  delta: number;
}

const NumberCard: React.FC<Props> = ({ countrycode, label, name, value }) => {
  const [weekData, setWeekData] = useState<DayPoint[]>([]);
  const historicData = useSelector(
    (state: RootState) =>
      state.corona.historicData && state.corona.historicData[countrycode]
  );
  const { daysToShow } = useSelector((state: RootState) => state.corona);

  useEffect(() => {
    if (historicData == null || name == null) return;

    const wd: DayPoint[] = new Array<DayPoint>(7);
    for (let i = 1; i < daysToShow; i++) {
      wd.push({
        date: historicData.timeseries[i].date,
        value: historicData.timeseries[i][name] as number,
        delta: historicData.timeseries[i][name + 'Delta'] as number,
      });
    }
    setWeekData(wd);
  }, [historicData, name]);

  let valueStr = null;
  if (value) {
    valueStr = value as number;
  } else if (historicData && name && historicData.timeseries[0][name]) {
    valueStr = historicData.timeseries[0][name] as number;
  }

  return (
    <div className="p-col-6 p-md-3 p-lg-2">
      <Card className="card">
        <div className={styles.label}>{label}</div>
        <div className={styles.number}>
          <NumberValue value={valueStr} />
        </div>

        {weekData.map((wd) => (
          <div key={wd.date} className="p-grid">
            <div className={classnames("p-col-5", styles.right)}>
              <NumberValue value={wd.delta} withSign={true} withColor={true} positiveGood={name === 'recovered'} />
            </div>
            <div className={classnames("p-col-7", styles.right)}>
              <NumberValue value={wd.value} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default NumberCard;
