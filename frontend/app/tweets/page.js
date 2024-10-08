'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from 'react';

const TweetInput = () => {
  const [username, setUsername] = useState('');
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const tweetsEndRef = useRef(null); 

  useEffect(() => {
    if (tweetsEndRef.current) {
      tweetsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tweets]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/9.3.2'
      },
      body: JSON.stringify({ username, tweet })
    })
      .then(response => response.json())
      .then(data => {
        setTweets([...tweets, { username, tweet }]);
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
              <strong>{tweet.username}</strong>: {tweet.tweet}
            </div>
          ))}
          <div ref={tweetsEndRef} /> 
        </div>
      </div>
      
      <Card className="p-6 shadow-lg mt-4">
        <h1 className="text-2xl font-bold text-center mb-4">Envie um Tweet</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Digite seu username"
            className="mb-4"
            required
          />
          <Input
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            type="text"
            placeholder="O que você está pensando?"
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