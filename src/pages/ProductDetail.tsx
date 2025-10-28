import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, User, Calendar, Phone, Mail } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  image_url?: string;
  created_at: string;
  user_id: string;
  categories?: {
    name: string;
  };
  profiles?: {
    full_name: string;
    phone?: string;
  };
}

interface SellerInfo {
  full_name: string;
  phone?: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);

  useEffect(() => {
    fetchProduct();
    getCurrentUser();
  }, [id]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user?.id || null);
  };

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (name)
      `)
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Product not found");
      navigate("/marketplace");
      return;
    }

    // Fetch seller profile separately
    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", data.user_id)
      .single();

    setProduct({
      ...data,
      profiles: profileData || { full_name: "Unknown" }
    });
    setSellerInfo(profileData);
    setLoading(false);
  };

  const handleShowContact = () => {
    setShowContact(true);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted successfully");
      navigate("/marketplace");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <span className="text-9xl">📦</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              {product.categories && (
                <Badge variant="secondary" className="text-sm">
                  {product.categories.name}
                </Badge>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary">৳{product.price}</span>
              <Badge variant="outline" className="capitalize text-base">
                {product.condition}
              </Badge>
            </div>

            {product.description && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Seller: {product.profiles?.full_name || "Unknown"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Listed: {new Date(product.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {currentUser === product.user_id ? (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Edit Product
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                  Delete Product
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {!showContact ? (
                  <Button size="lg" className="w-full" onClick={handleShowContact}>
                    Show Contact
                  </Button>
                ) : (
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="font-semibold text-lg mb-3">Contact Seller</h3>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{sellerInfo?.full_name || "Unknown"}</span>
                      </div>
                      {sellerInfo?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <a href={`tel:${sellerInfo.phone}`} className="text-primary hover:underline">
                            {sellerInfo.phone}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
