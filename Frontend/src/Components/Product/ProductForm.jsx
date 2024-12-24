import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ProductService } from "../../Services/ProductService";
import Notify from "../Config/Notify";
import { useParams } from "react-router-dom";


const ProductForm = () => {
  const [validated, setValidated] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState("");
  const [mode, setMode] = useState("Add");
  const [product, setProduct] = useState({});

  const { uid } = useParams();
  useEffect(() => {
    if (uid !== undefined) {
      setMode("Update");
    }else{
        setMode("Add");
    }
    setProductData(uid);
  }, [uid]);  

  const setProductData = async (uid) => {
    const product = uid ? await ProductService.GetSingleProduct(uid) : null;
    setProduct(product);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Retrieve form data
      const data = new FormData(form);
      const formObject = Object.fromEntries(data.entries()); // Convert to object
      console.log("Form Data:", formObject);

      const product = uid ? await ProductService.updateProduct(uid, formObject) : 
      await ProductService.createProduct(formObject);

      setNotifyMessage(`Product ${mode == 'Add' ? "created" : "updated"} successfully.`);
      setNotifyType("success");
      if (product == null) {
        setNotifyMessage("Something went wrong.");
        setNotifyType("danger");
      }

      setTimeout(() => {
        setNotifyMessage("");
        setNotifyType("");
      }, 3000);
    }

    setValidated(true);
  };

  return (
    <>
      <h1>Product {mode}</h1>
      {notifyType ? <Notify type={notifyType} message={notifyMessage} /> : ""}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              defaultValue={product ? product.name : ""}
              placeholder="Product Name.."
            />
            <Form.Control.Feedback type="invalid">
              Please enter product name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              step="any"
              name="price"
              defaultValue={product ? product.price : ""}
              placeholder="Price.."
            />
            <Form.Control.Feedback type="invalid">
              Please enter some price.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" controlId="validationCustomUsername">
            <Form.Label>Image</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">URL</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Url.."
                name="image"
                defaultValue={product ? product.image : ""}
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter image url.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">{mode == 'Add' ? 'Submit' : "Update"}</Button>
      </Form>
    </>
  );
};

export default ProductForm;
