import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { PopupContext } from "../../context/context";
import { useContext } from "react";
import { formInfo } from "../../context/context";
import axios from "axios";

const Popup = () => {
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
    axios
      .post(
        "http://localhost:3007/products/create",
        {
          image: formData.image,
          name: formData.name,
          mpns: formData.mpns,
          manifactuler: formData.manifactuler,
          checkbox: false,
        },
        {
          headers: {
            Authorization: `baerer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const items = res.data.data;
        setProducts((array) => [...array, items]);
        axios
          .get(`http://localhost:3007/products`, {
            headers: {
              Authorization: `baerer ${localStorage.getItem("token")}`,
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
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
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