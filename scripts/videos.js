console.log("video script added");
// get hour and rest second

function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
   return `${hour}hour ${minute}minute ${remainingSecond}second ago`;
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
     console.log(buttons);
     for(let btn of buttons){
        btn.classList.remove("active");
    }
}

// ftech, show and load catagories in html//

//create load catagories
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data)=> displayCategories(data.categories))
    .catch((error) => console.log(error));
}

const loadVideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
}

// load category video

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // sobaike active class remove korao
        removeActiveClass();
        // id er class ka active koraw
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

//create display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
    if (videos.length == 0){
        videoContainer.classList.remove("grid");
           videoContainer.innerHTML = `
           <div class ="min-h-[600px] flex flex-col gap-5 justify-center items-center">
               <img src="assets/icon.png" />
               <h2 class="text-center text-xl font-bold">
               NO CONTENT HERE IN THIS CATEGORY
               </h2>
           </div>
           `;
           return;
    } else {
         videoContainer.classList.add("grid");
    }
videos.forEach(video => {
console.log(video);
const card = document.createElement("div");
card.classList ="card card-compact "; 
card.innerHTML = 
`
 <figure class ="h-[200px] relative">
    <img
      src=${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date?.length == 0? "" :
`        <span class = "absolute text-xs right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }

  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class = "w-10 h-10 rounded-full object-cover" src = ${video.authors[0].profile_picture} />
    </div>
<div>
<h2> ${video.title} </h2>
  <div class= "flex item-center gap-2">
<p class= "text-gray-400"> ${video.authors[0].profile_name} </p>

${video.authors[0].verified == true ? `<img class= "w-5" src = https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png />` : ""}
</div>
</div>

</div>
`
videoContainer.append(card);
})
}


//create display categories
const displayCategories = (categories) => {

const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement("div");
           buttonContainer.innerHTML =
           `<button id= "btn-${item.category_id}" onclick = "loadCategoryVideos(${item.category_id})" class = "btn">
           ${item.category}
           </button>
           `;

        categoryContainer.append(buttonContainer);
    })
}

loadCategories();
loadVideos();