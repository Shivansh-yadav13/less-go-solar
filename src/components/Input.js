import React, { useEffect, useState } from 'react';
import Map from './Map';
import './Input.css';


function Input() {
    const [solarData, setSolarData] = useState();
    const [userLat, setUserLat] = useState()
    const [userLong, setUserLong] = useState()

    console.log(solarData);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            setUserLong(position.coords.longitude)
            setUserLat(position.coords.latitude)
            const getData = async () => {
                const solarData = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${process.env.REACT_APP_API_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                const parsedSolarData = await solarData.json()
                setSolarData(parsedSolarData)
            }
            getData()
        }, (error) => {
            console.log(error)
        });

    }, [])
    return (
        <>
            <div class="input-group mb-3" id="cost">
                <span class="input-group-text">
                    <b>Electricty Cost:</b>
                </span>
                {/* <!-- <span class="input-group-text">$</span> --> */}
                <input type="text" min="0" max="100" step="any" class="form-control" maxlength="3" size="4" />
                <span class="input-group-text">.00</span>
                <select class="form-select" aria-label="Default select example" id="currency">
                    <option value="USD" selected="selected">United States Dollars</option>
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
                <span class="input-group-text">per KWh</span>
                <div>
                </div>
            </div>
            {userLat ? <Map userLat={userLat} userLong={userLong}/> : ""}
            <div class="input-group mb-3">
                <span class="input-group-text">
                    <b>Area covered by solar panels:</b>
                </span>
                {/* <!-- <span class="input-group-text">$</span> --> */}
                <input type="text" min="0" max="100" step="any" class="form-control" maxlength="19" />
                <select class="form-select" aria-label="Default select example" id="currency">
                    <option value="USD" selected="selected">Square meter</option>
                    <option value="ZMK">Square kilometer</option>
                    <option value="ZMK">Square mile</option>
                    <option value="ZMK">Square foot</option>
                    <option value="ZMK">Square inch</option>
                    <option value="ZMK">Hecatre</option>
                    <option value="ZMK">Acre</option>
                </select>
                <div>
                </div>
            </div>

            <span class="input-group-text" id="range"><b>Time: 1 Year</b>
                <input type="range" class="form-range" id="customRange1" />
            </span>
        </>
    )
}

export default Input;