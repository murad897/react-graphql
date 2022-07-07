import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { formInfo } from "../../context/context";
import { secformInfo } from "../../context/context";
import axios from "axios";
const SecPopup = () => {
  const { products } = useContext(formInfo);
  const { setProducts } = useContext(formInfo);
  const { setSecOpen } = useContext(secformInfo);
  const { indexVal } = useContext(secformInfo);
  const [state, setState] = useState(products[indexVal]);
  console.log(state._id);
  const headers = {
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  console.log(state);
  const Closemodal = () => {
    setSecOpen(false);
  };
  const PopupSubmitEvent = async () => {
    try {
      await axios.patch(
        `http://localhost:3007/products/${state._id}`,
        {
          image: state.image,
          name: state.name,
          mpns: state.mpns,
          manifactuler: state.manifactuler,
          checkbox: state.checkbox,
        },
        headers
      );
    } catch (err) {
      console.log(err);
    } finally {
      const getProducts = await axios.get(`http://localhost:3007/products`, headers);

      const { data } = getProducts.data;
      console.log(data, "hhhhh");
      setProducts(data);
    }

    console.log(state._id, "fsdfsd");
  };
  const updateObjectData = () => {
    products[indexVal] = state;
    setProducts((prevState) => [...prevState]);
  };
  console.log(products);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Box sx={style}>
        <form className="popup-model">
          <div className="popup-model-item">
            <label htmlFor="image">Image</label>
            <div className="input-style">
              <input
                type="text"
                name="image"
                placeholder="HTTP LINK...."
                value={state.image}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="popup-model-item">
            <label htmlFor="name">Name</label>
            <div className="input-style">
              <input
                type="text"
                name="name"
                placeholder="Name...."
                value={state.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="popup-model-item">
            <label htmlFor="mpns">MPNS</label>
            <div className="input-style">
              <input
                type="text"
                name="mpns"
                placeholder="Mpns...."
                value={state.mpns}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="popup-model-item">
            <label htmlFor="manifactuler">Manifactuler</label>
            <div className="input-style">
              <input
                type="text"
                name="manifactuler"
                placeholder="Manifactuler...."
                value={state.manifactuler}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            className="submit-button"
            variant="contained"
            onClick={(e) => {
              Closemodal(), updateObjectData();
              PopupSubmitEvent();
            }}
          >
            Submit
          </Button>
          <Button className="close-modal-button" variant="contained" onClick={Closemodal}>
            Close modal
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default SecPopup;