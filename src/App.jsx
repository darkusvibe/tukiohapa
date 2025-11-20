import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import EventCard from "./components/EventCard";
import BookingModal from "./components/BookingModal";
import AddEventForm from "./components/AddEventForm";

export default function App() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const loadEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 tracking-tight text-center">
          TukioHapa
        </h1>

        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex justify-end mb-5">
          <button
            onClick={() => setShowAddEvent(true)}
            className="px-5 py-2.5 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} onBook={() => setSelectedEvent(event)} />
          ))}
        </div>

        {selectedEvent && (
          <BookingModal event={selectedEvent} close={() => setSelectedEvent(null)} />
        )}

        {showAddEvent && (
          <AddEventForm close={() => setShowAddEvent(false)} refresh={loadEvents} />
        )}
      </div>
    </div>
  );
}
