## NDB Cluster Setup with Docker

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

### Steps to Set Up and Use NDB Cluster

#### Step 1: Start the Docker containers

Run the following command to start the containers defined in the `docker-compose.yml` file:

```bash
docker-compose up -d
```

---

#### Step 2: Verify container health

Wait for the containers to become healthy. You can check their status using:

```bash
docker ps
```

---

#### Step 3: Access the MySQL container

Access the MySQL container using the following command:

```bash
docker exec -it mysql1 mysql -u root -p
```

---

#### Step 4: Enter the default password

When prompted, enter the default password specified in the `docker-compose.yml` file.

---

#### Step 5: Create and use a new database

Run the following SQL commands to create a new database and switch to it:

```sql
CREATE DATABASE test_cluster;
USE test_cluster;
```

---

#### Step 6: Create a sample table and insert data

Create a table named `users` and insert sample data into it:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=ndbcluster;

INSERT INTO users (name, email) VALUES
('alice', 'alice@example.com');
```

---

#### Step 7: Fetch data from the table

Retrieve the data from the `users` table using:

```sql
SELECT * FROM users;
```

---

#### Step 8: Stop a specific container

You can stop any container using the following command:

```bash
docker stop <container_name>
```

Replace `<container_name>` with the name of the container you want to stop.

---

#### Step 9: Test fault tolerance

Even after stopping a node, the query from Step 7 should still work, demonstrating the fault tolerance of the NDB cluster.
