import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export type paymentProps = {
  seIsOpen?: (id?: string) => void;
};
function PaymentComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    payAmount: 0,
  });

  const [success, setsuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const payButton = document.querySelector("#paybutton");
  const tokenizeButton = document.querySelector("#tokenizebutton");

  const [check, onCheck] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const staxJs = (window as any).staxJs;

    const successElement = document.querySelector(".success") as HTMLElement;
    const errorElement = document.querySelector(".error") as HTMLElement;
    const loaderElement = document.querySelector(".loader") as HTMLElement;

    successElement.classList.remove("visible");
    errorElement.classList.remove("visible");
    // loaderElement.classList.add("visible");

    const form = document.querySelector("form");

    const extraDetails = {
      total: formData.payAmount, // 1$
      first_name: formData.firstName,
      last_name: formData.lastName,
      company: "",
      email: formData.email,
      month: formData.expiryMonth,
      year: formData.expiryYear,
      phone: formData.phone,
      address_1: "100 S Orange Ave",
      address_2: "",
      address_city: "Orlando",
      address_state: "FL",
      address_zip: "32811",
      address_country: "USA",
      url: "https://app.staxpayments.com/#/bill/",
      method: "card",
      validate: false,
      meta: {
        reference: "invoice-reference-num",
        memo: "notes about this transaction",
        otherField1: "other-value-1",
        otherField2: "other-value-2",
        subtotal: 1,
        tax: 0,
        lineItems: [
          {
            id: "optional-fm-catalog-item-id",
            item: "Demo Item",
            details: "this is a regular, demo item",
            quantity: 10,
            price: 0.1,
          },
        ],
      },
    };
    // call pay api

    const extraDetails123 = {
      first_name: "firstName",
      last_name: "lastName",
      company: "",
      email: "aaa@gmail.com",
      month: formData.expiryMonth,
      year: formData.expiryYear,
      phone: "7877878787",
      address_1: "line1" || "",
      address_2: "line2" || "",
      address_city: "city" || "",
      address_state: "state" || "",
      address_zip: "zipcode" || "",
      address_country: "country" || "",
      url: "https://app.staxpayments.com/#/bill/",
      method: "card",
      validate: false,
      total: formData.payAmount,
    };

    staxJs
      .pay(extraDetails)
      .then((result: any) => {
        if (result.id) {
          (successElement.querySelector(".token") as HTMLElement).textContent =
            result.payment_method_id;
          successElement.classList.add("visible");
          loaderElement.classList.remove("visible");
          setsuccess(true);
          //   props.seIsOpen(result.payment_method_id);
        }
      })
      .catch((err: any) => {
        // if a transaction did occur, but errored, the error will be in the message of the first child transactoin
        if (err.payment_attempt_message) {
          errorElement.textContent = err.payment_attempt_message;
        } else {
          // else, there may have been a validation error - and tokenization failed
          // err can contain an object where each key is a field name that points to an array of errors
          // such as {phone_number: ['The phone number is invalid']}
          errorElement.textContent =
            typeof err === "object"
              ? err.message ||
                Object.keys(err)
                  .map((k) => err[k].join(" "))
                  .join(" ")
              : JSON.stringify(err);
        }

        errorElement.classList.add("visible");
        loaderElement.classList.remove("visible");
      });
  };

  const isSetup = useRef(false);

  useEffect(() => {
    if (!isSetup.current) {
      const staxJs = (window as any).staxJs;
      staxJs
        .showCardForm()
        .then((handler: any) => {
          handler.setTestPan("4111111111111111");
          handler.setTestCvv("123");
        })
        .catch((_error: any) => {});

      isSetup.current = true;
    }
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Stax Payment
        </Typography>
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      </Box>
      <form>
        <div className="group">
          <label>
            <span>First Name</span>
            <input
              name="firstName"
              className="field input-box"
              placeholder="Jane"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Last Name</span>
            <input
              name="lastName"
              className="field input-box"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              name="email"
              className="field input-box"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              name="phone"
              className="field input-box"
              placeholder="+1000000000000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="group">
          <label>
            <span>Card</span>
            <div
              id="card-element"
              className="field"
              style={{
                gap: "10px",
              }}
            >
              <div
                id="staxjs-number"
                style={{
                  width: "180px",
                  height: "35px",
                  display: "inline-block",
                  margin: "3px",
                }}
              ></div>
              <div
                id="staxjs-cvv"
                style={{
                  width: "50px",
                  height: "35px",
                  display: "inline-block",
                  margin: "3px",
                }}
              ></div>
            </div>
            <div
              style={{ width: "60px", height: "35px", display: "inline-block" }}
            >
              <input
                name="expiryMonth"
                size={3}
                maxLength={2}
                placeholder="MM"
                style={{
                  width: "60px",
                  height: "18px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                  padding: "1em 1em",
                  fontSize: "91%",
                }}
                value={formData.expiryMonth}
                onChange={handleInputChange}
              />
            </div>

            <div
              style={{
                width: "74px",
                height: "35px",
                display: "inline-block",
                padding: "0 8px 0 0",
              }}
            >
              <input
                name="expiryYear"
                size={5}
                maxLength={4}
                placeholder="YYYY"
                style={{
                  width: "60px",
                  height: "18px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                  padding: "1em 1em",
                  fontSize: "91%",
                }}
                value={formData.expiryYear}
                onChange={handleInputChange}
              />
            </div>
          </label>
        </div>
        <label>
          <span>PayAmount</span>
          <input
            name="payAmount"
            type="number"
            className="field input-box"
            placeholder="Pay Amount"
            value={formData.payAmount}
            onChange={handleInputChange}
          />
        </label>
        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            id="paybutton"
            type="submit"
            onClick={handleSubmit}
            sx={{
              width: "fit-content",
            }}
          >
            Pay ${formData.payAmount}
          </Button>
        </Box>
        <div className="outcome">
          <div className="error"></div>
          <div className="success">
            Successful! The ID is <span className="token"></span>
          </div>
        </div>
      </form>
    </div>
  );
}
export default PaymentComponent;
