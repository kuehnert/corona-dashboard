import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
// import { AppThunk, RootState } from "../../app/store";
import { AppThunk, RootState } from "../../app/store";
import axios from "axios";

export interface CountryData {
  countryregion: string;
  lastupdate: string;
  location: { lat: number; lng: number };
  countrycode: { iso2: string; iso3: string };
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface GlobalData {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface CoronaState {
  latestData: CountryData[] | null;
  latestGlobalData: GlobalData | null;
  historicData: CountryData[] | null;
  selectedCountries: string[];
}

const initialState: CoronaState = {
  latestData: null,
  latestGlobalData: null,
  historicData: null,
  selectedCountries: ["DE", "GB", "FR", "JP", "US"],
};

export const CoronaSlice = createSlice({
  name: "corona",
  initialState,
  reducers: {
    fetchLatestDataSuccess: (state, action: PayloadAction<CountryData[]>) => {
      state.latestData = action.payload;
    },
    fetchLatestGlobalSuccess: (state, action: PayloadAction<CountryData>) => {
      state.latestGlobalData = action.payload;
    },
  },
});

export const {
  fetchLatestDataSuccess,
  fetchLatestGlobalSuccess,
} = CoronaSlice.actions;

export const fetchLatestGlobalData = (): AppThunk => async (dispatch) => {
  let data: CountryData;

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

// TODO: historic data
// https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=DE&onlyCountries=true

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
