import React, {useCallback, useState, useEffect} from 'react';
import {AppProvider, Icon, TextField, Autocomplete} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import './Main.scss'

const API_KEY = '8653f462490546669756201aa6a1a708'
const API_URL = 'https://api.opencagedata.com/geocode/v1/json'
export default function AutocompleteExample() {
  const deselectedOptions = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);


  useEffect(() => {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
		  });
	  } else {
		console.log("Not Available");
	  }
}, [])
  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback((selected) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });

    setSelectedOptions(selected);
    setInputValue(selectedValue);
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
			selected={selectedOptions}
			onSelect={updateSelection}
			textField={textField}
		/>
		</div>
	  </div>
	</AppProvider>
  );
}
