(()=>{const t=document.querySelector("#add-project"),e=document.querySelector("#form-container"),n=document.querySelector("#project-name"),o=document.querySelector("#create-btn"),s=document.querySelector("#cancel-btn"),r=document.getElementById("project-list"),a=document.querySelector("#add-todo"),c=document.querySelector("#modal"),i=document.querySelector("#confirm"),l=document.querySelector("#cancel");let d,u=[];const p=document.getElementById("task-list"),v=document.querySelector("form");let m;t.addEventListener("click",(()=>{t.style.display="none",e.style.display="flex"})),o.addEventListener("click",(()=>{const t=n.value.trim();if(t){const e=document.createElement("div");e.classList.add("project"),e.setAttribute("data-index",u.length),e.innerHTML=`\n      <button class="nav-button go-to-project">${t}</button>\n      <button class="nav-button delete-project">\n        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>\n        </svg>\n      </button>\n    `,r.appendChild(e),n.value="";const o=new y(t);u.push(o),d=u.length-1,g(u[d].tasks),b()}})),s.addEventListener("click",(()=>{n.value="",e.style.display="none",t.style.display="flex"}));class y{constructor(t){this.name=t,this.tasks=[]}}class h{constructor(t,e,n,o){this.title=t,this.description=e,this.dueDate=n,this.priority=o}}function g(t){t?(p.innerHTML="",t.forEach(((t,e)=>{let n=document.createElement("div");n.classList.add("todo-div"),n.setAttribute("data-task-index",e),n.innerHTML=`\n      <h3 class="todo-title">Title: ${t.title}</h3>\n      <p class="todo-description">Description: ${t.description}</p>\n      <p class="todo-date">Due Date: ${t.dueDate}</p>\n      <div class="priority">Priority Level: ${t.priority}</div>\n      <div class="is-completed">\n        <label for="done-${e}">Completed? </label>\n        <input type="checkbox" id="done-${e}" value="done">\n      </div>\n      <div class="change">\n        <button class="delete">Delete</button>\n        <button class="edit">Edit</button>\n      </div>\n    `,p.appendChild(n)}))):alert("Tasks are undefined")}function k(){document.querySelectorAll(".todo-div").forEach(((t,e)=>{t.setAttribute("data-task-index",e)}))}function b(){localStorage.setItem("projects",JSON.stringify(u))}a.addEventListener("click",(()=>{c.style.display="flex"})),i.addEventListener("click",(()=>{const t=document.querySelector("#myTitle").value,e=document.querySelector("#description").value,n=document.querySelector("#date").value,o=document.querySelector("#priority").value;if(t&&o){const s=new h(t,e,n,o);u[d]?(u[d].tasks.push(s),v.reset(),c.style.display="none",g(u[d].tasks),b()):alert("Invalid current project index: "+d)}else alert("Please fill out all the inputs.")})),l.addEventListener("click",(()=>{c.style.display="none",v.reset()})),r.addEventListener("click",(t=>{if(t.target.classList.contains("go-to-project")){const e=t.target.closest(".project");d=parseInt(e.getAttribute("data-index"),10),d>=0&&d<u.length?g(u[d].tasks):alert("Invalid project index: "+d)}else if(t.target.closest(".delete-project")){const e=t.target.closest(".project"),n=parseInt(e.getAttribute("data-index"),10);n>=0&&n<u.length?(u.splice(n,1),e.remove(),document.querySelectorAll(".project").forEach(((t,e)=>{t.setAttribute("data-index",e)})),b()):alert("Invalid project index for deletion: "+n)}})),p.addEventListener("click",(t=>{const e=t.target.closest(".todo-div");if(t.target.closest(".is-completed")){const n=t.target.querySelector("input[type='checkbox']");n&&(n.checked?e.style.textDecoration="line-through":e.style.textDecoration="none")}else if(t.target.classList.contains("delete"))m=parseInt(e.getAttribute("data-task-index")),u[d].tasks.splice(m,1),e.remove(),k(),b();else if(t.target.classList.contains("edit")){m=parseInt(e.getAttribute("data-task-index"));const t=document.querySelector("#myTitle"),n=document.querySelector("#description"),o=document.querySelector("#date"),s=document.querySelector("#priority");c.style.display="flex",t.textContent=u[d].tasks[m].title,n.textContent=u[d].tasks[m].description,o.value=u[d].tasks[m].dueDate,s.value=u[d].tasks[m].priority,u[d].tasks.splice(m,1),e.remove(),k(),b()}})),document.addEventListener("DOMContentLoaded",(()=>{!function(){const t=localStorage.getItem("projects");t&&(u=JSON.parse(t),u.forEach(((t,e)=>{const n=document.createElement("div");n.classList.add("project"),n.setAttribute("data-index",e),n.innerHTML=`\n      <button class="nav-button go-to-project">${t.name}</button>\n      <button class="nav-button delete-project">\n        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>\n        </svg>\n      </button>\n    `,r.appendChild(n)})))}(),u.length>0&&(d=0,g(u[d].tasks))}))})();