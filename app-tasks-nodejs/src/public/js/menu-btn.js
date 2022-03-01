// Funtion that manage the mobile button menu
export default function navbarButton () {
    const $btnMenu = document.querySelector(".menu-btn"),
     $menu = document.querySelector(".menu"),
     $dropdown = document.querySelector(".down"),
     $dropdownContent = document.querySelector(".dropdawn-content-1")
    

    //Add an remove the hambuerger menu
    $btnMenu.addEventListener("click", e =>{
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active")
    })

     //Manage the button icon behavior when a nav link is cliked
     document.addEventListener("click", e =>{
        if(!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none")
        $btnMenu.firstElementChild.classList.add("none")
        $menu.classList.remove("is-active")
     })

    //  Lisener manage the dropdown menu
     $dropdown.addEventListener("click", e =>{
      e.preventDefault();
      $dropdownContent.classList.toggle("menu-down");
     })
     
}