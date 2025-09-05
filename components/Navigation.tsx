"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    const navItems = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.work"), href: "/work" },
        { name: t("nav.blog"), href: "/blog" },
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.contact"), href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={scrollToTop}
                        className="text-2xl font-display font-bold text-gradient hover:opacity-80 transition-opacity"
                    >
                        Perkin
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-accent",
                                    pathname === item.href
                                        ? "text-accent"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Language Toggle Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLanguage(language === "en" ? "zh-TW" : "en")}
                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent text-muted-foreground"
                        >
                            <Globe size={16} />
                            {language === "en" ? "中文" : "EN"}
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-border"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                                            pathname === item.href
                                                ? "text-accent bg-accent/10"
                                                : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                {/* Mobile Language Toggle */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setLanguage(language === "en" ? "zh-TW" : "en");
                                        setIsOpen(false);
                                    }}
                                    className="w-full justify-start px-3 py-2 text-base font-medium text-muted-foreground hover:text-accent hover:bg-accent/5"
                                >
                                    <Globe size={16} className="mr-2" />
                                    {language === "en" ? "中文" : "EN"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
