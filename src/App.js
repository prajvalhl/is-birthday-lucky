import { useState } from "react";
import "./styles.css";
import happy from "./resource/happy.svg";
import sad from "./resource/sad.svg";
import { Footer } from "./Footer";

export default function App() {
  const [isLucky, setLucky] = useState(false);
  const [bdate, setBdate] = useState(0);
  const [lnum, setLnum] = useState(0);
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(false);
  const [resDisplay, setResDisplay] = useState(false);
  const [alert, setAlert] = useState("block");

  function handleClick() {
    const bdateSum = giveBdateToSum(bdate);
    checkBdateLucky(bdateSum);
  }

  function giveBdateToSum(dob) {
    let res = 0;
    if (dob !== 0 && Number(lnum) !== 0) {
      setFlag(false);
      setResDisplay(true);
      for (let i in dob) {
        if (dob[i] === "-") continue;
        else {
          res += Number(dob[i]);
        }
      }
    } else {
      setFlag(true);
      setResDisplay(false);
      setMsg("One or more fields are Invalid / Empty. Try again!");
    }
    return res;
  }

  function checkBdateLucky(num) {
    num && setLucky(num % Number(lnum) === 0);
  }

  return (
    <div className="App">
      <h1>
        Is your Birthday Lucky?{" "}
        <span role="img" aria-label="thinking-emoji">
          🤔
        </span>
      </h1>
      <h3>Enter Your Birth Date and your lucky number to continue...</h3>
      <div
        className="alert-warning"
        style={{ display: alert, maxWidth: "60%", margin: "0 auto" }}
      >
        <span className="closebtn" onClick={() => setAlert("none")}>
          ×
        </span>
        <strong>Privacy Notice!</strong> We are not storing your data.
      </div>
      <div>
        <label htmlFor="bdate">Select your Birth date:</label>
        <br />
        <input
          type="date"
          id="bdate"
          onChange={(e) => setBdate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lnum">Enter your Lucky Number:</label>
        <br />
        <input
          type="number"
          id="lnum"
          onChange={(e) => setLnum(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>Check</button>
      <p style={{ display: flag ? "block" : "none" }}>{msg}</p>
      <div style={{ display: resDisplay ? "block" : "none" }}>
        <p>
          {isLucky
            ? "Congrats! Your birthday is lucky!"
            : "Oops! Your birthday is not lucky!"}
        </p>
        <img
          style={{ height: "100px", width: "100px" }}
          src={isLucky ? happy : sad}
          alt={isLucky ? "happy image" : "sad image"}
        />
      </div>
      <Footer />
    </div>
  );
}
