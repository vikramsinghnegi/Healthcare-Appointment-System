import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, Stethoscope, Search, Filter } from 'lucide-react';

// Define types for better code organization
type Doctor = {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
};

type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

type Appointment = {
  id: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  reason: string;
  doctorId: string;
  status: AppointmentStatus;
  createdAt: Date;
};

function App() {
  // Sample doctors data
  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Smith', specialization: 'General Physician', availability: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    { id: '2', name: 'Dr. John Davis', specialization: 'Cardiologist', availability: ['10:00', '11:00', '14:00', '16:00'] },
    { id: '3', name: 'Dr. Emily Wilson', specialization: 'Pediatrician', availability: ['09:00', '10:00', '15:00', '16:00'] },
  ];

  // State management
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    reason: '',
    doctorId: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');

  // Form handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate appointment time
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
    if (!selectedDoctor?.availability.includes(formData.time)) {
      alert('Selected time is not available for this doctor');
      return;
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date(),
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setFormData({
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      reason: '',
      doctorId: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Appointment management functions
  const updateAppointmentStatus = useCallback((appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment
      )
    );
  }, []);

  // Search and filter functions
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(appointment => {
        const matchesSearch = 
          appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [appointments, searchTerm, statusFilter]);

  // Get available time slots for selected doctor and date
  const getAvailableTimeSlots = useCallback(() => {
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
    return selectedDoctor?.availability || [];
  }, [formData.doctorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Healthcare Appointment System</h1>
          <p className="text-gray-600">Book your appointment with ease</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Appointment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Stethoscope className="text-indigo-600 w-5 h-5" />
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <Calendar className="text-indigo-600 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <Clock className="text-indigo-600 w-5 h-5" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                >
                  <option value="">Select Time</option>
                  {getAvailableTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <User className="text-indigo-600 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-indigo-600 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="text-indigo-600 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex items-start space-x-4">
                <FileText className="text-indigo-600 w-5 h-5 mt-2" />
                <textarea
                  name="reason"
                  placeholder="Reason for Visit"
                  value={formData.reason}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 h-24"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Appointments</h2>
            
            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Search className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{appointment.name}</h3>
                      <p className="text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">{appointment.reason}</p>
                      <p className="text-indigo-600 text-sm mt-1">
                        {doctors.find(d => d.id === appointment.doctorId)?.name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t text-sm text-gray-500">
                    <p>{appointment.phone}</p>
                    <p>{appointment.email}</p>
                  </div>
                </div>
              ))}
              {filteredAppointments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No appointments found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;