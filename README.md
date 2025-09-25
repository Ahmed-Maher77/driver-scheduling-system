# Driver Scheduling System

Full-stack Driver Scheduling System for managing drivers and delivery routes in a simple, visual way. Built with Node.js
and React.js, it provides an intuitive dashboard to add drivers, create routes, and track assignments in real time.
Developed for the DRB Internship Program 2025, showcasing clean architecture, responsive UI, and practical scheduling
features.

---

## 📋 Project Description

The Driver Scheduling System is a logistics management platform that enables efficient assignment of drivers to delivery routes. The system provides real-time tracking of driver availability, route management, and automated scheduling algorithms to optimize delivery operations.

---

## 🌐 Live Preview

-   **Frontend Application**: [https://driver-scheduling-system.vercel.app/](https://driver-scheduling-system.vercel.app/)
-   **Backend API**: [https://driver-scheduling-system-5kmi.vercel.app/](https://driver-scheduling-system-5kmi.vercel.app/)

---

## 🛠️ Technologies Used

### Frontend

-   **React 19** - Modern UI library with hooks
-   **TypeScript** - Type-safe JavaScript
-   **Vite** - Fast build tool and development server
-   **React Router** - Client-side routing
-   **React Query (TanStack Query)** - Server state management
-   **Axios** - HTTP client for API communication
-   **Tailwind CSS** - Utility-first CSS framework
-   **SASS** - CSS preprocessor
-   **React Toastify** - Notification system

### Backend

-   **Node.js** - JavaScript runtime
-   **Express.js** - Web application framework
-   **MongoDB Atlas** - Cloud database service
-   **Mongoose** - MongoDB object modeling
-   **CORS** - Cross-origin resource sharing
-   **Dotenv** - Environment variable management

### Deployment & Hosting

-   **Vercel** - Frontend and backend hosting
-   **MongoDB Atlas** - Cloud database hosting
-   **Git** - Version control

---

## ✨ Key Features

### 🚗 Driver Management

-   Add, edit, and delete drivers
-   Driver availability tracking
-   License type management
-   Contact information management
-   Driver history and performance tracking

### 🛣️ Route Management

-   Create and manage delivery routes
-   Start and end location tracking
-   Distance and time estimation
-   Route status monitoring
-   Bulk operations support

### 📊 Dashboard & Analytics

-   Real-time driver availability status
-   Route assignment overview
-   Activity feeds and notifications
-   Export functionality (CSV)
-   Search and filtering capabilities

### 🔄 Smart Scheduling

-   Automated driver-route assignment
-   Availability-based scheduling
-   Conflict detection and resolution
-   Real-time status updates

### 📱 Responsive Design

-   Mobile-first approach
-   Cross-browser compatibility
-   Modern UI/UX design
-   Accessibility features

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
    DATABASE_URL="mongodb+srv://ahmedmaheraljwhry057_db_user:QAMJQP18r1GN4PxR@cluster0.ldoyyda.mongodb.net/DRB-Scheduling-System?retryWrites=true&w=majority&appName=Cluster0"    # MongoDB connection string
    # Start the server
    npm start
    ```

3. **Frontend Setup**

    ```bash
    cd Frontend-client
    npm install
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
│   ├── models/                    # Database models
│   ├── routes/                    # API route handlers
│   ├── utils/                     # Utility functions
│   ├── views/                     # Static HTML views
│   ├── index.js                   # Server entry point
│   └── package.json
├── Frontend-client/               # React application
│   ├── src/
│   │   ├── assets/               # assets [images]
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page components
│   │   ├── utils/                # Utility functions and hooks
│   │   │   ├── functions/        # Utility functions
│   │   │   └── hooks/            # Custom hooks
│   │   │       ├── apis/         # API logic (React Query, etc.)
│   │   │       └── redux-toolkit/ # Redux Toolkit slices and store
│   │   ├── common/               # Shared components
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

### Endpoints

#### Drivers

-   `GET /get-all-drivers` - Retrieve all drivers
-   `GET /get-driver-details/:id` - Get specific driver details
-   `POST /add-new-driver` - Create a new driver
-   `PUT /edit-driver` - Update driver information
-   `DELETE /delete-driver` - Remove a driver
-   `DELETE /delete-bulk-drivers` - Bulk delete drivers

#### Routes

-   `GET /get-all-routes` - Retrieve all routes
-   `GET /get-route-details/:id` - Get specific route details
-   `POST /add-new-route` - Create a new route
-   `PUT /edit-route` - Update route information
-   `DELETE /delete-route` - Remove a route
-   `DELETE /delete-bulk-routes` - Bulk delete routes

#### Dashboard

-   `GET /get-dashboard-stats` - Get dashboard statistics
-   `GET /get-activity-feeds` - Retrieve activity logs

#### Availability

-   `POST /check-driver-availability` - Check driver availability
-   `POST /check-route-availability` - Check route availability

### Sample Request/Response

**Get All Drivers**

```bash
GET /get-all-drivers?page=1&limit=10
```

**Response**

```json
{
    "success": true,
    "data": [
        {
            "id": "DR001",
            "name": "John Doe",
            "phone": "+1234567890",
            "status": "available",
            "licenseType": "B",
            "vehicleType": "Car"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 25
    }
}
```

## 🤔 Assumptions Made

### Technical Assumptions

1. **Database Choice**: Selected MongoDB Atlas for its flexibility in handling dynamic driver and route data structures
2. **Authentication**: Implemented basic API structure without authentication for simplicity, assuming this would be added in production
3. **Real-time Updates**: Used polling mechanism instead of WebSockets for real-time updates, suitable for the current scale
4. **Error Handling**: Implemented comprehensive error handling with user-friendly messages
5. **Data Validation**: Added client-side and server-side validation for data integrity

### Business Logic Assumptions

1. **Driver Assignment**: Assumed one driver can handle one active route at a time
2. **Availability Priority**: Drivers with `availability: true` are prioritized for new assignments
3. **Route Status**: Routes without assigned drivers are marked as "unassigned"
4. **Data Persistence**: All data is stored in MongoDB with proper indexing for performance
5. **Pagination**: Implemented pagination for large datasets to improve performance

### UI/UX Assumptions

1. **User Experience**: Designed for logistics managers and dispatchers
2. **Mobile Responsiveness**: Ensured the application works on various screen sizes
3. **Accessibility**: Implemented basic accessibility features for better usability
4. **Performance**: Optimized for fast loading and smooth interactions

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

## 🔮 Future Enhancements

-   [ ] Real-time notifications using WebSockets
-   [ ] Advanced analytics and reporting
-   [ ] Mobile application (Flutter)
-   [ ] Driver GPS tracking integration
-   [ ] Automated route optimization
-   [ ] Multi-tenant support
-   [ ] Advanced user authentication and authorization
-   [ ] API rate limiting and security enhancements

---

## 📞 Contact

**Developer**: Ahmed Maher Algohary  
**Email**: [ahmedmaher.algohary@gmail.com](mailto:ahmedmaher.algohary@gmail.com)  
**Portfolio**: [https://ahmedmaher-portfolio.vercel.app/](https://ahmedmaher-portfolio.vercel.app/)  
**LinkedIn**: [https://www.linkedin.com/in/ahmed-maher-algohary](https://www.linkedin.com/in/ahmed-maher-algohary)  
**GitHub**: [https://github.com/Ahmed-Maher77](https://github.com/Ahmed-Maher77)

---

## 📄 License

This project is developed as part of the DRB Internship Program 2025. All rights reserved.

---

**Built with ❤️ for the DRB Internship Program 2025**
