import { useId } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type SectionLink = { id: string; label: string };

export default function PageIndex({ items }: { items: SectionLink[] }) {
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();
    const selectId = useId();
    const currentSection = items.some((item) => '#' + item.id === hash) ? hash.slice(1) : '';

    return (
        <>
            <nav className="document-nav" aria-label="Page sections">
                <p className="document-nav-title">On this page</p>
                <ol>
                    {items.map((item, index) => (
                        <li key={item.id}><Link to={pathname + '#' + item.id} aria-current={hash === '#' + item.id ? 'location' : undefined}><span className="document-nav-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.label}</Link></li>
                    ))}
                </ol>
            </nav>
            <div className="document-mobile-nav">
                <label htmlFor={selectId} className="sr-only">Jump to a section</label>
                <select id={selectId} value={currentSection} onChange={(event) => { if (event.target.value) void navigate(pathname + '#' + event.target.value); }}>
                    <option value="">Jump to a section…</option>
                    {items.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
                </select>
            </div>
        </>
    );
}
