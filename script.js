
const subBtn = document.querySelector('.sous-btn');
const userList = [];

const svgContent=`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const Psvg=`<?xml version="1.0" encoding="utf-8"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<title>stop</title>
<path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>
</svg>`;



function createDynamicly(user) {
  const PrincipalBoX = document.createElement('div');
  PrincipalBoX.classList = "p-box";

  const TextBox = document.createElement('div');
  TextBox.classList = "text-box";

  const T1 = document.createElement('p');
  T1.innerHTML = `Post ${user.post}-${user.time/60}`;
  TextBox.appendChild(T1);

  const T2 = document.createElement('p');
  T2.innerHTML = `${user.userName}`;
  TextBox.appendChild(T2);

  const TimeBox = document.createElement('div');
  TimeBox.classList = "ttime-box";

  const time = document.createElement('p');
  TimeBox.appendChild(time);

  PrincipalBoX.appendChild(TextBox);
  PrincipalBoX.appendChild(TimeBox);


  // Start updating the time dynamically
  const intervalId = setInterval(() => {
    if (user.time <= 0) {
      clearInterval(intervalId);// Stop updating when time reaches zero
      principalBoxContainer.removeChild(PrincipalBoX);
    }

    time.innerHTML = `${convertSecondsToTimeFormat(user.time)}`;
    user.time--;
        // Set background color based on remaining time
        if (user.time > 1800) { // more than 30 minutes
          PrincipalBoX.style.backgroundColor = '#A1EEBD';
        } else if (user.time > 300) { // between 5 and 30 minutes
          PrincipalBoX.style.backgroundColor = '#FFC47E';
        } else { // less than 5 minutes
          PrincipalBoX.style.backgroundColor = '#B80000';
        }

  }, 1000);

  return PrincipalBoX;
}



function appendRusltToContainer(user) {
  const DynamicElement = createDynamicly(user);
  const principalBoxContainer = document.getElementById("principalBoxContainer");

  principalBoxContainer.appendChild(DynamicElement);


  const stopANDSuppContainer=document.createElement('div');
  stopANDSuppContainer.classList="stopANDdeleteContainer";

  const stop=document.createElement('div');
  stop.classList="stop";
   const pUrl=`data:image/svg+xml,${encodeURIComponent(Psvg)}`;
 console.log(pUrl);
 stop.style.background = `url('${pUrl}')`;
 stop.style.backgroundSize = 'cover';
 

  const supp=document.createElement('div');
  supp.classList="stop";
  const svgUrl=`data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  console.log(svgUrl);
  supp.style.background = `url('${svgUrl}')`;
  supp.style.backgroundSize = 'cover';

  // seting the pause svg as a background 
  stopANDSuppContainer.appendChild(stop);
  stopANDSuppContainer.appendChild(supp);

  principalBoxContainer.appendChild(stopANDSuppContainer);
}




// sub btn event listner 
subBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const post = document.getElementById("post").value;
  const timeInMinutes = parseInt(document.querySelector('input[name="valide-time"]:checked').value, 10);
  // Check if any required input is missing
  if (!name || !post || isNaN(timeInMinutes)) {
    alert("Please fill in all required fields.");
    return;
  }
  // Check if the user limit is reached
  if (userList.length >= 10) {
    alert("You've reached the limit of users (10).");
    return;
  }
  const newUser = {
    userName: name,
    post: post,
    time: timeInMinutes * 60, // Convert minutes to seconds
  };
  userList.push(newUser);
  appendRusltToContainer(newUser);
  // Reset the form
  document.getElementById("myform").reset();
});




// the reset logic 
const restBtn=document.querySelector('.rest-btn');
restBtn.addEventListener('click',function(event){
  event.preventDefault();
  resetApplication();
});
function resetApplication() {
  // Reset any variables, data structures, or state
  userList.length = 0; // Clear the user list
  clearIntervalAll(); // Clear all interval timers

  // Remove all dynamic elements from the UI
  const principalBoxContainer = document.getElementById("principalBoxContainer");
  principalBoxContainer.innerHTML = "";}

function clearIntervalAll() {
    // Iterate through userList and clear interval for each user
    for (const user of userList) {
        clearInterval(user.intervalId);
    }
}



// converting time function 
function convertSecondsToTimeFormat(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

//setting the select input to pick a post only one time 
const postDropdown = document.getElementById("post");
// Add an onchange event to the post dropdown
postDropdown.addEventListener("change", function () {
  // Get the selected option
  const selectedOption = postDropdown.options[postDropdown.selectedIndex];

  // Disable the selected option
  selectedOption.disabled = true;
});




