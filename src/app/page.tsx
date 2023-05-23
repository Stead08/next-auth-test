import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";
import React from "react";

const Home = async () => {
  return (
      <main>
        <ClientComponent />
        <ServerComponent />
      </main>
  );
};

export default Home;