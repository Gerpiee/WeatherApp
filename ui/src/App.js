import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import weatherSVG from "./img/weather.svg";

import { fetchWeatherAction } from "./redux/slices/weatherSlices";
//display icon https://openweathermap.org/img/wn/${icon}.png
function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("İstanbul");
  useEffect(async () => {
    dispatch(fetchWeatherAction(city));
  }, [dispatch]);
  const state = useSelector((state) => state?.weather);
  const { weather, loading, error } = state;

  return (
    <div>
      <section class="relative bg-gray-900  min-h-screen">
        <img
          class="w-56 lg:block lg:absolute top-0 left-0 pt-10"
          src={weatherSVG}
          alt="/"
        />

        <div class="relative container pt-12 px-4 mb-20 mx-auto text-center">
          <h2 class="mt-8 mb-8 lg:mb-12 text-white text-4xl lg:text-6xl font-semibold">
            HAVA DURUMU
          </h2>
          <p class="max-w-3xl mx-auto mb-8 lg:mb-12 text-white text-xl opacity-50">
            Dünyadaki Hava Durumunu Öğrenin
          </p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search City"
            class="relative z-10 inline-block w-full md:w-auto mb-2  px-3 py-2 mr-4  font-medium leading-normal bg-transparent border-2 rounded-lg text-green-400 "
          ></input>
          <button
            onClick={() => dispatch(fetchWeatherAction(city))}
            type="button"
            className="inline-flex items-center px-3 pr-3 28 text-center py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ara
          </button>
        </div>
        {loading ? (
          <h1 class="text-gray-400 text-3xl text-center">
            Hava Durumu Yükleniyor Lütfen Bekleyin...
          </h1>
        ) : error ? (
          <h1 class="text-red-400 text-3xl text-center">{error?.message}</h1>
        ) : (
          <div class="max-w-6xl px-4 mx-auto ">
            <div class="flex flex-wrap -mx-4 justify-center">
              <div class="w-full md:w-1/3 px-4">
                <div class="p-8 border border-blue-800 rounded-lg">
                  <div class="flex justify-start  items-center">
                    <span class="flex items-center justify-center w-16 h-16 rounded-full border-2">
                      <img
                        class="w-56 "
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                    </span>
                    <h1 class="text-gray-300 pl-5">
                      {weather?.weather[0].main}
                    </h1>{" "}
                  </div>
                  <h1 class="text-gray-300 text-center text-4xl mb-10">
                    {Math.ceil(Number(weather?.main.temp))}{" "}
                    <span class="text-yellow-500 text-4xl">°C</span>
                  </h1>
                  <h3 class="mb-6 text-xl text-white font-semibold">
                    {weather?.name}, {weather?.sys?.country}
                  </h3>
                  <p class="mb-8 text-gray-300">
                    {weather?.name} Konumundaki Hava Durumu ,{" "}
                    {weather?.sys?.country} Ülkesi olarak Görünmekte :{" "}
                    {weather?.weather[0].description} Bir sıcaklık ile{" "}
                    {Math.ceil(Number(weather?.main.temp))} °C Ve nem Oranı{" "}
                    {weather?.main?.humidity} %
                  </p>
                  <a
                    class="ml-auto flex items-center justify-center w-20 h-20 rounded-full  hover:bg-blue-700 text-white"
                    href="#"
                  >
                    <span class="flex items-center justify-center w-16 h-16 rounded-full border-2">
                      <img
                        class="w-56 "
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                        alt="/"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
