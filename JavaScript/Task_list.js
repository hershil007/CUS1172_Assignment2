document.addEventListener('DOMContentLoaded', function() {

    let tasks = [];
    var select_count = 1;
    document.querySelector("#create-task").onsubmit = function() {

        //Create new list element
        const task = document.createElement('li');
        //get inputted task
        let task_value = document.querySelector('#task').value;

        if (tasks.length > 0)
        {
            if(tasks.includes(task_value) === true)
            {
                alert("Task Already Exists");
                return false;
            }
        }
        //get the priority level
        let priority_value = document.querySelector('#priority').value - 1;
        //Create list element with complete, incomplete, and remove radio buttons.
        task.innerHTML = `
        <span>Task: </span><span id=${task_value + "text"}>${task_value}</span> <br>
        <label for="complete">Complete</label>
        <input type="radio" id="complete" name=${task_value} value="complete-task">
        <label for="incomplete">Incomplete</label>
        <input type="radio" id="incomplete" name=${task_value} value="incomplete-task" checked="True">
        <label for="remove">Remove</label>
        <input type="radio" id="remove" name=${task_value} value="remove-task">
        `



        //Add to array at specified position
        let appendTask = tasks.splice(priority_value, 0, task_value);
        //Increment list count for priority
        select_count += 1;
        let option = document.createElement("option");
        option.text = select_count;
        document.getElementById("priority").add(option);
        //Sets task id to the value
        task.setAttribute("id", task_value);
        //Append new task to end of the list
        document.querySelector('#task-list').append(task);
        //Get list elements
        const b = document.getElementById('task-list').getElementsByTagName("li");
        let task_list = document.getElementById("task-list");


        //If there are more than 1 items in the list and the priority value is less than the total list length,
        //change priority value
        if (b.length > 1 && priority_value < select_count) {
            task_list.insertBefore(task, b[priority_value]);
        }

        document.querySelector("#task").value = '';
        console.log(tasks)
        return false;


    }

    document.querySelector("#task-toggle").onsubmit = function() {

        for (var i = 0; i < tasks.length; i++)
        {
            let item = document.getElementsByName(tasks[i]);
            for(j = 0; j < item.length; j++)
            {
                if (item[j].checked && item[j].value === "complete-task")
                {
                    let text = document.getElementById(tasks[i] + "text");
                    console.log(text);
                    text.style.textDecoration = "line-through";
                }
                else if (item[j].checked && item[j].value === "remove-task")
                {
                    let list = document.getElementById('task-list');
                    list.removeChild(list.childNodes[i+1]);
                    tasks.splice(i, 1);
                }
                else if (item[j].checked && item[j].value === "incomplete-task")
                {
                    let text = document.getElementById(tasks[i] + "text");
                    console.log(text);
                    text.style.textDecoration = "";
                }
            }
        }
        return false;

    }
});