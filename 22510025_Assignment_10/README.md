

## Cassandra Setup with Docker

### Prerequisites

#### Docker Installation

##### Windows (with WSL2)

1. **Install WSL2**  
   Open PowerShell as Administrator and run:

   ```powershell
   wsl --install
   ```

   Restart your machine if prompted.

2. **Set WSL2 as default**  
   Edit or create the `.wslconfig` file in your user directory (e.g., `C:\Users\YourName\.wslconfig`) with the following:

   ```ini
   [wsl2]
   memory=6GB
   processors=2
   swap=4GB
   ```

   Then run:

   ```powershell
   wsl --set-default-version 2
   ```

3. **Install Docker Desktop for Windows**  
   Download and install from:  
   https://www.docker.com/products/docker-desktop/

4. **Enable WSL2 integration in Docker Desktop**  
   Open Docker Desktop → Settings → Resources → WSL Integration → Enable integration for your installed distros.

##### Linux

1. **Install Docker Engine**

   On Ubuntu/Debian:

   ```bash
   sudo apt update
   sudo apt install docker.io
   ```

   On Fedora:

   ```bash
   sudo dnf install docker
   ```

2. **Start Docker and enable on boot**

   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Add user to docker group (optional)**

   ```bash
   sudo usermod -aG docker $USER
   ```

   Log out and log back in for the change to apply.

---

### Step 1: Run the following command to start Cassandra

```bash
docker-compose up -d
```

---

### Step 2: Wait for the container to be healthy. You can check using

```bash
docker ps
```

---

### Step 3: Check Logs to Ensure Cassandra Is Running

```bash
docker logs -f cassandra-node
```

Look for: `Startup complete` before proceeding.

---

### Step 4: Open cqlsh to Interact with Cassandra

```bash
docker exec -it cassandra-node cqlsh
```

Expected output:

```
Connected to Test Cluster at 127.0.0.1:9042.
cqlsh>
```

---

### Step 5: Create Keyspace and Table

Inside the `cqlsh` prompt:

```sql
CREATE KEYSPACE weather_data WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': '1'
};

USE weather_data;

CREATE TABLE temperature_by_station (
  weather_station_id text,
  reading_time timestamp,
  temperature float,
  PRIMARY KEY (weather_station_id, reading_time)
) WITH CLUSTERING ORDER BY (reading_time DESC);
```

---

### Remove Cassandra Volume (Cleanup)

To stop and remove everything including the volume (stored data):

```bash
docker-compose down -v
```

This command:
- Stops the Cassandra container
- Removes the container
- Removes the `cassandra-data` volume (⚠️ deletes all data)

---

## Backend Setup (Node.js + Express + Cassandra)

This section describes how to set up and run the backend server that interacts with the Cassandra database.

---

### Prerequisites

- Node.js (v16 or higher recommended)
- NPM or Yarn
- Cassandra running (see [Cassandra Setup Using Docker Compose](#cassandra-setup-using-docker-compose))

---

### 1. Install Dependencies

Make sure you're in the project root where `package.json` is located.

```bash
npm install
# or
yarn install
```

---

### 2. Project Structure (Example)

```
project-root/
├── backend/
│   ├── index.js           # Main Express server
│   ├── ...
├── docker-compose.yml     # Cassandra setup
├── README.md
└── ...
```

---

### 3. Environment Setup (Optional)

If you want to make the Cassandra host configurable, use an `.env` file:

```
CASSANDRA_HOST=localhost
CASSANDRA_KEYSPACE=weather_data
```

And update the backend to read from `process.env`.

---

### 4. Run the Backend

```bash
npm run dev
```

If using nodemon (optional dev dependency):

```bash
npx nodemon index.js
```

---

### 5. API Endpoints

| Method | Endpoint                   | Description                                |
|--------|----------------------------|--------------------------------------------|
| POST   | `/insert`                  | Insert temperature data                    |
| GET    | `/readings`                | Get all readings from all stations         |
| GET    | `/readings/:station_id`    | Get readings for a specific station        |

---


## IoT Data Simulator (Node.js)

This script simulates temperature readings from three weather stations (`WS001`, `WS002`, `WS003`) and sends data to the backend `/insert` API every 5 seconds.

---

### 1. File Structure Example

```
project-root/
├── backend/
│   └── index.js
├── simulator/
│   └── emitter.js     # Node-based simulator script
├── ...
```

---

### 2. Run the Simulator

Make sure the backend server is running on port `3000`.

```bash
cd simulator
npm run dev
```

---

### 3. What It Does

- Randomly selects a station ID.
- Generates a temperature between -10°C and 40°C.
- Sends it to `http://localhost:3000/insert` every 5 seconds.

---

### 4. Sample Output

```
[2025-04-07T18:12:05.123Z] Inserted: WS002 - 22.43°C
[2025-04-07T18:12:10.124Z] Inserted: WS001 - 18.70°C
```

---

## Frontend (Streamlit Dashboard)

The frontend provides a simple UI to:

- Select a station (`All`, `WS001`, `WS002`, `WS003`)
- Toggle between °C and °F
- Display recent temperature readings

---


### 6. Setting Up Virtual Environment from `requirements.txt`

To isolate dependencies and avoid conflicts:

####  For **Linux / macOS**:

```bash
cd frontend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

####  For **Windows** (PowerShell):

```powershell
cd frontend

# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

---

### 📄 Sample `requirements.txt`

Make sure your `requirements.txt` includes:

```txt
streamlit
requests
```

(You can add more as needed.)

---

### 2. File Structure

```
project-root/
├── frontend/
│   └── app.py
```

---

### 3. Run the Frontend

```bash
streamlit run app.py
```

---

### 4. Features

- Dropdown to select a station (or "All")
- Toggle to switch between Celsius and Fahrenheit
- Displays recent temperature data in tabular form

---







