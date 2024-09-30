import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static/B0TZlE5bIGE.webp"
        alt="Imagem do Tweteroo"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-black text-5xl font-bold mb-6">Tweteroo</h1>

        <p className="text-black text-lg mb-6">
          Compartilhe seus pensamentos e interaja com o mundo!
        </p>
        <div className="flex space-x-4">
          <Link href={"/login"}>
            <Button>
              Login
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button>
              Sign Up
            </Button>
          </Link>
        </div>
        <a
          href="https://github.com/srhiullli"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-blue-300 hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Home;