import React, { useState, useEffect } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css"; 

const App = () => {
  const [flights, setFlights] = useState([]);
  const [tripType, setTripType] = useState("oneWay"); 
  const [startDate, setStartDate] = useState(new Date()); 

  useEffect(() => {
    fetch("travel.json")
      .then((response) => response.json())
      .then((data) => {
        setFlights(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const filteredFlights = flights.filter((flight) =>
    flight.flightOffer.some((offer) =>
      offer.itineraries.some((itinerary) =>
        itinerary.segments.some(
          (segment) => true 
        )
      )
    )
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Flight Search</h1>
      <div className="flex justify-center mb-4">
        <div className="rounded border border-gray-300 overflow-hidden flex">
          <button
            className={`px-4 py-2 ${
              tripType === "roundTrip"
                ? "bg-gray-200 text-gray-800"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleTripTypeChange("roundTrip")}
          >
            Round trip
          </button>
          <button
            className={`px-4 py-2 ${
              tripType === "oneWay"
                ? "bg-cyan-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleTripTypeChange("oneWay")}
          >
            One way
          </button>
          <button
            className={`px-4 py-2 ${
              tripType === "multiCity"
                ? "bg-gray-200 text-gray-800"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleTripTypeChange("multiCity")}
          >
            Multicity
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4 justify-center w-full">
          <div className="border flex items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            LHR
          </div>
          <div className="border flex items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            CDG
          </div>
          
          <div className="border p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="text-center w-full"
            />
          </div>
          <div className="border gap-2 flex items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            DAY- <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="border flex gap-2 items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            Day+ <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="border flex gap-3 items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            Anytime <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="border flex gap-4 items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            ADT <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="border gap-4 flex items-center justify-center p-2 rounded w-1/8 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            1 <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <button className="border flex items-center justify-center p-2 rounded w-1/8 bg-blue-500 text-white hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full shadow-lg bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-200">FLIGHT</th>
              <th className="border px-4 py-2 bg-gray-200">AIRCRAFT</th>
              <th className="border px-4 py-2 bg-gray-200">CLASS</th>
              <th className="border px-4 py-2 bg-gray-200">FARE</th>
              <th className="border px-4 py-2 bg-gray-200">ROUTE</th>
              <th className="border px-4 py-2 bg-gray-200">DEPARTURE</th>
              <th className="border px-4 py-2 bg-gray-200">ARRIVAL</th>
              <th className="border px-4 py-2 bg-gray-200">DURATION</th>
              <th className="border px-4 py-2 bg-gray-200">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map((flight, index) => (
              <React.Fragment key={index}>
                {flight.flightOffer.map((offer, offerIndex) => (
                  <tr
                    key={offerIndex}
                    className={
                      offerIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].segments[0].carrierCode}{" "}
                      {offer.itineraries[0].segments[0].flightNumber}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].segments[0].aircraft}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.class[0][0]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.fareBasis[0][0]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].segments[0].departure.iataCode} -{" "}
                      {
                        offer.itineraries[0].segments.slice(-1)[0].arrival
                          .iataCode
                      }
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].segments[0].departure.at}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].segments.slice(-1)[0].arrival.at}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.itineraries[0].duration}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {offer.price}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
