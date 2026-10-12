
let selectedBus = "";
let ticketPrice = 0;
let selectedSeats = [];

const bookedSeats = ["U3", "U8", "L5"];

function searchBuses() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers = Number(
        document.getElementById("passengers").value
    );
    const message = document.getElementById("message");

    if (from === to) {
        message.textContent = "Please select different cities.";
        message.style.color = "red";
        return;
    }

    if (!date) {
        message.textContent = "Please select your journey date.";
        message.style.color = "red";
        return;
    }

    if (date < new Date().toISOString().split("T")[0]) {
        message.textContent = "Please select today or a future date.";
        message.style.color = "red";
        return;
    }

    if (!Number.isInteger(passengers) ||
        passengers < 1 || passengers > 6) {
        message.textContent = "Select 1 to 6 passengers.";
        message.style.color = "red";
        return;
    }

    message.style.color = "green";
    message.textContent = `Buses from ${from} to ${to} on ${date}`;

    document.getElementById("results").hidden = false;
    document.getElementById("seatSection").hidden = true;
    document.getElementById("confirmation").hidden = true;

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}

function selectBus(busName, price) {
    selectedBus = busName;
    ticketPrice = price;
    selectedSeats = [];

    document.getElementById("seatMessage").textContent =
        "Select " + document.getElementById("passengers").value +
        " berth(s).";

    createSeats("upperSeats", "U");
    createSeats("lowerSeats", "L");
    updateTotal();

    document.getElementById("seatSection").hidden = false;
    document.getElementById("confirmation").hidden = true;

    document.getElementById("seatSection").scrollIntoView({
        behavior: "smooth"
    });
}

function createSeats(containerId, prefix) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let i = 1; i <= 15; i++) {
        const seatId = prefix + i;
        const seat = document.createElement("button");

        seat.type = "button";
        seat.textContent = seatId;
        seat.className = "seat";

        if (bookedSeats.includes(seatId)) {
            seat.classList.add("booked");
            seat.disabled = true;
            seat.title = "Already booked";
        } else {
            seat.addEventListener("click", function () {
                toggleSeat(seatId, seat);
            });
        }

        container.appendChild(seat);
    }
}

function toggleSeat(seatId, seatElement) {
    const passengerCount = Number(
        document.getElementById("passengers").value
    );

    if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(
            seat => seat !== seatId
        );
        seatElement.classList.remove("selected");
    } else {
        if (selectedSeats.length >= passengerCount) {
            document.getElementById("seatMessage").textContent =
                "You can select only " + passengerCount + " seat(s).";
            return;
        }

        selectedSeats.push(seatId);
        seatElement.classList.add("selected");
    }

    document.getElementById("seatMessage").textContent =
        "Selected seats: " +
        (selectedSeats.join(", ") || "None");

    updateTotal();
}

function updateTotal() {
    document.getElementById("total").textContent =
        "Total Fare: ₹" + (selectedSeats.length * ticketPrice);
}

function confirmBooking() {
    const passengerCount = Number(
        document.getElementById("passengers").value
    );

    if (selectedSeats.length !== passengerCount) {
        document.getElementById("seatMessage").textContent =
            "Please select exactly " + passengerCount + " seat(s).";
        return;
    }

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const totalFare = selectedSeats.length * ticketPrice;

    document.getElementById("bookingDetails").innerHTML = `
        <p><strong>Bus:</strong> ${selectedBus}</p>
        <p><strong>Route:</strong> ${from} → ${to}</p>
        <p><strong>Journey Date:</strong> ${date}</p>
        <p><strong>Seats:</strong> ${selectedSeats.join(", ")}</p>
        <p><strong>Passengers:</strong> ${passengerCount}</p>
        <p><strong>Total Fare:</strong> ₹${totalFare}</p>
        <p><em>Demo booking only — no real ticket has been booked.</em></p>
    `;

    document.getElementById("confirmation").hidden = false;
    document.getElementById("confirmation").scrollIntoView({
        behavior: "smooth"
    });
}
