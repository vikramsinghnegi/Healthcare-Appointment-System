# Healthcare Appointment System

A modern, responsive web application for managing healthcare appointments built with React, TypeScript, and Tailwind CSS.

![Healthcare Appointment System](https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200)

## Features

### 🏥 Doctor Management
- List of doctors with their specializations
- Individual availability slots for each doctor
- Prevents double-booking through smart time slot management

### 📅 Appointment Booking
- User-friendly appointment scheduling interface
- Date validation to prevent past bookings
- Time slot validation based on doctor availability
- Comprehensive form validation for all fields

### ✨ Appointment Status System
- Three-state appointment tracking:
  - 🟡 Pending
  - 🟢 Confirmed
  - 🔴 Cancelled
- Visual status indicators
- Status management capabilities

### 🔍 Search and Filter
- Real-time search functionality
- Filter appointments by status
- Instant results without page reload

### 💻 Technical Features
- Built with React and TypeScript for type safety
- Responsive design using Tailwind CSS
- Efficient state management with React hooks
- Performance optimized with useMemo
- Modern UI with Lucide React icons

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (for build tooling)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/healthcare-appointment-system.git
```

2. Navigate to the project directory
```bash
cd healthcare-appointment-system
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

README.md           # Project documentation
```

## Usage

1. **Select a Doctor**: Choose from available healthcare providers
2. **Pick a Date and Time**: Select from available time slots
3. **Fill Patient Details**: Enter patient information and reason for visit
4. **Book Appointment**: Submit the form to create an appointment
5. **Manage Appointments**: View, search, and manage appointment status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI styling with [Tailwind CSS](https://tailwindcss.com)
- Built with [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org)
