import AppRoutes from "./routes/AppRoutes";
import { getCurrentUser, logoutUser } from "./services/auth.service";

async function test() {
  try {
    // const response = await logoutUser();
    // console.log(response);
  } catch (error) {
    // console.error(error);
  }
}

// test();

function App() {
  return <AppRoutes />;
}

export default App;
