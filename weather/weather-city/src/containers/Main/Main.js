import React, { useCallback, useState, useEffect } from 'react'
import { connect } from "react-redux"

import { AppProvider, Icon, Autocomplete } from '@shopify/polaris'
import { Weather } from '../../components/Weather'
import { addCity, addLikeCity, deleteLikeCity } from '../../actions'
import { getCity, getWeather } from '../../api'

import { SearchMinor } from '@shopify/polaris-icons'
import './Main.scss'

function AutocompleteExample({
    addCity,
    addLikeCity,
    likeCity,
    selectedCity,
    deleteLikeCity,
}) {
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const [weather, setWeather] = useState([])
    const [likes, setLikes] = useState([])

	useEffect(() => {
			if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition((position) => {
							let params = {
									lat: position.coords.latitude,
									lon: position.coords.longitude,
							}
							getWeather(params)
									.then((response) => {
											setWeather([response])
											addCity({ formatted: response.name })
									})
									.catch((err) => console.log(err))
					})
			} else {
					console.log('Not Available')
			}
			const storage = localStorage.getItem('likes')
			if (storage) {
					const likesStorage = JSON.parse(storage)
					handlerWeatherLike(likesStorage)
					handlerLikes(likesStorage)
					likesStorage.forEach((el) => {
							addLikeCity(el)
					})
			}
	}, [])
    useEffect(() => {
			if (likeCity.length) {
        handlerWeatherLike(likeCity)
			}else{
				setLikes([])
			}
    }, [likeCity])

    const handlerWeatherLike = async (arr) => {
        if (arr && arr.length && arr[0] !== undefined && arr[0] !== null) {
            let allPromises = []
            await arr.forEach((element) => {
                let params = {
                    lat: element.lat,
                    lon: element.lon,
                }
                allPromises.push(
                    getWeather(params).then((response) => {
                        return response
                    })
                )
            })
            Promise.all(allPromises).then((values) => {
                setLikes(values)
            })
        }
    }

    const updateText = useCallback(
        (value) => {
            setInputValue(value)
            if (value === '') {
                setOptions([])
                return
            }
            const filterRegex = new RegExp(value, 'i')
            const resultOptions = options.filter((option) =>
                option.formatted.match(filterRegex)
            )
            setOptions(resultOptions)
            getCity(inputValue).then(
                (response) => {
                    setOptions(response.results)
                },
                (error) => {
                    console.log(error)
                }
            )
        },
        [options]
    )

    const updateSelection = useCallback((selected) => {
        let params = {
            lat: selected.geometry.lat,
            lon: selected.geometry.lng,
        }
        getWeather(params)
            .then((response) => {
                setWeather([response])
            })
            .catch((err) => console.log(err))
        addCity(selected)
        setInputValue('')
        setOptions([])
    }, [])

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Type City"
        value={inputValue}
        prefix={<Icon source={SearchMinor} color="inkLighter" />}
        placeholder="Search"
      />
    )

    const handlerLikes = (element) => {
        let result = element[0]
        addLikeCity(result.coord)
		}
		const handlerDeleteLikes = (element) => {
						deleteLikeCity(element.coord)
				}

    return (
      <AppProvider>
        <div className="wrapper">
          <div className="cities__wrapper">
            <div className="cities__input">
              <Autocomplete
                options={options}
                selected={selectedCity}
                onSelect={updateSelection}
                textField={textField}
              />
            </div>
            <ul className={options.length ? 'cities' : 'hide'}>
              {options &&
                options.map((el) => {
                  return (
                    <li
                      onClick={() => updateSelection(el)}
                      className="cities__item"
                    >
                      {el.formatted}
                    </li>
                  )
                })}
            </ul>

            <Weather
              element={weather}
              weather={weather}
              isLike={false}
              handlerLikes={handlerLikes}
            />
            <hr className={likes.length ? 'wrapper' : 'hide'} />
            <h1 className={likes.length ? 'cities__heading' : 'hide'}>Liked City</h1>
            <div className="container">
              <Weather
                element={likes}
                isLike={true}
                handlerDeleteLikes={handlerDeleteLikes}
              />
            </div>
          </div>
        </div>
      </AppProvider>
    )
}
const mapStateToProps = (state) => {
    let city = state.cities.selectedCity
    let like = state.likes.likeCity
    return { selectedCity: city, likeCity: like }
}
function mapDispatchToProps(dispatch) {
    return {
        addCity: (e) => dispatch(addCity(e)),
        addLikeCity: (e) => dispatch(addLikeCity(e)),
        deleteLikeCity: (e) => dispatch(deleteLikeCity(e)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteExample)
