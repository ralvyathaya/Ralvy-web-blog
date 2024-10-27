document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn")
  const searchBar = document.querySelector(".searchBar")
  const searchInput = document.querySelector(".searchInput") // Corrected selector
  const searchClose = document.getElementById("searchClose") // Corrected selector
  const pageContent = document.querySelector(".page-content") // Select main content to apply blur

  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      searchBar.classList.add("open")
      pageContent.classList.add("blurred-background")
      button.setAttribute("aria-expanded", "true")
      searchInput.focus()
    })
  })

  searchClose.addEventListener("click", function () {
    searchBar.classList.remove("open")
    pageContent.classList.remove("blurred-background")
    allButtons.forEach((button) =>
      button.setAttribute("aria-expanded", "false")
    )
  })
})
