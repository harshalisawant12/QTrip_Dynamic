import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const para = new URLSearchParams(search);
  console.log(para);
  let city = para.get("city");
  return city;
}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const resp = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const json = await resp.json();
    console.log(json);
    return json;
  } catch (e) {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let div = document.getElementById("data");
  adventures.forEach((obj)=> {
    let colDiv = document.createElement("div");
    colDiv.className = "col-lg-3 col-6 my-4";
    colDiv.innerHTML = `
  <a href= "./detail/?adventure=${obj.id}" id="${obj.id}"> 
  <div class="activity-card position-relative">
  <div class="category-banner">${obj.category}</div>
  <img src=${obj.image} alt="${obj.category}" class="activity-card-image">
  <div class="w-100">
  <div class="d-lg-flex justify-content-between text-center px-3 pt-2">
  <h5>${obj.name}</h5>
  <p>₹${obj.costPerHead}</p>
  </div>
  <div class="d-lg-flex justify-content-between text-center px-3 pt-2">
  <h5>Duration</h5>
  <p>${obj.duration} Hours</p>
  </div>
  </div>
  </div>
  </a>
  `;
    div.append(colDiv);
    console.log(colDiv.innerHTML);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list,high);
  let filterByDurationList=list.filter((e)=>{
   return e.duration>=low && e.duration<=high
  })
  console.log(filterByDurationList);
  return filterByDurationList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log(categoryList);
  let filterByCategoryList=[];
   
    list.forEach((element)=>{
      if(categoryList.includes(element.category))
      {
        filterByCategoryList.push(element);
      }
    })

  return filterByCategoryList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  let finalFilter=[];
   //{ duration: "", category: [] }
   let arr=filters.duration.split("-");
   let [low,high]=arr;
    if(filters.category.length>0 && filters.duration.length>0)
    {
          finalFilter=filterByCategory(list,filters.category);
          finalFilter=filterByDuration(finalFilter,parseInt(low),parseInt(high));
    }
    else if(filters.duration.length>0)
    {
         finalFilter=filterByDuration(list,parseInt(low),parseInt(high));
    }
    else if(filters.category.length>0)
    {
         finalFilter=filterByCategory(list,filters.category);
    }
    else
    {
      return list;
    }
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    
  // Place holder for functionality to work in the Stubs
  return finalFilter;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
   return JSON.parse(window.localStorage.getItem('filters'));
 
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters.category;
  categoryList.forEach((element)=>{
    var div= document.createElement("div");
    div.className="category-filter";
    div.innerText=element;
    document.getElementById('category-list').append(div);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
