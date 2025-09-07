import React from 'react';
import QRCode from 'react-qr-code';

const UPI = ({ upiId, name, amount, note }) => {
    const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&cu=INR` +
    (amount ? `&am=${encodeURIComponent(amount)}` : '') +
    (note ? `&tn=${encodeURIComponent(note)}` : '');
  return (
    <>
     <div style={{ textAlign: 'center' }}>
      <QRCode value={upiUri} size={180} />
      <p>Scan this QR code to pay</p>
    </div>
        </>
  )
}

export default UPI
