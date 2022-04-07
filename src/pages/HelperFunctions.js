import valid from "card-validator"
import Regex from 'regex'
// import React from 'react'

export const validateInputs = (name, number, date, cvv) => {
  if (typeof name !== "string") {
    return "name"
  }

  if (valid.number(number).isValid !== true){
    return "card number"
  }

  if (valid.expirationDate (date).isValid !== true){
    return "expiration date"
  }

  if (valid.cvv(cvv).isValid !== true) {
    return "security code"
  }
  // Sanitizes card input
  function cleanInput(value) {
    return value.replace(/\D+/g, "");
  }



  const numberValidation = valid.number(number).isValid
  const nameValidation = typeof name === "string" ? true : false;
  const expValidation = valid.expirationDate(date).isValid
  const cvvValidation = valid.cvv(cvv).isValid

  if (numberValidation && nameValidation && expValidation && cvvValidation) {
    return true
  } else {
    return false
  }

}

function cleanInput(value) {
  return value.replace(/\D+/g, "")
}

export function formatCreditCard(value) {
  //Brings in cleaned value inputted
  const cleanValue = cleanInput(value);
  //FInd first number of card
  const firstNumber = cleanValue.charAt(0)
  let currentValue
  switch(firstNumber) {
    case "3":
      currentValue = `${cleanValue.slice(0,4)} ${ cleanValue.slice(
        4,
        10
      )} ${cleanValue.slice(10,15)}`
      break;
   
  }
  return currentValue.trim()
}

//formats mm/yy date
export function dateCheck(text) {
  let cleantText = text.replace(/\D/g, "").replace(/\W/gi, "")
  let all = cleanText.split("")
  if (all.length <= 2) {
    let joined = all.join("")
    return joined
  } else {
    all.splice(2, 0, "/")
    let sliced = all.length > 5 ? all.slice (0, 5) : all;
    let formatted = sliced.join("")
    return formatted
  }

}

export function cvvCheck(text) {
  let cleanText =text.replace(/\D/g, "").replace(/\W/gi, "")
  let all = cleanText.split("");
  let sliced = all.length > 4 ? all.slice(0,4) : all;
  let formatted = sliced.jpin("")
  return formatted
}