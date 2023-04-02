import "./home.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CovidChart from "../../Chart/chart"
export default () => {
  let [country, setCountry] = useState([]);
  let [value, setValue] = useState();
  let [data, setData] = useState({
    'Total Cases_text':"0",
    'Total Recovered_text':'0',
    'Total Deaths_text':'0'
});
let cntryName = value;
    console.log(cntryName);

    let resp;

    const FetchCovidData = async () =>{
      try {
        if (cntryName) {
          resp = await axios.get('https://covid-19.dataflowkit.com/v1/' + cntryName + '');
      }
      else {
          resp = await axios.get('https://covid-19.dataflowkit.com/v1/all');
      }

      setData(resp.data);
      } catch (error) {
        console.log(error);
      }

}

useEffect(() => {
  FetchCovidData()
}, [cntryName]);

  const FetchCountry = async () => {
    try {
      let resp = await axios.get("https://restcountries.com/v3.1/all");
      setCountry(resp.data);
    } catch (error) {
      console.log(error);
    };
  };
  useEffect(function () {
    FetchCountry();
  }, []);

  const countryName = (element) => {
    let getCountryName = element.target.value
    setValue(getCountryName);

  }
  return <>
    <div className="main-div">
      <div className="detail-div M-1">
        <h3 className="text">Cases</h3>
      {data?<h3 className="num-text">{data['Total Cases_text']} </h3>:<p>No Data Available</p>}
      </div>
      <div className="detail-div M-2">
        <h3 className="text">Deaths</h3>
      {data?<h3 className="num-text">{data['Total Deaths_text']} </h3>:<p>No Data Available</p>}
      </div>
      <div className="detail-div M-3">
        <h3 className="text">Recovered</h3>
        {data?<h3 className="num-text">{data['Total Recovered_text']} </h3>:<p>No Data Available</p>}
      </div>
    </div>
    <br />
    <div className="selecter-main">
      <div className="selecter-tag">
        <select onChange={countryName}>
          <option>World</option>
          {
            country.map(function (country) {
              return <option>{country.name.common}</option>

            })
          }
        </select>
      </div>
    <CovidChart data={data} />
    </div>


  </>
}