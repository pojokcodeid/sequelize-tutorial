import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addKontak,
  getContactList,
  updateKontak,
} from "../features/contactSlice";

function ContackForm(props) {
  const dataAdd = useSelector((state) => state.contact.dataAdd);
  const dataVal = useSelector((state) => state.contact.dataVal);
  const dataUpdate = useSelector((state) => state.contact.dataUpdate);
  const loading = useSelector((state) => state.contact.loading);
  const errorAdd = useSelector((state) => state.contact.errorAdd);
  const errorEdit = useSelector((state) => state.contact.errorEdit);
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      addressType: "",
      street: "",
      city: "",
      province: "",
      country: "",
      zipCode: "",
    },
  ]);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Addresses: data,
  });

  const handleClick = () => {
    setData([
      ...data,
      {
        addressType: "",
        street: "",
        city: "",
        province: "",
        country: "",
        zipCode: "",
      },
    ]);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputData.Addresses = data;
    if (inputData.contactId) {
      console.log("Process Update");
      dispatch(updateKontak(inputData));
    } else {
      console.log("Process Add");
      console.log(inputData);
      dispatch(addKontak(inputData));
    }
  };

  useEffect(() => {
    if (dataAdd) {
      Swal.fire({
        title: "Success !",
        text: dataAdd.message,
        icon: "success",
      });
      dispatch(getContactList());
      setData([
        {
          addressType: "",
          street: "",
          city: "",
          province: "",
          country: "",
          zipCode: "",
        },
      ]);
      setInputData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        Addresses: [],
      });
    }
    if (errorAdd) {
      Swal.fire({
        title: "Gagal !",
        text: errorAdd,
        icon: "error",
      });
    }
  }, [dataAdd, errorAdd, dispatch]);

  useEffect(() => {
    if (dataVal) {
      setData(
        dataVal.Addresses.map((item) => {
          return {
            addressType: item.addressType,
            street: item.street,
            city: item.city,
            province: item.province,
            country: item.country,
            zipCode: item.zipCode,
          };
        })
      );
      setInputData({
        ...dataVal,
      });
    }
  }, [dataVal]);

  useEffect(() => {
    if (dataUpdate) {
      Swal.fire({
        title: "Success !",
        text: dataUpdate.message,
        icon: "success",
      });
      dispatch(getContactList());
      setData([
        {
          addressType: "",
          street: "",
          city: "",
          province: "",
          country: "",
          zipCode: "",
        },
      ]);
      setInputData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        Addresses: [],
      });
    }
    if (errorEdit) {
      Swal.fire({
        title: "Gagal !",
        text: errorEdit,
        icon: "error",
      });
    }
  }, [dataUpdate, errorEdit, dispatch]);

  useEffect(() => {
    if ((!loading && dataUpdate) || (!loading && dataAdd)) {
      props.onHide();
    }
  }, [loading, dataUpdate, props, dataAdd]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {inputData.contactId ? "Update Contact" : "Add Contact"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="firstName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="firstName"
                type="text"
                value={inputData.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setInputData({ ...inputData, firstName: e.target.value })
                }
              />
            </Col>
            <Col sm="4">
              <Form.Control
                name="lastName"
                type="text"
                value={inputData.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                  setInputData({ ...inputData, lastName: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="email"
                type="email"
                value={inputData.email}
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="phone">
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="phone"
                type="text"
                value={inputData.phone}
                onChange={(e) =>
                  setInputData({ ...inputData, phone: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleClick}
                >
                  Add
                </button>
              </div>
            </div>
            {data.map((val, i) => (
              <div key={i} className="mt-3 border p-2 rounded">
                <div>
                  <h6>Addess {i + 1}</h6>
                </div>
                <div className="row mt-2">
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      name="addressType"
                      placeholder="Rumah, Kantor, dll"
                      value={val.addressType}
                      onChange={(e) => handleChange(e, i)}
                      title="Rumah, Kantor, dll"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      placeholder="Jl. Jalan no 123 ...."
                      value={val.street}
                      onChange={(e) => handleChange(e, i)}
                      title="Jl. Jalan no 123 ...."
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      value={val.city}
                      onChange={(e) => handleChange(e, i)}
                      title="City"
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      name="province"
                      placeholder="Province"
                      value={val.province}
                      onChange={(e) => handleChange(e, i)}
                      title="Province"
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Country"
                      value={val.country}
                      onChange={(e) => handleChange(e, i)}
                      title="Country"
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={val.zipCode}
                      onChange={(e) => handleChange(e, i)}
                      title="Zip Code"
                    />
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(i)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <p>{JSON.stringify(data)}</p> */}
          <Button variant="primary btn-sm mt-3" type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

ContackForm.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default ContackForm;
