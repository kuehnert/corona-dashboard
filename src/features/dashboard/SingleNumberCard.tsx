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
  percentage?: boolean;
  label: string;
  name: string;
  suffix?: string;
  value?: string | number;
}

interface DayPoint {
  date: string;
  value: number;
}

const SingleNumberCard: React.FC<Props> = ({
  countrycode,
  percentage = false,
  label,
  name,
  suffix,
  value,
}) => {
  const [weekData, setWeekData] = useState<DayPoint[]>([]);
  const { daysToShow } = useSelector((state: RootState) => state.corona);
  const historicData = useSelector(
    (state: RootState) =>
      state.corona.historicData && state.corona.historicData[countrycode]
  );

  useEffect(() => {
    if (historicData == null || name == null) return;

    const wd: DayPoint[] = new Array<DayPoint>(7);
    for (let i = 1; i < daysToShow; i++) {
      wd.push({
        date: historicData.timeseries[i].date,
        value: historicData.timeseries[i][name] as number,
      });
    }
    setWeekData(wd);
  }, [historicData]);

  let valueStr = NaN;
  if (historicData) {
    valueStr = historicData.timeseries[0][name] as number;
  }

  return (
    <div className="p-col">
      <Card className="card">
        <div className={styles.label}>{label}</div>
        <div className={styles.number}>
          <NumberValue value={valueStr} percentage={percentage} /> {suffix}
        </div>

        {weekData.map((wd) => (
          <div key={wd.date} className="p-grid p-justify-center">
            <div className={classnames("p-col", styles.right)}>
              <NumberValue value={wd.value} percentage={percentage} /> {suffix}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default SingleNumberCard;
