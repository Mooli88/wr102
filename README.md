# [WR-102](https://en.wikipedia.org/wiki/WR_102)

     ⚠️ WARNING: This app been tested in dev mode in Windows environment only.

Ever wonder if your CPU temperature changing with the weather? Wonder no more.

<figure  align="center" width="100%">
  <img src="https://i.ibb.co/cJbKmcs/wr102.jpg" width="335px" align="centre">
  <figcaption>WR102</figcaption>
</figure>

## Current features

- Search for a city in the UK to get current temperatures
- Convert between Celsius and Fahrenheit
- Show system CPU temperatures
- Show basic CPU info

## Wanted features

- Auto/manual Snapshot - Allow to record and save current tempertures
- Show previous snapshots log in app
- Search weather outside UK
- Show weather based on user current location
- Manually refetch weather
- Dynamic thermometer - Show thermometer getting hotter / cooler according to cpu temperture
- Show other components temperture (i.e. GPU)
- Dark theme

## Setup

- Make sure you got [yarn](https://yarnpkg.com/getting-started) install on your machine
- navigate to root folder and run `yarn` to instal project dependencies
- Assign your [OpenWeather API key](https://home.openweathermap.org/api_keys) to the `REACT_APP_OPEN_WEATHER_API_KEY` variable inside the `.env` file
- Set `MOCK_DATA` to `1` to enable mock data or `0` to disable it.

## Prerequisite

Windows users must run the app as Administrator

## Available Scripts

In the project directory, you can run:

### `yarn electron:serve`

This commend will first run the React app (cra). Once React initialise, it will spin up Electron
and redirect to the React app on [http://localhost:3000](http://localhost:3000).
Both apps runs the in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn electron:build`

Builds the app for production to the `build` folder.\
It correctly bundles React and Electron in production mode and optimizes the build for the best performance.
