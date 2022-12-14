// selectors
const refreshBtn = document.getElementById("reload_button");
const reload_svg = document.getElementById("reload_svg");
const reload_button = document.getElementById("reload_button");
const copyBtn = document.getElementById("copy");
const password = document.getElementById("password");
const slider = document.getElementById("my_range");
const output = document.getElementById("lenght_value");
const how_strong_password = document.getElementById("how_strong_password");
const password_image_svg = document.getElementById("password_image_svg");
const popup = document.getElementsByClassName("popup");
const abc_lower = document.getElementById("abc_lower");
// selectors chackboxes
const checkboxes = document.getElementsByClassName("checkboxes");
const abc_upper_checkbox = document.getElementById("abc_upper_checkbox");

const abcUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const abcLower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialCharacters = "!@#$%^&*";

const passwordOptions = {
  abc_upper: abcUpper,
  abc_lower: abcLower,
  numbers: numbers,
  special_chars: specialCharacters,
};

function getValueCheckbox() {
  const checkboxes = document.getElementsByName("checkbox_char");
  let result = "";
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      result += passwordOptions[checkboxes[i].value];
    }
  }
  return result;
}

// Slider
how_strong_password.innerText = "strong";
output.innerHTML = slider.defaultValue; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)

// Reset button animation

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

refreshBtn.addEventListener("click", async () => {
  //Do what you want here
  // console.log("Before the delay");
  reload_svg.classList.add("fa-spin");

  await generatePassword(Number(output.innerText));

  await delay(1);

  // console.log("After the delay");
  reload_svg.classList.remove("fa-spin");
});

// Copy to clipboard

const copy = () => {
  let textToCopy = password.innerText;
  navigator.clipboard.writeText(textToCopy);
};

copyBtn.addEventListener("click", copy);

// Random password generator

// console.log(allChars);

slider.oninput = async function () {
  output.innerHTML = this.value;
  if (this.value > 11) {
    password_image_svg.src = "./static/green.svg";
    how_strong_password.innerText = "strong";
    how_strong_password.style.backgroundColor = "#507c5c";
  }
  if (this.value > 8 && this.value < 12) {
    password_image_svg.src = "./static/yellow.svg";
    how_strong_password.innerText = "medium";
    how_strong_password.style.backgroundColor = "#FFC61B";
  }
  if (this.value < 6) {
    password_image_svg.src = "./static/red.svg";
    how_strong_password.innerText = "weak";
    how_strong_password.style.backgroundColor = "#B3404A";
  }

  await generatePassword(Number(output.innerText));
};

const popupFunc = async () => {
  const popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  await delay(2);
  popup.classList.toggle("show");
};

function generatePassword(length) {
  const characters = getValueCheckbox();
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  password.innerText = result;
}
