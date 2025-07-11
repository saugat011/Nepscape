'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 text-center overflow-hidden">
      <Image
        src="/logoo.png"
        alt="404 Not Found"
        width={300}
        height={300}
        className="mb-6 animate-bounce"
        priority
      />
      <h1 className="text-2xl sm:text-[10rem] font-extrabold text-primary drop-shadow-sm -mt-8 leading-none">
        404
      </h1>
      <p className="text-2xl sm:text-3xl font-semibold text-text mt-4">
        Oops! Page Not Found
      </p>
      <p className="text-muted mt-3 max-w-md mx-auto px-2">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-hover hover:shadow-lg transition duration-300 mt-8"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
