
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

    if (passengers < 1 || passengers > 6) {
        message.textContent = "Choose between 1 and 6 passengers.";
        message.style.color = "red";
        return;
    }

    message.style.color = "green";
    message.textContent =
        `Searching buses from ${from} to ${to} on ${date} for ${passengers} passenger(s).`;

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}

function bookBus(busName, price) {
    const passengers = Number(
        document.getElementById("passengers").value
    );

    const total = price * passengers;

    document.getElementById("confirmation").textContent =
        `Selected: ${busName} | Passengers: ${passengers} | Total: ₹${total}. Demo only — booking is not confirmed.`;
}
