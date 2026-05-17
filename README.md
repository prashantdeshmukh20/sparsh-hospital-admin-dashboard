# sparsh-hospital-admin-dashboard
Admin dashboard for Sparsh Hospital. Manage appointments, update status: pending/rejected/accepted, add admins, register doctors, view all doctor profiles &amp; patient messages. Secure routes + dashboard analytics.
# Sparsh Hospital - Admin Panel

Live Demo: https://admin-sparsh-hospital.vercel.app

### Core Features
- **Dashboard Route:** Dedicated `/dashboard` route showing appointment stats & quick actions
- **Appointment Management:** View all appointments. Update status to Pending / Rejected / Accepted from dashboard itself
- **Admin Control:** Add new admins via separate `/admin/add` route. Only existing admin can access
- **Doctor Registration:** Register new doctors via `/doctor/add` route with full profile details
- **View All Doctors:** Dedicated `/doctors` route to see all doctor profiles in one place
- **Message Center:** Separate `/messages` route to view all patient queries/messages in one place
- **Secure Access:** Protected routes. No route accessible without admin login. Auto logout on token expire
- **Analytics:** Dashboard cards showing total appointments, doctors, pending queries
- **Logout:** Secure logout option that clears JWT cookie & context

### Tech Stack
- **Frontend:** React 19 + Vite
- **Styling:** CSS
- **Routing:** React Router v6 with Private Routes
- **State:** Context API + useReducer for auth
- **API Calls:** Axios with interceptors
- **Forms:** React Hook Form
- **Notifications:** React Toastify

### Route Structure
| Route | Access | Purpose |
| --- | --- | --- |
| `/login` | Public | Admin login only |
| `/dashboard` | Admin | View stats + update appointment status |
| `/appointments` | Admin | All appointments list with filters |
| `/doctors` | Admin | View all doctor profiles |
| `/doctor/add` | Admin | Register new doctor |
| `/messages` | Admin | View all patient queries |
| `/admin/add` | Admin | Add new admin user |

### Setup Locally
1. Clone: `git clone https://github.com/username/sparsh-hospital-admin.git`
2. Install: `npm install`
