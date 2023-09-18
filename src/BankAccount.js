import { useReducer } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "accountOpenStatus":
      return { ...state, accountOpenStatus: action.accountOpenStatus };
    case "deposit":
      return { ...state, balance: state.balance + action.deposit };
    case "withdraw":
      return { ...state, balance: state.balance - action.withdraw };
    case "activeLoan":
      return {
        ...state,
        activeLoan: action.activeLoan,
        balance: state.balance + action.addLoan,
      };
    // case "addLoan":
    //   return { ...state, balance: action.addLoan };
    default:
      return { ...state };
  }
}
const initialState = {
  accountOpenStatus: false,
  balance: 0,
  loan: 0,
  activeLoan: false,
  // deposit: 150,
  // withdraw: 50,
  // requestLoan: 5000,
  payLoan: true,
};
function BankAccount() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAccountStatus(e) {
    dispatch({
      type: "accountOpenStatus",
      accountOpenStatus: true,
    });
  }

  function handleCloseAccount(e) {
    if (state.loan > 0 || state.balance > 0) {
      return null;
    }
    dispatch({
      type: "accountOpenStatus",
      accountOpenStatus: false,
    });
  }
  function handleDeposit(e) {
    dispatch({
      type: "deposit",
      deposit: 150,
    });
  }
  function handleWithdraw(e) {
    if (state.balance === 0) {
      return null;
    }
    dispatch({
      type: "withdraw",
      withdraw: 50,
    });
  }
  function handleRequestLoan(e) {
    if (state.activeLoan === true) {
      return null;
    }
    dispatch({
      type: "activeLoan",
      activeLoan: true,
      addLoan: 5000,
    });
  }
  function handlePayLoan(e) {
    if (state.activeLoan === true) {
      if (state.balance < 5000) return null;
      if (state.balance >= 5000)
        return dispatch({
          type: "activeLoan",
          activeLoan: false,
          addLoan: -5000,
        });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        // placeContent: "stretch center",
        placeItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          // border: "1px solid red",
          flex: "0 1 70px",
        }}
      >
        useReducer Bank Account
      </h1>
      <h3 style={{ textAlign: "center" }}>
        Balance: <span>{state.balance}</span>
      </h3>
      <h3 style={{ textAlign: "center" }}>
        Loan: <span>{state.loan}</span>
      </h3>
      <button
        disabled={state.accountOpenStatus}
        onClick={() => handleAccountStatus()}
      >
        Open Account
      </button>
      <button
        disabled={!state.accountOpenStatus}
        onClick={() => handleDeposit()}
      >
        Deposit 150
      </button>
      <button
        disabled={!state.accountOpenStatus}
        onClick={() => handleWithdraw()}
      >
        Withdraw 50
      </button>
      <button
        disabled={!state.accountOpenStatus}
        onClick={() => handleRequestLoan()}
      >
        Request a loan of 5000
      </button>
      <button
        disabled={!state.accountOpenStatus}
        onClick={() => handlePayLoan()}
      >
        Pay Loan
      </button>
      <button
        disabled={!state.accountOpenStatus}
        onClick={() => handleCloseAccount()}
      >
        Close Account
      </button>
    </div>
  );
}

export default BankAccount;
