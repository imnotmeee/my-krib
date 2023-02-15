<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;

class ListingsController extends Controller
{
    function index()
    {
        $url = $this->filterUrl('resultsPerPage=50');
        $params = request()->all();
        if (count($params) != 0) {
            $queryString = http_build_query($params);
            $url .= '&' . $queryString;
        }

        $url = $this->replacedParams($url);

        try {
            $data = $this->makeCallToRepliers($url);
            return response()->json(['data' => $data, 'url' => $url]);
        } catch (\Throwable $th) {
            $data['pageSize'] = 0;
            $data['count'] = 0;
            $data['listings'] = [];
            $data['error'] = 'url error ' . $th;
            return response()->json(['data' => $data, 'url' => $url]);
        }
    }

    function map_listings()
    {
        $url = $this->filterUrl('');
        $params = request()->all();
        if (count($params) != 0) {
            $queryString = http_build_query($params);
            $url .= '&' . $queryString;
        }

        $url = $this->replacedParams($url);

        try {
            $data = $this->makeCallToRepliers($url);
            return response()->json(['data' => $data, 'url' => $url]);
        } catch (\Throwable $th) {
            $data['pageSize'] = 0;
            $data['count'] = 0;
            $data['listings'] = [];
            $data['error'] = 'url error ' . $th;
            return response()->json(['data' => $data, 'url' => $url]);
        }
    }

    function property($id, $status = null)
    {
        $url = 'https://sandbox.repliers.io/listings?listings=true&operator=AND&sortBy=updatedOnDesc&mlsNumber=' . $id;
        if ($status) {
            $url = 'https://sandbox.repliers.io/listings?listings=true&operator=AND&sortBy=updatedOnDesc&mlsNumber=' . $id . '&' . $status;
        }
        $data = $this->makeCallToRepliers($url);
        return response()->json(['data' => $data, 'url' => $url]);
    }


    private function replacedParams($url)
    {
        $url = preg_replace('/basement\d+/', 'basement', $url);
        $url = preg_replace('/%2Cbasement/', 'basement', $url);
        $url = preg_replace('/min\d+/', 'min', $url);
        $url = preg_replace('/den\d+/', 'den', $url);
        $url = preg_replace('/minGarageSpaces\d+/', 'minGarageSpaces', $url);
        $url = preg_replace('/propertyType\d+/', 'propertyType', $url);
        $url = preg_replace('/lastStatus\d+/', 'lastStatus', $url);
        $url = preg_replace('/type\d+/', 'type', $url);
        $url = preg_replace('/status\d+/', 'status', $url);
        $url = preg_replace('/class\d+/', 'class', $url);
        $url = preg_replace("/class%5D/", "class", $url);
        $url = preg_replace("/style%5D/", "style", $url);
        $url = preg_replace("/[\d]%3D/", "", $url);
        $url = preg_replace("/[\d]%5B/", "", $url);

        return $url;
    }

    private function filterUrl(string $filter)
    {
        return 'https://sandbox.repliers.io/listings?listings=true&operator=AND&sortBy=updatedOnDesc&' . $filter .
            '&fields=
            lastStatus,
            type,
            map.latitude,
            map.longitude,
            mlsNumber,
            listPrice,
            address.city,
            address.state,
            address.zip,
            address.district,
            images[5],
            details.numBedrooms,
            details.numBathrooms,
            details.numGarageSpaces,
            details.sqft,
            daysOnMarket
        ';
    }

    private function makeCallToRepliers(string $url)
    {
        $client = new Client();
        $response = $client->request(
            'GET',
            $url,
            [
                'headers' => [
                    'REPLIERS-API-KEY' => 'I1H2jVeE6yKFRIWsoIqmH0Y8C2f5ON',
                    'content-type' => 'application/json',
                ],
            ],
        );

        $data = json_decode($response->getBody());
        return $data;
    }
}
