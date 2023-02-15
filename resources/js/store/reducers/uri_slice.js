import { createSlice } from "@reduxjs/toolkit";

// "map=%5B%5B%5B-79.79318636911991%2C43.28095459577831%5D%2C%5B-79.86013430613163%2C43.28095459577831%5D%2C%5B-79.86013430613163%2C43.191786028049435%5D%2C%5B-79.79318636911991%2C43.191786028049435%5D%2C%5B-79.79318636911991%2C43.28095459577831%5D%5D%5D&",

const uri = `/api/listings?lat=43.23612008391963&long=-79.82683054799662&radius=6&type=sale&status=A&lastStatus1=New&lastStatus2=Pc&lastStatus3=Exp&lastStatus4=Dft&`;
const map_uri =
    "/api/map_listings?map=%5B%5B%5B-79.79318636911991%2C43.28095459577831%5D%2C%5B-79.86013430613163%2C43.28095459577831%5D%2C%5B-79.86013430613163%2C43.191786028049435%5D%2C%5B-79.79318636911991%2C43.191786028049435%5D%2C%5B-79.79318636911991%2C43.28095459577831%5D%5D%5D&";

const uriSlice = createSlice({
    name: "uri",
    initialState: {
        original_uri: "/api/listings?",
        default_filter_uri: uri,

        filter_uri: uri,
        map_filter_uri: map_uri,

        // all filter uri
        listing: "lat=43.23612008391963&long=-79.82683054799662&radius=6&",
        map: "lat=43.23612008391963&long=-79.82683054799662&radius=6&",

        keyword: "",
        bed: "",
        bath: "",
        fee: "",
        daySinceSold: "",
        den: "",
        garageSize: "",
        activeStatus:
            "type=sale&status=A&lastStatus1=New&lastStatus2=Pc&lastStatus3=Exp&lastStatus4=Dft&",
        homeType: "",
        basement: "",
    },
    reducers: {
        // MAP
        setMapUri: (state, action) => {
            state.map_filter_uri = state.map_filter_uri.replace(
                state.map,
                action.payload
            );
            state.map = action.payload;
        },
        // LISTING
        setListingUri: (state, action) => {
            state.filter_uri = state.filter_uri.replace(
                state.listing,
                action.payload
            );
            state.listing = action.payload;
        },

        // KEYWORD
        setKeywordUri: (state, action) => {
            if (state.filter_uri.includes("keywords")) {
                state.filter_uri = state.filter_uri.replace(
                    state.keyword,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.keyword,
                    action.payload
                );
                state.keyword = action.payload;
            } else {
                state.keyword = action.payload;
                state.filter_uri += state.keyword;
                state.map_filter_uri += state.keyword;
            }
        },
        clearKeywordUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.keyword, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.keyword,
                ""
            );
        },

        // BEDROOMS
        setBedUri: (state, action) => {
            if (
                state.filter_uri.includes("minBeds") ||
                state.filter_uri.includes("maxBeds")
            ) {
                state.filter_uri = state.filter_uri.replace(
                    state.bed,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.bed,
                    action.payload
                );
                state.bed = action.payload;
            } else {
                state.bed = action.payload;
                state.filter_uri += state.bed;
                state.map_filter_uri += state.bed;
            }
        },
        clearBedUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.bed, "");
            state.map_filter_uri = state.map_filter_uri.replace(state.bed, "");
        },

        // BATHROOM
        setBathUri: (state, action) => {
            if (state.filter_uri.includes("minBaths")) {
                state.filter_uri = state.filter_uri.replace(
                    state.bath,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.bath,
                    action.payload
                );
                state.bath = action.payload;
            } else {
                state.bath = action.payload;
                state.filter_uri += state.bath;
                state.map_filter_uri += state.bath;
            }
        },
        clearBathUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.bath, "");
            state.map_filter_uri = state.map_filter_uri.replace(state.bath, "");
        },

        // FEE
        setFeeUri: (state, action) => {
            if (state.filter_uri.includes("maxMaintenanceFee")) {
                state.filter_uri = state.filter_uri.replace(
                    state.fee,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.fee,
                    action.payload
                );
                state.fee = action.payload;
            } else {
                state.fee = action.payload;
                state.filter_uri += state.fee;
                state.map_filter_uri += state.fee;
            }
        },
        clearFeeUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.fee, "");
            state.map_filter_uri = state.map_filter_uri.replace(state.fee, "");
        },

        // DAY SINCE SOLD
        setDaySinceSoldUri: (state, action) => {
            if (state.filter_uri.includes("minSoldDate")) {
                state.filter_uri = state.filter_uri.replace(
                    state.daySinceSold,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.daySinceSold,
                    action.payload
                );
                state.daySinceSold = action.payload;
            } else {
                state.daySinceSold = action.payload;
                state.filter_uri += state.daySinceSold;
                state.map_filter_uri += state.daySinceSold;
            }
        },
        clearDaySinceSoldUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.daySinceSold, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.daySinceSold,
                ""
            );
        },

        // DEN
        setDenUri: (state, action) => {
            if (state.filter_uri.includes("den")) {
                state.filter_uri = state.filter_uri.replace(
                    state.den,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.den,
                    action.payload
                );
                state.den = action.payload;
            } else {
                state.den = action.payload;
                state.filter_uri += state.den;
                state.map_filter_uri += state.den;
            }
        },
        clearDenUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.den, "");
            state.map_filter_uri = state.map_filter_uri.replace(state.den, "");
        },

        // GARAGE SIZE
        setGarageSizeUri: (state, action) => {
            if (state.filter_uri.includes("minGarageSpaces")) {
                state.filter_uri = state.filter_uri.replace(
                    state.garageSize,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.garageSize,
                    action.payload
                );
                state.garageSize = action.payload;
            } else {
                state.garageSize = action.payload;
                state.filter_uri += state.garageSize;
                state.map_filter_uri += state.garageSize;
            }
        },
        clearGarageSizeUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.garageSize, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.garageSize,
                ""
            );
        },

        // BASEMENT
        setBasementUri: (state, action) => {
            if (state.filter_uri.includes("basement")) {
                state.filter_uri = state.filter_uri.replace(
                    state.basement,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.basement,
                    action.payload
                );
                state.basement = action.payload;
            } else {
                state.basement = action.payload;
                state.filter_uri += state.basement;
                state.map_filter_uri += state.basement;
            }
        },
        clearBasementUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.basement, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.basement,
                ""
            );
        },

        // ACTIVE STATUS
        setActiveStatusUri: (state, action) => {
            if (
                state.filter_uri.includes("lastStatus") ||
                state.filter_uri.includes("type")
            ) {
                state.filter_uri = state.filter_uri.replace(
                    state.activeStatus,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.activeStatus,
                    action.payload
                );
                state.activeStatus = action.payload;
            } else {
                state.activeStatus = action.payload;
                state.filter_uri += state.activeStatus;
                state.map_filter_uri += state.activeStatus;
            }
        },
        clearActiveStatusUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.activeStatus, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.activeStatus,
                ""
            );
        },

        // HOME TYPE
        setHomeTypeUri: (state, action) => {
            if (state.filter_uri.includes("propertyType")) {
                state.filter_uri = state.filter_uri.replace(
                    state.homeType,
                    action.payload
                );
                state.map_filter_uri = state.map_filter_uri.replace(
                    state.homeType,
                    action.payload
                );
                state.homeType = action.payload;
            } else {
                state.homeType = action.payload;
                state.filter_uri += state.homeType;
                state.map_filter_uri += state.homeType;
            }
        },
        clearHomeTypeUri: (state) => {
            state.filter_uri = state.filter_uri.replace(state.homeType, "");
            state.map_filter_uri = state.map_filter_uri.replace(
                state.homeType,
                ""
            );
        },
    },
});

export const {
    clearActiveStatusUri,
    clearBedUri,
    clearDaySinceSoldUri,
    clearDenUri,
    clearFeeUri,
    clearGarageSizeUri,
    clearHomeTypeUri,
    setActiveStatusUri,
    setBathUri,
    setBedUri,
    setDaySinceSoldUri,
    setDenUri,
    setFeeUri,
    setGarageSizeUri,
    setHomeTypeUri,
    setListingUri,
    setMapUri,
    clearKeywordUri,
    setKeywordUri,
    clearBathUri,
    clearBasementUri,
    setBasementUri,
} = uriSlice.actions;
export default uriSlice.reducer;
