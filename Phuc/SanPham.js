// const cars = [
//   {
//     name: "Honda CR-V",
//     brand: "Honda",
//     version: "2024",
//     price: "1.1 tỷ",
//     image: "./images/Honda-crv.jpg"
//   },
//   {
//     name: "Toyota Camry",
//     brand: "Toyota",
//     version: "Hybrid",
//     price: "1.2 tỷ",
//     image: "./images/toyota-camry.jpg"
//   },
//   {
//     name: "Kia K5",
//     brand: "Kia",
//     version: "2025",
//     price: "950 triệu",
//     image: "./images/Kia-K5.jpg"
//   },
//   {
//     name: "Kia Sorento",
//     brand: "Kia",
//     version: "2024",
//     price: "1.3 tỷ",
//     image: "./images/kia-sorento.jpg"
//   },
//   {
//     name: "Mercedes C300",
//     brand: "Mercedes",
//     version: "2024",
//     price: "2.1 tỷ",
//     image: "./images/mec-c300.jpg"
//   }
// ];

// const input = document.querySelector(".search-bar__input");
// const searchBtn = document.querySelector(".btn-search");
// const suggestionBtns = document.querySelectorAll(".suggestions__pill");
// const resultBox = document.getElementById("search-results");


// resultBox.style.display = "none";

// function renderCars(carList) {
//   if (carList.length === 0) {
//     resultBox.innerHTML = "<p style='color:white;'>Không tìm thấy xe phù hợp.</p>";
//     return;
//   }

//   resultBox.innerHTML = carList.map(car => `
//     <div class="car-card">
//       <img src="${car.image}" alt="${car.name}" class="car-img">
//       <div class="car-info">
//         <h3>${car.name}</h3>
//         <p>Hãng: ${car.brand}</p>
//         <p>Phiên bản: ${car.version}</p>
//         <p>Giá: ${car.price}</p>
//       </div>
//     </div>
//   `).join("");
// }

// function searchCars(keyword) {
//   keyword = keyword.toLowerCase().trim();

//   if (keyword === "") {
//     resultBox.style.display = "none";
//     return;
//   }

//   const filtered = cars.filter(car =>
//     car.name.toLowerCase().includes(keyword) ||
//     car.brand.toLowerCase().includes(keyword) ||
//     car.version.toLowerCase().includes(keyword)
//   );

//   resultBox.style.display = "block";
//   renderCars(filtered);
// }


// searchBtn.addEventListener("click", () => {
//   searchCars(input.value);
// });


// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     searchCars(input.value);
//   }
// });

// input.addEventListener("input", () => {
//   if (input.value.trim() === "") {
//     resultBox.style.display = "none";
//   }
// });


// suggestionBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     let keyword = btn.textContent.replace("🔥", "").trim();
//     input.value = keyword;
//     searchCars(keyword);
//   });
// });