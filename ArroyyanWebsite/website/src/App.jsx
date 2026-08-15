import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
