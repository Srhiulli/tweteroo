'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        body: data
    })))
    .then(res => {
      if (res.status !== 200) {
        setErrorMessage(res.body.error || 'Username ou senha incorretos');
      } else {
        window.location.href = '/tweets';
      }
    })
    .catch(err => {
      setErrorMessage('Ocorreu um erro, tente novamente mais tarde.');
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login do Tweteroo</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              type="text" 
              id="username" 
              placeholder="Digite seu username" 
              required 
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Senha</Label>
            <Input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
              required 
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;