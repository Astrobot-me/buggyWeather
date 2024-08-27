import { useCallback, useEffect, useState } from 'react';
import useGetWeather from '../services/useGetWeather';
import { redirect, useSearchParams } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import dataServices from '../services/dataOps';
import { useSelector } from 'react-redux';
import { secret } from '../services/conf';
import CardFrame from '../components/CardFrame';
import Forecast from '../components/Forecast';
import WeatherStats from '../components/WeatherStats';
import GetForecast from '../services/Services';
import NotFound from '../components/NotFound';
import { Query } from 'appwrite';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function GetWeather() {


    let [searchParams, setSearchParams] = useSearchParams();
    const [forecast, setForecast] = useState(null)
    const [disable, setDisable] = useState(false)

    const dispatch = useDispatch();
    const userConfig = useSelector((state) => state.auth.userConfig)
    const userData = useSelector((state) => state.auth?.userData)

    const latitude = searchParams.get("lat") || userConfig?.defaultLat;
    const longitude = searchParams.get("long") || userConfig?.defaultLong;
    const place = searchParams.get("place") || userConfig?.defaultPlace;

    //Initially Default Places were hardcoded, leaving the place co-ords here
    // lat : 26.904789
    // long : 75.756797
    // place : Jaipur :)


    //if no lat or long, in case of direct visit on the route redirect to home 
    if (!latitude || !longitude) return redirect("/")

    const weather = useGetWeather(latitude, longitude) || null;
    const options = {
        hour12: true,
        timeStyle: "short",
        dateStyle: "full"
    }

    useEffect(() => {
        if (userConfig.defaultLat == latitude && userConfig.defaultLong == longitude) {
            setDisable(true)
            //checking for already default then no further proceedings 
        }

        dataServices.getUserSearchHistory(userData.$id, place)
            .then((result) => {

                if (result && result.total > 0 && weather) {

                    dataServices.updateSearchRecord({
                        docid: result.documents[0].$id,
                        resultSet: JSON.stringify(weather),
                        place: place
                    }).then(() => { })
                        .catch(() => { })

                } else {

                    if (weather) {
                        dataServices.createSearchRecord({
                            userAuthId: userData.$id,
                            resultSet: JSON.stringify(weather),
                            place: place
                        }).then(() => { })
                            .catch(() => { })
                    }
                }
            })
    }, [latitude, longitude, weather])

    const getforcast = useCallback(async () => {
        //yet to understand useCallback at full extent
        const res = await GetForecast(latitude, longitude, userConfig?.defaultCnt, userConfig?.defaultMetric)
        // console.log("res", res);

        setForecast(res)

    }, [])


    const setDefault = async () => {

        setDisable(true) //disables default button after first click

        const document = await dataServices.getUserconfig([Query.equal("userAuthId", [userData.$id])])
        // console.log("doc", document);

        if (document && document.total > 0) {
            try {
                const newState = await dataServices.updateRecord({
                    docid: document?.documents[0].$id,
                    defaultPlace: place,
                    defaultLat: latitude,
                    defaultLong: longitude,

                })
                alert(`${place} is now set to Homecity`)
                dispatch(login({
                    userData: userData,
                    userConfig: newState
                }))


            } catch (error) {
                console.log(error);

            }
        } else {
            dataServices.createRecord({
                userAuthId: userId,
                defaultPlace: place,
                defaultLat: latitude,
                defaultLong: longitude
            }).then((newState) => {
                alert(`${place} is now set to Homecity`)
                dispatch(login({
                    userData: userData,
                    userConfig: newState
                }))
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    return (
        <>
            <Navbar />
            <div className='w-full h-auto flex flex-col gap-2 mb-5 items-center justify-start mt-3 '>
                <label htmlFor=""> Showing weather for <span className='italic text-gray-500'> {latitude} ( lat ) and {longitude} ( long ) </span></label>
                <CardFrame title={(weather !== null) ? ` Current Weather Stats for ${place} as of ${new Date(weather.dt * 1000).toLocaleString("en-IN", options)}` : ``} width="w-[95%]" col={true}>
                    <WeatherStats buttons={true} getforcast={getforcast} setDefault={setDefault} data={weather} place={place} disable={disable} />
                </CardFrame>

                {forecast !== null && (
                    <CardFrame title={`Weather forcast for ${place}, default count ${userConfig.defaultCnt}`} width="w-[95%]" overfloy_y={true} col={true}>
                        <div class="flex w-full flex-col border-opacity-50">
                            <div class="divider">You can change the Default Count in Profile</div>    
                        </div>
                        {
                            // forecast?.list.map((item) => <Forecast key={item?.dt} data={item} />)
                            forecast?.cod === '200' ? (
                                forecast.list.map((item,index) => <Forecast key={item.dt} index={index+1} data={item} />)
                            ) : <NotFound />
                        }
                    </CardFrame>
                )
                }
            </div>
            <Footer />
        </>
    )
}