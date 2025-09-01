// Accordion

const accordeonItmHeader = document.querySelectorAll(".accordeon-itm-header");

accordeonItmHeader.forEach((headerItem) => {
  headerItem.addEventListener("click", () => {
    const isActive = headerItem.classList.contains("active");

    if (isActive) {
      headerItem.classList.remove("active");
      const content = headerItem.nextElementSibling;
      if (content) {
        content.style.maxHeight = 0;
        content.style.opacity = 0;
      }
    } else {
      headerItem.classList.add("active");
      const accordeonItmContent = headerItem.nextElementSibling;
      if (accordeonItmContent) {
        accordeonItmContent.style.maxHeight =
          accordeonItmContent.scrollHeight + "px";
        accordeonItmContent.style.opacity = 1;
      }
    }
  });
});
