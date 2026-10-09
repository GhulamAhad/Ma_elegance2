import {
    FaInstagram,
    FaFacebookF,
    FaPinterestP,
    FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import footerLinks from "../../data/footerLinks";
import Logo from "../common/logo";
import Container from "../common/Container";

function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-[#111111] via-[#171717] to-black text-white overflow-hidden">

            {/* Background Glow */}
            <div className="absolute -top-40 left-0 w-96 h-96 bg-[#C9A227]/10 blur-[140px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A227]/10 blur-[150px]" />

            <Container>

                {/* Top */}

                <div className="grid lg:grid-cols-4 gap-14 py-24">

                    {/* Brand */}

                    <div>

                        <Logo />

                        <p className="mt-8 text-gray-400 leading-8">
                            Discover timeless fashion crafted with elegance,
                            confidence and premium quality for modern women.
                        </p>

                        <div className="flex gap-4 mt-8">

                            {[FaInstagram, FaFacebookF, FaPinterestP, FaLinkedinIn].map(
                                (Icon, index) => (
                                    <button
                                        key={index}
                                        className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#C9A227] hover:border-[#C9A227] transition-all duration-300"
                                    >
                                        <Icon />
                                    </button>
                                )
                            )}

                        </div>

                    </div>

                    {/* Shop */}

                    <div>

                        <h3 className="text-xl font-semibold mb-8 text-[#C9A227]">
                            Shop
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.shop.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="inline-block text-gray-400 hover:text-[#C9A227] hover:translate-x-2 transition-all duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Company */}

                    <div>

                        <h3 className="text-xl font-semibold mb-8 text-[#C9A227]">
                            Company
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.company.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="inline-block text-gray-400 hover:text-[#C9A227] hover:translate-x-2 transition-all duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Newsletter */}

                    <div>

                        <h3 className="text-xl font-semibold text-[#C9A227]">
                            Join MA ELEGANCE
                        </h3>

                        <p className="mt-6 text-gray-400 leading-7">
                            Subscribe to receive luxury fashion updates,
                            exclusive offers and new arrivals.
                        </p>

                        <div className="mt-8">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#1C1C1C] border border-gray-700 rounded-full px-6 py-4 outline-none focus:border-[#C9A227] transition"
                            />

                            <button className="mt-5 w-full bg-[#C9A227] py-4 rounded-full font-semibold hover:bg-[#b58d1e] transition">
                                Subscribe
                            </button>

                        </div>

                    </div>

                </div>

                {/* Divider */}

                <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent"></div>

                {/* Bottom */}

                <div className="flex flex-col lg:flex-row justify-between items-center py-8 gap-5">

                    <p className="text-gray-500 text-sm">
                        © 2026 MA ELEGANCE. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap gap-8 text-sm">
                        <Link
                            to="/privacy-policy"
                            className="text-gray-400 hover:text-[#C9A227] transition"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="text-gray-400 hover:text-[#C9A227] transition"
                        >
                            Terms
                        </Link>

                        <Link
                            to="/cookies"
                            className="text-gray-400 hover:text-[#C9A227] transition"
                        >
                            Cookies
                        </Link>
                    </div>

                </div>

            </Container>

        </footer>
    );
}

export default Footer;