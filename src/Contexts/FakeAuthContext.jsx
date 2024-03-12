import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action ");
  }
}

const FAKE_USER = {
  name: "chirag",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
// import { createContext, useContext, useReducer, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return { ...state, user: action.payload, isAuthenticated: true };
//     case "logout":
//       return { ...state, user: null, isAuthenticated: false };
//     default:
//       throw new Error("Unknown action ");
//   }
// }

// function AuthProvider({ children }) {
//   const [{ user, isAuthenticated }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   useEffect(() => {
//     // Check if user is logged in when component mounts
//     // You might want to add additional logic here, like checking for stored tokens
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       dispatch({ type: "login", payload: JSON.parse(storedUser) });
//     }
//   }, []);

//   async function login(email, password) {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/v1/users/login",
//         { email, password }
//       );
//       const userData = response.data.data.user;
//       dispatch({ type: "login", payload: userData });
//       localStorage.setItem("user", JSON.stringify(userData));
//     } catch (error) {
//       console.error("Login error:", error);
//       // Handle login error
//     }
//   }

//   function logout() {
//     dispatch({ type: "logout" });
//     localStorage.removeItem("user");
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// export { AuthProvider, useAuth };
