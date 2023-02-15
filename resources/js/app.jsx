import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import NotFound from "./components/utils/NotFound";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Listing from "./pages/Listing";

import { Provider } from "react-redux";
import store from "./store/store";
import ListingPagination from "./test/ListingPagination";
import ListingForLeaseAndSale from "./pages/ListingForLeaseAndSale";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route
                        path="/listings/:id/:status"
                        element={<ListingForLeaseAndSale />}
                    />
                    <Route path="/listings/:id" element={<Listing />} />
                    <Route path="/test" element={<ListingPagination />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
