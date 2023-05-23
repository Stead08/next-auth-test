import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const ServerComponent = () => {
  return (
      <p>
        {getServerSession(authOptions).then((session) => {
          const user = session?.user;
          return JSON.stringify(user);
        })}
      </p>
  );
};

export default ServerComponent;
