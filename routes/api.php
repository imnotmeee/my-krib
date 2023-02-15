<?php

use App\Http\Controllers\ListingsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('admin')->group(function () {
//     Route::get('/admin', 'AdminController@index');
// });

// PUBLIC ROUTES
Route::post('login', [UserController::class, 'login']); //auth
Route::post('register', [UserController::class, 'register']); //auth

Route::get('/listings', [ListingsController::class, 'index'])->name('listings.listings');
Route::get('/map_listings', [ListingsController::class, 'map_listings'])->name('listings.map_listings');
Route::get('/property/{id}/{status?}', [ListingsController::class, 'property'])->name('listings.property');

// PROTECTED ROUTES
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('test', [UserController::class, 'hehe']);
});