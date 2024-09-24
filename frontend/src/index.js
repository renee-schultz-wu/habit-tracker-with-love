import "./styles.css";
import addTask from "./weekly";

const taskList = ["Exercise", "Shower"];
const stickerChart = document.getElementById("sticker");

taskList.forEach((task) => addTask(task, stickerChart));

