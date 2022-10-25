import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

function Profile({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
			history.push("/");
		});
  };

  return (
    <div>
      Profile <br />
      <code>{JSON.stringify(user)}</code>
      <br />
      <Button colorScheme={"red"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
