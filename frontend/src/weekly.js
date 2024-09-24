
const stickerChart = document.getElementById("sticker")

function addTask(taskname, stickerChart) {
    const task = document.createElement("div");
    task.textContent = taskname;

    stickerChart.appendChild(task);

    for (let i = 0; i < 7; i++) {
        const newDiv = document.createElement("div");
        const btn = document.createElement("button");
        btn.setAttribute("type","button");
        newDiv.appendChild(btn);
        stickerChart.appendChild(newDiv);
    }
}


export default addTask;