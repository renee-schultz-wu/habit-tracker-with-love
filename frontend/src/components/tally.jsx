import { useState, useEffect } from "react";

// display current user fund
function Tally() {
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/tally")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log(data);
          })
      }, []);

      return (
        <ul>
          { 
            data.map(r => (
                <li key={r.id}>{r.name}: ${r.fund}</li>
            ))
          }
        </ul>
      )
}

export default Tally;