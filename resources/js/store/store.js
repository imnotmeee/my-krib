import { configureStore } from '@reduxjs/toolkit'
import listingsSlice from './reducers/listings_slice'
import uriSlice from './reducers/uri_slice'

export default configureStore({
  reducer: {
    listing: listingsSlice,
    uri: uriSlice,
  },
})