import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Navigation from "./Navigation";
import { PopupContext } from "../../context/context";
import { useContext } from "react";
import { formInfo } from "../../context/context";
import { useRouter } from "next/router";
import axios from "axios";
import { inputContext } from "../../context/context";
import { checkedInputs } from "../../context/context";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { filteredResults } = useContext(inputContext);
  const { setFilteredResults } = useContext(inputContext);
  const { inputVal } = useContext(inputContext);
  const { products } = useContext(formInfo);
  const { setInputVal } = useContext(inputContext);
  console.log(inputVal);
  const { setOpen } = useContext(PopupContext);
  const { setProducts } = useContext(formInfo);
  const handleOpen = () => setOpen(true);
  console.log(inputValue);
  const { checkedInput, setCheckedInputs } = useContext(checkedInputs);
  const headers = {
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
  };
  let array = [];
  let secArray = [];
  const getDataGlobally = async () => {
    const getProducts = await axios.get(
      `http://localhost:3007/products`,
      headers
    );
    setProducts(getProducts.data.data);
  };
  const getFilteredData = async () => {
    const checkPorducts = await axios.post(
      `http://localhost:3007/products/search`,
      {
        name: inputVal,
        id: inputVal,
      },
      headers
    );
    const filteredSearch = () => {
      return checkPorducts.data.response.filter((element) => {
        return element.checkbox !== true;
      });
    };
    console.log(filteredSearch());

    setFilteredResults(filteredSearch());
  };

  const handleDelete = async () => {
    try {
      products.forEach((element) => {
        if (element.checkbox) {
          array.push(element._id);
          axios.delete(
            `http://localhost:3007/products/delete/${array}`,
            headers
          );
          getDataGlobally();
        }
        console.log(array, "created array by me");
      });
    } catch (err) {
      console.log(err);
    } finally {
      array = [];
    }
  };

  const handleDeleteSec = async () => {
    console.log("cliekd");
    try {
      filteredResults.forEach((element) => {
        if (element.checkbox) {
          secArray.push(element._id);
          axios.delete(
            `http://localhost:3007/products/delete/${secArray}`,
            headers
          );
          getFilteredData();
        }
        console.log(array, "created array by me");
      });
    } catch (err) {
      console.log(err);
    } finally {
      secArray = [];
    }
  };

  const onchangeHandler = async () => {
    const checkPorduct = await axios.post(
      `http://localhost:3007/products/search`,
      {
        name: inputVal,
      },
      headers
    );
    setFilteredResults(checkPorduct.data.response);
    const getProducts = await axios.get(
      `http://localhost:3007/products`,
      headers
    );
    setProducts(getProducts.data.data);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setInputVal("");
  };
  return (
    <div className="header-container">
      <div className="header-container-inner">
        {/* left section */}
        <div className="header-container-left-section">
          {/* test */}
          {/* test */}
          <div className="header-logo-image">
            <img src="https://uploads-ssl.webflow.com/60e4d26b0e81b6e753fac886/60e4d26b0e81b62be5fac9b8_partsapp-logo.svg" />
          </div>
          {/* search input*/}
          <div className="header-search-input">
            <form onSubmit={formSubmit}>
              <input
                type="search"
                placeholder="Browse prodcuts"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  onchangeHandler();
                }}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
        {/* right section */}
        <div className="header-container-right-section">
          <div className="header-create-button">
            <Button variant="contained" color="success" onClick={logoutHandler}>
              logout
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete();
                handleDeleteSec();
              }}
            >
              Delete all
            </Button>
            <Button variant="contained" color="success" onClick={handleOpen}>
              Create
            </Button>
          </div>
          <Navigation />
        </div>
      </div>
    </div>
  );
};
export default Header;