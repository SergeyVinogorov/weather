import React, {useCallback, useState, useEffect} from 'react';
import {AppProvider, Icon, Badge, TextField, Card, Autocomplete} from '@shopify/polaris';
import { ThumbUp } from "../icons/ThumbUp";
import { Favorite } from "../icons/Favorite";

import { connect } from "react-redux";
import { addCity, addLikeCity } from "../../actions";

import {CirclePlusMinor} from '@shopify/polaris-icons';
import {SearchMinor} from '@shopify/polaris-icons';

import { getCity } from "../../api/getCity";
import { getWeather } from "../../api/getWeather";
import './Main.scss'



function AutocompleteExample(props) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState([]);
  const [likes, setLikes] = useState([]);



  useEffect(() => {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition((position)=>{
			let params = {
				lat: position.coords.latitude,
				lon: position.coords.longitude
			}
			getWeather(params).then(response=>{
				setWeather([response])
				props.addCity({formatted: response.name})
			}).catch(err => console.log(err));
		});
	  } else {
		console.log("Not Available");
		}
		const likesStorage = JSON.parse(localStorage.getItem('likes'))
		if(likesStorage){
			handlerWeatherLike(likesStorage)
		}
}, [])

	const handlerWeatherLike = (arr) =>{
		arr.forEach(element => {
			let params = {
				lat: element.lat,
				lon: element.lon
			}
			getWeather(params).then(response=>{
				let result = likes.concat([response])
				setLikes(result)
			}).catch(err => console.log(err));
		});
	}

  const updateText = useCallback(
		(value) => {
      setInputValue(value);
      if (value === '') {
        setOptions([]);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = options.filter((option) =>
        option.formatted.match(filterRegex),
      );
			setOptions(resultOptions);
			getCity(inputValue).then((response) => {
				console.log(response);
				setOptions(response.results)
			}, (error) => {
				console.log(error);
			});
    },
    [options],
  );

  const updateSelection = useCallback((selected) => {
		let params = {
			lat: selected.geometry.lat,
			lon: selected.geometry.lng
		}
		getWeather(params).then(response=>{
			setWeather([response])
		}).catch(err => console.log(err));
    props.addCity(selected);
		setInputValue('');
		setOptions([])
  }, []);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Type City"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
    />
	);
	const makeid =(length)=>{
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
	const prepareWeather =(element)=>{
		if(element && element.length){
		return element[0].weather.map((el)=>{
				return (
					<Card key={makeid(5)} title={el.main} sectioned>
						<p>{el.description}</p>
					</Card>
				)
			})
		}
	}
	const handlerLikes =(element)=>{
		let result = element[0]
		props.addLikeCity(result.coord)
	}

  return (
	<AppProvider
	i18n={{
	  Polaris: {
		ResourceList: {
		  sortingLabel: 'Sort by',
		  defaultItemSingular: 'item',
		  defaultItemPlural: 'items',
		  showing: 'Showing {itemsCount} {resource}',
		  Item: {
			viewItem: 'View details for {itemName}',
		  },
		},
		Common: {
		  checkbox: 'checkbox',
		},
	  },
	}}
  >
	  <div className="wrapper">
		<div style={{height: '225px'}}>
		<Autocomplete
			options={options}
			selected={props.selectedCity}
			onSelect={updateSelection}
			textField={textField}
		/>
		<ul className={options.length ? 'cities' : 'hide'}>
			{options && options.map(el=>{
					return ( <li onClick={()=>updateSelection(el)} className="cities__item">{el.formatted}</li> )
				})
			}
		</ul>
		<div className={weather.length ? 'wrapper' : 'hide'}>
				<h2 className="cities__title">{props.selectedCity && props.selectedCity.formatted}</h2>
				<div className="cities__cards">
					{
						weather.length ? prepareWeather(weather) : ""
					}
					<ThumbUp onClick={()=>{handlerLikes(weather)}} className={"cities__icon"}/>
				</div>
		</div>
			<hr className={likes.length ? 'wrapper' : 'hide'}/>
			<div className={likes.length ? 'wrapper' : 'hide'}>
				<h2 className="cities__title">{props.selectedCity && props.selectedCity.formatted}</h2>
				<div className="cities__cards">
					{
						likes.length ? prepareWeather(likes) : ""
					}
					<Favorite className={'cities__icon'}/>
				</div>
			</div>

		</div>
	  </div>
	</AppProvider>
  );
}

export default connect(
  (state)=>{
		const { selectedCity } = state.cities
		const { likeCity } = state.likes
		return { selectedCity, likeCity }
	},
  { addCity, addLikeCity }
)(AutocompleteExample)