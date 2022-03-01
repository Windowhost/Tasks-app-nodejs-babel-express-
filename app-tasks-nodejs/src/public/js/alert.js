// Funtion that manage the mobile button menu
export default function alertHandler () {
    const $succesAlert = document.querySelector(".alert-container");
    console.log($succesAlert)
    setTimeout(() => {
      $succesAlert.classList.add("none")
    }, 2000);
}

