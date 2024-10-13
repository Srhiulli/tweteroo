'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

const TweetInput = () => {
  const [username, setUsername] = useState('');
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]); 
  const [currentUsername, setCurrentUsername] = useState(''); 
  const tweetsEndRef = useRef(null);

  useEffect(() => {
    if (tweetsEndRef.current) {
      tweetsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tweets]);

  useEffect(() => {
    getUsernameCurrentUser();
  }, []);

  function getUsernameCurrentUser() {
    fetch('http://localhost:3001/api/currentUser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setCurrentUsername(data.user.username);
        } else {
          console.log('Usuário não está logado');
        }
      })
      .catch(err => console.error(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3001/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/9.3.2'
      },
      body: JSON.stringify({ username: currentUsername, tweet })
    })
      .then(response => {
        return response.json().catch(err => {
          throw new Error('A resposta não está em formato JSON');
        })
      })

        .then(data => {
        setTweets([...tweets, { currentUsername, tweet }]); 
        setTweet(''); 
      })
      .catch(err => console.error(err)); 
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Tweets</h2>
        <div className="flex flex-col space-y-2">
          {tweets.map((tweet, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-lg shadow">
              <strong>{tweet.currentUsername}</strong>: {tweet.tweet}
            </div>
          ))}
          <div ref={tweetsEndRef} />
        </div>
      </div>

      <Card className="p-6 shadow-lg mt-4">
        <h1 className="text-2xl font-bold text-center mb-4">Envie um Tweet</h1>
        <h1>{currentUsername}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            value={tweet} 
            onChange={(e) => setTweet(e.target.value)} 
            type="text"
            placeholder="Escreva o que está pensando"
            className="mb-4"
            required
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TweetInput;