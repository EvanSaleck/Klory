import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useState } from 'react' 

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await fetch('http://localhost:3001/sessions', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login réussi:', data);
        sessionStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        console.error('Erreur:', data.error);
        alert(data.error || 'Erreur de connexion');
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
          <CardTitle>Connexion à votre compte</CardTitle>
          <CardDescription>Entrez vos identifiants.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  // 6. Lier l'input au State
                  value={formData.email}
                  onChange={handleChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    // 6. Lier l'input au State
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Login"}
          </Button>
          <Button variant="link" asChild>
             <Link to="/signup">Pas de compte ? S'inscrire</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Login