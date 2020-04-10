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
  const data = useSelector((state: RootState) =>
    state.corona.latestData?.find((cd) => cd.countrycode.iso2 === countrycode)
  );
  const historicData = useSelector(
    (state: RootState) =>
      state.corona.historicData && state.corona.historicData[countrycode]
  );
  const deltaData = useSelector(
    (state: RootState) =>
      state.corona.historicData && state.corona.deltaData[countrycode]
  );

  useEffect(() => {
    if (data == null || deltaData == null || name == null) return;

    const wd: DayPoint[] = new Array<DayPoint>(7);
    for (let i = 1; i < 7; i++) {
      wd.push({
        date: historicData.timeseries[i].date,
        value: historicData.timeseries[i][name] as number,
        delta: deltaData[i][name] as number,
      });
    }
    setWeekData(wd);
  }, [data, deltaData]);

  let valueStr = null;
  if (value) {
    valueStr = value as number;
  } else  if (data && name && data[name]) {
    valueStr = data[name] as number;
  }

  return (
    <div className="p-col-6 p-lg-3">
      <Card className="">
        <div className={styles.label}>{label}</div>
        <div className={styles.number}><NumberValue value={valueStr} /></div>

        {weekData.map((wd) => (
          <div key={wd.date} className="p-grid">
            <div className={classnames("p-col-5", styles.left)}>
              <NumberValue value={wd.delta} withSign={true} />
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
