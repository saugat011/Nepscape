"use client";

import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image: string;
  alt?: string;
}

const Card = ({ title, description, image, alt = title }: CardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-primary mb-1">
          {title}
        </h2>
        <p className="text-muted text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
