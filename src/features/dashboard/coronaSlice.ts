import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as dateFns from "date-fns";
import { AppThunk } from "../../app/store";

export interface Country {
  name: string;
  code: string;
}

export const countryList = [
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "China", code: "CN" },
  { name: "Czechia", code: "CZ" },
  { name: "France", code: "FR" },
  { name: "Greece", code: "GR" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Japan", code: "JP" },
  { name: "Luxembourg", code: "LU" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mexico", code: "MX" },
  { name: "Netherlands", code: "NL" },
  { name: "Nigeria", code: "NG" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Singapore", code: "SG" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "Viet Nam", code: "VN" },
];

const defaultCountries = [
  { name: "Germany", code: "DE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Italy", code: "IT" },
  { name: "Canada", code: "CA" },
];

interface HistoricData {
  countryregion: string;
  lastupdate: string;
  countrycode: { iso2: string; iso3: string };
  location: { lat: number; lng: number };
  timeseries: TimeSeriesData[];
}

interface TimeSeriesData extends GlobalData {
  date: string;
  acute: number;
  doublingtime: number;
  confirmedDelta: number;
  deathsDelta: number;
  recoveredDelta: number;
}

export interface GlobalData {
  confirmed: number;
  deaths: number;
  recovered: number;
  [key: string]:
    | number
    | string
    | { lat: number; lng: number }
    | { iso2: string; iso3: string };
}

interface CoronaState {
  latestGlobalData: GlobalData | null;
  historicData: { [code: string]: HistoricData };
  sourceCountries: Country[];
  selectedCountries: Country[];
  daysToShow: number;
  showCharts: boolean;
}

const initialState: CoronaState = {
  latestGlobalData: null,
  historicData: {},
  sourceCountries: [...countryList],
  selectedCountries: [...defaultCountries],
  daysToShow: 7,
  showCharts: true,
};

export const CoronaSlice = createSlice({
  name: "corona",
  initialState,
  reducers: {
    fetchLatestGlobalSuccess: (state, action: PayloadAction<GlobalData>) => {
      state.latestGlobalData = action.payload;
    },
    fetchCountryHistoricDataSuccess: (
      state,
      action: PayloadAction<HistoricData>
    ) => {
      const data = action.payload;
      const code = data.countrycode.iso2;
      let ts = data.timeseries;

      // calc acute infected
      ts = ts.map((gd) => ({
        ...gd,
        acute: gd.confirmed - gd.recovered - gd.deaths,
        fatality: gd.confirmed > 0 ? gd.deaths / gd.confirmed : NaN,
      }));

      // calc deltas to previous days
      for (let i = 1; i < ts.length; i++) {
        const d0 = ts[i - 1];
        const d1 = ts[i];
        ts[i] = {
          ...ts[i],
          acuteDelta: d0.acute - d1.acute,
          confirmedDelta: d0.confirmed - d1.confirmed,
          deathsDelta: d0.deaths - d1.deaths,
          recoveredDelta: d0.recovered - d1.recovered,
        };
      }

      // calc doubling times
      for (let i = 0; i < ts.length; i++) {
        // target if half of original value
        const target = ts[i].confirmed / 2.0;
        if (target === 0) {
          break;
        }

        let j = i + 1;

        // find out when it was that
        while (j < ts.length && ts[j].confirmed > target) {
          j += 1;
        }

        // valid?
        if (j < ts.length) {
          ts[i].doublingtime = j - i;
        } else {
          ts[i].doublingtime = 0;
        }
      }

      data.timeseries = ts;
      state.historicData[code] = data;
    },
    setShowChartsSuccess: (state, action: PayloadAction<boolean>) => {
      state.showCharts = action.payload;
    },
    setCountriesSuccess: (
      state,
      action: PayloadAction<{ source: Country[]; target: Country[] }>
    ) => {
      state.sourceCountries = action.payload.source;
      state.selectedCountries = action.payload.target;
    },
  },
});

export const {
  fetchLatestGlobalSuccess,
  fetchCountryHistoricDataSuccess,
  setCountriesSuccess,
  setShowChartsSuccess,
} = CoronaSlice.actions;

export const getCountries = (): AppThunk => async (dispatch) => {
  const sourceStr = localStorage.getItem("sourceCountries");

  if (sourceStr) {
    const targetStr = localStorage.getItem("selectedCountries");
    const source = JSON.parse(sourceStr!);
    const target = JSON.parse(targetStr!);
    const showCharts = JSON.parse(localStorage.getItem("showCharts")!);
    dispatch(setCountriesSuccess({ source, target }));
    dispatch(setShowChartsSuccess(showCharts));
  }
};

export const setShowCharts = (showCharts: boolean): AppThunk => async (
  dispatch
) => {
  localStorage.setItem("showCharts", JSON.stringify(showCharts));
  dispatch(setShowChartsSuccess(showCharts));
};

export const setCountries = (
  source: Country[],
  target: Country[]
): AppThunk => async (dispatch) => {
  localStorage.setItem("sourceCountries", JSON.stringify(source));
  localStorage.setItem("selectedCountries", JSON.stringify(target));
  dispatch(setCountriesSuccess({ source, target }));
};

export const resetCountries = (): AppThunk => async (dispatch) => {
  const source: Country[] = [...countryList];
  const target: Country[] = [...defaultCountries];
  dispatch(setCountries(source, target));
};

export const fetchLatestGlobalData = (): AppThunk => async (dispatch) => {
  let data: GlobalData;

  try {
    const response = await axios.get(
      `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief`
    );
    data = response.data;
  } catch (error) {
    console.log("error:", error);
    return;
  }

  dispatch(fetchLatestGlobalSuccess(data));
};

export const fetchCountryHistoricData = (code: string): AppThunk => async (
  dispatch,
  getState
) => {
  let data: HistoricData;

  try {
    const response = await axios.get(
      `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${code.toUpperCase()}&onlyCountries=true`
    );
    const rawData = response.data[0];
    const rawTimeSeries = rawData.timeseries;
    const timeseries = Object.keys(rawTimeSeries)
      .map((k) => {
        const date = dateFns.parse(k, "MM/dd/yy", new Date());
        const dateStr = dateFns.formatISO9075(date, { representation: "date" });
        return { date: dateStr, ...rawTimeSeries[k] };
      })
      .sort((a: TimeSeriesData, b: TimeSeriesData) =>
        b.date.localeCompare(a.date)
      );
    data = { ...rawData, timeseries };
  } catch (error) {
    console.log("error:", error);
    return;
  }

  dispatch(fetchCountryHistoricDataSuccess(data));
};

export default CoronaSlice.reducer;
