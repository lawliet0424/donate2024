import "./PaymentMethodSelection.css";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "TVVl_CjaKgih5oLSBLRPE";

export default function PaymentMethodSelection({ value }) {
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: value,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    const fetchPaymentWidgets = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    };

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    const renderPaymentWidgets = async () => {
      if (!widgets) return;

      await widgets.setAmount(amount);
      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });

      setReady(true);
    };

    renderPaymentWidgets();
  }, [widgets, amount]);

  useEffect(() => {
    if (widgets) {
      widgets.setAmount(amount);
    }
  }, [widgets, amount]);

  return (
    <div className="PaymentMethodSelection">
      <div className="box_section">
        <div id="payment-method" />
      </div>
    </div>
  );
}
