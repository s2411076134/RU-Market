import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import heroImage from "@/assets/hero-bg.png";
import { ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  title: string;
  price: number;
  condition: string | null;
  image_url: string | null;
  category_id: string | null;
  categories?: {
    name: string;
  } | null;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(8);

    if (data) {
      setProducts(data);
    }
  };

  const handleSearch = () => {
    navigate(`/marketplace?search=${searchQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/40" />
        
        <div className="container relative z-10 px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to RU Market
            </h1>
            <p className="text-lg text-white/90 sm:text-xl">
              Buy and sell used products with fellow university students. Find great deals on phones, tablets, computers, bikes, and more!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-14 pl-4 pr-14 text-base bg-white"
                />
                <Button 
                  size="icon"
                  onClick={handleSearch}
                  className="absolute right-1 top-1 h-12 w-12"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Start Selling Button */}
            <div className="mt-8">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="gap-2 text-base px-8 py-6 bg-red-500 hover:bg-red-600 text-lg"
                >
                  Start Selling
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-background">
        <div className="container px-4 py-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  condition={product.condition}
                  image_url={product.image_url}
                  category={product.categories?.name}
                />
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No products available yet. Be the first to list a product!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
