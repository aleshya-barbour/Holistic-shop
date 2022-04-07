import React, {useState} from 'react'

import { useEffect } from 'react';
import { commerce } from '../lib/commerce';


const Checkout = () => {
  //state of checkout Token
  const [checkoutToken, setCheckoutToken] = useState([]);
  const [lineItems, setLineItems] = useState([])
  //user input of cc info

  const [cardState, setCardState] = useState("")
  const [cardNum, setCardNum] =useState("");
  const [cardName, setName] = useState("")
  const [expDate, setExpDate] =useState("")
  const [ cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("")
  
  //useState for customer
  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] =useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
  const [zipCode, setZipCode] = useState("")

  const [validationInfo, setValidationInfo] = useState(null)
  const [showSuccess, setSuccess] = useState(false)
  const [showFail, setShowFail] = useState(false)
  const [currentCart, setCurrentCart] = useState()
  const [spinnerVisible, setSpinnerVisible] = useState

  useEffect(() => {
    let cartId = props.match.params.id;

    commerce.checkout
      .generateToken('cartId', {type:"cart"})
      .then((res) => {
        setCheckoutToken(res)
        setCurrentCart(res)
      })
      .catch((error) => {
        console.log("something went wrong with generate Token")
      })
  }, [])

  useEffect(() => {
    if(checkoutToken.line_items !== undefined) {
      let itemsInCart = {};
      checkoutToken.line_items.forEach((item) => {
        itemsInCart = {
          ...itemsInCart, 
          [item.id] : {
            quantity:1,
          }
        }
      })
      setLineItems(itemsInCart);
    }
  }, [checkoutToken]);

  useEffect(() => {
     // Each of the following looks for an entry in a field and, if there is one, updates the corresponding hook
    cardState.cardNum
      ? handleFormChange(cardState.cardNum)
      : handleFormChange("")
    cardState.expDate
      ?handleDateChange(cardState.expDate)
      : handleDateChange("");
    cardState.cvv
      ?handleCvvChange(cardState.cvv)
      : handleCvvChange("")
    cardState.cardName
      ? setName(cardState.cardName)
      : setName("")
    cardState.buyerFirstName
      ? setBuyerFirstName(cardState. buyerFirstName)
      : setBuyerFirstName("")
    cardState.buyerLastName
      ? setBuyerLastName(cardState.buyerLastName)
      : setBuyerLastName("")
    cardState.email
      ? setEmail(cardState.email)
      : setEmail("")
    cardState.address 
      ? setAddress(cardState.address)
      : setAddress("")
    cardState.city
      ? setCity(cardState.city)
      : setCity("")
    cardState.geoState
      ? setGeoState(cardState.geoState)
      : setGeoState("")
    cardState.zipCode
    ? setZipCode(cardState.zipCode)
    : setZipCode("")
  }, [cardState]);

  useEffect(() => {
    const currentCard = findCardType(cardNum)
    setCardType(currentCard)
  }, [cardNum])
  
  const executeCheckout = (checkoutToken) => {
    commerce.checkout
      .capture(checkoutToken.id, {
        line_items: lineItems,
        conditionals: {
          collects_billing_address: true
        }, customer: {
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
          shipping_method: "ship_1ypbroE658n4ea",
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: cardNum,
            expiry_month: expDate.substring(0,2),
            expiry_year: expDate.substring(3,5),
            cvc: cvv,
            postal_zip_code: zipCode,

          }
        }
      
      })
      .then((response) => {
        //successs popup message
        setShowSuccess(true);
        //reset card state
        setCardState("");
        //empty user cart
        setCurrentCart("")
        //candcles spinner triggered by clicking 
        setSpinnerVisible(false)
        //return to top of page
        window.scrollTo(0,0);
       console.log("Checkout has been captured Success", 
       response
       )

      })
      .catch((error) => {
        //Sets the cariable in the failure user message
        setValidationInfo("submission")
        //cancles spinner triggered by clicking the "complete order" button
        setSpinnerVisible(false)
        // Shows error message to user
        setShowFail(true)
        //Scrolls to top of page
        window.scrollTo(0,0)
        console.log(error)
      })
  }

  const handleCardChange = (evt) => {
    const value = evt.target.value
    setCardState({
      ...cardState, 
      [evt.target.name] : value
    })
  }

  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text)
    //sets card number with hook
    setCardNum(userCardInput);
  }

  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text)
    setExpDate(userDateInput)
  }

  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text)
    setCvv(userCvvInput)
  }
  
  const handleSubmit =(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault()
    if (validateInputs(cardName, cardNum, expDate, cvv)) {
      setSpinnerVisible(true)
      executeCheckout(checkoutToken)
    } else {
      let fail = figureOutErrors(cardName, cardNum, expDate, cvv)
      window.scrollTo(0,0)
      setValidationInfo(fail)
      setShowFail(true)
    }
  }

 
  return (
    <div className='form'>
      <form>
        <label>Full Name
          <input type='text' />
        </label>
        <label> 
          <input type='number' />
        </label>
      </form>
    </div>
  )
}

export default Checkout