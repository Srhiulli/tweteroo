'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from 'react';



const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/9.3.2' },
      body: JSON.stringify({ username, password, avatar: 'https://avatar.iran.liara.run/public' })
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastro no Tweteroo</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder="Digite seu username" required />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Senha</Label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Digite sua senha" required />
          </div>
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;