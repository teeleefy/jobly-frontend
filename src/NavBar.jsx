
// import "./NavBar.css";
// import { NavLink } from "react-router-dom";
// import { Navbar, Nav, NavItem } from "reactstrap";

// function NavBar({isLoggedIn}) {

//     function renderNavLinks(){
//         if(isLoggedIn){
//             return(
//                 <Nav className="ml-auto" navbar>
//                     <NavItem>
//                     <NavLink to="/companies">Companies</NavLink>
//                     <NavLink to="/jobs">Jobs</NavLink>
//                     <NavLink to="/profile">Profile</NavLink>
//                     <NavLink to="/">Log out teeleef</NavLink>
//                     </NavItem>
//                 </Nav> 
//             )
//         }
//         return (
//             <Nav className="ml-auto" navbar>
//                 <NavItem>
//                     <NavLink to="/login">Login</NavLink>
//                     <NavLink to="/signup">Sign Up</NavLink>
//                 </NavItem>
//             </Nav>
//         )
//     }

//   return (
//     <div>
//       <Navbar expand="md">
//         <NavLink exact to="/" className="navbar-brand">
//           Jobly
//         </NavLink>

//         {renderNavLinks()}
//       </Navbar>
//     </div>
//   );
// }

// export default NavBar;
