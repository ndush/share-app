// UpgradeToPremium.jsx

import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const UpgradeToPremium = ({ onPaymentSuccess }) => {
  // Handle PayPal payment success
  const handlePaymentSuccess = (details, data) => {
    // Perform any actions on successful payment
    console.log("Payment successful!");
    onPaymentSuccess();
  };

  // Handle PayPal payment error
  const handlePaymentError = (error) => {
    // Handle payment error if needed
    console.error("Payment error:", error);
  };

  // Handle PayPal payment cancellation
  const handlePaymentCancel = (data) => {
    // Handle payment cancellation if needed
    console.log("Payment cancelled:", data);
  };

  return (
    <div>
      <h2>Upgrade to Premium</h2>
      <p>Upgrade to premium to view all posts.</p>
      <PayPalButton
        amount={10} // Replace with the actual premium subscription amount
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onCancel={handlePaymentCancel}
        options={{
          clientId: "YOUR_PAYPAL_CLIENT_ID", // Replace with your PayPal client ID
          currency: "USD", // Replace with the currency code for your country
        }}
      />
    </div>
  );
};

export default UpgradeToPremium;
