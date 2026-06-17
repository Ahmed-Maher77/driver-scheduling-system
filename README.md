# Driver Scheduling System

Full-stack Driver Scheduling System for managing drivers and delivery routes with modern animations and real-time connectivity monitoring. Built with Node.js and React.js, it provides an intuitive dashboard with smooth page transitions, animated components, and comprehensive driver/route management. Features include Framer Motion animations, internet connectivity monitoring, and responsive design. Developed for the DRB Internship Program 2025, showcasing clean architecture, modern UI/UX, and practical scheduling features.

---

## 📋 Project Description

The Driver Scheduling System is a logistics management platform that enables efficient assignment of drivers to delivery routes. The system provides real-time tracking of driver availability, route management, and automated scheduling algorithms to optimize delivery operations.

---

## 🌐 Live Preview

-   **Watch Live Demo (Frontend Application)**: [https://driver-scheduling-system.vercel.app/](https://driver-scheduling-system.vercel.app/)
-   **Backend API**: [https://driver-scheduling-system-5kmi.vercel.app/](https://driver-scheduling-system-5kmi.vercel.app/)

---

## 📸 Website Preview (UI Mockup)

<a href="https://driver-scheduling-system.vercel.app/" target="_blank" rel="noopener noreferrer" title="demo">
  <img src="https://github.com/user-attachments/assets/452dc4a6-857a-4117-91b1-6e16caa77cd7" alt="website preview - demo - UI Mockup" width="400">
</a>

---

## 🛠️ Technologies Used

### Frontend

-   **React 19** - Modern UI library with hooks
-   **TypeScript** - Type-safe JavaScript
-   **Vite** - Fast build tool and development server
-   **React Router v7** - Client-side routing
-   **TanStack Query (React Query)** - Server state management and caching
-   **Axios** - HTTP client for API communication
-   **Tailwind CSS v4** - Utility-first CSS framework
-   **SASS** - CSS preprocessor
-   **Apache ECharts** - Interactive and highly customizable charting library
-   **React Toastify** - Notification system
-   **FontAwesome** - Icon library
-   **Google Fonts** - Typography and font styling
-   **Framer Motion** - Advanced animations and transitions
-   **Redux Toolkit** - State management (for future scalability)

### Backend

-   **Node.js** - JavaScript runtime
-   **Express.js v5** - Web application framework
-   **MongoDB Atlas** - Cloud database service
-   **Mongoose** - MongoDB object modeling
-   **Multer** - File upload handling
-   **CORS** - Cross-origin resource sharing
-   **Dotenv** - Environment variable management

### Deployment & Hosting

-   **Vercel** - Frontend and backend hosting
-   **MongoDB Atlas** - Cloud database hosting
-   **Git** - Version control

---

## ✨ Key Features

### 🚗 Driver Management

-   **Complete CRUD Operations**: Add, edit, view, and delete drivers
-   **Driver Profile Management**: Personal information, contact details, and documents
-   **License Management**: Track driving license types, numbers, and expiration dates
-   **Vehicle Information**: Vehicle type, make, model, year, and color tracking
-   **Document Upload**: Profile pictures and license document uploads with validation
-   **Driver Status Tracking**: Available, on_route, unavailable status management
-   **Assignment History**: Track past route assignments and performance
-   **Bulk Operations**: Select and delete multiple drivers at once

### 🛣️ Route Management

-   **Complete CRUD Operations**: Create, edit, view, and delete routes
-   **Location Tracking**: Start and end location management
-   **Route Details**: Distance, duration, cost, and speed specifications
-   **Status Management**: Unassigned, assigned, in progress status tracking
-   **Driver Assignment**: Assign and unassign drivers to routes
-   **Conflict Detection**: Prevent double assignments and availability conflicts
-   **Bulk Operations**: Select and delete multiple routes at once
-   **Route Filtering**: Filter by status, duration, and search terms

### 📊 Dashboard & Analytics

-   **Real-time Statistics**: Live driver and route counts
-   **Activity Feeds**: Comprehensive logging of all system activities
-   **Export Functionality**: CSV export for drivers, routes, and activity feeds
-   **Search & Filtering**: Advanced search across all entities
-   **Pagination**: Efficient handling of large datasets
-   **Responsive Tables**: Mobile-friendly data display

### 🔄 Smart Scheduling

-   **Availability Checking**: Real-time driver and route availability validation
-   **Conflict Resolution**: Automatic detection of scheduling conflicts
-   **Assignment Logic**: Intelligent driver-route matching
-   **Status Synchronization**: Real-time updates across the system
-   **Activity Logging**: Complete audit trail of all changes

### 📱 User Interface

-   **Responsive Design**: Mobile-first approach with cross-device compatibility
-   **Modern UI/UX**: Clean, intuitive interface design with smooth animations
-   **Page Transitions**: Smooth page-to-page navigation with Framer Motion
-   **Component Animations**: Staggered animations for lists, tables, and cards
-   **Modal-based Editing**: Streamlined editing experience with animated modals
-   **Loading States**: Proper loading indicators and error handling
-   **Toast Notifications**: User-friendly success and error messages
-   **Accessibility**: Keyboard navigation and screen reader support
-   **Internet Connectivity**: Real-time connection status monitoring with retry functionality

### 🔧 Advanced Features

-   **File Upload System**: Secure image and document uploads with validation
-   **Data Validation**: Client-side and server-side validation
-   **Error Handling**: Comprehensive error management with user feedback
-   **URL State Management**: Filter states preserved in URL parameters
-   **Unsaved Changes Protection**: Prevents accidental data loss
-   **Bulk Actions**: Efficient management of multiple records
-   **Internet Connectivity Monitoring**: Real-time connection status with floating notifications
-   **Advanced Animations**: Framer Motion-powered smooth transitions and micro-interactions
-   **Table Row Animations**: Bottom-to-top staggered animations for data tables
-   **Hover Effects**: Enhanced button and card interactions with CSS transforms

---

## 🚀 Installation Instructions

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn package manager
-   Git

### Local Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/Ahmed-Maher77/driver-scheduling-system.git
    cd driver-scheduling-system
    ```

2. **Backend Setup**

    ```bash
    # Install dependencies
    cd Backend-server
    npm install
    # Configure your MongoDB connection string in .env
    PORT=3001    # Port number
    DATABASE_URL="mongodb+srv://<db_username>:<db_password>@cluster0.ldoyyda.mongodb.net/?appName=Cluster0"    # MongoDB connection string
    # Start the server
    npm start
    ```

3. **Frontend Setup**

    ```bash
    cd Frontend-client
    npm install
    # Configure environment variables
    VITE_API_BASE_URL=http://localhost:3001
    # Start the development server
    npm run dev
    ```

4. **Access the application**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3001

---

## 📁 Project Structure

```
driver-scheduling-system/
├── Backend-server/                # Node.js API server
│   ├── models/                    # Database models (Drivers, Routes, ActivityFeeds)
│   ├── routes/                    # API route handlers
│   │   ├── AddNewDriver_Route.js
│   │   ├── EditDriver_Route.js
│   │   ├── DeleteDriver_Route.js
│   │   ├── AddNewRoute_Route.js
│   │   ├── EditRoute_Route.js
│   │   ├── DeleteRoute_Route.js
│   │   ├── GetActivityFeeds_Route.js
│   │   ├── UploadImageOnServer_Route.js
│   │   └── ... (18 total routes)
│   ├── utils/                     # Utility functions
│   │   ├── serverManager.js
│   │   ├── driverIdGenerator.js
│   │   └── routeIdGenerator.js
│   ├── index.js                   # Server entry point
│   └── package.json
├── Frontend-client/               # React application
│   ├── src/
│   │   ├── assets/               # Static assets (images, icons)
│   │   ├── components/           # Reusable UI components
│   │   │   ├── DriversPage_Components/
│   │   │   ├── RoutesPage_Components/
│   │   │   ├── ActivityFeedsPage_Components/
│   │   │   ├── Dashboard_Components/
│   │   │   └── SharedModalComponents/
│   │   ├── pages/                # Page components
│   │   │   ├── Dashboard/
│   │   │   ├── DriversPage/
│   │   │   ├── DriverDetailsPage/
│   │   │   ├── RoutesPage/
│   │   │   ├── RouteDetailsPage/
│   │   │   ├── ActivityFeedsPage/
│   │   │   ├── AboutPage/
│   │   │   ├── ContactPage/
│   │   │   └── CalendarPage/
│   │   ├── utils/                # Utility functions and hooks
│   │   │   ├── functions/        # Utility functions
│   │   │   └── hooks/            # Custom hooks
│   │   │       ├── api/          # API hooks (React Query)
│   │   │       └── activity-feeds/
│   │   ├── common/               # Shared components and utilities
│   │   │   ├── Animations/       # Framer Motion animation components
│   │   │   │   ├── AnimatedPage/
│   │   │   │   ├── AnimatedComponent/
│   │   │   │   ├── AnimatedList/
│   │   │   │   ├── AnimatedModal/
│   │   │   │   ├── AnimatedTableRow/
│   │   │   │   ├── AnimatedButton/
│   │   │   │   └── AnimatedLoadingSpinner/
│   │   │   ├── InternetChecker/  # Internet connectivity monitoring
│   │   │   └── Types/            # Shared types and interfaces
│   │   └── main.tsx              # Application entry point
│   ├── public/                   # Static assets
│   └── package.json
└── README.md
```

---

## 📚 API Documentation

### Base URL

```
https://driver-scheduling-system-5kmi.vercel.app
```

### Core Endpoints

#### Drivers

-   `GET /get-all-drivers` - Retrieve all drivers with pagination and filtering
-   `GET /get-driver-details/:id` - Get specific driver details
-   `POST /add-new-driver` - Create a new driver
-   `PUT /edit-driver/:id` - Update driver information
-   `DELETE /delete-driver/:id` - Remove a driver
-   `DELETE /delete-bulk-drivers` - Bulk delete drivers

#### Routes

-   `GET /get-all-routes` - Retrieve all routes with pagination and filtering
-   `GET /get-route-details/:id` - Get specific route details
-   `POST /add-new-route` - Create a new route
-   `PUT /edit-route/:id` - Update route information
-   `DELETE /delete-route/:id` - Remove a route
-   `DELETE /delete-bulk-routes` - Bulk delete routes

#### Dashboard & Analytics

-   `GET /get-dashboard-stats` - Get dashboard statistics
-   `GET /get-activity-feeds` - Retrieve activity logs with filtering
-   `GET /get-assigned-routes-by-month` - Get monthly route assignments

#### Availability & Validation

-   `GET /check-driver-availability/:id` - Check driver availability
-   `GET /check-route-availability/:id` - Check route availability

#### File Management

-   `POST /upload-image-on-server` - Upload images and documents

### Sample Request/Response

**Get All Drivers**

```bash
GET /get-all-drivers?page=1&limit=10&status=available&vehicleType=Car
```

**Response**

```json
{
    "data": [
        {
            "driver_id": "DR001",
            "name": "John Doe",
            "phone": "+1234567890",
            "status": "available",
            "license_type": "B",
            "vehicle_type": "Car",
            "assignedRoute": null,
            "joined_at": "2024-01-15T10:30:00Z"
        }
    ],
    "currentPage": 1,
    "totalPages": 5,
    "totalDocs": 50,
    "hasNextPage": true,
    "hasPreviousPage": false
}
```

---

## 🎯 Key Pages & Features

### Dashboard

-   Real-time statistics overview
-   Quick access to recent activities
-   System health monitoring

### Drivers Management

-   **Drivers List**: Paginated table with search and filtering
-   **Driver Details**: Comprehensive driver profile view
-   **Add Driver**: Modal form with validation and file upload
-   **Edit Driver**: Full driver information editing
-   **Bulk Actions**: Select and manage multiple drivers

### Routes Management

-   **Routes List**: Paginated table with advanced filtering
-   **Route Details**: Complete route information and assignment history
-   **Add Route**: Route creation with driver assignment
-   **Edit Route**: Route editing with conflict detection
-   **Bulk Actions**: Select and manage multiple routes

### Activity Feeds

-   **Activity Log**: Complete audit trail of all system activities
-   **Filtering**: Filter by status, driver, date range
-   **Export**: CSV export functionality
-   **Real-time Updates**: Live activity monitoring

### Additional Pages

-   **About Page**: Project information, team details, and internet connectivity demo
-   **Contact Page**: Contact information and support with responsive layout
-   **Calendar Page**: Route scheduling calendar view with animated day grids
-   **Admin Panel**: System administration with animated welcome screen

---

## 🔒 Security Features

-   **File Upload Validation**: Secure file type and size validation
-   **Input Sanitization**: Client and server-side input validation
-   **Error Handling**: Comprehensive error management without data exposure
-   **CORS Configuration**: Proper cross-origin resource sharing setup
-   **Environment Variables**: Secure configuration management

---

## 🚀 Deployment

### Frontend (Vercel)

-   Automatic deployment from GitHub
-   Environment variables configured for production API
-   Custom domain support

### Backend (Vercel)

-   Serverless function deployment
-   MongoDB Atlas integration
-   Environment variable management

---

## 📖 System Documentation

For detailed guides on how the system is designed, structured, and operated, check out the following documentations:
*   [Database Design & API Documentation (UML, Mongoose Schemas, Postman Collection)](file:///e:/OneDrive%20-%20Mansoura%20University%20-%20Main/Projects/Full%20Stack/MERN/DRB%20%E2%80%93%20Driver%20Scheduling%20System%20%28Internship%29/DATABASE_DESIGN_AND_API_DOCUMENTATION.md)
*   [System Operations & User Flows (Mermaid Diagrams, Sequences, State Machines)](file:///e:/OneDrive%20-%20Mansoura%20University%20-%20Main/Projects/Full%20Stack/MERN/DRB%20%E2%80%93%20Driver%20Scheduling%20System%20%28Internship%29/SYSTEM_OPERATIONS_AND_USER_FLOWS.md)

---

## 🔮 Future Enhancements

-   [ ] Real-time notifications using WebSockets
-   [ ] Advanced analytics and reporting dashboard
-   [ ] Mobile application (React Native)
-   [ ] Driver GPS tracking integration
-   [ ] Automated route optimization algorithms
-   [ ] Multi-tenant support for multiple companies
-   [ ] Advanced user authentication and authorization
-   [ ] API rate limiting and security enhancements
-   [ ] Push notifications for mobile devices
-   [ ] Advanced scheduling algorithms with machine learning
-   [ ] Dark mode theme support
-   [ ] Advanced animation customization options
-   [ ] Offline mode with data synchronization

---

## 📞 Contact

**Developer**: Ahmed Maher Algohary  
**Email**: [ahmedmaher.algohary@gmail.com](mailto:ahmedmaher.algohary@gmail.com)

<!-- **Portfolio**: [https://ahmedmaher-portfolio.vercel.app/](https://ahmedmaher-portfolio.vercel.app/)   -->

**LinkedIn**: [https://www.linkedin.com/in/ahmed-maher-algohary](https://www.linkedin.com/in/ahmed-maher-algohary)  
**GitHub**: [https://github.com/Ahmed-Maher77](https://github.com/Ahmed-Maher77)

---

## 📄 License

This project is developed as part of the DRB Internship Program 2025. All rights reserved.

---

**Built with ❤️ for the DRB Internship Program 2025**
