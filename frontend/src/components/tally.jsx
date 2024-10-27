import { useState, useEffect } from "react";

// display current user fund
function Tally() {
    const [data, setData] = useState([]);
    const [weeklyTally, setWeeklyTally] = useState([])


    useEffect(() => {
        fetch("http://localhost:3000/tally")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log(data);
          })
      }, []);

    const fetchAdditionalData = async (name) => {
        const response = await fetch(`http://localhost:3000/tally/${name}`); // Replace with your actual API
        if (!response.ok) {
            throw new Error('Failed to fetch additional data');
        }
        return response.json();
    };
    
    const fetchAllAdditionalData = async () => {
        const updatedTallyData = await Promise.all(
            data.map(async (item) => {
                const count = await fetchAdditionalData(item.name);
                return [count[0]['count'], item.name];
            })
        );
        console.log(updatedTallyData);
        setWeeklyTally(updatedTallyData);
        
    };

    useEffect(() => {
        if (data.length > 0) {
            fetchAllAdditionalData();
        }
    }, [data]);
    

    return (
        <>
        <ul>
          { 
            data.map(r => (
                <li key={r.id}>{r.name}: ${r.fund}</li>
            ))
          }
        </ul>
        <div>
        <p> this week's tally</p>
        <ul>
          {
            weeklyTally.map(r => (
                <li key={r.id}>{r[1]}: ${r[0]}</li>
            ))
          }
        </ul>
        </div>
        </>
      )
}

export default Tally;