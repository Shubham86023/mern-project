import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ProductService } from "../../Services/ProductService";
import Loader from "../Config/Loader";
import { Link } from "react-router-dom";
import Notify from "../Config/Notify";

const Products = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState("");

  useEffect(() => fetchData, []);

  const fetchData = async () => {
    const response = await ProductService.GetProducts();
    setData(response);
    setLoading(false);
  };

  const deleteProduct = async (uid) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const response = await ProductService.deleteProduct(uid);

      setNotifyMessage("Something went wrong.");
      setNotifyType("danger");
      if (response) {
        setNotifyMessage("Product deleted successfully.");
        setNotifyType("success");
        fetchData();
      }

      setTimeout(() => {
        setNotifyMessage("");
        setNotifyType("");
      }, 3000);
    }
  };

  return (
    <>
      <h1>Product List</h1>
      {notifyType ? <Notify type={notifyType} message={notifyMessage} /> : ""}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.image}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.updatedAt}</td>
                  <td>
                    <Link
                      style={{ marginRight: "10px" }}
                      className="btn btn-primary"
                      to={`/productEdit/${item._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      uid={item._id}
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7"> No Product Found</td>
              </tr>
            )
          ) : (
            <Loader />
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Products;
