import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { formInfo } from "../../context/context";
import Checkbox from "@mui/material/Checkbox";
import { secformInfo } from "../../context/context";
import { inputContext } from "../../context/context";
import { useEffect } from "react";
import { checkedInputs } from "../../context/context";
import axios from "axios";

const TableComp = () => {
  const { setProducts } = useContext(formInfo);
  const { indexVal } = useContext(secformInfo);
  const { setIndexVal } = useContext(secformInfo);
  const { isSecOpen } = useContext(secformInfo);
  const { setSecOpen } = useContext(secformInfo);
  const { inputVal } = useContext(inputContext);
  const { products } = useContext(formInfo);
  const { filteredResults } = useContext(inputContext);
  const { setFilteredResults } = useContext(inputContext);
  const headers = {
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
  };
  const HandleDubbleClick = (e, index) => {
    setIndexVal(index);
    setSecOpen(!isSecOpen);
    console.log(e);
    console.log(index);
  };
  const RenderAllproducts = () => {
    return (
      <TableBody>
        {products.map((product, index) => (
          <TableRow
            className="data-row"
            key={index}
            onDoubleClick={(e) => HandleDubbleClick(e, index)}
          >
            <TableCell component="th" scope="row">
              <Checkbox
                checked={product.checkbox}
                onClick={async (e) => {
                  await axios.patch(
                    `http://localhost:3007/products/${product._id}`,
                    {
                      checkbox: !product.checkbox,
                    },
                    headers
                  );
                  const getProducts = await axios.get(
                    `http://localhost:3007/products`,
                    headers
                  );
                  setProducts(getProducts.data.data);

                  console.log(getProducts);
                }}
              />
              <img className="data-image " src={product.image} />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.mpns}</TableCell>
            <TableCell>{product.manifactuler}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const RenderFilteredProdcuts = () => {
    return (
      <TableBody>
        {filteredResults.map((product, index) => (
          <TableRow
            className="data-row"
            key={index}
            onDoubleClick={(e) => HandleDubbleClick(e, index)}
          >
            <TableCell component="th" scope="row">
              <Checkbox
                checked={product.checkbox}
                onClick={async (e) => {
                  await axios.patch(
                    `http://localhost:3003/products/${product._id}`,
                    {
                      checkbox: !product.checkbox,
                    },
                    headers
                  );
                  const checkPorducts = await axios.post(
                    `http://localhost:3007/products/search`,
                    {
                      name: inputVal,
                    },
                    headers
                  );
                  setFilteredResults(checkPorducts.data.response);
                }}
              />
              <img className="data-image " src={product.image} />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.mpns}</TableCell>
            <TableCell>{product.manifactuler}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };
  const ShowProducts = () => {
    return inputVal.length > 1 ? RenderFilteredProdcuts() : RenderAllproducts();
  };
  return (
    <div>
      <Paper className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>image</TableCell>
              <TableCell>name</TableCell>
              <TableCell>mpns</TableCell>
              <TableCell>manifactuler</TableCell>
            </TableRow>
          </TableHead>
          {ShowProducts()}
        </Table>
      </Paper>
    </div>
  );
};
export default TableComp;
