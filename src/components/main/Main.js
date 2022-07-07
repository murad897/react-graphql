import Header from "../header/Header";
import React, { useEffect } from "react";
import Popup from "../sharedComp/Popup";
import { PopupContext } from "../../context/context";
import { formInfo } from "../../context/context";
import { useState } from "react";
import TableComp from "../table/Table";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { secformInfo } from "../../context/context";
import SecPopup from "../sharedComp/SecPopup";
import axios from "axios";
import { inputContext } from "../../context/context";
import { checkedInputs } from "../../context/context";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [isSecOpen, setSecOpen] = useState(false);
  const [indexVal, setIndexVal] = useState(null);
  const [products, setProducts] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [checkedInput, setCheckedInputs] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3007/products`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const items = res.data.data;
        console.log(items, "hhhhh");
        setProducts(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page-container">
      <PopupContext.Provider value={{ open, setOpen }}>
        <formInfo.Provider value={{ products, setProducts }}>
          <secformInfo.Provider value={{ indexVal, setIndexVal, isSecOpen, setSecOpen }}>
            <inputContext.Provider
              value={{
                inputVal,
                setInputVal,
                filteredResults,
                setFilteredResults,
              }}
            >
              <checkedInputs.Provider value={{ checkedInput, setCheckedInputs }}>
                <Header />
                {open ? <Popup /> : ""}
                <TableComp />
                {isSecOpen ? <SecPopup /> : ""}
              </checkedInputs.Provider>
            </inputContext.Provider>
          </secformInfo.Provider>
        </formInfo.Provider>
      </PopupContext.Provider>
    </div>
  );
};

export default Main;
