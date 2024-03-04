document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const temp = document.querySelector("form").elements;
  console.log(temp);
});
