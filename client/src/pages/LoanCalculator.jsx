import React, { useState } from 'react';

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(loanTerm) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      setMonthlyPayment(monthly.toFixed(2));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Loan Calculator</h2>
      <form onSubmit={calculateLoan}>
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="e.g. 500000"
          style={styles.input}
          required
        />
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="e.g. 8.5"
          style={styles.input}
          required
        />
        <label>Loan Term (Years)</label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          placeholder="e.g. 20"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Calculate</button>
      </form>

      {monthlyPayment && (
        <div style={styles.result}>
          <h3>Estimated Monthly Payment: ₹{monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth:'600px',

    margin:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem auto',

    padding:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem',

    background:'white',

    borderRadius:'10px',

    boxShadow:'0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    width:'100%',
    padding:'0.8rem',
    marginBottom:'1rem',
    border:'1px solid #ccc',
    borderRadius:'5px'
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    background: '#0b0b2b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  result: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#0b0b2b'
  }
};

export default LoanCalculator;
