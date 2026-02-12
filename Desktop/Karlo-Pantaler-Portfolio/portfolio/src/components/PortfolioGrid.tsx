"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { PortfolioItem, PortfolioCategory, GraphicItem, RetouchItem } from "@/types";
import { useCursor } from "@/context/CursorContext";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { WebDevCard } from "./WebDevCard";

interface PortfolioGridProps {
    items: PortfolioItem[];
}

type FilterType = "ALL" | PortfolioCategory;

const filters: { label: string; value: FilterType }[] = [
    { label: "All Work", value: "ALL" },
    { label: "Dev / Code", value: "WEBSITE" },
    { label: "Visuals", value: "GRAPHIC" },
    { label: "Retouch", value: "RETOUCH" },
];

export function PortfolioGrid({ items }: PortfolioGridProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

    const filteredItems = items.filter(
        (item) => activeFilter === "ALL" || item.category === activeFilter
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
            {/* Segmented Control Filter */}
            <div className="flex justify-center mb-10 md:mb-16 px-2">
                <div className="flex flex-wrap justify-center items-center gap-1 bg-gray-100 rounded-2xl md:rounded-full p-1.5 shadow-inner max-w-full">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={clsx(
                                "relative px-3 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 font-mono tracking-tight whitespace-nowrap",
                                activeFilter === filter.value
                                    ? "text-editorial-white"
                                    : "text-editorial-charcoal/60 hover:text-editorial-charcoal"
                            )}
                        >
                            {activeFilter === filter.value && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-editorial-charcoal rounded-full shadow-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{filter.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className={clsx(
                    "grid gap-8 pb-10",
                    activeFilter === "GRAPHIC"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                )}
            >
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 25,
                                opacity: { duration: 0.2 }
                            }}
                            className={clsx(
                                "w-full",
                                item.category === 'GRAPHIC' && (item as GraphicItem).aspectRatio === '1/1' ? 'md:row-span-2' : ''
                            )}
                        >
                            <ItemCard item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

function ItemCard({ item }: { item: PortfolioItem }) {
    switch (item.category) {
        case "WEBSITE":
            return <WebDevCard item={item} />;
        case "RETOUCH":
            return (
                <div className="w-full aspect-3/4 rounded-xl overflow-hidden shadow-sm">
                    <BeforeAfterSlider
                        beforeImage={(item as RetouchItem).beforeImageUrl}
                        afterImage={(item as RetouchItem).afterImageUrl}
                        altText={item.title}
                    />
                </div>
            );
        case "GRAPHIC":
            return <GraphicCard item={item as GraphicItem} />;
        default:
            return null;
    }
}

function GraphicCard({ item }: { item: GraphicItem }) {
    const { setCursor } = useCursor();
    const aspectClass = item.aspectRatio === '1/1' ? 'aspect-square' : item.aspectRatio === '2/3' ? 'aspect-2/3' : 'aspect-video';

    return (
        <div
            className={clsx("group relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden", aspectClass)}
            onMouseEnter={() => setCursor("graphic", "ZOOM")}
            onMouseLeave={() => setCursor("default")}
        >
            <Image
                src={item.fullImageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <p className="text-white font-mono text-xs">{item.title}</p>
            </div>
        </div>
    );
}
