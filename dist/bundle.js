(()=>{const e=document.querySelector("#add-project"),t=document.querySelector("#form-container"),n=document.querySelector("#project-name"),o=document.querySelector("#create-btn"),r=document.querySelector("#cancel-btn"),s=document.getElementById("project-list"),c=document.querySelector("#add-todo"),l=document.querySelector("#modal"),i=document.querySelector("#confirm"),d=document.querySelector("#cancel");let a,u=[];const p=document.getElementById("task-list"),y=document.querySelector("form");e.addEventListener("click",(()=>{e.style.display="none",t.style.display="flex"})),o.addEventListener("click",(()=>{const e=n.value.trim();if(e){const t=document.createElement("div");t.classList.add("project"),t.setAttribute("data-index",u.length),t.innerHTML=`\n            <button class="nav-button go-to-project">${e}</button>\n            <button class="nav-button delete-project">\n                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>\n                </svg>\n            </button>\n        `,s.appendChild(t),n.value="";const o=new m(e);u.push(o),a=u.length-1,v(u[a].tasks)}})),r.addEventListener("click",(()=>{n.value="",t.style.display="none",e.style.display="flex"}));class m{constructor(e){this.name=e,this.tasks=[]}}class h{constructor(e,t,n,o){this.title=e,this.description=t,this.dueDate=n,this.priority=o}}function v(e){e?(p.innerHTML="",e.forEach(((e,t)=>{let n=document.createElement("div");n.classList.add("todo-div"),n.setAttribute("data-task-index",t),n.innerHTML=`\n            <h3 class="todo-title">Title : ${e.title}</h3>\n            <p class="todo-description">Descrption: ${e.description}</p>\n            <p class="todo-date">Due Date: ${e.dueDate}</p>\n            <div class="priority">Priority Level: ${e.priority}</div>\n            <label for="done">Completed?</label>\n            <input type="checklist" id="done">\n        `,p.appendChild(n)}))):console.error("Tasks are undefined")}c.addEventListener("click",(()=>{l.style.display="flex"})),i.addEventListener("click",(()=>{const e=document.querySelector("#myTitle").value,t=document.querySelector("#description").value,n=document.querySelector("#date").value,o=document.querySelector("#priority").value;if(e&&o){const r=new h(e,t,n,o);u[a]?(u[a].tasks.push(r),y.reset(),l.style.display="none",v(u[a].tasks)):console.error("Invalid current project index:",a)}else alert("Please fill out all the inputs.")})),d.addEventListener("click",(()=>{l.style.display="none",y.reset()})),s.addEventListener("click",(e=>{if(e.target.classList.contains("go-to-project")){const t=e.target.closest(".project");if(a=parseInt(t.getAttribute("data-index"),10),!(a>=0&&a<u.length))throw new error("Invalid project index:",a);v(u[a].tasks)}else if(e.target.closest(".delete-project")){const t=e.target.closest(".project"),n=parseInt(t.getAttribute("data-index"),10);if(!(n>=0&&n<u.length))throw new error("Invalid project index for deletion:",n);u.splice(n,1),t.remove(),document.querySelectorAll(".project").forEach(((e,t)=>{e.setAttribute("data-index",t)}))}}))})();