'use client'
import {useState, useEffect} from 'react';
import { removeAccents } from '@/lib/utils';
import {City} from '../lib/types'

export default function useCities () {
    const [selectedCity, setSelectedCity] = useState("");
    const [citiesObj, setCitiesObj] = useState([]);
    const cityNames = citiesObj.map((city: City) => {
        return { name: city.name, normalizedName: removeAccents(city.name) };
    });

    const getCities = async () => {
        const response = await fetch("http://localhost:3000/api/cities-get");
        const data = await response.json();
        setCitiesObj(data);
    };
    useEffect(() => {
        getCities();
    }, []);

    return {selectedCity, setSelectedCity, citiesObj, setCitiesObj, cityNames, getCities};

}