import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox or spam.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forgot Password</h2>
      <form onSubmit={handlePasswordReset} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Reset Email</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  heading: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#333',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  } as React.CSSProperties,
  button: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  } as React.CSSProperties,
  message: {
    marginTop: '15px',
    color: '#555',
    textAlign: 'center' as const,
  } as React.CSSProperties,
};

export default ForgotPassword;
