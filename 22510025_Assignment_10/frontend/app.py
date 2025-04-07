import streamlit as st
import requests
import pandas as pd

# Backend base URL
BASE_URL = "http://localhost:3000"

# Streamlit UI
st.title("🌤️ Weather Station Readings")

# Dropdown for station selection
station_options = ["All", "WS001", "WS002", "WS003"]
selected_station = st.selectbox("Select Station", station_options)

# Temperature unit toggle
unit = st.radio("Temperature Unit", ["Celsius (°C)", "Fahrenheit (°F)"])

# Fetch data from backend


def fetch_data(station):
    if station == "All":
        url = f"{BASE_URL}/readings"
    else:
        url = f"{BASE_URL}/readings/{station}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        st.error(f"Error fetching data: {e}")
        return []

# Convert temperature


def convert_temp(data, unit):
    if unit.startswith("Fahrenheit"):
        for row in data:
            row["temperature"] = round((row["temperature"] * 9/5) + 32, 2)
    return data


# Load and display data
raw_data = fetch_data(selected_station)
converted_data = convert_temp(raw_data, unit)

if converted_data:
    df = pd.DataFrame(converted_data)
    df["reading_time"] = pd.to_datetime(df["reading_time"])
    df = df.sort_values(by="reading_time", ascending=False)
    st.dataframe(df)
else:
    st.write("No data available.")
