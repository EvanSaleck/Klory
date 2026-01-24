import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useState } from 'react' 

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        lastname: '',
        weight: '',
        height: '',
        birthdate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            weight: formData.weight ? parseFloat(formData.weight) : 0, 
            height: formData.height ? parseInt(formData.height) : 0,  
        };

        try {
            const response = await fetch('http://localhost:3001/users', { 
                method: 'POST',
                headers: { 
                        'Content-Type': 'application/json' 
                },
                body: JSON.stringify(payload), 
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inscription réussie:', data);
                
                sessionStorage.setItem('token', data.token);
                navigate('/dashboard');

                alert("Compte créé ! Veuillez vous connecter.");
                navigate('/login');
            } else {
                console.error('Erreur:', data.error);
                alert(data.error || "Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className='flex w-full h-screen justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Création de votre compte MyKlory</CardTitle>
                    <CardDescription>Entrez vos informations pour vous inscrire.</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Pseudonyme</Label>
                                {}
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange} 
                                />
                            </div>
                            
                            {}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Prénom</Label>
                                <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="lastname">Nom</Label>
                                <Input id="lastname" name="lastname" type="text" value={formData.lastname} onChange={handleChange} />
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="weight">Poids (kg)</Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    step="0.1" 
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="height">Taille (cm)</Label>
                                <Input 
                                    id="height"
                                    name="height"
                                    type="number"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="birthdate">Date de naissance</Label>
                                <Input
                                    id="birthdate"
                                    name="birthdate"
                                    type="date"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    required 
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                
                <CardFooter className="flex-col gap-4">
                    <Button type="submit" form="signup-form" className="w-full" disabled={loading}>
                        {}
                        {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                    <Button variant="link" asChild>
                         <Link to="/login">Déjà un compte ? Se connecter</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}

export default Dashboard