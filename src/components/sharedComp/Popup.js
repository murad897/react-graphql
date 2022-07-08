import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { PopupContext } from "../../context/context";
import { useContext } from "react";
import { formInfo } from "../../context/context";
import axios from "axios";
import { CREATE_PRODUCT } from "../../mutations/User";
import { useMutation, useQuery } from "@apollo/client";

const Popup = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { setProducts } = useContext(formInfo);
  const { setOpen } = useContext(PopupContext);
  const handleOpen = () => setOpen(false);
  const handleProduct = () => {
    setProducts((prevState) => [...prevState, formData]);
  };

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    mpns: "",
    product: "",
    manifactuler: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // const handleProduct = () => setProducts((prevState) => [...prevState, formData]);
  const PopupSubmitEvent = (e) => {
    e.preventDefault();
    setOpen(false);
    createProduct({
      variables: {
        input: {
          image: formData.image,
          name: formData.name,
          mpns: formData.mpns,
          manifactuler: formData.manifactuler,
          checkbox: false,
        },
      },
    }).then(({ data }) => {
      console.log(data, "data");
    });
  };

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
                value={formData.image}
                type="text"
                name="image"
                placeholder="HTTP LINK...."
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="popup-model-item">
            <label htmlFor="name">Name</label>
            <div className="input-style">
              <input
                value={formData.name}
                type="text"
                name="name"
                placeholder="Name...."
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="popup-model-item">
            <label htmlFor="mpns">MPNS</label>
            <div className="input-style">
              <input
                value={formData.mpns}
                type="text"
                name="mpns"
                placeholder="Mpns...."
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="popup-model-item">
            <label htmlFor="manifactuler">Manifactuler</label>
            <div className="input-style">
              <input
                value={formData.manifactuler}
                type="text"
                name="manifactuler"
                placeholder="Manifactuler...."
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            className="submit-button"
            variant="contained"
            onClick={(e) => {
              handleProduct(), handleOpen();
              PopupSubmitEvent(e);
            }}
          >
            Submit
          </Button>
          <Button
            className="close-modal-button"
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            Close modal
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Popup;
