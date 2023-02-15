<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">
        
        <title>Laravel 9 vite with react</title>
        <style>
            body{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            },
            li{
                list-style: none;
            }
           .pagination{
                list-style: none;
                display: flex;
                justify-content : center;
                align-items : center;
                margin-bottom : 5rem;
                font-size: 1.2rem;
                gap: 5px;    
                padding: 0;
            }
            .pagination .page-num{
                padding: 8px 15px;
                cursor: pointer;
                border-radius: 3px;
                font-weight: 500;
                color: #1565c0;
            }
            .pagination .page-num:hover{
                background-color: #98c1f0;
                color:#fff;
            }
            .pagination .active{
                background-color: #1565c0;
                color: #ffffff;
            }
        </style>
        @viteReactRefresh
        @vite('resources/js/index.jsx')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>