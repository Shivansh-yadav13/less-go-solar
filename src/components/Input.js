import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Input.css';
import 'leaflet/dist/leaflet.css';


function Input() {
    const [userCurrency, setUserCurrency] = useState('INR');
    const [units, setUnits] = useState('sqm');
    const [solarData, setSolarData] = useState();
    const [userPosition, setUserPosition] = useState();

    console.log(userPosition)
    console.log(solarData)

    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setUserPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    useEffect(() => {
        if (!userPosition) {
            navigator.geolocation.getCurrentPosition((position) => {
                const posi = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                setUserPosition(posi)
                const getData = async () => {
                    const solarData = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=EcHIlOB7hmPSAsR0kKtIimdO69cGeBxzAdXRtuTl&lat=${userPosition ? userPosition.lat : position.coords.latitude}&lon=${userPosition ? userPosition.lng : position.coords.longitude}`)
                    const parsedSolarData = await solarData.json()
                    setSolarData(parsedSolarData)
                }
                getData();
            }, (error) => {
                console.log(error)
            });
        } else {
            const getData = async () => {
                const solarData = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=EcHIlOB7hmPSAsR0kKtIimdO69cGeBxzAdXRtuTl&lat=${userPosition.lat}&lon=${userPosition.lng}`)
                const parsedSolarData = await solarData.json()
                console.log(parsedSolarData)
                setSolarData(parsedSolarData)
            }
            getData();
        }

    }, [userPosition])

    return (
        <>
            <div className="input-group mb-3" id="cost">
                <span className="input-group-text">
                    <b>Electricty Cost:</b>
                </span>
                {/* <!-- <span className="input-group-text">$</span> --> */}
                <input type="text" min="0" max="100" step="any" className="form-control" maxLength="3" size="4" />
                <span className="input-group-text">.00</span>
                <select className="form-select" aria-label="Default select example" id="currency" onChange={(e) => { setUserCurrency(e.target.value) }} defaultValue={userCurrency}>
                    <option value="USD">United States Dollars</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">United Kingdom Pounds</option>
                    <option value="DZD">Algeria Dinars</option>
                    <option value="ARP">Argentina Pesos</option>
                    <option value="AUD">Australia Dollars</option>
                    <option value="ATS">Austria Schillings</option>
                    <option value="BSD">Bahamas Dollars</option>
                    <option value="BBD">Barbados Dollars</option>
                    <option value="BEF">Belgium Francs</option>
                    <option value="BMD">Bermuda Dollars</option>
                    <option value="BRR">Brazil Real</option>
                    <option value="BGL">Bulgaria Lev</option>
                    <option value="CAD">Canada Dollars</option>
                    <option value="CLP">Chile Pesos</option>
                    <option value="CNY">China Yuan Renmimbi</option>
                    <option value="CYP">Cyprus Pounds</option>
                    <option value="CSK">Czech Republic Koruna</option>
                    <option value="DKK">Denmark Kroner</option>
                    <option value="NLG">Dutch Guilders</option>
                    <option value="EGP">Egypt Pounds</option>
                    <option value="FJD">Fiji Dollars</option>
                    <option value="FIM">Finland Markka</option>
                    <option value="FRF">France Francs</option>
                    <option value="DEM">Germany Deutsche Marks</option>
                    <option value="XAU">Gold Ounces</option>
                    <option value="GRD">Greece Drachmas</option>
                    <option value="HKD">Hong Kong Dollars</option>
                    <option value="HUF">Hungary Forint</option>
                    <option value="ISK">Iceland Krona</option>
                    <option value="INR">Indian Rupee</option>
                    <option value="IDR">Indonesia Rupiah</option>
                    <option value="IEP">Ireland Punt</option>
                    <option value="ILS">Israel New Shekels</option>
                    <option value="ITL">Italy Lira</option>
                    <option value="JMD">Jamaica Dollars</option>
                    <option value="JPY">Japan Yen</option>
                    <option value="JOD">Jordan Dinar</option>
                    <option value="KRW">Korea (South) Won</option>
                    <option value="LBP">Lebanon Pounds</option>
                    <option value="LUF">Luxembourg Francs</option>
                    <option value="MYR">Malaysia Ringgit</option>
                    <option value="MXP">Mexico Pesos</option>
                    <option value="NLG">Netherlands Guilders</option>
                    <option value="NZD">New Zealand Dollars</option>
                    <option value="NOK">Norway Kroner</option>
                    <option value="PKR">Pakistan Rupees</option>
                    <option value="XPD">Palladium Ounces</option>
                    <option value="PHP">Philippines Pesos</option>
                    <option value="XPT">Platinum Ounces</option>
                    <option value="PLZ">Poland Zloty</option>
                    <option value="PTE">Portugal Escudo</option>
                    <option value="ROL">Romania Leu</option>
                    <option value="RUR">Russia Rubles</option>
                    <option value="SAR">Saudi Arabia Riyal</option>
                    <option value="XAG">Silver Ounces</option>
                    <option value="SGD">Singapore Dollars</option>
                    <option value="SKK">Slovakia Koruna</option>
                    <option value="ZAR">South Africa Rand</option>
                    <option value="KRW">South Korea Won</option>
                    <option value="ESP">Spain Pesetas</option>
                    <option value="SDD">Sudan Dinar</option>
                    <option value="SEK">Sweden Krona</option>
                    <option value="CHF">Switzerland Francs</option>
                    <option value="TWD">Taiwan Dollars</option>
                    <option value="THB">Thailand Baht</option>
                    <option value="TTD">Trinidad and Tobago Dollars</option>
                    <option value="TRL">Turkey Lira</option>
                    <option value="VEB">Venezuela Bolivar</option>
                    <option value="ZMK">Zambia Kwacha</option>
                </select>
                <span className="input-group-text">per KWh</span>
                <div>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">
                    <b>Area covered by solar panels:</b>
                </span>
                {/* <span className="input-group-text">$</span> */}
                <input type="text" min="0" max="100" step="any" className="form-control" maxLength="19" />
                <select className="form-select" aria-label="Default select example" id="units" onChange={(e) => { setUnits(e.target.value) }} defaultValue={units}>
                    <option value="sqm">Square meter</option>
                    <option value="sqk">Square kilometer</option>
                    <option value="sqm">Square mile</option>
                    <option value="sqf">Square foot</option>
                    <option value="sqi">Square inch</option>
                    <option value="sqh">Hecatre</option>
                    <option value="sqa">Acre</option>
                </select>
                <div>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">
                    <b>Cost of one solar panel:</b>
                </span>
                {/* <span className="input-group-text">$</span> */}
                <input type="text" min="0" max="100" step="any" className="form-control" maxLength="3" size="4" />
                <span class="input-group-text">.00</span>
            </div>
            <span className="input-group-text" id="range"><b>Time: 1 Year</b>
                <input type="range" className="form-range" id="customRange1" />
            </span>
            <div id="map">
                {userPosition ?
                    <MapContainer
                        center={userPosition ? [userPosition.lat, userPosition.lng] : [51.505, -0.09]}
                        zoom={10}
                        style={{ width: '50rem', height: '30rem' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            draggable={draggable}
                            eventHandlers={eventHandlers}
                            position={userPosition ? [userPosition.lat, userPosition.lng] : [51.505, -0.09]}
                            ref={markerRef}
                        >
                            <Popup minWidth={90}>
                                <span
                                    onClick={toggleDraggable}
                                >
                                    {draggable
                                        ? 'Marker is draggable'
                                        : 'Click here to make marker draggable'}
                                </span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                    : <div class="d-flex justify-content-center my-5 py-5">
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default Input;