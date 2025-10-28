import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">About RU Market</h1>
          
          <div className="bg-card p-8 rounded-lg shadow-lg border border-border mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              RU Market is a student-centered marketplace designed exclusively for the Rajshahi University community. 
              We provide a safe, convenient platform where students can buy and sell used items, making student life more affordable and sustainable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From electronics and books to furniture and sports equipment, our platform helps students find great deals 
              while reducing waste through the reuse of quality items.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community First</h3>
              <p className="text-muted-foreground">Built by students, for students</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border text-center">
              <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Easy to Use</h3>
              <p className="text-muted-foreground">Simple, fast, and reliable</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Trusted Platform</h3>
              <p className="text-muted-foreground">Secure transactions</p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Admin Information</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-foreground">Platform Administrator</p>
                <p className="text-muted-foreground">RU Market Admin Team</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-muted-foreground">admin@rumarket.com</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Support Hours</p>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-muted-foreground">Rajshahi University, Rajshahi-6205, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
