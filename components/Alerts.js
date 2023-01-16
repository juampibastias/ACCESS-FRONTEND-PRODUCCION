import React, { useState } from 'react';
import { useAlert } from 'react-alert'

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const alert = useAlert();

  const addAlert = (text, type = 'info') => {
    alert.show(text, {
      timeout: 2000,
      type: type
    });
  }

  return (
    <>
      {alerts.map((alert, i) => (
        <div key={i}>
          {alert.text}
        </div>
      ))}
    </>
  );
}

export default Alerts;
