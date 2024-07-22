import React, { useRef, useEffect } from "react";
import './PayDialog.css';

export default function PayDialog() {
  const paypal = useRef();

  const actionComplete = (option) => {
    setTimeout('', 5000);
    alert("Transaction completed");
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Candy Cone",
                amount: {
                  currency_code: "USD",
                  value: 50.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <span className="pay-dialog">
      <div ref={paypal}></div>
    </span>
  );
}