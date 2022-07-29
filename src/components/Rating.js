import { useState, useEffect } from "react";

function Rating({ vote_ave }) {
  const [percentage, setPercentage] = useState(0.0);
  const [average, setAverage] = useState(0.0);
  useEffect(() => {
    if (vote_ave !== undefined) {
      setPercentage(vote_ave * 10.0);
      setAverage(vote_ave.toFixed(1));
      console.log(vote_ave);
      console.log(average);
    }
  }, [vote_ave] )
  return (
    <div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="url(#grad1)"
        viewBox="0 0 576 512"
        width="50px"
        height="50px"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset={`${percentage}%`} style={{stopColor:"gold", stopOpacity:"1"}} />
            <stop offset={`${percentage}%`} style={{stopColor:"gray", stopOpacity:"1"}} />
          </linearGradient>
        </defs>
        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
      </svg>
      <svg
        fill="black"
        width="80px"
        height="60px"
        style={{marginLeft: "5px"}}
      >
        <text 
          x="5" y="32" 
          style={
            { fontSize:"30px", 
              fontWeight:"bold", 
              fontFamily:"Arial",
              fill: "white"
            }
          }>{average}</text>
        <line x1="55" y1="30" x2="30" y2="55" style={{stroke:"rgb(100, 100, 100)", strokeWidth:"3px"}}/>
        <text 
          x="45" y="60" 
          style={
            { fontSize:"20px", 
              fontWeight:"600", 
              fontFamily:"Arial",
              fill: "rgb(100, 100, 100)"
            }
          }>10</text>
      </svg>
    </div>
  );
}

export default Rating;