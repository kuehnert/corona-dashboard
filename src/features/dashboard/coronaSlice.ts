import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
// import { AppThunk, RootState } from "../../app/store";
import { AppThunk, RootState } from "../../app/store";
import axios from "axios";
import * as dateFns from "date-fns";

export interface CountryData extends GlobalData {
  countryregion: string;
  lastupdate: string;
  location: { lat: number; lng: number };
  countrycode: { iso2: string; iso3: string };
  // confirmed: number;
  // deaths: number;
  // recovered: number;
}

interface HistoricData {
  countryregion: string;
  lastupdate: string;
  countrycode: { iso2: string; iso3: string };
  location: { lat: number; lng: number };
  timeseries: TimeSeriesData[];
}

interface TimeSeriesData extends GlobalData {
  date: string;
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
  latestData: CountryData[] | null;
  latestGlobalData: GlobalData | null;
  historicData: { [code: string]: HistoricData };
  deltaData: { [code: string]: TimeSeriesData[] };
  selectedCountries: string[];
}

const initialState: CoronaState = {
  latestData: null,
  latestGlobalData: null,
  historicData: {},
  deltaData: {},
  // selectedCountries: ["DE", "GB", "FR", "JP", "US"],
  selectedCountries: ["DE", "GB", "US"],
  // selectedCountries: ["DE"],
};

export const CoronaSlice = createSlice({
  name: "corona",
  initialState,
  reducers: {
    fetchLatestDataSuccess: (state, action: PayloadAction<CountryData[]>) => {
      state.latestData = action.payload;
    },
    fetchLatestGlobalSuccess: (state, action: PayloadAction<GlobalData>) => {
      state.latestGlobalData = action.payload;
    },
    fetchCountryHistoricDataSuccess: (
      state,
      action: PayloadAction<HistoricData>
    ) => {
      const data = action.payload;
      const code = data.countrycode.iso2;
      const ts = data.timeseries;
      const dts = new Array(ts.length);

      for (let i = 1; i < ts.length; i++) {
        const d0 = ts[i-1];
        const d1 = ts[i];
        dts[i] = {
          date: d0.date,
          confirmed: d0.confirmed - d1.confirmed,
          deaths: d0.deaths - d1.deaths,
          recovered: d0.recovered - d1.recovered,
        };
      }

      state.historicData[code] = data;
      state.deltaData[code] = dts;
    },
  },
});

export const {
  fetchLatestDataSuccess,
  fetchLatestGlobalSuccess,
  fetchCountryHistoricDataSuccess,
} = CoronaSlice.actions;

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

export const fetchLatestData = (): AppThunk => async (dispatch, getState) => {
  const codes = getState().corona.selectedCountries;
  const requests = codes.map((code) =>
    axios.get(
      `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=${code}&onlyCountries=true`
    )
  );
  let latestData: CountryData[] = [];

  try {
    const responses = await axios.all(requests);
    latestData = responses.map((r) => r.data[0]);
  } catch (error) {
    console.log("error:", error);
    return;
  }

  dispatch(fetchLatestDataSuccess(latestData));
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

// export const selectCount = (state: RootState) => state.corona.value;
const latestDataSelector = (state: RootState) => state.corona.latestData;

export const countryLatestData = (code: string) => {
  return createSelector(latestDataSelector, (latestData) => {
    console.log("latestData:", latestData);

    // const data = latestData?.find((cd) => cd.countrycode.iso2 === code);
    // console.log('data:', data);
    // return data;
    return 0;
  });
};

export default CoronaSlice.reducer;
