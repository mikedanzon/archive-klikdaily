import './App.scss';
import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState([]);
  const [detailName, setDetailName] = useState('');
  const [detailDist, setDetailDist] = useState('');
  const [detailPay, setDetailPay] = useState('');
  const [detailExp, setDetailExp] = useState('');
  const [detailNotes, setDetailNotes] = useState('');
  const [inputFields, setInputFields] = useState([
    {
      prodName: '',
      prodUnit: '',
      qty: null,
      price: null,
      totalPrice: null,
    },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `http://dummy.restapiexample.com/api/v1/employees`
      );
      setData(res.data.data);
      console.log(res);
    } catch (err) {
      toast.error(`${err}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    totalCalc();
  }, [inputFields]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'prodName') {
      values[index].prodName = event.target.value;
    } else if (event.target.name === 'prodUnit') {
      values[index].prodUnit = event.target.value;
    } else if (event.target.name === 'qty') {
      values[index].qty = event.target.value;
      totalPriceCalc(index);
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
      totalPriceCalc(index);
    }
    setInputFields(values);
  };

  const totalPriceCalc = (index) => {
    const values = [...inputFields];
    values[index].totalPrice = values[index].qty * values[index].price;
    setInputFields(values);
  };

  const totalCalc = () => {
    let total = 0;
    for (let i = 0; i < inputFields.length; i++) {
      total += inputFields[i].totalPrice;
    }
    setTotal(total);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      prodName: '',
      prodUnit: '',
      qty: null,
      price: null,
      totalPrice: null,
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const checkProduct = () => {
    for (let i = 0; i < inputFields.length; i++) {
      if (
        !inputFields[i].prodName ||
        !inputFields[i].prodUnit ||
        !inputFields[i].qty ||
        !inputFields[i].price
      ) {
        return false;
      }
    }
    return true;
  };

  const onHandleClick = () => {
    toast.success('Success!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app-wrapper">
        <div className="order-wrapper">
          <div className="order-content">Create Order</div>
          <div className="content-wrapper">
            <div className="content-details">
              <div className="details-left">Detail</div>
              <div className="details-right">
                <div className="d-name">
                  Name<span className="color-red">*</span>
                </div>
                <div className="d-name-list">
                  <select
                    onChange={(e) => setDetailName(e.target.value)}
                    style={detailName ? { color: 'black' } : { color: 'grey' }}
                  >
                    <option value="" disabled selected hidden>
                      Name
                    </option>
                    {data.map((val) => (
                      <option value={val.employee_name}>
                        {val.employee_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-dist">
                  Distribution Center<span className="color-red">*</span>
                </div>
                <div className="d-dist-list option-style">
                  {detailName ? (
                    <select
                      onChange={(e) => setDetailDist(e.target.value)}
                      style={
                        detailDist ? { color: 'black' } : { color: 'grey' }
                      }
                    >
                      <option value="" disabled selected hidden>
                        Distribution Center
                      </option>
                      <option value="tangerang">DC Tangerang</option>
                      <option value="cikarang">DC Cikarang</option>
                    </select>
                  ) : (
                    <select
                      onChange={(e) => setDetailDist(e.target.value)}
                      style={
                        detailDist ? { color: 'black' } : { color: 'grey' }
                      }
                    >
                      <option value="" disabled selected hidden>
                        Distribution Center
                      </option>
                      <option value="">No data available</option>
                    </select>
                  )}
                </div>
                <div
                  className="d-pay"
                  style={
                    detailName && detailDist
                      ? { display: 'flex' }
                      : { display: 'none' }
                  }
                >
                  <div className="d-pay-left">
                    <div className="d-pay-left-text">
                      Payment Type<span className="color-red">*</span>
                    </div>
                    <div className="d-pay-left-list">
                      <select
                        onChange={(e) => setDetailPay(e.target.value)}
                        style={
                          detailPay ? { color: 'black' } : { color: 'grey' }
                        }
                      >
                        <option value="" disabled selected hidden>
                          Payment Type
                        </option>
                        <option value="cashh1">Cash H+1</option>
                        <option value="cashh3">Cash H+3</option>
                        <option value="cashh7">Cash H+7</option>
                        <option value="transferh1">Transfer H+1</option>
                        <option value="transferh1">Transfer H+3</option>
                        <option value="transferh1">Transfer H+7</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-pay-right">
                    <div className="d-pay-right-text">
                      Expired Date<span className="color-red">*</span>
                    </div>
                    <div className="d-pay-right-list">
                      <input
                        type="date"
                        onChange={(e) => setDetailExp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="d-notes"
                  style={
                    detailName && detailDist
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  Notes
                </div>
                <div
                  className="d-notes-input"
                  style={
                    detailName && detailDist
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  <textarea
                    rows="7"
                    cols="55"
                    onChange={(e) => setDetailNotes(e.target.value)}
                    defaultValue={detailNotes}
                  />
                </div>
              </div>
            </div>
            <div className="border"></div>
            <div
              className="content-products"
              style={
                detailName && detailDist
                  ? { display: 'flex' }
                  : { display: 'none' }
              }
            >
              <div className="products-left">Products</div>
              <div className="products-right">
                {inputFields.map((inputField, index) => (
                  <div className="products-map">
                    <Fragment key={`${inputField}~${index}`}>
                      <div className="p-product-unit">
                        <div className="p-product">
                          <div className="p-product-text">
                            Product<span className="color-red">*</span>
                          </div>
                          <div className="p-product-list option-style">
                            <span
                              className="close-button"
                              onClick={() => handleRemoveFields(index)}
                            >
                              <IoMdCloseCircleOutline size={20} />
                            </span>
                            <select
                              id="prodName"
                              name="prodName"
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              style={
                                inputFields[index].prodName
                                  ? { color: 'black' }
                                  : { color: 'grey' }
                              }
                            >
                              <option value="" disabled selected hidden>
                                Product Name
                              </option>
                              <option value="milk">Morning Dew Milk</option>
                              <option value="minerale">
                                Le Minerale 600ml
                              </option>
                              <option value="cream">
                                Greenfields Full Cream Milk 1L
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="p-unit">
                          <div className="p-unit-text">
                            Unit<span className="color-red">*</span>
                          </div>
                          {inputField.prodName ? (
                            <div className="p-unit-list">
                              <select
                                id="prodUnit"
                                name="prodUnit"
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                                style={
                                  inputFields[index.prodUnit]
                                    ? { color: 'black' }
                                    : { color: 'grey' }
                                }
                              >
                                <option value="" disabled selected hidden>
                                  Unit
                                </option>
                                <option value="karton">Karton</option>
                                <option value="pak">Pak</option>
                                <option value="pcs">Pcs</option>
                              </select>
                            </div>
                          ) : (
                            <div className="p-unit-list">
                              <select
                                id="prodUnit"
                                name="prodUnit"
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                                style={
                                  inputFields[index.prodUnit]
                                    ? { color: 'black' }
                                    : { color: 'grey' }
                                }
                              >
                                <option value="" disabled selected hidden>
                                  Unit
                                </option>
                                <option value="">No data available</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-quantity-price-total">
                        <div className="p-quantity">
                          <div className="p-quantity-text">
                            Quantity<span className="color-red">*</span>
                          </div>
                          <div className="p-quantity-list input-style">
                            <input
                              type="number"
                              id="qty"
                              name="qty"
                              value={inputField.qty}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder="Quantity"
                            />
                          </div>
                        </div>
                        <div className="p-price">
                          <div className="p-price-text">
                            Price<span className="color-red">*</span>
                          </div>
                          <div className="p-price-list input-style">
                            <input
                              type="number"
                              id="price"
                              name="price"
                              value={inputField.price}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="p-total">
                          <div className="p-total-text">
                            Total Price<span className="color-red">*</span>
                          </div>
                          <div className="p-total-list input-style">
                            <input
                              type="number"
                              id="totalPrice"
                              name="totalPrice"
                              value={inputField.totalPrice}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              placeholder="0"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-border"></div>
                      <div className="p-price-net">
                        <div className="p-price-text">Total Nett Price</div>
                        <div className="p-price-total">
                          {inputField.totalPrice
                            ? `${inputField.totalPrice}`
                            : 0}
                        </div>
                      </div>
                    </Fragment>
                  </div>
                ))}
                <div className="p-button">
                  <button onClick={handleAddFields}>
                    NEW ITEM <FiPlus size={16} className="p-button-icon" />
                  </button>
                </div>
                <div className="p-total-price">
                  <div className="total-price-text">Total</div>
                  <div className="total-price-number">{total}</div>
                </div>
              </div>
            </div>
            <div className="border"></div>
            <div className="footer-button">
              <div className="button-cancel">
                <button>CANCEL</button>
              </div>
              {checkProduct() ? (
                <div className="button-confirm">
                  <button onClick={onHandleClick}>CONFIRM</button>
                </div>
              ) : (
                <div className="button-disabled">
                  <button disabled>CONFIRM</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
