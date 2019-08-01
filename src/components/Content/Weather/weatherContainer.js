import * as axios from 'axios';
import React from 'react';
import Weather from './Weather';
import { addFavorite } from '../../../redux/contentReduser';
import { connect } from 'react-redux';
import Autocomplete from "react-autocomplete";
import './weather.css'
import { API_KEY } from '../../../constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class WeatherContainer extends React.Component {

    notify = () => toast("Wow so easy !");

    state = {
        weatherNextFiveDays: [],
        metric: true,
        currentTempMode: 'Metric',
        citySearchLabel: '',
        citySearchOptions: [],
        responseObject: {},
        currentLocation: { cityName: 'Tel Aviv', locationKey: '215854', unit: 'C', temp: '', weatherText: '' },
    };

    handleError(err) {
        toast.error(`OOOpss !  ${err}`, {
            position: toast.POSITION.TOP_LEFT
        });
    };

    
    componentDidMount() {

        let locationKey = this.state.currentLocation.locationKey;

        let favoriteLocationSelected = JSON.parse(window.localStorage.getItem('currentFavoriteSelected'));

        if (favoriteLocationSelected) {
            this.setState({ currentLocation: { cityName: favoriteLocationSelected.cityName } })
        };

        if (favoriteLocationSelected && favoriteLocationSelected.locationKey) {
            locationKey = favoriteLocationSelected.locationKey;
        };


        axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true `)
            .then(res => {

                let responseObject = res.data;

                this.setState({
                    responseObject: responseObject,
                    currentLocation: {
                        cityName: this.state.currentLocation.cityName,
                        locationKey: this.state.currentLocation.locationKey,
                        temp: responseObject[0].Temperature.Metric.Value,
                        unit: responseObject[0].Temperature.Metric.Unit,
                        weatherText: responseObject[0].WeatherText,
                    }
                })
            }).catch(err => this.handleError(err))

        axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&details=true&metric=${this.state.metric}`)
            .then(res => {

                let fivedaysSelected = res.data.DailyForecasts;
                let days = [];

                for (let i = 0; i < fivedaysSelected.length; i++) {
                    let day = {};
                    day.date = fivedaysSelected[i].Date;
                    day.min = fivedaysSelected[i].Temperature.Minimum.Value;
                    day.max = fivedaysSelected[i].Temperature.Maximum.Value;
                    day.unit = fivedaysSelected[i].Temperature.Maximum.Unit;
                    days.push(day);
                };
                this.setState({ weatherNextFiveDays: days });
            }).catch(err => this.handleError(err))
    };


    handleTempModeChange(newTempMode) {
        if (this.state.currentTempMode !== newTempMode) {
            let temp = this.state.responseObject[0].Temperature[newTempMode].Value;
            let unit = this.state.responseObject[0].Temperature[newTempMode].Unit;

            this.setState({
                currentTempMode: newTempMode,
                metric: newTempMode === 'Metric',
                currentLocation: {
                    temp: temp,
                    unit: unit,
                    cityName: this.state.currentLocation.cityName,
                    locationKey: this.state.currentLocation.locationKey,
                    weatherText: this.state.currentLocation.weatherText,
                }
            })
            
            axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.currentLocation.locationKey}?apikey=${API_KEY}&details=true&metric=${newTempMode === 'Metric'}`)
                .then(res => {
                    let fivedaysSelected = res.data.DailyForecasts;

                    let days = [];

                    for (let i = 0; i < fivedaysSelected.length; i++) {
                        let day = {};
                        day.date = fivedaysSelected[i].Date;
                        day.min = fivedaysSelected[i].Temperature.Minimum.Value;
                        day.max = fivedaysSelected[i].Temperature.Maximum.Value;
                        day.unit = fivedaysSelected[i].Temperature.Maximum.Unit;
                        days.push(day);
                    }
                    this.setState({ weatherNextFiveDays: days });
                    
                }).catch(err => this.handleError(err))
        };
    };


    citiesSearch = (searchText) => {
        searchText = searchText.replace(/[^A-Za-z]/ig, '')

        this.setState({ citySearchLabel: searchText })

        if (searchText && searchText.length) {

            axios.get(`https://dataservice.accuweather.com//locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchText} `)
                .then(res => {
                    let weatherData = res.data;;

                    let tempArray = [];

                    for (let i = 0; i < weatherData.length; i++) {
                        let city = {};
                        city.name = weatherData[i].LocalizedName;
                        city.label = `${weatherData[i].LocalizedName} , ${weatherData[i].Country.LocalizedName} .`
                        city.key = weatherData[i].Key

                        tempArray.push(city);
                    }
                    this.setState({ citySearchOptions: tempArray })
                }).catch(err => this.handleError(err))
        }
    };


    weatherSearch(val) {
        let selectedCity = this.state.citySearchOptions.find((city) => city.label === val);

        axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${selectedCity.key}?apikey=${API_KEY}&details=true `)
            .then(res => {
                let responseObject = res.data;
                window.localStorage.clear();

                this.setState({
                    responseObject: responseObject,
                    currentLocation: {
                        cityName: selectedCity.name,
                        locationKey: selectedCity.key,
                        temp: responseObject[0].Temperature.Metric.Value,
                        unit: responseObject[0].Temperature.Metric.Unit,
                        weatherText: responseObject[0].WeatherText,
                    }
                })
            }).catch(err => this.handleError(err))

        axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.key}?apikey=${API_KEY}&details=true&metric=${this.state.metric}`)
            .then(res => {

                let fivedaysSelected = res.data.DailyForecasts;
                let days = [];

                for (let i = 0; i < fivedaysSelected.length; i++) {
                    let day = {};
                    day.date = fivedaysSelected[i].Date;
                    day.min = fivedaysSelected[i].Temperature.Minimum.Value;
                    day.max = fivedaysSelected[i].Temperature.Maximum.Value;
                    day.unit = fivedaysSelected[i].Temperature.Maximum.Unit;
                    days.push(day);
                }
                this.setState({ weatherNextFiveDays: days });

            }).catch(err => this.handleError(err))
    };


    render() {
        return <div className='weather_page' >
            <ToastContainer />

            <div className='search_wrapper'>

                <div className="weather_page_searchwrapper">
                    <h5>Search </h5>

                    <Autocomplete
                        getItemValue={(item) => item.label}
                        items={this.state.citySearchOptions}

                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.label}
                            </div>
                        }
                        value={this.state.citySearchLabel}
                        onChange={(e) => this.citiesSearch(e.target.value)}
                        onSelect={(val) => this.weatherSearch(val)}

                    />
                </div>
            </div>

            <div className='weather_wrapper'>

                <div className='metric_btn'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.handleTempModeChange('Imperial') }}>Imperial ( F ) </button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.handleTempModeChange('Metric') }}>Metric ( C )</button>
                </div>

                <div className='weather'>
                    <Weather
                        cityName={this.state.currentLocation.cityName}
                        temp={this.state.currentLocation.temp}
                        unit={this.state.currentLocation.unit}
                        weatherText={this.state.currentLocation.weatherText}
                        currentLocation={this.state.currentLocation}
                        weatherNextFiveDays={this.state.weatherNextFiveDays}
                        favorites={this.props.favorites}
                        addFavorite={this.props.addFavorite}
                    />
                </div>

            </div>


        </div>
    };
};

let mapStateToProps = (state) => {
    return {
        favorites: state.content.favorites
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (currentLocation) => { dispatch(addFavorite(currentLocation)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);

