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

interface CoronaState {
  latestData: CountryData[] | null;
  historicData: CountryData[] | null;
  selectedCountries: string[];
}

const initialState: CoronaState = {
  latestData: null,
  historicData: null,
  selectedCountries: ["DE", "GB", "US"],
};

export const CoronaSlice = createSlice({
  name: "corona",
  initialState,
  reducers: {
    fetchLatestDataSuccess: (state, action: PayloadAction<CountryData[]>) => {
      state.latestData = action.payload;
    },
  },
});

export const { fetchLatestDataSuccess } = CoronaSlice.actions;

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

// export const selectCount = (state: RootState) => state.corona.value;
const latestDataSelector = (state: RootState) => state.corona.latestData;

export const countryLatestData = (code: string) => {
  return createSelector(latestDataSelector, (latestData) => {
    console.log('latestData:', latestData);

    // const data = latestData?.find((cd) => cd.countrycode.iso2 === code);
    // console.log('data:', data);
    // return data;
    return 0;
  });
};

export default CoronaSlice.reducer;
