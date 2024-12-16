console.log("video script added");
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

//create display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
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
      <span class = "absolute right-2 bottom-2 text-white bg-black rounded p-1">  ${video.others.posted_date} </span>
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


//create display catagories
const displayCategories = (categories) => {

const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        const button= document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        categoryContainer.append(button);
    })
}

loadCategories();
loadVideos();