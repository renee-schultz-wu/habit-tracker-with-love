import { useState, useEffect } from "react";
import { startOfWeek, eachDayOfInterval, endOfWeek } from "date-fns";

// sticker chart
function Chart() {
    // Set up the board
    const [completion, setCompletion] = useState(
    Array(5).fill().map(() => Array(7).fill(false)) // 7x5 grid, all false (not completed)
    );

    const tasks = ['sleep', 'wokeup', 'exercise', 'shower', 'work'];
    
    const today = new Date();
    const startWeek = startOfWeek(today);
    const endWeek = endOfWeek(today);
    const intervalWeek = eachDayOfInterval({start: startWeek, end: endWeek})
    const days = Object.keys(intervalWeek).map((key) => intervalWeek[key].toDateString());

    useEffect(() => {
        fetch("http://localhost:3000/view")
        .then((res) => res.json())
        .then((data) => {  
            const updatedCompletion = Array(7).fill().map(() => Array(5).fill(false));
            data.forEach(item => {
            const day = new Date(item.date);
            const dayIndex = day.getDay();
            const taskIndex = tasks.indexOf(item.task);

            console.log(dayIndex, taskIndex)
      
            if (dayIndex !== -1 && taskIndex !== -1) {
              updatedCompletion[taskIndex][dayIndex] = item.complete;
            }
            setCompletion(updatedCompletion);
        }).catch(error => {
            console.error('Error fetching progress:', error);
        });
        })
    }, []);



    const handleTaskClick = (taskIndex, dayIndex) => {
        // Toggle completion state
        const updatedCompletion = [...completion];
        updatedCompletion[taskIndex][dayIndex] = !updatedCompletion[taskIndex][dayIndex];
        setCompletion(updatedCompletion);

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/complete', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                date: days[dayIndex],
                task: tasks[taskIndex],
                complete: updatedCompletion[taskIndex][dayIndex],
                person: "renee"
              }),
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
    }

    return (
        <table>
          <thead>
            <tr>
              <th>Day</th>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, taskIndex) => (
              <tr key={taskIndex}>
                <td>{task}</td>
                {days.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    onClick={() => handleTaskClick(taskIndex, dayIndex)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: completion[taskIndex][dayIndex] ? 'lightgreen' : 'white'
                    }}
                  >
                    {completion[taskIndex][dayIndex] ? '✔️' : '❌'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    );  
}

export default Chart;