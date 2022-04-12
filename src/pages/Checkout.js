import React, {useState} from 'react'
import { Row, Col, Button, Alert, Container } from "react-bootstrap";
import { useEffect } from 'react';
import { commerce } from '../lib/commerce';
import SubmissionSpinner from './SubmissionSpinner '
import CartCard from './CartCard';
import FormCard from './FormCard';


const Checkout = () => {
   // The checkout token itself
   const [checkoutToken, setCheckoutToken] = useState("");
   // Line Items in the current checkout Token
   const [lineItems, setLineItems] = useState("");
   // Raw user input for Credit Card Info
   const [cardState, setCardState] = useState({});
 
   // Formatted values for credit card Info
   const [cardNum, setCardNum] = useState("");
   const [cardName, setName] = useState("");
   const [expDate, setExpDate] = useState("");
   const [cvv, setCvv] = useState("");
   const [cardType, setCardType] = useState("");
 
   // State for buyer info
   const [buyerFirstName, setBuyerFirstName] = useState("");
   const [buyerLastName, setBuyerLastName] = useState("");
   const [email, setEmail] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [geoState, setGeoState] = useState("");
   const [zipCode, setZipCode] = useState("");
   const [validationInfo, setValidationInfo] = useState(null);
   // State for success/fail popup notifications
   const [showSuccess, setShowSuccess] = useState(false);
   const [showFail, setShowFail] = useState(false);
   // Submission spinner toggle
   const [spinnerVisible, setSpinnerVisible] = useState(false);
 
   const handleCardChange = (evt) => {
     const value = evt.target.value;
     setCardState({
       ...cardState,
       [evt.target.name]: value,
     });
   };
 
   const handleFormChange = (text) => {
     let userCardInput = formatCreditCard(text);
     // Sets card number hook with formatted/validated input
     setCardNum(userCardInput);
   };
 
   const handleDateChange = (text) => {
     let userDateInput = dateCheck(text);
     // Sets expiration date hook with formatted/validated input
     setExpDate(userDateInput);
   };
 
   const handleCvvChange = (text) => {
     let userCvvInput = cvvCheck(text);
     // Sets cvv hook with formatted/validated input
     setCvv(userCvvInput);
   };
 
   const handleSubmit = (event) => {
     // Checks for blank fields, etc. in the Bootstrap form
     const form = event.currentTarget;
     if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();
     }
     event.preventDefault();
     // Check the inputs for validity
     if (validateInputs(cardName, cardNum, expDate, cvv)) {
       // Enables spinner while the call to Commerce completes
       setSpinnerVisible(true);
       // Sends checkout to Commerce
       executeCheckout(checkoutToken);
     } else {
       // If something is wrong in form, figure out which field was improperly filled
       let fail = figureOutErrors(cardName, cardNum, expDate, cvv);
       // scroll to top of page
       window.scrollTo(0, 0);
       // Sets the appropriate variable for the error message display
       setValidationInfo(fail);
       // Shows error message to user
       setShowFail(true);
     }
   };
 
   useEffect(() => {
     commerce.checkout
       .generateToken("YOUR PRODUCT PERMALINK GOES HERE", { type: "permalink" })
       .then((res) => {
         setCheckoutToken(res);
         setCurrentCart(res);
       })
       .catch((err) => {
         console.log("Something went wrong with the token generation", err);
       });
   }, []);
 
   function executeCheckout(checkoutToken) {
     commerce.checkout
       .capture(checkoutToken.id, {
         line_items: lineItems,
         conditionals: {
           collects_billing_address: true,
         },
         customer: {
           firstname: buyerFirstName,
           lastname: buyerLastName,
           email: email,
         },
         shipping: {
           name: `${buyerFirstName} ${buyerLastName}`,
           street: address,
           town_city: city,
           county_state: geoState,
           postal_zip_code: zipCode,
           country: "US",
         },
         fulfillment: {
           // The shipping method ID for "USPS Ground" (for example)
 
           shipping_method: "ship_1ypbroE658n4ea",
         },
         payment: {
           // Test Gateway is enabled by default, and is used when you submit orders with
           // your sandbox API key
           gateway: "test_gateway",
           card: {
             number: cardNum,
             expiry_month: expDate.substring(0, 2),
             expiry_year: expDate.substring(3, 5),
             cvc: cvv,
             postal_zip_code: zipCode,
           },
         },
       })
       .then((response) => {
         // Triggers success popup message
         setShowSuccess(true);
         // Resets card state (which empties all entry fields)
         setCardState("");
         // Empties the user's 'current cart' at top of page
         setCurrentCart("");
         // Cancels spinner triggered by clicking the "complete order" button.
         setSpinnerVisible(false);
         // Return to top of page
         window.scrollTo(0, 0);
         // You could save responseId to hook here and then pass that via url to response page
         console.log(
           "Great, your checkout was captured successfully! Checkout the response object for receipt info.",
           response
         );
       })
       .catch((error) => {
         // Sets the variable in the failure user message
         setValidationInfo("submission");
         // Cancels spinner triggered by clicking the "complete order" button.
         setSpinnerVisible(false);
         // Shows error message to user
         setShowFail(true);
         // scrolls to top of page
         window.scrollTo(0, 0);
         console.log(error);
       });
   }
 
   useEffect(() => {
     // Whenever checkoutToken is updated, finds current line items and formats them for the checkout object
     if (checkoutToken.line_items !== undefined) {
       let itemsInCart = {};
       checkoutToken.line_items.forEach((item) => {
         itemsInCart = {
           ...itemsInCart,
           [item.id]: {
             quantity: 1,
           },
         };
       });
       setLineItems(itemsInCart);
     }
   }, [checkoutToken]);
 
   useEffect(() => {
     // Each of the following looks for an entry in a field and, if there is one, updates the corresponding hook
     cardState.cardNum
       ? handleFormChange(cardState.cardNum)
       : handleFormChange("");
     cardState.expDate
       ? handleDateChange(cardState.expDate)
       : handleDateChange("");
     cardState.cvv ? handleCvvChange(cardState.cvv) : handleCvvChange("");
     cardState.cardName ? setName(cardState.cardName) : setName("");
     cardState.buyerFirstName
       ? setBuyerFirstName(cardState.buyerFirstName)
       : setBuyerFirstName("");
     cardState.buyerLastName
       ? setBuyerLastName(cardState.buyerLastName)
       : setBuyerLastName("");
     cardState.email ? setEmail(cardState.email) : setEmail("");
     cardState.address ? setAddress(cardState.address) : setAddress("");
     cardState.city ? setCity(cardState.city) : setCity("");
     cardState.geoState ? setGeoState(cardState.geoState) : setGeoState("");
     cardState.zipCode ? setZipCode(cardState.zipCode) : setZipCode("");
   }, [cardState]);
 
   // Sets card type when the card Number changes. This is used to change the animation backgound img
   useEffect(() => {
     const currentCard = findCardType(cardNum);
     setCardType(currentCard);
   }, [cardNum]);
   return (
     <Container>
       { showSuccess ? (
         <Alert
           className='popup'
           variant={'success'}
           onClick={() => setShowSuccess(false)}
           dismissible
          >
            Success! Your order has been received. Thanks for shopping with us!
          </Alert>
       ) : (
         <div></div>
       )}
       {showFail ? (
         <Alert
           className='popup'
           variant={'warning'}
           onClick={() => setShowFail(false) && setValidationInfo(null)}
           dismissible
          >
            There was a issue with your {validationInfo}. Please make sure the information was entered correctly and try again
          </Alert>
       ) : (
         <div></div>

       )}
       <SubmissionSpinner visible={spinnerVisible} />
       <Row>
         <Col md={true}></Col>
         <Col>
           <CartCard currentCart={currentCart} />
           <FormCard
             formDetails={BuyerFormDetails(
               buyerFirstName,
               buyerLastName,
               email,
               address,
               city,
               geoState,
               zipCode
             )}
             handleChange={handleCardChange}
             handleSubmit={handleSubmit}
             title={"Customer Details"}
           />
           <CustomButton onSubmit={handleSubmit} text={"Complete Order"} />
         </Col>
         <Col md={true}></Col>
       </Row>
     </Container>
   );
 }
 
export default Checkout