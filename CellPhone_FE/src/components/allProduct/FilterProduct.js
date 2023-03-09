import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
  filterProductByPrice,
} from "../../actions/ProductAction";
import { formatPrice } from "../../untils/index";
import FilterMenu from "./FilterMenu/FilterMenu";


function FilterProduct(props) {
  const dispatch = useDispatch();
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  
  const FilterProductByPrice =  (a, b) => {
    let startPrice = parseInt(a);
    let endPrice = parseInt(b);
    //console.log(formatPrice(startPrice));
    dispatch(filterProductByPrice(startPrice, endPrice));
  };

  

  return (
    <div className="filter">
      <FilterMenu></FilterMenu>
      
      <div className="options-price">
        <input
          type="number"
          id="priceStart"
          placeholder="đ TỪ"
           onKeyPress={(e) => {if(!e.key.match(/[a-zA-Z0-9]/)) e.preventDefault()}}  
          onChange={(e) => setStartPrice(formatPrice)}
        ></input>
      
        <input
          type="number"
          id="priceEnd"
          placeholder="đ ĐẾN"
          onKeyPress={(e) => {if(!e.key.match(/[a-zA-Z0-9]/)) e.preventDefault()}}  
          onChange={(e) => setEndPrice(e.target.value)}
        ></input>
        <button onClick={() => FilterProductByPrice(startPrice, endPrice)}>
          Tìm
        </button>
      </div>
    </div>
  );
}

export default FilterProduct;