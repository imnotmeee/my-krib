import { createSlice } from '@reduxjs/toolkit'

export const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    hovered_listing: {}
  },
  reducers: {
    // EXPECTING PAYLOAD IS  DATA FROM SERVER
    initialize_listings: (state, action) => {
      state.listings = action.payload
    },
    // EXPECTING PAYLOAD IS CURRENTLY HOVERING LISTING
    hover_listing: (state, action) => {
      state.hovered_listing = action.payload;
    },
    leave_listing: (state) => {
      state.hovered_listing = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { initialize_listings, hover_listing, set_listing, leave_listing } = listingsSlice.actions
export default listingsSlice.reducer