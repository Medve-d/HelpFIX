import AddAnnouncementForm from "@/src/components/InterfacePresta";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footComp";

export default function AddAnnouncementPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <AddAnnouncementForm />
      </div>
      <Footer />
    </>
  );
}
