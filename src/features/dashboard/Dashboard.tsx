/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchLatestGlobalData, getCountries } from "./coronaSlice";
import CountryData from "./CountryData";
import styles from "./Dashboard.module.scss";
import GlobalData from "./GlobalData";
import { Card } from "primereact/card";
import Settings from "./Settings";
import CountryChart from "./CountryChart";
import icon from "../../icon.svg";
import { formatDate } from "../../utils/formatHelpers";
import classNames from "classnames";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { historicData, selectedCountries, showCharts } = useSelector(
    (state: RootState) => state.corona
  );

  useEffect(() => {
    dispatch(getCountries());
    dispatch(fetchLatestGlobalData());
  }, []);

  return (
    <div className={styles.rootContainer}>
      <h1>
        {window.innerWidth > 600 && (<img
          src={icon}
          alt="icon"
          width={48}
          style={{ position: "relative", bottom: "-12px", marginRight: "24px" }}
        />)}
        Mr K.'s Corona Dashboard
      </h1>
      <Settings />

      <GlobalData />

      {selectedCountries.map((c) => (
        <div key={c.code}>
          <div className="p-grid">
            <h2 className={classNames("p-col", styles.countryHeader)}>
              {c.name}
            </h2>
            <h3 className={classNames("p-col", styles.countryHeader, "right")}>
              {formatDate(historicData[c.code]?.lastupdate)}
            </h3>
          </div>

          {showCharts && <CountryChart countrycode={c.code} />}

          <CountryData countrycode={c.code} />
        </div>
      ))}

      <Card className="footer">
        <p>
          Data is from John-Hopkins-University, updated once per day:{" "}
          <a href="https://github.com/CSSEGISandData/COVID-19">
            https://github.com/CSSEGISandData/COVID-19
          </a>
        </p>

        <p>
          Inspired by Inje Lee's article.{" "}
          <a href="https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33">
            https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33
          </a>
        </p>

        <p>
          Thanks to Ainize for providing the data API:{" "}
          <a href="https://ainize.ai/laeyoung/wuhan-coronavirus-api">
            https://ainize.ai/laeyoung/wuhan-coronavirus-api
          </a>
        </p>

        <p>
          Thanks to <a href="https://www.iconfinder.com/justicon">Just Icon</a>{" "}
          for the beautiful{" "}
          <a href="https://www.iconfinder.com/icons/5929243/antivirus_bacteria_cell_coronavirus_infection_malware_virus_icon">
            Corona icon
          </a>
          .
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
