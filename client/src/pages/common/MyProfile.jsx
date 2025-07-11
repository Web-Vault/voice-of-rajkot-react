import React, { useState, useRef } from 'react';
import { FaCheck, FaCamera } from 'react-icons/fa';

const mockUser = {
  name: 'Jay Patel',
  email: 'jay.patel@email.com',
  phone: '+91 98765 43210',
  photo: 'https://randomuser.me/api/portraits/men/45.jpg',
};

const mockTickets = [
  {
    id: 'TCKT-20240101-001',
    event: {
      name: 'Rajkot Poetry Night',
      date: '2024-02-10',
      time: '7:00 PM',
      venue: 'Rajkot Town Hall',
      cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
    seat: 'A12',
    purchaseDate: '2024-01-20',
  },
  {
    id: 'TCKT-20240101-002',
    event: {
      name: 'Gujarati Kavi Sammelan',
      date: '2024-03-05',
      time: '6:30 PM',
      venue: 'Kala Kendra, Rajkot',
      cover: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    },
    seat: 'B7',
    purchaseDate: '2024-02-15',
  },
  {
    id: 'TCKT-20240101-003',
    event: {
      name: 'Open Mic Evening',
      date: '2024-04-12',
      time: '5:00 PM',
      venue: 'Art Cafe, Rajkot',
      cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    },
    seat: 'General',
    purchaseDate: '2024-03-10',
  },
];

const MyProfile = () => {
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState(user);
  const [photoHover, setPhotoHover] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
  };
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setForm({ ...form, photo: url });
    }
  };
  const handleDownload = (ticketId) => {
    alert(`Download for ticket ${ticketId}`);
  };

  return (
    <section className="myprofile-section">
      {/* Header */}
      <div className="myprofile-header mb-10 px-4 md:px-0 max-w-5xl mx-auto">
        <h2 className="myprofile-title">My Profile</h2>
        <div className="myprofile-title-underline myprofile-title-underline-animated"></div>
        <div className="myprofile-subheading">Welcome back, {form.name.split(' ')[0]}! Manage your details and see your event history below.</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        {/* Profile Card */}
        <form className="myprofile-maincard group relative overflow-hidden flex flex-col md:flex-row p-0 border border-[#e0e7ff] rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 mb-14" onSubmit={handleSave}>
          <div className="myprofile-accent-bar"></div>
          {/* Photo Section - Left Side */}
          <div
            className="myprofile-photo-section w-full md:w-1/3 flex flex-col items-center justify-center p-0 md:p-0 relative overflow-hidden"
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
          >
            <div className="myprofile-photo-rect-wrap w-full h-full relative">
              <img src={form.photo} alt={form.name} className="myprofile-photo-rect" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
              <div
                className={`myprofile-photo-edit-overlay-rect${photoHover ? ' show' : ''}`}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <span className="myprofile-photo-edit-btn flex items-center gap-2">
                  <FaCamera className="inline-block text-lg" /> Edit
                </span>
              </div>
            </div>
          </div>
          {/* Details Section - Right Side */}
          <div className="myprofile-details-section w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="myprofile-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="input-edit" />
              </div>
              <div>
                <label className="myprofile-label">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="input-edit" />
              </div>
              <div>
                <label className="myprofile-label">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="input-edit" />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button type="submit" className="btn-save-profile flex items-center justify-center gap-2 px-10 py-3 text-lg">
                <FaCheck className="inline-block text-xl mb-0.5" /> Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* Ticket History */}
        <div className="ticket-history-section mt-16">
          <div className="ticket-history-header mb-8">
            <h4 className="ticket-history-title">Ticket Purchase History</h4>
            <div className="ticket-history-title-underline ticket-history-title-underline-animated"></div>
            <div className="ticket-history-subheading">All your event tickets, with download options.</div>
          </div>
          <div className="ticket-history-list grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card group flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 border border-[#e0e7ff] rounded-2xl shadow p-6 hover:shadow-lg transition-all">
                <img src={ticket.event.cover} alt={ticket.event.name} className="ticket-event-cover w-32 h-24 object-cover rounded-xl border border-indigo-100 shadow" />
                <div className="flex-1 w-full">
                  <div className="ticket-event-name text-lg font-bold text-indigo-800 mb-1">{ticket.event.name}</div>
                  <div className="ticket-event-info text-gray-700 mb-1">
                    <span className="font-medium">Date:</span> {ticket.event.date} &nbsp;|&nbsp;
                    <span className="font-medium">Time:</span> {ticket.event.time}
                  </div>
                  <div className="ticket-event-info text-gray-700 mb-1">
                    <span className="font-medium">Venue:</span> {ticket.event.venue}
                  </div>
                  <div className="ticket-event-info text-gray-700 mb-1">
                    <span className="font-medium">Seat:</span> {ticket.seat}
                  </div>
                  <div className="ticket-event-info text-gray-500 text-sm mb-2">
                    <span className="font-medium">Ticket ID:</span> {ticket.id} &nbsp;|&nbsp;
                    <span className="font-medium">Purchased:</span> {ticket.purchaseDate}
                  </div>
                  <button className="btn-secondary px-6 py-2 mt-2" onClick={() => handleDownload(ticket.id)}>Download Ticket</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .myprofile-section {
          background: #f8fafc;
          padding-top: 4.5rem;
          padding-bottom: 4.5rem;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        .myprofile-header {
          margin: 0 auto 2.5rem auto;
          text-align: left;
        }
        .myprofile-title {
          font-size: 2.3rem;
          font-weight: 800;
          color: #232046;
          letter-spacing: -0.01em;
        }
        .myprofile-title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
          border-radius: 2px;
          margin-bottom: 1.2rem;
          margin-top: 0.1rem;
          box-shadow: 0 2px 12px #6366f144;
          border: 1.5px solid rgba(255,255,255,0.35);
        }
        .myprofile-title-underline-animated {
          transform: scaleX(0);
          transform-origin: left;
          animation: myprofileUnderlineGrow 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
        }
        @keyframes myprofileUnderlineGrow {
          0% {
            transform: scaleX(0);
            opacity: 0.2;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        .myprofile-subheading {
          color: #6366f1;
          font-size: 1.13rem;
          font-weight: 400;
          line-height: 1.7;
          margin-bottom: 1.2rem;
          max-width: 540px;
          letter-spacing: 0.01em;
        }
        .myprofile-maincard {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e0e7ff;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 350px;
          overflow: hidden;
        }
        .myprofile-maincard:hover {
          // transform: translateY(-3px);
          border-color: #6366f1;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        @media (min-width: 768px) {
          .myprofile-maincard {
            flex-direction: row;
            min-height: 320px;
          }
        }
        .myprofile-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
          z-index: 2;
        }
        .myprofile-photo-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(120deg, #eef2ff 60%, #f1f5ff 100%);
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 0;
        }
        .myprofile-details-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .myprofile-label {
          text-align: left;
          display: block;
          font-size: 1.05rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.35rem;
          letter-spacing: 0.01em;
        }
        .myprofile-photo-rect-wrap {
          width: 100%;
          height: 100%;
          min-height: 220px;
          min-width: 180px;
          position: relative;
          display: flex;
        }
        .myprofile-photo-rect {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0;
          box-shadow: 0 2px 16px #6366f122, 0 4px 24px #6366f144;
          background: #f1f5ff;
          min-height: 220px;
          min-width: 180px;
          display: block;
        }
        .myprofile-photo-edit-overlay-rect {
          position: absolute;
          inset: 0;
          background: rgba(99,102,241,0.68);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          opacity: 0;
          cursor: pointer;
          transition: opacity 0.22s;
          font-size: 1.1rem;
          font-weight: 600;
          z-index: 2;
          backdrop-filter: blur(2.5px);
        }
        .myprofile-photo-edit-overlay-rect.show,
        .myprofile-photo-rect-wrap:hover .myprofile-photo-edit-overlay-rect {
          opacity: 1;
        }
        .myprofile-photo-edit-btn {
          background: rgba(255,255,255,0.18);
          padding: 0.5rem 1.2rem;
          border-radius: 1.2rem;
          font-size: 1.08rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          box-shadow: 0 2px 8px #6366f122;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .input-edit {
          width: 100%;
          padding: 0.7rem 1.1rem;
          border: 1.5px solid #e0e7ff;
          border-radius: 0.7rem;
          font-size: 1.08rem;
          margin-top: 0.1rem;
          background: #f8fafc;
          color: #232046;
          outline: none;
          transition: border 0.2s;
        }
        .input-edit:focus {
          border-color: #6366f1;
          background: #fff;
        }
        .btn-save-profile {
          background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
          color: #fff;
          font-weight: 800;
          border-radius: 2rem;
          padding: 1.1rem 0;
          font-size: 1.13rem;
          transition: background 0.16s, box-shadow 0.16s, transform 0.13s;
          box-shadow: 0 4px 24px #6366f133, 0 2px 12px #6366f122;
          border: none;
          letter-spacing: 0.01em;
          outline: none;
          min-width: 200px;
        }
        .btn-save-profile:hover, .btn-save-profile:focus {
          background: linear-gradient(90deg, #818cf8 60%, #6366f1 100%);
          box-shadow: 0 8px 32px #6366f144;
          transform: translateY(-2px) scale(1.04);
        }
        .btn-secondary {
          background: #eef2ff;
          color: #6366f1;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-secondary:hover {
          background: #e0e7ff;
        }
        .ticket-history-header {
          margin-bottom: 1.5rem;
        }
        .ticket-history-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #232046;
        }
        .ticket-history-title-underline {
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
          border-radius: 2px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px #6366f144;
        }
        .ticket-history-title-underline-animated {
          transform: scaleX(0);
          transform-origin: left;
          animation: myprofileUnderlineGrow 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
        }
        .ticket-history-subheading {
          color: #6366f1;
          font-size: 1.05rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
          letter-spacing: 0.01em;
        }
        .ticket-card {
          background: linear-gradient(120deg, #fff 80%, #f1f5ff 100%);
          border-radius: 1.2rem;
          box-shadow: 0 2px 12px #6366f111;
          border: 1.5px solid #e0e7ff;
          transition: box-shadow 0.18s, border 0.18s, transform 0.18s;
        }
        .ticket-card:hover, .ticket-card:focus-within {
          box-shadow: 0 8px 32px #6366f144;
          border-color: #6366f1;
          transform: translateY(-2px) scale(1.01);
        }
        .ticket-event-cover {
          width: 8rem;
          height: 6rem;
          object-fit: cover;
          border-radius: 0.8rem;
          border: 1.5px solid #e0e7ff;
          box-shadow: 0 2px 8px #6366f122;
        }
        .ticket-event-name {
          color: #232046;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .ticket-event-info {
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
};

export default MyProfile; 