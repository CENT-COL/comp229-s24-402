import React, {useState} from 'react';

const Setup2FA = ({email}) => {
    const [qrCode, setQrCode] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    const setup2FA = async (email) => {
        const response = await fetch(`${apiUrl}/users/setup-2fa`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }),
        });
    
        if (response.ok) {
          const data = await response.json();
          setQrCode(data.imageUrl);
        } else {
          setError('Failed to generate QR code');
        }
      };
    
      const verify2FASetup = async () => {
        const response = await fetch(`${apiUrl}/users/verify-2fa-setup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: form.email, token: otp }),
        });
    
        if (response.ok) {
          setError('2FA setup is complete. You can now log in.');
          navigate('/login');
        } else {
          setError('Invalid OTP');
        }
      };

    return (
        <div>
            <h1>Setup 2FA</h1>
            <button onClick={setup2FA}>Generate QR Code</button>
            {qrCode && <img src={qrCode} alt="QR Code" /> }
            {qrCode && 
                ( 
                    <div>
                        <input 
                            type="text" 
                            placeholder="Enter OTP" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={verify2FASetup}>Verify OTP</button>
                    </div>
                )
            }
            {message && <p>{message}</p>}
        </div>
    );
}