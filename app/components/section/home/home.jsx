"use client";

import { useState, useEffect } from "react";
import Hero from "./hero";
import Nav from "../../nav";
import Footer from "../../footer";
import { AnimatePresence } from "framer-motion";
import Loader from "../../loaders/loader";

const HomePage = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Nav />
          <main className="size-full">
            <Hero data={data} />
          </main>

          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
