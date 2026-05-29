import React, { useState } from "react";

function LoanCalculator() {

  const [loanAmount, setLoanAmount] =
    useState("");

  const [interestRate, setInterestRate] =
    useState("");

  const [loanTerm, setLoanTerm] =
    useState("");

  const [monthlyPayment, setMonthlyPayment] =
    useState(null);

  const [totalPayment, setTotalPayment] =
    useState(null);

  const [totalInterest, setTotalInterest] =
    useState(null);

  const calculateLoan = (e) => {

    e.preventDefault();

    const principal =
      parseFloat(loanAmount);

    const calculatedInterest =
      parseFloat(interestRate) /
      100 /
      12;

    const calculatedPayments =
      parseFloat(loanTerm) * 12;

    const x = Math.pow(
      1 + calculatedInterest,
      calculatedPayments
    );

    const monthly =
      (principal *
        x *
        calculatedInterest) /
      (x - 1);

    if (isFinite(monthly)) {

      const total =
        monthly *
        calculatedPayments;

      const interest =
        total - principal;

      setMonthlyPayment(
        monthly.toFixed(2)
      );

      setTotalPayment(
        total.toFixed(2)
      );

      setTotalInterest(
        interest.toFixed(2)
      );
    }
  };

  return (

    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Loan Calculator
          </h1>

          <p style={styles.heroText}>

            Estimate your EMI,
            interest, and total payment
            instantly with UrbanNest.

          </p>

        </div>

      </div>

      {/* CALCULATOR */}
      <div style={styles.container}>

        <div style={styles.card}>

          <h2 style={styles.heading}>
            Calculate Your EMI
          </h2>

          <form onSubmit={calculateLoan}>

            {/* LOAN AMOUNT */}
            <div style={styles.field}>

              <label style={styles.label}>
                Loan Amount (₹)
              </label>

              <input
                type="number"

                value={loanAmount}

                onChange={(e) =>
                  setLoanAmount(
                    e.target.value
                  )
                }

                placeholder="e.g. 5000000"

                style={styles.input}

                required
              />

            </div>

            {/* INTEREST */}
            <div style={styles.field}>

              <label style={styles.label}>
                Interest Rate (%)
              </label>

              <input
                type="number"

                step="0.1"

                value={interestRate}

                onChange={(e) =>
                  setInterestRate(
                    e.target.value
                  )
                }

                placeholder="e.g. 8.5"

                style={styles.input}

                required
              />

            </div>

            {/* TERM */}
            <div style={styles.field}>

              <label style={styles.label}>
                Loan Term (Years)
              </label>

              <input
                type="number"

                value={loanTerm}

                onChange={(e) =>
                  setLoanTerm(
                    e.target.value
                  )
                }

                placeholder="e.g. 20"

                style={styles.input}

                required
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"

              style={styles.button}
            >
              Calculate EMI →
            </button>

          </form>

        </div>

        {/* RESULT */}
        {monthlyPayment && (

          <div style={styles.resultGrid}>

            {/* EMI */}
            <div style={styles.resultCard}>

              <h3 style={styles.resultTitle}>
                Monthly EMI
              </h3>

              <p style={styles.resultValue}>
                ₹
                {" "}
                {Number(
                  monthlyPayment
                ).toLocaleString("en-IN")}
              </p>

            </div>

            {/* TOTAL PAYMENT */}
            <div style={styles.resultCard}>

              <h3 style={styles.resultTitle}>
                Total Payment
              </h3>

              <p style={styles.resultValue}>
                ₹
                {" "}
                {Number(
                  totalPayment
                ).toLocaleString("en-IN")}
              </p>

            </div>

            {/* INTEREST */}
            <div style={styles.resultCard}>

              <h3 style={styles.resultTitle}>
                Total Interest
              </h3>

              <p style={styles.resultValue}>
                ₹
                {" "}
                {Number(
                  totalInterest
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

const styles = {

  page: {

    background: "#f8fafc",

    minHeight: "100vh",
  },

  /* HERO */

  hero: {

    height: "320px",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    position: "relative",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "rgba(15,23,42,0.72)",
  },

  heroContent: {

    position: "relative",

    zIndex: 2,

    textAlign: "center",

    color: "white",

    padding: "1rem",
  },

  heroTitle: {

    fontSize:
      window.innerWidth <= 768
        ? "2.5rem"
        : "4rem",

    color: "white",

    marginBottom: "1rem",
  },

  heroText: {

    fontSize: "1.1rem",

    color:
      "rgba(255,255,255,0.85)",
  },

  /* MAIN */

  container: {

    maxWidth: "1200px",

    margin: "0 auto",

    padding:
      window.innerWidth <= 768
        ? "1rem"
        : "3rem",
  },

  card: {

    marginTop: "-80px",

    position: "relative",

    zIndex: 2,

    background:
      "rgba(255,255,255,0.85)",

    backdropFilter:
      "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.3)",

    borderRadius: "30px",

    padding:
      window.innerWidth <= 768
        ? "1.5rem"
        : "3rem",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
  },

  heading: {

    fontSize: "2rem",

    marginBottom: "2rem",

    color: "#0f172a",
  },

  field: {

    marginBottom: "1.5rem",
  },

  label: {

    display: "block",

    marginBottom: "0.6rem",

    fontWeight: "600",

    color: "#334155",
  },

  input: {

    width: "100%",

    padding: "1rem",

    borderRadius: "14px",

    border:
      "1px solid #dbeafe",

    fontSize: "1rem",

    background: "white",
  },

  button: {

    width: "100%",

    padding: "1rem",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    fontWeight: "700",

    fontSize: "1rem",

    cursor: "pointer",

    marginTop: "1rem",

    boxShadow:
      "0 12px 30px rgba(15,23,42,0.2)",
  },

  /* RESULTS */

  resultGrid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(3,1fr)",

    gap: "2rem",

    marginTop: "3rem",
  },

  resultCard: {

    background: "white",

    padding: "2rem",

    borderRadius: "24px",

    textAlign: "center",

    boxShadow:
      "0 12px 30px rgba(0,0,0,0.06)",
  },

  resultTitle: {

    marginBottom: "1rem",

    color: "#475569",
  },

  resultValue: {

    fontSize: "2rem",

    fontWeight: "700",

    color: "#eab308",
  },
};

export default LoanCalculator;