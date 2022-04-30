import React from 'react'
import { useState, useEffect } from 'react'
import { commerce } from '../lib/commerce'
import props from 'prop-types'

const Checkout = () => {
  const [checkoutToken, setCheckoutToken] = useState ([]);
  const [lineItems, setLineItems] = useState("")

  useEffect(() => {
   fetchGenerateCheckoutToken()
    

  }, [])

  const fetchGenerateCheckoutToken =() => {
    let cartId = props.match.params.id
    commerce.checkout.generateToken( cartId, {type: 'cart'})
      .then((res) => {
        setCheckoutToken(res)
      })
    .catch((err) => {
      console.log('something went wrong with the token generation papi', err)
    })
      
  }
  return (
    <div>Checkout

    </div>
  )
}

export default Checkout