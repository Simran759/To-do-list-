const input = document.querySelector(".inner input");
const addBtn = document.querySelector(".inner button");
const todoList = document.querySelector(".to_do");
const deleteAllBtn = document.querySelector(".footer button");

input.onkeyup = () => {
  let userEnteredValue = input.value;
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

show();

addBtn.onclick = () => {
  let userEnteredValue = input.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  
  listArray.push({ text: userEnteredValue, status: "pending" });
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  
  show();
  addBtn.classList.remove("active");
};

function show() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  const pendingCount = listArray.filter(item => item.status === "pending").length;
  pendingTasksNumb.textContent = pendingCount;

  deleteAllBtn.classList.toggle("active", listArray.length > 0);

  let newLiTag = "";
  listArray.forEach((task, index) => {
    let checked = task.status === "done" ? "checked" : "";
    let strike = task.status === "done" ? "style='text-decoration: line-through; color: gray;'" : "";
    newLiTag += `<li ${strike}>
                  <input type="checkbox" onclick="toggleStatus(${index})" ${checked}>
                  ${task.text}
                  <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>
                 </li>`;
  });
  
  todoList.innerHTML = newLiTag;
  input.value = "";
}

function toggleStatus(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = JSON.parse(getLocalStorageData);

  listArray[index].status = listArray[index].status === "pending" ? "done" : "pending";
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  show();
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = JSON.parse(getLocalStorageData);

  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  show();
}

deleteAllBtn.onclick = () => {
  localStorage.setItem("New Todo", JSON.stringify([]));
  show();
};
