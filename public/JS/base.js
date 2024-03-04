const detail = async function (name, age) {
  const res = await axios({
    method: "POST",
    url: "http://127.0.0.1:3000/",
    data: {
      name,
      age,
    },
  });
};

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const temp = document.querySelector("form").elements;
  // console.log(temp);
  for (let i = 0; i < temp.length; i++) {
    console.log(temp[i].value);
  }
  detail(temp[0].value, temp[1].value);
});
