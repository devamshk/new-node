const split = async function (title, amount, person, people) {
  const count = people.length;
  const res = await axios({
    method: "POST",
    url: "http://127.0.0.1:3000/cost",
    data: {
      title,
      amount,
      person,
      people,
      count,
    },
  });
};

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const temp = document.querySelector("form").elements;
  console.log(temp);
  const people = [];
  console.log(temp.value);
  for (let i = 0; i < temp.length; i++) {
    // console.log(temp[i].value);
    if (temp[i].checked == true) {
      people.push(temp[i].value);
    }
  }
  console.log(people);
  split(temp[0].value, temp[1].value, temp[2].value, people);
});
