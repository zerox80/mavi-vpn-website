import { useId, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

type MobileDisclosureProps = {
    title: string;
    revealHashes?: readonly string[];
    children: ReactNode;
};

// Keep secondary content available on desktop and optional on small screens.
// A linked section opens immediately; the reader can still close it afterwards.
export default function MobileDisclosure({ title, revealHashes = [], children }: MobileDisclosureProps) {
    const { hash } = useLocation();
    const contentId = useId();
    const [choice, setChoice] = useState<{ hash: string; expanded: boolean } | null>(null);
    const expanded = choice?.hash === hash ? choice.expanded : revealHashes.includes(hash.slice(1));

    return (
        <div className="mobile-disclosure">
            <h2 className="mobile-disclosure-heading">
                <button className="mobile-disclosure-toggle" type="button" aria-controls={contentId} aria-expanded={expanded} onClick={() => setChoice({ hash, expanded: !expanded })}>
                    {title}<ChevronDown size={18} aria-hidden="true" />
                </button>
            </h2>
            <div id={contentId} className="mobile-disclosure-content" data-open={expanded}>
                {children}
            </div>
        </div>
    );
}
