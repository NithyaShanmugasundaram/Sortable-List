const list = document.getElementById("list");
const btn = document.getElementById("btn");
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];
let dragStartIndex;
let listItems = [];
//create list in the DOM
const createList = () => {
  [...richestPeople]
    .map((a) => ({
      people: a,
      value: Math.random(),
    }))
    .sort((a, b) => {
      return a.value - b.value;
    })
    .map((a) => a.people)
    .forEach((people, index) => {
      console.log(people);
      const liItem = document.createElement("li");
      liItem.setAttribute("data-index", index);
      liItem.innerHTML = `<span class="number">${index + 1}</span>
      <div class="peopleList" draggable="true">${people}
      <i class="fas fa-grip-lines"></i></div>`;
      listItems.push(liItem);
      list.appendChild(liItem);
    });
  addEventListener();
};
const addEventListener = () => {
  const draggables = document.querySelectorAll(".peopleList");
  console.log(draggables);
  const draggable_lists = document.querySelectorAll(".list li");
  draggables.forEach(draggable =>{
    draggable.addEventListener("dragstart", dragStart)
  });
  draggable_lists.forEach(draggable_list => {
    draggable_list.addEventListener("dragover", dragOver);
    draggable_list.addEventListener("dragenter", dragEnter);
    draggable_list.addEventListener("dragleave", dragLeave);
    draggable_list.addEventListener("drop", dragDrop);
  });
};
function dragStart() {
 
    dragStartIndex = +this.closest('li').getAttribute('data-index');

  }
function dragOver(e) {
  e.preventDefault();
};
function dragEnter() {
  this.classList.add("over");
};
function dragLeave() {
  this.classList.remove("over");
};
function dragDrop() {
  let dragDropIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragDropIndex);
  this.classList.remove("over");
};
const swapItems=(fromIndex,toIndex)=>{
  const itemOne = listItems[fromIndex].querySelector(".peopleList");
  const itemTwo = listItems[toIndex].querySelector(".peopleList");
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

function checkOrder(){
    
    listItems.forEach((listitem,index)=> {
        
    const name = listitem.querySelector('.peopleList').innerText.trim();
   
       if(name !== richestPeople[index]){
           console.log(this)
        listitem.classList.add('wrong')
       }
       else{
        listitem.classList.remove('wrong')
        listitem.classList.add('right')
       
       }
    })
}

btn.addEventListener('click',checkOrder)


createList();
