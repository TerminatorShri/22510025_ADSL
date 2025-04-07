import axios from "axios";
import random from "random";
import dayjs from "dayjs";

// List of weather station IDs
const stations = ["WS001", "WS002", "WS003"];

// Generate and send random temperature reading
async function sendReading() {
  const weather_station_id = stations[Math.floor(Math.random() * stations.length)];
  const temperature = parseFloat((random.float(-10.0, 40.0)).toFixed(2));
  const reading_time = dayjs().toISOString();

  try {
    const response = await axios.post("http://localhost:3000/insert", {
      weather_station_id,
      reading_time,
      temperature,
    });
    console.log(`[${reading_time}] Sent: ${weather_station_id} - ${temperature}°C`);
  } catch (error) {
    console.error("❌ Failed to send data:", error.message);
  }
}

// Start simulation loop
console.log("🚀 Starting API-based IoT simulation...");
const interval = setInterval(sendReading, 5000);

// Handle graceful shutdown
process.on("SIGINT", () => {
  clearInterval(interval);
  console.log("\n🛑 Simulation stopped.");
  process.exit();
});
