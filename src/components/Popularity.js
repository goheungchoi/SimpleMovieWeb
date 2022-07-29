import { useState, useEffect } from "react";

function Popularity({ pop }) {
  const [percentage, setPercentage] = useState(0.0);
  const [popularity, setPopularity] = useState(0.0);
  useEffect(() => {
    if (pop !== undefined) {
      if (pop <= 150.0) {
        setPercentage((pop / 150.0 * 100.0).toFixed(1));
      } else {
        setPercentage(100.0);
      }
      setPopularity(pop.toFixed(1));
    }
  }, [pop] )
  return (
    <div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="url(#grad2)"
        viewBox="0 0 448 512"
        width="45px"
        height="45px"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset={`${percentage}%`} style={{stopColor:"red", stopOpacity:"1"}} />
            <stop offset={`${percentage}%`} style={{stopColor:"gray", stopOpacity:"1"}} />
          </linearGradient>
        </defs>
        <path d="M323.5 51.25C302.8 70.5 284 90.75 267.4 111.1C240.1 73.62 206.2 35.5 168 0C69.75 91.12 0 210 0 281.6C0 408.9 100.2 512 224 512s224-103.1 224-230.4C448 228.4 396 118.5 323.5 51.25zM304.1 391.9C282.4 407 255.8 416 226.9 416c-72.13 0-130.9-47.73-130.9-125.2c0-38.63 24.24-72.64 72.74-130.8c7 8 98.88 125.4 98.88 125.4l58.63-66.88c4.125 6.75 7.867 13.52 11.24 19.9C364.9 290.6 353.4 357.4 304.1 391.9z"/>
      </svg>

      <svg
        fill="black"
        width="80px"
        height="60px"
        style={{marginLeft: "5px", textAlign: "right"}}
      >
        <text 
          x="5" y="32" 
          style={
            { 
              fontSize:"30px", 
              fontWeight:"bold", 
              fontFamily:"Arial",
              fill: "white"
            }
          }>{popularity}</text>
        <text 
          x="5" y="55" 
          style={
            { 
              fontSize:"15px", 
              fontWeight:"600", 
              fontFamily:"Arial",
              fill: "rgb(100, 100, 100)"
            }
          }>Popularity</text>
      </svg>
    </div>
  );
}

export default Popularity;