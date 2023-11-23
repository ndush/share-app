import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const UpgradeToPremium = ({ onPaymentSuccess }) => {
  const handlePaymentSuccess = (details, data) => {
    console.log("Payment successful! Details:", details);
    console.log("Payment successful! Data:", data);
    onPaymentSuccess();
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  const handlePaymentCancel = (data) => {
    console.log("Payment cancelled:", data);
  };

  return (
    <div className="upgrade-to-premium">
      <h2>Upgrade to Premium</h2>
      <p>Upgrade to premium to view all posts.</p>
      <PayPalButton
        amount="100.00"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onCancel={handlePaymentCancel}
        options={{
          clientId: "Ad58THKrUymIxoQyTWRFnRTv-GMBLCb6I45N-r4qGBMVKOZJJo8Ga_TEP7nZju1XqOFlr4dDyupnGcjd",
          currency: "USD",
        }}
      />
    </div>
  );
};

export default UpgradeToPremium;
