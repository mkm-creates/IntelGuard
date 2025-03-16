
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Layout() {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <div className="flex-1 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
