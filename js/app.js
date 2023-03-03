const loadPage = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  //   console.log(phones);
  const displayContainer = document.getElementById("div-container");
  displayContainer.textContent = "";
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noFound = document.getElementById("no-found");
  //   console.log(phones.length)
  if (phones.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
            <img class="p-5" src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" type="" data-bs-toggle="modal"
                data-bs-target="#loadPhoneDetails">Show Details</button>

            </div>
          </div>
    `;
    displayContainer.appendChild(div);
  });
  spinnerToggole(false);
};
const processSearch = (dataLimit) => {
  spinnerToggole(true);
  const searchField = document.getElementById("search-field").value;
  loadPage(searchField, dataLimit);
};

document.getElementById("search-btn").addEventListener("click", function () {
  processSearch(12);
  //   console.log(searchField);
});

document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key == 'Enter'){
        processSearch(10)
    }
})

// spinner
const spinnerToggole = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails=async (id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res= await fetch(url)
    const data=await res.json()
    phoneDetails(data.data)
}
const phoneDetails=(phone)=>{
    console.log(phone)
    const loadPhoneDetailsLabel=document.getElementById('loadPhoneDetailsLabel');
    loadPhoneDetailsLabel.innerText=phone.name;
    const phoneRelease=document.getElementById('phone-release');
    phoneRelease.innerHTML= `
    <p>${phone.releaseDate ? phone.releaseDate: 'Release Date No Found'}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet? phone.mainFeatures.chipSet: 'No Found'}</p>
    <p>Bluetooth: ${phone.others.Bluetooth}</p>
    
    `
}
loadPage('samsung');
