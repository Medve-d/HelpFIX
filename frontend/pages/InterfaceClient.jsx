import AddAnnouncementForm from "@/components/InterfacePresta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";

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
