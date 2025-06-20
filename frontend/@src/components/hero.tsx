"use client";
import { Heart } from "lucide-react";

export default function Logo() {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
        <Heart className="h-5 w-5 text-white" />
    </div>
  );
}
