/*In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), 
che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste
in parallelo e poi restituirai un oggetto con i dati aggregati.*/

async function fetchJason(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

async function getDashboardData(query) {
    const [getDestination, getWeather, getAirport] = await Promise.all([
        fetchJason(`http://localhost:3333/destinations?search=${query}`),
        fetchJason(`http://localhost:3333/weathers?search=${query}`),
        fetchJason(`http://localhost:3333/airports?search=${query}`)
    ])
    const destination = getDestination[0];
    const weather = getWeather[0];
    const airport = getAirport[0];

    const data = {
        city: destination?.name ?? null,
        country: destination?.country ?? null,
        temperature: weather?.temperature ?? null,
        weather: weather?.weather_description ?? null,
        airport: airport?.name ?? null
    };
    return data

}

(async () => {
    const data = await getDashboardData('Vienna')
    console.log('Dashboard data', data)
    if (data.city && data.country) {
        console.log(`${data.city} is in ${data.country}.`)
    }
    if (data.temperature !== null && data.weather) {
        console.log(`Today there are ${data.temperature} degrees and the weather is ${data.weather}`)
    }
    if (data.airport) {
        console.log(`The main airport is ${data.airport}`)
    }
})()

