import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ page = 1, filters }, { getState }) => {
    const state = getState();
    const currentPage = state.characters.page || page;
    const queryParams = new URLSearchParams({
      ...filters,
      page: currentPage,
    }).toString();
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?${queryParams}`
    );
    return {
      results: response.data.results,
      info: response.data.info,
    };
  }
);

export const fetchCharacter = async (id) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return response.data;
};

const initialState = {
  characters: [],
  status: "idle",
  page: 1,
  maxPage: 0,
  error: null,
  hasMore: true,
  loadingCharacters: false,
  filters: JSON.parse(localStorage.getItem("filters")) || {
    name: "",
    species: "",
    gender: "",
    status: "",
  },
  availableFilters: {
    species: [],
    gender: [],
    status: [],
  },
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    loadMoreCharacters(state) {
      if (state.hasMore === true && state.page < state.maxPage) {
        state.page += 1;
      } else {
        state.hasMore = false;
      }
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.hasMore = true;
      state.characters = [];
    },
    updateCharacters(state, action) {
      if (action.payload) {
        const newCharacters = action.payload.results;
        const uniqueCharacters = newCharacters.filter(
          (newChar) => !state.characters.some((char) => char.id === newChar.id)
        );
        state.characters = [...state.characters, ...uniqueCharacters];
        state.hasMore = !!action.payload.info.next;
        state.maxPage = action.payload.info.pages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loadingCharacters = true;
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadingCharacters = false;
        state.error = null;

        const fetchedCharacters = action.payload.results;
        const currentSpecies = state.filters.species;
        const currentGender = state.filters.gender;
        const currentStatus = state.filters.status;

        const newSpecies = new Set(state.availableFilters.species);
        const newGender = new Set(state.availableFilters.gender);
        const newStatus = new Set(state.availableFilters.status);

        if (Array.isArray(fetchedCharacters)) {
          fetchedCharacters.forEach((item) => {
            if (!currentSpecies || item.species === currentSpecies) {
              newSpecies.add(item.species);
            }
            if (!currentGender || item.gender === currentGender) {
              newGender.add(item.gender);
            }
            if (!currentStatus || item.status === currentStatus) {
              newStatus.add(item.status);
            }
          });
        } else {
          console.error("Received non-iterable data:", fetchedCharacters);
        }

        state.availableFilters = {
          species: Array.from(newSpecies),
          gender: Array.from(newGender),
          status: Array.from(newStatus),
        };

        const uniqueCharacters = fetchedCharacters.filter(
          (newChar) => !state.characters.some((char) => char.id === newChar.id)
        );

        state.characters = [...state.characters, ...uniqueCharacters];
        state.hasMore =
          !!action.payload.info.next && state.page < state.maxPage;
        state.maxPage = action.payload.info.pages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.loadingCharacters = false;
        state.error = action.error.message;
      });
  },
});

export const { loadMoreCharacters, setFilters, updateCharacters } =
  charactersSlice.actions;
export const selectFilters = (state) => state.characters.filters;
export const selectCharacters = (state) => state.characters.characters;
export const selectStatus = (state) => state.characters.status;
export const selectPage = (state) => state.characters.page;
export const selectAvailableFilters = (state) =>
  state.characters.availableFilters;
export const charactersLoading = (state) => state.characters.loadingCharacters;

export default charactersSlice.reducer;
