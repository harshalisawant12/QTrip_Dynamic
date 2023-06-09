import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventureId = new URLSearchParams(search);
  let id = adventureId.get("adventure");
  return id;
}
// Place holder for functionality to work in the Stubs
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const resp = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const json = await resp.json();
    console.log(json);
    return json;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  adventure.images.forEach((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `<img src=${image} alt="" class="activity-card-image">`;
    document.getElementById("photo-gallery").append(ele);
  });
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  images.forEach((image, ind) => {
    let div1 = document.createElement("div");
    div1.className = `carousel-item ${ind === 0 ? "active" : ""}`;
    div1.innerHTML = `<img src="${image}" alt="" class="activity-card-image"/>`;
    document.getElementById("carousel-inner").append(div1);
  });
}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available)
  {
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else
  {
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let finalCost=adventure.costPerHead*persons;
  console.log(finalCost);
  document.getElementById("reservation-cost").innerHTML=finalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let form=document.getElementById("myForm");
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
  let url=config.backendEndpoint+"/reservations/new ";
  let FormElements=form.elements;
    let bodyString=JSON.stringify({
      name:FormElements.name.value,
      date:FormElements.date.value,
      person:FormElements.person.value,
      adventure: adventure.id,  
    });
    try{
         const res=await fetch(url,{
          method: "POST",
          body: bodyString,
          headers: {
            "Content-Type": "application/json",
            },
            });
        if(res.ok)
        {
          alert("Success!");
          window.location.reload();
        }
        else
        {
          alert("Failed");
          Window.location.reload();
        }
    }
    catch(err){
      console.log(err);
      alert("Failed- fetch call resulted in error");
    }
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner=document.getElementById("reserved-banner");
  adventure.reserved==false?banner.style.display="none":banner.style.display="block";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
