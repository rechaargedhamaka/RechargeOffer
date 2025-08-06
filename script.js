// 🔹 आपके Telegram Bot का Token और Chat ID डालें
const BOT_TOKEN = "YOUR_BOT_TOKEN"; 
const CHAT_ID = "YOUR_CHAT_ID";

// 🔹 आपका UPI ID (hidden in QR only)
const UPI_ID = "shivsahay172@okhdfcbank";

let selectedPlan = "";
let selectedAmount = "";

function showPayment(plan, amount) {
    selectedPlan = plan;
    selectedAmount = amount;
    document.getElementById("offers").style.display = "none";
    document.getElementById("payment").style.display = "block";
    document.getElementById("pay-title").innerText = `Pay ₹${amount} for ${plan}`;

    // Create UPI Payment link
    let upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=Recharge&am=${amount}&cu=INR`;
    
    // Generate QR Code
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: upiLink,
        width: 200,
        height: 200
    });
}

function sendOrder() {
    let mobile = document.getElementById("mobile").value.trim();
    if (!mobile) {
        alert("Please enter your mobile number");
        return;
    }

    let message = `📱 New Recharge Order\n\nOperator: ${selectedPlan}\nAmount: ₹${selectedAmount}\nMobile: ${mobile}\nStatus: Paid (Confirmed by user)`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Order sent to admin!");
        location.reload();
    })
    .catch(err => console.error(err));
}
