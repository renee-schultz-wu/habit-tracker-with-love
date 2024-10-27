// frontend/src/components/chart.jsx
import { useState, useEffect } from "react";
import { startOfWeek, eachDayOfInterval, endOfWeek } from "date-fns";

// Custom hook for fetching data
const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError);
    }, [url]);

    return { data, error };
};

function getDays() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const startWeek = startOfWeek(today);
    const endWeek = endOfWeek(today);
    const intervalWeek = eachDayOfInterval({ start: startWeek, end: endWeek });
    return Object.keys(intervalWeek).map((key) => intervalWeek[key].toDateString());
}



function Chart() {
    const { data: users } = useFetchData('http://localhost:3000/users');
    const { data: tasks } = useFetchData('http://localhost:3000/tasks');
    const { data: completionData } = useFetchData('http://localhost:3000/view');

    const [completion, setCompletion] = useState(Array(2).fill().map(() => Array(5).fill().map(() => Array(7).fill(false))));
    const days = getDays();

    useEffect(() => {
        if (completionData && users) {
            const updatedCompletion = completion.map(userComp => userComp.map(taskComp => [...taskComp]));
            completionData.forEach(item => {
                const dayIndex = new Date(item.date).getDay();
                const taskIndex = tasks.findIndex(task => task.task === item.task);
                const userIndex = users.findIndex(user => user.name === item.person);
                if (dayIndex !== -1 && taskIndex !== -1 && userIndex !== -1) {
                    updatedCompletion[userIndex][taskIndex][dayIndex] = item.complete;
                }
            });
            setCompletion(updatedCompletion);
        }
    },[completionData, users, tasks]);
    

    const handleTaskClick = (taskIndex, dayIndex, userIndex) => {
        const updatedCompletion = [...completion[userIndex]];
        updatedCompletion[taskIndex][dayIndex] = !updatedCompletion[taskIndex][dayIndex];
        setCompletion(prev => {
            const newCompletion = [...prev];
            newCompletion[userIndex] = updatedCompletion;
            return newCompletion;
        });
        
        // ... (fetch logic to update the server)
        const updatedData = {
            person: users[userIndex].name,
            task: tasks[taskIndex].task,
            date: days[dayIndex],
            complete: updatedCompletion[taskIndex][dayIndex],
        };

        fetch('http://localhost:3000/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Update successful:', data);
        })
        .catch(error => {
            console.error('Error updating completion:', error);
        });
    };

    const renderCell = (taskIndex, dayIndex) => {
        return (
            <div className="diagonal-cell">
                {completion.map((userComp, userIndex) => (
                    <div className="half" key={userIndex}>
                        <button onClick={() => handleTaskClick(taskIndex, dayIndex, userIndex)} aria-label={`Toggle completion for ${users[userIndex]} on ${days[dayIndex]} for task ${tasks[taskIndex]}`}>
                            {userComp[taskIndex][dayIndex] ? '✅' : '❌'}
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    // Conditional rendering to prevent errors
    if (!users || !tasks || !completionData) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    {days.map((day, index) => <th key={index}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, taskIndex) => (
                    <tr key={taskIndex}>
                        <td>{task.task}</td> {/* Assuming task is an object with a 'name' property */}
                        {days.map((_, dayIndex) => (
                            <td key={dayIndex} style={{ cursor: 'pointer' }}>
                                {renderCell(taskIndex, dayIndex)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default Chart;
