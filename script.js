const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function generateID(){
  return "BK-" + Math.random().toString(36).substr(2,6).toUpperCase();
}

function showToast(message){

  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(()=>{
    toast.style.display = "none";
  },2500);
}

function scrollToBooking(){
  document.getElementById("booking").scrollIntoView({
    behavior:"smooth"
  });
}

document.getElementById("bookingForm")
.addEventListener("submit",function(e){

  e.preventDefault();

  const booking = {
    id: generateID(),
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    device: document.getElementById("device").value,
    issue: document.getElementById("issue").value,
    status:"Pending"
  };

  bookings.push(booking);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

  document.getElementById("bookingResult")
  .innerHTML = `
    <div class="card" style="margin-top:20px;">
      <h3>Booking Created</h3>
      <p>Your Booking ID:</p>
      <strong>${booking.id}</strong>
    </div>
  `;

  showToast("Booking created successfully!");

  document.getElementById("bookingForm").reset();
});

function trackBooking(){

  const id = document
  .getElementById("trackInput")
  .value
  .trim();

  const booking = bookings.find(
    b => b.id === id
  );

  if(!booking){

    document.getElementById("trackResult")
    .innerHTML = `
      <p style="margin-top:20px;color:red;">
        Booking not found
      </p>
    `;

    return;
  }

  document.getElementById("trackResult")
  .innerHTML = `
    <div class="card" style="margin-top:20px;">
      <h3>${booking.id}</h3>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Device:</strong> ${booking.device}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
    </div>
  `;
}
