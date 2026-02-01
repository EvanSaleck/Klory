import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react"; // Optionnel : pour les icônes

function Signup() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Étape 1 ou 2
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
    weight: "",
    height: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const canGoNext = formData.username && formData.email && formData.password;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : 0,
      height: formData.height ? parseInt(formData.height) : 0,
    };

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Compte MyKlory créé !");
        sessionStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full min-h-screen justify-center items-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg transition-all duration-300">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Klory</CardTitle>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-slate-100 px-2 py-1 rounded">
              Étape {step} sur 2
            </span>
          </div>
          <CardDescription>
            {step === 1 
              ? "Créez votre compte MyKlory" 
              : "Parlez-nous un peu de vous afin de mieux calibrer votre expérience"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* ÉTAPE 1 : IDENTITÉ & SÉCURITÉ */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid gap-2">
                  <Label htmlFor="username">Pseudonyme</Label>
                  <Input id="username" name="username" placeholder="johndoe" required value={formData.username} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
                </div>
                <Button type="button" className="w-full mt-4" disabled={!canGoNext} onClick={() => setStep(2)}>
                  Continuer <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* ÉTAPE 2 : INFOS PHYSIQUES */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Prénom</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input id="weight" name="weight" type="number" step="0.1" value={formData.weight} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">Taille (cm)</Label>
                    <Input id="height" name="height" type="number" value={formData.height} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="birthdate">Date de naissance</Label>
                  <Input id="birthdate" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} />
                </div>

                <div className="flex gap-3 mt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Retour
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Finaliser l'inscription
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col border-t p-6">
          <Button variant="link" asChild className="text-muted-foreground">
            <Link to="/">Déjà un compte ? Se connecter</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Signup;