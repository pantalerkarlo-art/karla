"use client";

import { WebsiteItem } from "@/types";
import { useCursor } from "@/context/CursorContext";
import Image from "next/image";

export function WebDevCard({ item }: { item: WebsiteItem }) {
    const { setCursor } = useCursor();

    return (
        <div
            className="group relative w-full perspective-1000 cursor-pointer focus:outline-none"
            onMouseEnter={() => setCursor("dev", item.caseStudyLink ? "CASE STUDY" : "")}
            onMouseLeave={() => setCursor("default")}
            tabIndex={0}
            onClick={() => { /* Void handler to ensure iOS hover/focus behavior */ }}
        >
            {/* Laptop Frame Mockup */}
            <div className="relative mx-auto w-full aspect-video bg-gray-800 rounded-t-xl shadow-2xl overflow-hidden border-4 border-gray-800 border-b-0 transition-transform duration-500 group-hover:rotate-1 group-focus:rotate-1 group-hover:scale-[1.02] group-focus:scale-[1.02]">

                {/* Screen Content */}
                <div className="absolute inset-0 bg-editorial-charcoal overflow-hidden">
                    <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus:scale-105"
                    />

                    {/* Hover/Focus Content */}
                    <div className="absolute inset-0 bg-editorial-charcoal/90 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto group-focus-within:pointer-events-auto">
                        <h3 className="text-white font-serif text-2xl mb-2 translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">{item.title}</h3>
                        <p className="text-gray-300 font-mono text-xs mb-6 max-w-[200px] translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300 delay-75">{item.description}</p>

                        <div className="flex gap-2 mb-6">
                            {item.techStack.map(tech => (
                                <span key={tech} className="text-[10px] uppercase font-mono text-accent border border-accent/20 px-2 py-1 rounded select-none">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {(item.liveLink) && (
                            <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300 delay-100">
                                {item.liveLink && (
                                    <a
                                        href={item.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white border border-white px-6 py-2 font-mono text-sm hover:bg-white hover:text-black focus:bg-white focus:text-black transition-colors uppercase tracking-tight pointer-events-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Live Site
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Laptop Base */}
            <div className="relative mx-auto w-full h-3 bg-gray-700 rounded-b-lg shadow-lg -mt-1 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-b-sm"></div>
            </div>

        </div>
    );
}
