"use client";
// components/Header.js

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-3xl sm:mr-3 font-bold text-pink-600 cursor-pointer">
                  Syrup India
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" passHref>
                <span className="text-base font-medium text-gray-500 hover:text-pink-600 cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/about" passHref>
                <span className="text-base font-medium text-gray-500 hover:text-pink-600 cursor-pointer">
                  About
                </span>
              </Link>
              <Link href="/services" passHref>
                <span className="text-base font-medium text-gray-500 hover:text-pink-600 cursor-pointer">
                  Services
                </span>
              </Link>
              <Link href="/contact" passHref>
                <span className="text-base font-medium text-gray-500 hover:text-pink-600 cursor-pointer">
                  Contact
                </span>
              </Link>
            </nav>
          </div>
          <div className="hidden md:block">
            <Link href="#" passHref>
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-pink-600 p-2 rounded-md inline-flex items-center justify-center text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" passHref>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-100 cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about" passHref>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-100 cursor-pointer">
              About
            </span>
          </Link>
          <Link href="/services" passHref>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-100 cursor-pointer">
              Services
            </span>
          </Link>
          <Link href="/contact" passHref>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-100 cursor-pointer">
              Contact
            </span>
          </Link>
          <Link href="/sign-up" passHref>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-100 cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
